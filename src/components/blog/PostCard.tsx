import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types/blog';
import { Reveal } from '../ui/Reveal';

export function formatBlogDate(value: string | null): string {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Reveal as="article">
      <Link
        to={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-[22px] border border-line bg-silence transition hover:shadow-[0_16px_44px_rgba(54,61,50,0.12)]"
      >
        {post.featured_image_url ? (
          <div className="overflow-hidden">
            <img
              src={post.featured_image_url}
              alt={post.title}
              loading="lazy"
              decoding="async"
              className="h-[220px] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="flex h-[160px] items-center justify-center bg-icicle/60 font-display text-[26px] italic">
            Elara Journal
          </div>
        )}
        <div className="p-6 md:p-7">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-soft">
            {formatBlogDate(post.published_at ?? post.created_at)} · El Paso, TX
          </p>
          <h3 className="mt-3 font-display text-[26px] leading-[1.1] transition group-hover:opacity-70">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="mt-3 text-[14px] leading-[1.7] text-text-soft">
              {post.excerpt}
            </p>
          ) : null}
          <span className="mt-5 inline-block border-b border-text pb-[2px] text-[11px] uppercase tracking-[0.18em] transition group-hover:opacity-60">
            Read article →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
