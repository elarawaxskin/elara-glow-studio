import type { GlowPackage } from '../../data/packages';
import { PACKAGES_BOOKING_URL } from '../../data/packages';
import { Reveal } from '../ui/Reveal';

export function PackageCard({ pkg, index }: { pkg: GlowPackage; index: number }) {
  return (
    <Reveal delayMs={(index % 2) * 90}>
      <article className="arch-top group relative h-full bg-silence p-[10px] pb-7 shadow-[0_10px_30px_rgba(54,61,50,0.06)] transition-all duration-500 hover:shadow-[0_18px_50px_rgba(54,61,50,0.10)]">
        {pkg.featured && (
          <span className="absolute left-1/2 top-[22px] z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-peat px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-silence shadow">
            {pkg.tagline}
          </span>
        )}
        <div className="arch-top relative h-[240px] overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.imageAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-silence/85 via-transparent to-transparent" aria-hidden="true" />
          <span className="absolute left-4 top-4 rounded-full bg-silence/95 px-4 py-1.5 text-[14px] font-semibold">
            {pkg.priceLabel}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-posy px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
            {pkg.saveLabel}
          </span>
        </div>
        <div className="px-5 pt-6">
          {!pkg.featured && (
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-50">{pkg.tagline}</p>
          )}
          {pkg.featured && (
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-50">Bundle · 9 visits</p>
          )}
          <h3 className="mt-2 font-display text-[26px] leading-[1.05]">{pkg.name}</h3>
          <p className="mt-1 text-[12px] uppercase tracking-[0.10em] opacity-50">
            <span className="line-through">Regular {pkg.regularPriceLabel}</span>
            <span className="mx-2 opacity-40">·</span>
            <span className="font-semibold normal-case tracking-normal opacity-100">{pkg.perVisitLabel}</span>
          </p>
          <p className="mt-3 min-h-[42px] text-[13px] leading-[1.6] text-text-soft">{pkg.description}</p>
          <ul className="mt-4 space-y-2.5">
            {pkg.includes.map((inc) => (
              <li key={inc.label} className="flex items-center gap-3">
                <img
                  src={inc.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="h-[36px] w-[36px] shrink-0 rounded-full border border-line object-cover"
                />
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold">{inc.label}</p>
                  <p className="text-[12px] text-text-soft">{inc.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <a
              href={PACKAGES_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-text pb-[3px] text-[11px] uppercase tracking-[0.18em] hover:opacity-60"
            >
              Buy package
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
