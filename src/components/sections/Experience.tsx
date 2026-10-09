import { siteConfig } from '../../config/site';
import { Reveal } from '../ui/Reveal';

export function Experience() {
  return (
    <section className="border-y border-line bg-silence" aria-label="What to expect">
      <div className="mx-auto max-w-[1280px] px-6 py-[64px] md:px-10 md:py-[88px]">
        <Reveal className="mb-10 flex items-baseline justify-between">
          <h3 className="font-display text-[28px] md:text-[36px]">What to expect</h3>
          <p className="hidden text-[11px] uppercase tracking-[0.18em] text-text-soft md:block">
            Designed for nervous systems
          </p>
        </Reveal>
        <ol className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {siteConfig.experience.map((item, index) => (
            <Reveal as="li" key={item.label} delayMs={index * 60} className="list-none">
              <article className="group rounded-[20px] border border-line bg-white p-6 transition hover:border-perch/20 md:p-7">
                <span className="mb-8 flex h-9 w-9 items-center justify-center rounded-full bg-icicle text-[14px]">
                  {index + 1}
                </span>
                <h4 className="font-display text-[22px]">{item.label}</h4>
                <p className="mt-2 text-[13px] leading-[1.6] text-text-soft">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
