import { siteConfig } from '../../config/site';
import { Button } from '../ui/Button';
import { HeroCarousel } from '../ui/HeroCarousel';
import { Reveal } from '../ui/Reveal';

export function Hero() {
  const { hero, bookingUrl } = siteConfig;

  return (
    <section className="relative flex max-w-[100vw] overflow-hidden" aria-label="Intro">
      {/* Full-bleed background carousel */}
      <div className="absolute inset-0" aria-hidden={false}>
        <HeroCarousel images={hero.images} className="h-full" />
      </div>
      {/* Light veil so the original dark text always reads over any photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-silence via-silence/85 to-silence/20 max-md:bg-gradient-to-b max-md:from-silence max-md:via-silence/85 max-md:to-silence/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-silence/70 to-transparent"
      />

      <div className="relative z-[5] mx-auto grid w-full max-w-[1280px] items-end gap-10 px-6 pb-[64px] pt-[120px] text-text md:grid-cols-[1.15fr_0.85fr] md:gap-6 md:px-10 md:pb-[96px] md:pt-[160px]">
        <Reveal>
          <p className="mb-8 text-[11px] uppercase tracking-[0.22em] text-text-soft">
            {hero.eyebrow}
          </p>
          <h1 className="whitespace-pre-line font-display text-[54px] leading-[0.9] md:text-[92px] lg:text-[108px]">
            {hero.headline}
          </h1>
          <p className="mt-8 max-w-[380px] text-[16px] font-[300] leading-[1.6] text-text-soft md:text-[17px]">
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
            <Button href="#services" variant="ghost" className="rounded-none text-[13px] tracking-[0.08em]">
              {hero.ctaSecondary} →
            </Button>
          </div>

          <dl className="mt-14 flex max-w-[520px] gap-12 border-t border-line pt-8 md:mt-20">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="order-2 mt-1 text-[11px] uppercase tracking-[0.14em] text-text-soft">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-[28px]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delayMs={120} className="relative max-w-full">
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[340px] rounded-[20px] border border-white/25 bg-silence/90 p-5 text-text shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">
                    Next Available
                  </p>
                  <p className="mt-1 font-display text-[20px]">Glow Ritual · 60 min</p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-perch text-[14px] text-white" aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className="mt-4 h-[1px] bg-line" />
              <p className="mt-3 text-[12px] leading-[1.5] text-text-soft">
                Low-temp wax, breathable aftercare, tea and stillness.
              </p>
            </div>
          </div>
          <p className="absolute right-0 top-[-48px] hidden origin-right rotate-90 text-[10px] uppercase tracking-[0.32em] text-text-soft md:block">
            Softness · Precision · Calm
          </p>
        </Reveal>
      </div>
      {/* Bottom breathing room so dots sit above the fold edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[64px]" aria-hidden="true" />
    </section>
  );
}
