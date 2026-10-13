import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../../types/blog';

const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://www.elaraglowstudio.com';

export function siteUrl(path: string): string {
  return `${SITE_URL.replace(/\/$/, '')}${path}`;
}

export function BlogSeo({ post, isListing }: { post?: BlogPost | null; isListing?: boolean }) {
  if (isListing) {
    const title = 'Journal — Elara Glow Studio | Waxing & Self-Care in El Paso, TX';
    const desc = 'Aftercare tips, waxing guides, and studio notes from Elara Glow Studio — body care and hair removal in West El Paso, TX.';
    const url = siteUrl('/blog');
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={siteUrl('/og-image.png')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
      </Helmet>
    );
  }
  if (!post) return null;
  const title = post.seo_title?.trim() || `${post.title} | Elara Glow Studio`;
  const desc = post.seo_description?.trim() || post.excerpt?.trim() || 'Read this journal entry from Elara Glow Studio in El Paso, TX.';
  const url = siteUrl(`/blog/${post.slug}`);
  const image = post.social_image_url?.trim() || post.featured_image_url?.trim() || siteUrl('/og-image.png');
  const published = post.published_at ?? post.created_at;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: desc,
    image: [image],
    datePublished: published,
    dateModified: post.updated_at,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'Elara Glow Studio', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Elara Glow Studio',
      logo: { '@type': 'ImageObject', url: siteUrl('/logo.png') },
    },
  };
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="article:published_time" content={published} />
      <meta property="article:modified_time" content={post.updated_at} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
