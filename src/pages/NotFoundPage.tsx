import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="bg-silence">
      <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:px-10">
        <p className="text-[11px] uppercase tracking-[0.22em]">Elara Glow Studio</p>
        <h1 className="mt-4 font-display text-[52px] leading-[1]">A quiet detour.</h1>
        <p className="mx-auto mt-4 max-w-[420px] text-[14px] leading-[1.7] text-text-soft">
          This page drifted away. Let&apos;s return to softness.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="inline-flex h-[48px] items-center rounded-full bg-posy px-8 text-[12px] uppercase tracking-[0.14em] text-white transition hover:bg-[#2b4e46]">Home</Link>
          <Link to="/blog" className="inline-flex h-[48px] items-center rounded-full border border-text px-8 text-[12px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white">Journal</Link>
        </div>
      </div>
    </div>
  );
}
