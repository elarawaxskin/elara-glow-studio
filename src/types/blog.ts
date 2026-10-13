export type BlogStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: Record<string, unknown>;
  featured_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  social_image_url: string | null;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: string | null;
}

export interface BlogPostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown>;
  featured_image_url: string;
  seo_title: string;
  seo_description: string;
  social_image_url: string;
  status: BlogStatus;
}

export const EMPTY_TIPTAP_DOC: Record<string, unknown> = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};
