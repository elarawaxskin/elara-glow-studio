import { siteConfig } from '../../config/site';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="bg-surface" aria-label="About">
      <div className="mx-auto grid max-w-[1280px] items-start gap-12 px-6 py-[72px] md:grid-cols-2 md:gap-20 md:px-10 md:py-[120px]">
        <Reveal>
          <p className="mb-6 text-[11px] uppercase tracking-[0.22em]">{about.kicker}</p>
          <h2 className="max-w-[420px] font-display text-[42px] leading-[0.95] md:text-[58px]">
            {about.title}
          </h2>
          <div className="mt-8 h-[1px] w-[72px] bg-perch/20" aria-hidden="true" />
          <p className="mt-8 max-w-[460px] text-[16px] font-[300] leading-[1.8] text-text-soft">
            {about.body}
          </p>
          <div className="mt-10 grid max-w-[440px] grid-cols-2 gap-6">
            {about.highlights.map((highlight) => (
              <div key={highlight.title} className="border-t border-line pt-4">
                <p className="text-[12px] uppercase tracking-[0.16em]">{highlight.title}</p>
                <p className="mt-2 text-[13px] leading-[1.6] text-text-soft">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
          <Button href="#contact" variant="outline" size="md" className="mt-10">
            Learn More
          </Button>
        </Reveal>

        <Reveal delayMs={120} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-icicle p-4 shadow-[0_20px_80px_rgba(54,61,50,0.10)] md:aspect-[4/5.2]">
            <div className="grain relative h-full w-full overflow-hidden rounded-[20px] bg-silence">
              <div className="absolute left-[10%] right-[10%] top-[12%] h-[1px] bg-line" aria-hidden="true" />
              <div className="absolute left-[12%] top-[14%] h-[22%] w-[22%] rounded-[14px] border border-black/5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]" aria-hidden="true" />
              <div className="absolute left-[38%] top-[14%] h-[18%] w-[18%] rounded-full bg-frosty/60" aria-hidden="true" />
              <div className="absolute right-[14%] top-[14%] h-[26%] w-[26%] rounded-[18px] bg-perch/10" aria-hidden="true" />
              <div className="absolute left-[10%] right-[10%] top-[48%] h-[1px] bg-line" aria-hidden="true" />
              <div className="absolute bottom-[12%] left-[10%] right-[10%] flex gap-3" aria-hidden="true">
                <div className="h-[84px] flex-1 rounded-[14px] border border-black/5 bg-white/70" />
                <div className="h-[84px] flex-1 rounded-[14px] bg-icicle" />
              </div>
              <div className="absolute left-1/2 top-1/2 h-[38%] w-[58%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(162,182,165,0.35),_transparent_70%)]" aria-hidden="true" />
            </div>
            <p className="absolute -bottom-4 -right-2 rounded-full bg-perch px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-silence shadow-lg md:right-6">
              West El Paso · Private
            </p>
          </div>
          <p className="mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-text-soft">
            <span className="h-[1px] w-10 bg-line" aria-hidden="true" /> Purity, Calm, Detail
          </p>
        </Reveal>
      </div>
    </section>
  );
}
