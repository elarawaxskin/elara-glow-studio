import { PACKAGES, PACKAGES_BOOKING_URL } from '../../data/packages';
import { Reveal } from '../ui/Reveal';
import { PackageCard } from './PackageCard';

export function PackagesSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="packages" aria-label="Waxing packages" className={compact ? 'bg-silence' : 'grain relative bg-silence'}>
      <div className="mx-auto max-w-[1280px] px-6 py-[64px] md:px-10 md:py-[88px]">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em]">Packages — Save on your routine</p>
            <h2 className="max-w-[560px] font-display text-[42px] leading-[0.95] md:text-[60px]">
              Bundle &amp; glow for less.
            </h2>
          </div>
          <div className="max-w-[340px]">
            <p className="text-[14px] leading-[1.7] text-text-soft">
              Two GlossGenius bundles for regulars — Brazilian maintenance and the full 3-month smooth
              routine. Buy once, book as usual.
            </p>
            <a
              href={PACKAGES_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block border-b border-text pb-[3px] text-[11px] uppercase tracking-[0.18em] hover:opacity-60"
            >
              Shop all packages →
            </a>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.slug} pkg={pkg} index={i} />
          ))}
        </div>

        <Reveal className="mt-8 rounded-[20px] border border-line bg-icicle/60 p-6 text-center md:p-8">
          <p className="text-[13px] leading-[1.7] text-text-soft">
            Already have a package? Book as usual on our{' '}
            <a href="https://elaraglowstudio.glossgenius.com/services" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-70">
              Services page
            </a>{' '}
            — your credits apply automatically at checkout. Buy Now, Pay Later available in person on $50–$4,000 bookings.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
