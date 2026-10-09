import { Fragment } from 'react';
import { siteConfig } from '../../config/site';
import { Reveal } from '../ui/Reveal';

export function Philosophy() {
  return (
    <section className="relative max-w-[100vw] overflow-hidden bg-frosty/35" aria-label="Philosophy">
      <div className="pointer-events-none absolute inset-0 select-none opacity-[0.22]" aria-hidden="true">
        <div className="flex h-full w-full content-start flex-wrap gap-x-8 gap-y-2 p-6 text-[12px] uppercase leading-[2.2] tracking-[0.22em] text-perch md:p-10 md:text-[13px]">
          {Array.from({ length: 4 }).map((_, row) => (
            <Fragment key={row}>
              {siteConfig.values.map((value) => (
                <span key={`${row}-${value}`} className="opacity-60">
                  {value} ·
                </span>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <Reveal className="relative mx-auto max-w-[980px] px-6 py-[84px] text-center md:px-10 md:py-[140px]">
        <div className="mb-8 inline-flex items-center gap-3">
          <span className="h-[1px] w-8 bg-perch/30" aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-[0.22em]">Philosophy</span>
          <span className="h-[1px] w-8 bg-perch/30" aria-hidden="true" />
        </div>
        <blockquote className="font-display text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[56px]">
          “Beauty as a form of care and{' '}
          <em className="font-[400] italic">confidence</em> rather than excess.”
        </blockquote>
        <p className="mt-8 text-[13px] uppercase tracking-[0.12em] text-text-soft">
          — Elara Glow Studio Manifesto
        </p>
      </Reveal>
    </section>
  );
}
