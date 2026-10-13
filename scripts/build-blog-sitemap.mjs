// Builds public/sitemap.xml from static routes + published Supabase posts.
// Run: npm run sitemap (needs VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY).
import { writeFileSync } from 'node:fs';

const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://www.elaraglowstudio.com').replace(/\/$/, '');
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

function url(loc, lastmod, changefreq = 'weekly', priority = '0.7') {
  return `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

async function publishedPosts() {
  if (!SUPABASE_URL || !ANON_KEY) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=slug,updated_at&status=eq.published&order=published_at.desc`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

const posts = await publishedPosts();
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${url(`${SITE_URL}/`, today, 'weekly', '1.0')}\n${url(`${SITE_URL}/treatments`, today, 'weekly', '0.9')}\n${url(`${SITE_URL}/blog`, today, 'daily', '0.8')}\n${posts.map((p) => url(`${SITE_URL}/blog/${p.slug}`, (p.updated_at ?? today).slice(0, 10), 'weekly', '0.7')).join('\n')}\n</urlset>\n`;
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml written with ${posts.length} post(s).`);
