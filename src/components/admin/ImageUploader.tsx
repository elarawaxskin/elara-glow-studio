import { useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 5 * 1024 * 1024;

export function ImageUploader({ label, value, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setError('Please choose a JPEG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('Image must be under 5 MB.');
      return;
    }
    setUploading(true);
    setProgress('Uploading…');
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
      const path = `posts/${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(path, file, { contentType: file.type, upsert: false });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
      onChange(data.publicUrl);
      setProgress('Uploaded');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed. Please try again.');
      setProgress(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="text-[12px] uppercase tracking-[0.14em]">{label}</span>
      <div className="mt-2 rounded-[16px] border border-line bg-white/70 p-4">
        {value ? (
          <img
            src={value}
            alt={`${label} preview`}
            className="max-h-[220px] w-full rounded-[12px] object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-[140px] items-center justify-center rounded-[12px] bg-icicle/60 text-[13px] text-text-soft">
            No image yet
          </div>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex h-[40px] items-center rounded-full border border-text px-5 text-[11px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white disabled:opacity-60"
          >
            {uploading ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[12px] underline underline-offset-4 hover:opacity-60"
            >
              Remove
            </button>
          ) : null}
          {progress && !error ? (
            <span className="text-[12px] text-text-soft" role="status">
              {progress}
            </span>
          ) : null}
        </div>
        <div className="mt-3">
          <label htmlFor={`${label}-url`} className="text-[12px] text-text-soft">
            Or paste an image URL
          </label>
          <input
            id={`${label}-url`}
            value={value}
            onChange={(e) => onChange(e.target.value.trim())}
            placeholder="https://…"
            inputMode="url"
            className="mt-1 h-[42px] w-full rounded-[10px] border border-line bg-white px-3 text-[13px] outline-none focus:border-posy"
          />
        </div>
        {error ? (
          <p role="alert" className="mt-2 text-[13px] text-[#8a3b2e]">
            {error}
          </p>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
            e.target.value = '';
          }}
        />
        <p className="mt-2 text-[12px] text-text-soft">
          JPEG, PNG, or WebP · up to 5 MB · stored in Supabase Storage
          (`blog-images`).
        </p>
      </div>
    </div>
  );
}
