import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { BlogPost } from '../../types/blog';
import { cn } from '../../lib/cn';

export function formatPostDate(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function AdminBlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [deleting, setDeleting] = useState<BlogPost | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('blog_posts')
      .select('*')
      .order('updated_at', { ascending: false });
    if (err) setError(err.message);
    else setPosts((data as BlogPost[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(
    () => posts.filter((p) => p.title.toLowerCase().includes(query.trim().toLowerCase())),
    [posts, query],
  );

  async function togglePublish(post: BlogPost) {
    setBusyId(post.id);
    setNotice(null);
    setError(null);
    const publishing = post.status !== 'published';
    const patch = publishing
      ? { status: 'published', published_at: post.published_at ?? new Date().toISOString() }
      : { status: 'draft' };
    const { error: err } = await supabase.from('blog_posts').update(patch).eq('id', post.id);
    if (err) setError(err.message);
    else {
      setNotice(publishing ? 'Post published.' : 'Post moved back to drafts.');
      await load();
    }
    setBusyId(null);
  }
  async function confirmDelete() {
    if (!deleting) return;
    setBusyId(deleting.id);
    const { error: err } = await supabase.from('blog_posts').delete().eq('id', deleting.id);
    if (err) setError(err.message);
    else { setNotice('Post deleted.'); await load(); }
    setDeleting(null);
    setBusyId(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em]">Journal</p>
          <h1 className="mt-2 font-display text-[40px] leading-[1] md:text-[52px]">Blog posts</h1>
          <p className="mt-3 max-w-[480px] text-[14px] leading-[1.7] text-text-soft">Drafts stay private. Only published posts appear on the website.</p>
        </div>
        <Link to="/admin/blog/new" className="inline-flex h-[48px] items-center rounded-full bg-posy px-8 text-[12px] uppercase tracking-[0.14em] text-white transition hover:bg-[#2b4e46]">+ New post</Link>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label htmlFor="post-search" className="sr-only">Search posts by title</label>
        <input id="post-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts by title…" className="h-[44px] w-full max-w-[340px] rounded-full border border-line bg-white/70 px-5 text-[14px] outline-none focus:border-posy" />
        <span className="text-[12px] text-text-soft">{filtered.length} of {posts.length}</span>
      </div>
      {notice ? <p role="status" className="mt-4 rounded-[12px] border border-line bg-icicle/70 p-4 text-[13px]">{notice}</p> : null}
      {error ? <p role="alert" className="mt-4 rounded-[12px] border border-[#8a3b2e]/30 bg-[#f7e4de] p-4 text-[13px] text-[#8a3b2e]">{error}</p> : null}
      {loading ? (
        <p className="mt-10 text-[13px] uppercase tracking-[0.18em] text-text-soft">Loading posts…</p>
      ) : filtered.length === 0 ? (
        <div className="mt-8 rounded-[20px] border border-line bg-surface p-10 text-center">
          <p className="font-display text-[30px]">No posts yet — let&apos;s glow.</p>
          <p className="mx-auto mt-3 max-w-[420px] text-[14px] text-text-soft">{query ? 'No posts match your search.' : 'Create your first journal entry to share aftercare tips and studio news.'}</p>
          {!query ? <Link to="/admin/blog/new" className="mt-6 inline-flex h-[48px] items-center rounded-full bg-perch px-8 text-[12px] uppercase tracking-[0.14em] text-silence transition hover:opacity-90">Create your first post</Link> : null}
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((post) => (
            <li key={post.id} className="rounded-[18px] border border-line bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn('inline-flex h-[24px] items-center rounded-full px-3 text-[10px] uppercase tracking-[0.16em]', post.status === 'published' ? 'bg-posy text-white' : 'bg-peat/15 text-text')}>{post.status === 'published' ? 'Published' : 'Draft'}</span>
                    <span className="text-[12px] text-text-soft">Updated {formatPostDate(post.updated_at)}</span>
                  </div>
                  <p className="mt-2 font-display text-[24px] leading-[1.1]">{post.title}</p>
                  <p className="mt-1 text-[12px] text-text-soft">/{post.slug}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link to={`/admin/blog/${post.id}/edit`} className="inline-flex h-[38px] items-center rounded-full border border-text px-4 text-[11px] uppercase tracking-[0.12em] transition hover:bg-text hover:text-white">Edit</Link>
                  <button type="button" disabled={busyId === post.id} onClick={() => void togglePublish(post)} className="inline-flex h-[38px] items-center rounded-full bg-perch px-4 text-[11px] uppercase tracking-[0.12em] text-silence transition hover:opacity-90 disabled:opacity-60">{busyId === post.id ? '…' : post.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                  <button type="button" onClick={() => setDeleting(post)} className="inline-flex h-[38px] items-center rounded-full border border-[#8a3b2e]/40 px-4 text-[11px] uppercase tracking-[0.12em] text-[#8a3b2e] transition hover:bg-[#8a3b2e] hover:text-white">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {deleting ? (
        <div role="dialog" aria-modal="true" aria-label="Delete post" className="fixed inset-0 z-[60] flex items-center justify-center bg-perch/50 p-6">
          <div className="w-full max-w-[420px] rounded-[20px] bg-surface p-8">
            <h2 className="font-display text-[30px]">Delete this post?</h2>
            <p className="mt-3 text-[14px] text-text-soft">“{deleting.title}” will be permanently removed.</p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setDeleting(null)} className="inline-flex h-[44px] flex-1 items-center justify-center rounded-full border border-text text-[11px] uppercase tracking-[0.14em]">Keep it</button>
              <button type="button" disabled={busyId === deleting.id} onClick={() => void confirmDelete()} className="inline-flex h-[44px] flex-1 items-center justify-center rounded-full bg-[#8a3b2e] text-[11px] uppercase tracking-[0.14em] text-white disabled:opacity-60">{busyId === deleting.id ? 'Deleting…' : 'Delete'}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

