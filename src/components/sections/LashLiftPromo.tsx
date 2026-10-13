import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

const BENEFITS = [
  { icon: '◉', title: 'Opens & brightens the eyes' },
  { icon: '◡', title: 'Enhances your natural lashes' },
  { icon: '∅', title: 'No lash extensions needed' },
  { icon: '♡', title: 'Low-maintenance beauty' },
];

export function LashLiftPromo() {
  return (
    <section aria-label="Korean Lash Lift — now offering" className="grain relative overflow-hidden bg-silence">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-[280px] w-[280px] rounded-full bg-peat/10 blur-2xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-[320px] w-[320px] rounded-full bg-posy/10 blur-2xl" />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-6 py-[72px] md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-[104px]">
        <Reveal>
          <p className="font-display text-[30px] italic leading-[1.3] text-text-soft md:text-[34px]">Now Offering</p>
          <h2 className="mt-3 font-display text-[46px] font-medium uppercase leading-[1.05] tracking-[0.005em] text-perch sm:text-[56px] md:text-[68px] lg:text-[76px]">Korean<br />Lash Lift</h2>
          <p className="mt-5 text-[12px] uppercase tracking-[0.28em] text-text-soft">Lifted. Defined. Effortlessly Beautiful.</p>
          <p className="mt-5 max-w-[460px] text-[15px] leading-[1.7] text-text-soft">Enhance your natural lashes with a customized lift designed to create a beautiful curl. Wide-awake, natural curl — no extensions, no daily mascara routine.</p>
          <div className="mt-7 grid max-w-[480px] grid-cols-2 gap-3 sm:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-[16px] border border-line bg-white/60 p-3 text-center">
                <span aria-hidden="true" className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-icicle text-[16px] text-perch">{b.icon}</span>
                <p className="mt-2 text-[10px] font-semibold uppercase leading-[1.4] tracking-[0.08em] text-text">{b.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center rounded-[18px] bg-peat px-7 py-3 font-display text-[40px] italic leading-none text-silence shadow-lg">$60</span>
              <span className="flex h-[84px] w-[84px] flex-col items-center justify-center rounded-full bg-icicle text-center leading-tight">
                <span className="text-[16px] font-bold text-perch">+$10</span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-text-soft">for tint</span>
              </span>
            </div>
            <div className="text-[12px] leading-[1.6] text-text-soft">
              <p className="font-semibold uppercase tracking-[0.14em] text-text">Discounted — limited time only</p>
              <p><span className="line-through opacity-60">Regular $80</span><span className="mx-2 opacity-40">·</span>$70 with tint</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">Now Booking — $60</Button>
            <Link to="/treatments" className="inline-flex h-[48px] items-center rounded-full border border-text px-8 text-[12px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white">View Lash Details →</Link>
          </div>
          <p className="mt-4 text-[12px] text-text-soft">Book on GlossGenius · Sunland Park · El Paso, TX · Limited-time intro pricing.</p>
        </Reveal>
        <Reveal delayMs={140}>
          <div className="relative mx-auto max-w-[480px]">
            <div className="arch-top relative bg-icicle p-[10px] pb-0 shadow-[0_18px_50px_rgba(54,61,50,0.12)]">
              <span className="absolute left-[22px] top-[22px] z-10 rounded-full bg-perch px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-silence shadow">Now Offering</span>
              <span className="absolute right-[22px] top-[22px] z-10 rounded-full bg-silence/95 px-4 py-1.5 text-[12px] font-semibold">$60 · 60 min</span>
              <div className="arch-top relative h-[420px] overflow-hidden md:h-[520px]">
                <img src="/treatments/korean-lash-lift.jpg" alt="Korean lash lift in El Paso, TX — lifted natural lashes" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" onError={(e) => { const el = e.currentTarget; if (!el.src.endsWith('/treatments/face.jpg')) el.src = '/treatments/face.jpg'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-silence/60 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className="flex items-center justify-between px-5 py-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Lash · El Paso, TX</p>
                  <p className="mt-1 font-display text-[22px]">Korean Lash Lift</p>
                </div>
                <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" className="border-b border-text pb-[3px] text-[11px] uppercase tracking-[0.18em] hover:opacity-60">Book →</a>
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] opacity-50">Lifted · Defined · Effortlessly Beautiful</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
