import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { BlogPost } from '../types/blog';
import { BlogSeo } from '../components/blog/BlogSeo';
import { RichTextContent } from '../components/blog/RichTextContent';
import { formatBlogDate } from '../components/blog/PostCard';
import { siteConfig } from '../config/site';

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isSupabaseConfigured() || !slug) {
        setLoading(false);
        setNotFound(true);
        return;
      }
      // Published-only lookup: drafts are never exposed, even by exact slug.
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      if (error || !data) setNotFound(true);
      else setPost(data as BlogPost);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-silence">
        <div className="mx-auto max-w-[780px] px-6 py-24 md:px-10">
          <p className="text-[13px] uppercase tracking-[0.18em] text-text-soft">Opening story…</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="bg-silence">
        <div className="mx-auto max-w-[780px] px-6 py-24 text-center md:px-10">
          <p className="text-[11px] uppercase tracking-[0.22em]">Journal</p>
          <h1 className="mt-4 font-display text-[44px] leading-[1]">This story isn&apos;t here.</h1>
          <p className="mx-auto mt-4 max-w-[420px] text-[14px] leading-[1.7] text-text-soft">
            It may have been moved or is still a private draft. Let&apos;s find you something soft.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/blog" className="inline-flex h-[48px] items-center rounded-full bg-posy px-8 text-[12px] uppercase tracking-[0.14em] text-white transition hover:bg-[#2b4e46]">Back to journal</Link>
            <Link to="/" className="inline-flex h-[48px] items-center rounded-full border border-text px-8 text-[12px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white">Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-silence">
      <BlogSeo post={post} />
      <article className="mx-auto max-w-[780px] px-6 pb-20 pt-[56px] md:px-10 md:pt-[72px]">
        <p className="text-[11px] uppercase tracking-[0.22em]">
          <Link to="/" className="opacity-60 hover:opacity-100">Home</Link>
          <span className="mx-2 opacity-40">/</span>
          <Link to="/blog" className="opacity-60 hover:opacity-100">Journal</Link>
        </p>
        <h1 className="mt-5 font-display text-[42px] leading-[0.98] md:text-[60px]">
          {post.title}
        </h1>
        <p className="mt-5 text-[12px] uppercase tracking-[0.18em] text-text-soft">
          {formatBlogDate(post.published_at ?? post.created_at)} · Elara Glow Studio · El Paso, TX
        </p>
        {post.excerpt ? (
          <p className="mt-6 font-display text-[22px] italic leading-[1.5] text-text/80">
            {post.excerpt}
          </p>
        ) : null}
        {post.featured_image_url ? (
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="mt-8 aspect-[16/9] w-full rounded-[22px] object-cover"
            loading="eager"
            decoding="async"
          />
        ) : null}
        <div className="mt-9">
          <RichTextContent doc={post.content} />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-line bg-surface p-6">
          <div>
            <p className="font-display text-[24px]">Ready for your glow?</p>
            <p className="mt-1 text-[13px] text-text-soft">Private West Side suite · by appointment</p>
          </div>
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[48px] items-center rounded-full bg-posy px-8 text-[12px] uppercase tracking-[0.14em] text-white transition hover:bg-[#2b4e46]"
          >
            Book your treatment
          </a>
        </div>
        <Link to="/blog" className="mt-8 inline-block text-[12px] uppercase tracking-[0.18em] underline underline-offset-4 hover:opacity-60">
          ← Back to journal
        </Link>
      </article>
    </div>
  );
}
