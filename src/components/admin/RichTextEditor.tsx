import { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapLink from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import { cn } from '../../lib/cn';

interface RichTextEditorProps {
  initialContent: Record<string, unknown>;
  onChange: (doc: Record<string, unknown>) => void;
}

function ToolbarButton({
  active,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-[34px] min-w-[34px] items-center justify-center rounded-[10px] border border-line px-2 text-[13px] transition hover:bg-icicle',
        active && 'bg-perch text-silence',
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ initialContent, onChange }: RichTextEditorProps) {
  const [linkDraft, setLinkDraft] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      TiptapLink.configure({ openOnClick: false, autolink: true }),
      TiptapImage.configure({ inline: false }),
    ],
    content: initialContent as never,
    editorProps: {
      attributes: {
        class:
          'tiptap min-h-[280px] rounded-[16px] border border-line bg-white/80 p-5 text-[15px] leading-[1.8] outline-none focus:border-posy',
      },
    },
    onUpdate({ editor: e }) {
      onChange(e.getJSON() as Record<string, unknown>);
    },
  });

  useEffect(() => {
    if (editor) editor.commands.setContent(initialContent as never);
    // Parent remounts via key when switching posts; avoid update loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) {
    return (
      <div className="rounded-[16px] border border-line bg-white/60 p-5 text-[13px] text-text-soft">
        Loading editor…
      </div>
    );
  }

  function setLink() {
    const url = linkDraft.trim();
    if (!url) {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
    setLinkDraft('');
  }

  function addImage() {
    const url = window.prompt('Paste an image URL (or upload below and paste the link):');
    if (url?.trim()) editor?.chain().focus().setImage({ src: url.trim() }).run();
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2" role="toolbar" aria-label="Formatting">
        <ToolbarButton label="Heading" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
        <ToolbarButton label="Subheading" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
        <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><strong>B</strong></ToolbarButton>
        <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></ToolbarButton>
        <ToolbarButton label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>
        <ToolbarButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton>
        <ToolbarButton label="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>“”</ToolbarButton>
        <ToolbarButton label="Add image" onClick={addImage}>Image</ToolbarButton>
        <div className="flex items-center gap-2">
          <label htmlFor="rte-link" className="sr-only">Link address</label>
          <input id="rte-link" value={linkDraft} onChange={(e) => setLinkDraft(e.target.value)} placeholder="Add link…" className="h-[34px] w-[150px] rounded-[10px] border border-line bg-white/80 px-3 text-[13px] outline-none focus:border-posy" />
          <ToolbarButton label="Apply link" onClick={setLink}>Link</ToolbarButton>
        </div>
      </div>
      <EditorContent editor={editor} />
      <style>{`.tiptap h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:28px;margin:1em 0 .5em}.tiptap h3{font-family:"Cormorant Garamond",Georgia,serif;font-size:23px;margin:1em 0 .5em}.tiptap p{margin:.65em 0}.tiptap ul,.tiptap ol{margin:.65em 0 .65em 1.25em}.tiptap ul{list-style:disc}.tiptap ol{list-style:decimal}.tiptap blockquote{border-left:2px solid var(--posy);padding-left:1em;margin:1em 0;font-style:italic}.tiptap a{color:var(--posy);text-decoration:underline;text-underline-offset:3px}.tiptap img{border-radius:14px;margin:1em 0;max-width:100%}`}</style>
    </div>
  );
}
