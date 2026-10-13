import { Fragment } from 'react';
import DOMPurify from 'dompurify';

type JSONNode = {
  type?: string;
  attrs?: Record<string, string | number | boolean | null>;
  marks?: Array<{ type?: string; attrs?: Record<string, string> }>;
  text?: string;
  content?: JSONNode[];
};

function sanitizeUrl(url: string): string {
  const clean = DOMPurify.sanitize(url, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  if (/^(https?:\/\/|\/|mailto:|tel:)/i.test(clean.trim())) return clean.trim();
  return '#';
}

function renderText(node: JSONNode, key: string): React.ReactNode {
  let el: React.ReactNode = node.text ?? '';
  for (const mark of node.marks ?? []) {
    if (mark.type === 'bold') el = <strong key={key + '-b'}>{el}</strong>;
    else if (mark.type === 'italic') el = <em key={key + '-i'}>{el}</em>;
    else if (mark.type === 'link') {
      const href = sanitizeUrl(mark.attrs?.href ?? '#');
      el = <a key={key + '-a'} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-posy underline underline-offset-4 hover:opacity-70">{el}</a>;
    }
  }
  return <Fragment key={key}>{el}</Fragment>;
}

function renderNode(node: JSONNode, key: string): React.ReactNode {
  if (node.type === 'text') return renderText(node, key);
  const children = (node.content ?? []).map((c, i) => renderNode(c, `${key}-${i}`));
  switch (node.type) {
    case 'doc': return <Fragment key={key}>{children}</Fragment>;
    case 'paragraph': return <p key={key} className="mb-5 leading-[1.85]">{children.length ? children : <br />}</p>;
    case 'heading': {
      const level = Number(node.attrs?.level ?? 2);
      if (level === 3) return <h3 key={key} className="mb-4 mt-9 font-display text-[26px] leading-[1.15] md:text-[30px]">{children}</h3>;
      return <h2 key={key} className="mb-4 mt-10 font-display text-[30px] leading-[1.1] md:text-[36px]">{children}</h2>;
    }
    case 'bulletList': return <ul key={key} className="mb-5 ml-5 list-disc space-y-2 leading-[1.8]">{children}</ul>;
    case 'orderedList': return <ol key={key} className="mb-5 ml-5 list-decimal space-y-2 leading-[1.8]">{children}</ol>;
    case 'listItem': return <li key={key}>{children}</li>;
    case 'blockquote': return <blockquote key={key} className="mb-6 border-l-2 border-posy pl-5 font-display text-[22px] italic leading-[1.5] text-text/90">{children}</blockquote>;
    case 'horizontalRule': return <hr key={key} className="my-8 border-line" />;
    case 'hardBreak': return <br key={key} />;
    case 'image': {
      const src = sanitizeUrl(String(node.attrs?.src ?? ''));
      if (!src || src === '#') return null;
      return <img key={key} src={src} alt={String(node.attrs?.alt ?? 'Blog image')} loading="lazy" decoding="async" className="my-7 w-full rounded-[18px] object-cover" />;
    }
    default: return <Fragment key={key}>{children}</Fragment>;
  }
}

export function RichTextContent({ doc }: { doc: Record<string, unknown> }) {
  const node = doc as unknown as JSONNode;
  if (!node || typeof node !== 'object') return null;
  return <div className="text-[15.5px] text-text/90">{renderNode(node, 'root')}</div>;
}
