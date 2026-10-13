import { siteConfig } from '../../config/site';
import type { Treatment } from '../../data/treatments';
import { Reveal } from '../ui/Reveal';

export function TreatmentCard({ t, index }: { t: Treatment; index: number }) {
  return (
    <Reveal delayMs={(index % 3) * 70}>
      <article className="arch-top group h-full bg-silence p-[10px] pb-7 shadow-[0_10px_30px_rgba(54,61,50,0.06)] transition-all duration-500 hover:shadow-[0_18px_50px_rgba(54,61,50,0.10)]">
        <div className="arch-top relative h-[260px] overflow-hidden">
          <img src={t.image} alt={t.imageAlt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-silence/85 via-transparent to-transparent" aria-hidden="true" />
          <span className="absolute left-4 top-4 rounded-full bg-silence/95 px-4 py-1.5 text-[12px] font-semibold">{t.priceLabel}</span>
          {t.regularPriceLabel && (
            <span className="absolute left-4 top-[52px] rounded-full bg-peat px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-silence">
              {t.badge ?? 'Promo'} · <span className="line-through opacity-70">{t.regularPriceLabel}</span>
            </span>
          )}
          <span className="absolute right-4 top-4 rounded-full bg-perch/90 px-3 py-1.5 text-[11px] text-silence">{t.durationLabel}</span>
        </div>
        <div className="px-5 pt-6">
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-50">{t.category}</p>
          <h3 className="mt-2 font-display text-[24px] leading-[1.05]">{t.name}</h3>
          <p className="mt-2 min-h-[42px] text-[13px] leading-[1.6] text-text-soft">{t.description}</p>
          {t.addOnLabel && (
            <p className="mt-2 inline-flex rounded-full bg-icicle px-3 py-1 text-[11px] font-semibold text-perch">{t.addOnLabel}</p>
          )}
          <div className="mt-5 flex items-center justify-between">
            <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" className="border-b border-text pb-[3px] text-[11px] uppercase tracking-[0.18em] hover:opacity-60">Book</a>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-[12px]" aria-hidden="true">+</span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
