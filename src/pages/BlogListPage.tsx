import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { BlogPost } from '../types/blog';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PostCard } from '../components/blog/PostCard';
import { BlogSeo } from '../components/blog/BlogSeo';
import { Reveal } from '../components/ui/Reveal';

const PAGE_SIZE = 9;

export function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    (async () => {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }
      const { data, error: err } = await supabase
        .from('blog_posts')
        .select('id,title,slug,excerpt,featured_image_url,published_at,created_at,status')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(100);
      if (err) setError('The journal is taking a breath. Please try again shortly.');
      else setPosts((data as BlogPost[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="bg-silence">
      <BlogSeo isListing />
      <section className="grain bg-silence" aria-label="Journal">
        <div className="mx-auto max-w-[1280px] px-6 pb-14 pt-[64px] md:px-10 md:pt-[88px]">
          <Reveal>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em]">
              <Link to="/" className="opacity-60 hover:opacity-100">Home</Link>
              <span className="mx-2 opacity-40">/</span>Journal
            </p>
            <SectionHeading
              kicker="Elara Journal — El Paso, TX"
              title={<>Notes on softness, skin & self-care.</>}
              description="Aftercare rituals, waxing guides, and quiet studio notes — written for sensitive skin and calm routines."
            />
          </Reveal>
          {!isSupabaseConfigured() ? (
            <p className="mt-8 rounded-[16px] border border-line bg-surface p-6 text-[14px] text-text-soft">
              The journal is being prepared. Please check back soon.
            </p>
          ) : loading ? (
            <p className="mt-10 text-[13px] uppercase tracking-[0.18em] text-text-soft">Gathering stories…</p>
          ) : error ? (
            <p role="alert" className="mt-8 text-[14px] text-[#8a3b2e]">{error}</p>
          ) : posts.length === 0 ? (
            <div className="mt-10 rounded-[24px] border border-line bg-surface p-10 text-center md:p-14">
              <p className="font-display text-[34px] leading-[1.05]">Soft stories are on their way.</p>
              <p className="mx-auto mt-4 max-w-[440px] text-[14px] leading-[1.7] text-text-soft">
                We&apos;re preparing aftercare guides and studio notes. Meanwhile, explore our treatments or book your moment of calm.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/treatments" className="inline-flex h-[48px] items-center rounded-full bg-posy px-8 text-[12px] uppercase tracking-[0.14em] text-white transition hover:bg-[#2b4e46]">View treatments</Link>
                <Link to="/" className="inline-flex h-[48px] items-center rounded-full border border-text px-8 text-[12px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white">Back home</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.slice(0, visible).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              {visible < posts.length ? (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="inline-flex h-[48px] items-center rounded-full border border-text px-8 text-[12px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white"
                  >
                    Load more stories
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
