import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
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
          <Link to="/#contact" className="mt-10 inline-flex h-[44px] items-center rounded-full border border-text px-7 text-[11px] uppercase tracking-[0.18em] transition hover:bg-text hover:text-white">
            Learn More
          </Link>
        </Reveal>

        <Reveal delayMs={120} className="relative">
          <div className="relative aspect-[4/5] rounded-[32px] bg-icicle p-4 shadow-[0_20px_80px_rgba(54,61,50,0.10)] md:aspect-[4/5.2]">
            <div className="grain relative h-full w-full overflow-hidden rounded-[20px] bg-silence">
              <img
                src="/founder.jpeg"
                alt="Founder of Elara Glow Studio"
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <p className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-perch px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-silence shadow-lg">
              Founder · Jennifer Rodriguez
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
