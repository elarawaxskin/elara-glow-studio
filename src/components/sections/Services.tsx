import { Link } from 'react-router-dom';
import type { Service } from '../../config/site';
import { siteConfig } from '../../config/site';
import { TREATMENTS } from '../../data/treatments';
import { Reveal } from '../ui/Reveal';

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal delayMs={index * 80}>
      <article className="arch-top group bg-silence p-[10px] pb-8 shadow-[0_10px_30px_rgba(54,61,50,0.06)] transition-all duration-500 hover:shadow-[0_18px_50px_rgba(54,61,50,0.10)]">
        <div className="arch-top relative h-[320px] overflow-hidden md:h-[380px]">
          <img
            src={service.image}
            alt={service.imageAlt}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${service.accent}26 0%, transparent 45%, rgba(247,237,229,0.25) 75%, rgba(247,237,229,0.85) 100%)`,
            }}
            aria-hidden="true"
          />
          <span className="absolute left-4 top-4 rounded-full bg-silence/90 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] backdrop-blur">
            {service.priceHint}
          </span>
        </div>
        <div className="px-6 pt-7">
          <h3 className="font-display text-[26px]">{service.title}</h3>
          <p className="mt-3 min-h-[44px] text-[13px] leading-[1.6] text-text-soft">
            {service.description}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <Link
              to="/treatments"
              className="border-b border-text pb-[3px] text-[11px] uppercase tracking-[0.18em] transition hover:opacity-60"
            >
              Explore →
            </Link>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-[12px]" aria-hidden="true">
              +
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="grain relative bg-icicle" aria-label="Services">
      <div className="mx-auto max-w-[1280px] px-6 py-[72px] md:px-10 md:py-[112px]">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em]">Our Services</p>
            <h2 className="max-w-[520px] font-display text-[42px] leading-[0.95] md:text-[64px]">
              Treatments designed around skin, not speed.
            </h2>
          </div>
          <p className="max-w-[320px] text-[14px] leading-[1.7] text-text-soft">
            Book a full body wax, face wax, or Brazilian wax in El Paso, TX.
            Three focused offerings — body, face, and Brazilian — slow,
            private, and fully guided.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {siteConfig.services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link
            to="/treatments"
            className="inline-flex h-[48px] items-center rounded-full border border-text px-8 text-[12px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white"
          >
            View all {TREATMENTS.length} treatments →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
