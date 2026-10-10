import { useMemo, useState } from 'react';
import { siteConfig } from '../../config/site';
import { TREATMENTS, TREATMENT_CATEGORIES } from '../../data/treatments';
import { Reveal } from '../ui/Reveal';
import { TreatmentCard } from './TreatmentCard';
import { cn } from '../../lib/cn';

export function TreatmentCatalogue() {
  const [active, setActive] = useState<string>('All');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TREATMENTS.filter((t) => {
      const okCat = active === 'All' || t.category === active;
      const okQ = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [active, query]);
  const grouped = useMemo(() => {
    const cats: string[] = active === 'All' ? [...TREATMENT_CATEGORIES] : [active];
    return cats
      .map((c) => ({ category: c, items: filtered.filter((t) => t.category === c) }))
      .filter((g) => g.items.length > 0);
  }, [filtered, active]);
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-[88px] md:px-10" aria-label="Treatment catalogue">
      <div className="sticky top-[68px] z-20 -mx-6 bg-icicle/90 px-6 py-4 backdrop-blur-[12px] md:-mx-10 md:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {['All', ...TREATMENT_CATEGORIES].map((c) => (
              <button key={c} type="button" role="tab" aria-selected={active === c} onClick={() => setActive(c)} className={cn('rounded-full px-5 py-2 text-[12px] uppercase tracking-[0.10em] transition', active === c ? 'bg-perch text-silence' : 'border border-line bg-silence hover:opacity-70')}>
                {c}
              </button>
            ))}
          </div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search treatments…" aria-label="Search treatments" className="h-[42px] w-full rounded-full border border-line bg-silence px-5 text-[14px] outline-none placeholder:opacity-50 focus:border-posy md:w-[260px]" />
        </div>
      </div>
      {grouped.map((g) => (
        <div key={g.category} className="mt-12">
          <Reveal className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-[32px] md:text-[44px]">{g.category}</h2>
            <span className="text-[12px] uppercase tracking-[0.16em] opacity-50">{g.items.length} treatments</span>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {g.items.map((t, i) => (
              <TreatmentCard key={t.slug} t={t} index={i} />
            ))}
          </div>
        </div>
      ))}
      {filtered.length === 0 && (
        <div className="mt-16 rounded-[24px] border border-line bg-silence p-10 text-center">
          <p className="font-display text-[28px]">No matches</p>
          <p className="mt-2 text-[14px] text-text-soft">Try brazilian, lip or leg.</p>
          <button type="button" onClick={() => { setActive('All'); setQuery(''); }} className="mt-6 inline-flex h-[44px] items-center rounded-full bg-perch px-7 text-[12px] uppercase tracking-[0.14em] text-silence">
            Clear filters
          </button>
        </div>
      )}
      <Reveal className="mt-16 rounded-[24px] bg-perch p-8 text-silence md:p-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-[32px] md:text-[44px]">Not sure which to book?</h2>
            <p className="mt-3 max-w-[480px] text-[14px] leading-[1.7] opacity-70">Book the closest match and add a note — we confirm the right treatment before we start.</p>
          </div>
          <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-[52px] shrink-0 items-center rounded-full bg-silence px-8 text-[12px] uppercase tracking-[0.14em] text-text transition hover:opacity-85">
            Book on GlossGenius
          </a>
        </div>
      </Reveal>
    </section>
  );
}
