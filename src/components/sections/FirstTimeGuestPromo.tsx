import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function FirstTimeGuestPromo() {
  return (
    <section aria-label="First-time guest promo — 30% off any service" className="grain relative overflow-hidden bg-silence">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-[280px] w-[280px] rounded-full bg-peat/10 blur-2xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-[320px] w-[320px] rounded-full bg-posy/10 blur-2xl" />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-6 py-[72px] md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-[104px]">
        <Reveal>
          <p className="font-display text-[30px] italic leading-[1.3] text-text-soft md:text-[34px]">New Client Offer</p>
          <h2 className="mt-3 font-display text-[46px] font-medium uppercase leading-[1.05] tracking-[0.005em] text-perch sm:text-[56px] md:text-[68px] lg:text-[76px]">30%<br />Off</h2>
          <p className="mt-5 text-[12px] uppercase tracking-[0.28em] text-text-soft">any service · first-time clients only</p>
          <p className="mt-5 max-w-[460px] text-[15px] leading-[1.7] text-text-soft">Because smooth skin feels better. Let's glow together.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <div className="text-[12px] leading-[1.6] text-text-soft">
              <p className="font-semibold uppercase tracking-[0.14em] text-text">First-time clients only · West El Paso, TX</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">Book Your Glow →</Button>
            <Link to="/treatments" className="inline-flex h-[48px] items-center rounded-full border border-text px-8 text-[12px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white">View Services →</Link>
          </div>
          <p className="mt-4 text-[12px] text-text-soft">Book on GlossGenius · Sunland Park · El Paso, TX · New clients only.</p>
        </Reveal>
        <Reveal delayMs={140}>
          <div className="relative mx-auto max-w-[480px]">
            <div className="relative bg-icicle p-[10px] pb-0 shadow-[0_18px_50px_rgba(54,61,50,0.12)] rounded-[24px]">
              <span className="absolute left-[22px] top-[22px] z-10 rounded-full bg-perch px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-silence shadow">New Client</span>
              <div className="relative h-[420px] overflow-hidden md:h-[520px] rounded-[20px]">
                <img src="/elarapromo.jpg" alt="First-time guest promo — Elara Glow Studio West El Paso, TX" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain" onError={(e) => { const el = e.currentTarget; if (!el.src.endsWith('/treatments/face.jpg')) el.src = '/treatments/face.jpg'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-silence/60 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className="flex items-center justify-between px-5 py-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Promo · El Paso, TX</p>
                  <p className="mt-1 font-display text-[22px]">30% Off Any Service</p>
                </div>
                <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" className="border-b border-text pb-[3px] text-[11px] uppercase tracking-[0.18em] hover:opacity-60">Book →</a>
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] opacity-50">First-time clients only · Book your glow today!</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
