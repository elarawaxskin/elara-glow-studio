import { siteConfig, type Service } from '../../config/site';
import { Reveal } from '../ui/Reveal';

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal delayMs={index * 80}>
      <article className="arch-top group bg-silence p-[10px] pb-8 shadow-[0_10px_30px_rgba(54,61,50,0.06)] transition-all duration-500 hover:shadow-[0_18px_50px_rgba(54,61,50,0.10)]">
        <div
          className="arch-top relative h-[320px] overflow-hidden md:h-[380px]"
          style={{ background: `linear-gradient(180deg, ${service.accent}14, ${service.accent}06)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="flex h-[160px] w-[160px] items-center justify-center rounded-[60%_40%_55%_45%/45%_55%_40%_60%] border border-line bg-white/40 backdrop-blur">
              <span className="text-[42px] opacity-60" style={{ color: service.accent }}>
                {service.icon}
              </span>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-silence to-transparent" aria-hidden="true" />
          <div className="absolute left-[-20%] top-[22%] h-[1px] w-[140%] rotate-[-8deg] bg-gradient-to-r from-transparent via-frosty/40 to-transparent" aria-hidden="true" />
        </div>
        <div className="px-6 pt-7">
          <h3 className="font-display text-[26px]">{service.title}</h3>
          <p className="mt-3 min-h-[44px] text-[13px] leading-[1.6] text-text-soft">
            {service.description}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-text pb-[3px] text-[11px] uppercase tracking-[0.18em] transition hover:opacity-60"
            >
              Explore →
            </a>
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
              Rituals designed around skin, not speed.
            </h2>
          </div>
          <p className="max-w-[320px] text-[14px] leading-[1.7] text-text-soft">
            Three focused offerings. Each one slow, private, and fully guided —
            from preparation to aftercare.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {siteConfig.services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
