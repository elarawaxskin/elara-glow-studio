import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { Button } from '../ui/Button';
import { HeroCarousel } from '../ui/HeroCarousel';
import { Reveal } from '../ui/Reveal';

export function Hero() {
  const { hero, bookingUrl, businessHours } = siteConfig;

  return (
    <section className="relative flex max-w-[100vw] overflow-hidden" aria-label="Intro">
      {/* Full-bleed background carousel */}
      <div className="absolute inset-0" aria-hidden={false}>
        <HeroCarousel images={hero.images} className="h-full" />
      </div>
      {/* Cinematic dark scrim — strong on the left where copy lives, melts away on the right so photos shine.
          On mobile the copy sits at the bottom, so the gradient runs bottom-to-top (darkest behind text). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1C211A]/85 via-[#1C211A]/55 to-[#1C211A]/10 max-md:bg-gradient-to-t max-md:from-[#1C211A]/90 max-md:via-[#1C211A]/70 max-md:to-[#1C211A]/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1C211A]/60 to-transparent max-md:h-72 max-md:from-[#1C211A]/80"
      />

      <div className="relative z-[5] mx-auto grid w-full max-w-[1280px] items-end gap-10 px-6 pb-[88px] pt-[140px] text-silence md:grid-cols-[1.15fr_0.85fr] md:gap-6 md:px-10 md:pb-[96px] md:pt-[160px]">
        <Reveal>
          <p className="mb-8 text-[11px] font-bold uppercase tracking-[0.22em] text-silence/70 max-md:mb-5 max-md:text-silence/90">
            {hero.eyebrow}
          </p>
          <h1 className="whitespace-pre-line font-display text-[54px] font-[300] leading-[0.9] text-silence [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] max-md:text-[44px] max-md:leading-[0.95] max-md:[text-shadow:0_2px_32px_rgba(0,0,0,0.65)] md:text-[92px] lg:text-[108px]">
            {hero.headline}
          </h1>
          <p className="mt-8 max-w-[380px] text-[16px] font-normal leading-[1.6] text-silence/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] max-md:mt-5 max-md:max-w-none max-md:text-[15px] max-md:text-silence max-md:[text-shadow:0_1px_16px_rgba(0,0,0,0.55)] md:text-[17px]">
            {hero.sub}
          </p>
          <div className="mt-10 flex items-center gap-6">
            <Button
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero.ctaPrimary}
            </Button>
            <Link to="/#services" className="text-[13px] tracking-[0.08em] text-silence underline underline-offset-[8px] decoration-white/30 hover:decoration-silence">
              {hero.ctaSecondary} →
            </Link>
          </div>

          <dl className="mt-14 flex max-w-[520px] gap-12 border-t border-white/20 pt-8 max-md:mt-8 max-md:gap-8 max-md:border-white/30 max-md:pt-6 md:mt-20">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="order-2 mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-silence/60">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-[28px] font-bold text-silence">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delayMs={120} className="relative max-w-full">
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[340px] rounded-[20px] border border-white/25 bg-silence p-5 text-text shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl max-md:max-w-none">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-60">
                    Business Hours
                  </p>
                  <p className="mt-1 font-display text-[20px] font-bold">Visit the studio</p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-perch text-[14px] text-white" aria-hidden="true">
                  ◷
                </span>
              </div>
              <div className="mt-4 h-[1px] bg-line" />
              <dl className="mt-3 space-y-2">
                {businessHours.map((entry) => (
                  <div key={entry.day} className="flex items-baseline justify-between gap-4 text-[13px] leading-[1.5]">
                    <dt className="font-bold">{entry.day}</dt>
                    <dd className={entry.closed ? 'font-bold uppercase tracking-[0.08em] text-text' : 'text-text'}>
                      {entry.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="absolute right-0 top-[-48px] hidden origin-right rotate-90 text-[10px] uppercase tracking-[0.32em] text-silence/60 md:block">
            Softness · Precision · Calm
          </p>
        </Reveal>
      </div>
      {/* Bottom breathing room so dots sit above the fold edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[64px]" aria-hidden="true" />
    </section>
  );
}
