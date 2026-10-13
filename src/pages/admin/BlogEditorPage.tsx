import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { isValidSlug, slugify } from '../../lib/slug';
import { EMPTY_TIPTAP_DOC, type BlogPost, type BlogStatus } from '../../types/blog';
import { useAuth } from '../../context/AuthContext';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { ImageUploader } from '../../components/admin/ImageUploader';

function isEmptyDoc(doc: Record<string, unknown>): boolean {
  try {
    const content = (doc as { content?: Array<{ type?: string; content?: Array<{ text?: string }> }> }).content;
    if (!content || content.length === 0) return true;
    return content.every((n) => {
      if (n.type !== 'paragraph' && n.type !== undefined) return false;
      if (!n.content || n.content.length === 0) return true;
      return n.content.every((c) => !c.text || !c.text.trim());
    });
  } catch { return true; }
}

export function BlogEditorPage() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState<Record<string, unknown>>(EMPTY_TIPTAP_DOC);
  const [featured, setFeatured] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [socialImage, setSocialImage] = useState('');
  const [status, setStatus] = useState<BlogStatus>('draft');
  const [publishedAt, setPublishedAt] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      setLoading(true);
      const { data, error: err } = await supabase.from('blog_posts').select('*').eq('id', id).maybeSingle();
      if (err) setError(err.message);
      else if (!data) setError('Post not found.');
      else {
        const p = data as BlogPost;
        setTitle(p.title); setSlug(p.slug); setSlugTouched(true);
        setExcerpt(p.excerpt ?? ''); setContent(p.content ?? EMPTY_TIPTAP_DOC);
        setFeatured(p.featured_image_url ?? ''); setSeoTitle(p.seo_title ?? '');
        setSeoDesc(p.seo_description ?? ''); setSocialImage(p.social_image_url ?? '');
        setStatus(p.status); setPublishedAt(p.published_at);
      }
      setLoading(false);
    })();
  }, [id, isNew]);

  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (dirty) { e.preventDefault(); e.returnValue = ''; }
    }
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  function handleTitleChange(v: string) {
    setTitle(v); setDirty(true);
    if (!slugTouched) setSlug(slugify(v));
  }

  function validate(): string | null {
    if (!title.trim()) return 'Please add a title.';
    if (!slug.trim()) return 'Please add a URL slug.';
    if (!isValidSlug(slug.trim())) return 'Slug must be lowercase letters, numbers, and dashes only.';
    if (isEmptyDoc(content)) return 'Please write some article content.';
    return null;
  }

  async function checkSlugCollision(nextSlug: string, selfId?: string): Promise<boolean> {
    const { data } = await supabase.from('blog_posts').select('id').eq('slug', nextSlug).limit(1);
    const rows = (data as Array<{ id: string }>) ?? [];
    return rows.some((r) => r.id !== selfId);
  }

  async function persist(nextStatus: BlogStatus) {
    const problem = validate();
    if (problem) { setError(problem); return; }
    const cleanSlug = slug.trim();
    if (await checkSlugCollision(cleanSlug, isNew ? undefined : id)) {
      setError(`The URL "${cleanSlug}" is already used. Please choose another slug.`);
      return;
    }
    setSaving(true); setError(null); setNotice(null);
    const payload = {
      title: title.trim(), slug: cleanSlug,
      excerpt: excerpt.trim() || null, content,
      featured_image_url: featured.trim() || null,
      seo_title: seoTitle.trim() || null, seo_description: seoDesc.trim() || null,
      social_image_url: socialImage.trim() || null,
      status: nextStatus,
      published_at: nextStatus === 'published' ? (publishedAt ?? new Date().toISOString()) : publishedAt,
      author_id: user?.id ?? null,
    };
    try {
      if (isNew) {
        const { data, error: err } = await supabase.from('blog_posts').insert(payload).select('id').single();
        if (err) throw err;
        setDirty(false);
        setNotice(nextStatus === 'published' ? 'Post published.' : 'Draft saved.');
        navigate(`/admin/blog/${(data as { id: string }).id}/edit`, { replace: true });
      } else {
        const { error: err } = await supabase.from('blog_posts').update(payload).eq('id', id);
        if (err) throw err;
        setDirty(false); setStatus(nextStatus);
        if (nextStatus === 'published' && !publishedAt) setPublishedAt(new Date().toISOString());
        setNotice(nextStatus === 'published' ? 'Post published.' : 'Draft saved.');
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Save failed.';
      setError(msg.includes('duplicate') ? `The URL "${cleanSlug}" is already used.` : msg);
    } finally { setSaving(false); }
  }

  if (loading) return <p className="text-[13px] uppercase tracking-[0.18em] text-text-soft">Loading post…</p>;

  const inputCls = 'mt-2 h-[48px] w-full rounded-[12px] border border-line bg-white/80 px-4 text-[14px] outline-none focus:border-posy';
  const areaCls = 'mt-2 min-h-[90px] w-full rounded-[12px] border border-line bg-white/80 p-4 text-[14px] outline-none focus:border-posy';
  const labelCls = 'text-[12px] uppercase tracking-[0.14em]';
  return (
    <div>
      <Link to="/admin/blog" className="text-[12px] underline underline-offset-4 hover:opacity-60">← All posts</Link>
      <h1 className="mt-3 font-display text-[40px] leading-[1] md:text-[52px]">{isNew ? 'New post' : 'Edit post'}</h1>
      {publishedAt ? <p className="mt-2 text-[12px] text-text-soft">Published {new Date(publishedAt).toLocaleDateString()}</p> : <p className="mt-2 text-[12px] text-text-soft">Not published yet — drafts are private.</p>}
      {error ? <p role="alert" className="mt-4 rounded-[12px] border border-[#8a3b2e]/30 bg-[#f7e4de] p-4 text-[13px] text-[#8a3b2e]">{error}</p> : null}
      {notice ? <p role="status" className="mt-4 rounded-[12px] border border-line bg-icicle/70 p-4 text-[13px]">{notice}</p> : null}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 rounded-[20px] border border-line bg-surface p-6">
          <div>
            <label htmlFor="post-title" className={labelCls}>Title *</label>
            <input id="post-title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="e.g. How to prep for your Brazilian wax" className={inputCls} />
          </div>
          <div>
            <label htmlFor="post-slug" className={labelCls}>URL slug *</label>
            <input id="post-slug" value={slug} onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); setDirty(true); }} placeholder="how-to-prep-for-brazilian" className={inputCls} />
            <p className="mt-1 text-[12px] text-text-soft">Appears as /blog/{slug || 'your-slug'}. Lowercase letters, numbers, dashes.</p>
          </div>
          <div>
            <span className={labelCls} id="post-content-label">Article content *</span>
            <div className="mt-2" role="group" aria-labelledby="post-content-label">
              <RichTextEditor key={isNew ? 'new' : id} initialContent={content} onChange={(d) => { setContent(d); setDirty(true); }} />
            </div>
          </div>
          <div>
            <label htmlFor="post-excerpt" className={labelCls}>Excerpt</label>
            <textarea id="post-excerpt" value={excerpt} onChange={(e) => { setExcerpt(e.target.value); setDirty(true); }} placeholder="2–3 sentences shown on the blog listing and in search results." className={areaCls} maxLength={300} />
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-[20px] border border-line bg-surface p-6">
            <p className={labelCls}>Publish</p>
            <p className="mt-2 text-[13px] text-text-soft">Current status: <strong>{status}</strong></p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" disabled={saving} onClick={() => void persist('draft')} className="inline-flex h-[44px] items-center rounded-full border border-text px-5 text-[11px] uppercase tracking-[0.12em] transition hover:bg-text hover:text-white disabled:opacity-60">{saving ? 'Saving…' : 'Save draft'}</button>
              <button type="button" disabled={saving} onClick={() => void persist('published')} className="inline-flex h-[44px] items-center rounded-full bg-posy px-5 text-[11px] uppercase tracking-[0.12em] text-white transition hover:bg-[#2b4e46] disabled:opacity-60">{saving ? 'Saving…' : status === 'published' ? 'Save + keep published' : 'Publish'}</button>
              {status === 'published' && !isNew ? <button type="button" disabled={saving} onClick={() => void persist('draft')} className="inline-flex h-[44px] items-center rounded-full border border-line px-5 text-[11px] uppercase tracking-[0.12em] transition hover:bg-icicle disabled:opacity-60">Unpublish</button> : null}
            </div>
          </div>
          <div className="rounded-[20px] border border-line bg-surface p-6 space-y-5">
            <ImageUploader label="Featured image" value={featured} onChange={(u) => { setFeatured(u); setDirty(true); }} />
            <ImageUploader label="Social sharing image" value={socialImage} onChange={(u) => { setSocialImage(u); setDirty(true); }} />
          </div>
          <div className="rounded-[20px] border border-line bg-surface p-6 space-y-4">
            <p className={labelCls}>SEO (optional)</p>
            <div>
              <label htmlFor="post-seo-title" className="text-[12px] text-text-soft">SEO title</label>
              <input id="post-seo-title" value={seoTitle} onChange={(e) => { setSeoTitle(e.target.value); setDirty(true); }} placeholder="Defaults to post title" className={inputCls} maxLength={70} />
            </div>
            <div>
              <label htmlFor="post-seo-desc" className="text-[12px] text-text-soft">Meta description</label>
              <textarea id="post-seo-desc" value={seoDesc} onChange={(e) => { setSeoDesc(e.target.value); setDirty(true); }} placeholder="Defaults to excerpt" className={areaCls} maxLength={160} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

