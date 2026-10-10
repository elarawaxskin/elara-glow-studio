import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { Reveal } from '../ui/Reveal';

export function SeoLocalStrip() {
  return (
    <section aria-label="Waxing services in El Paso, TX" className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-6 py-[56px] md:px-10 md:py-[72px]">
        <Reveal className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-end">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em]">
              El Paso, TX — West Side Studio
            </p>
            <h2 className="max-w-[520px] font-display text-[36px] leading-[1.02] md:text-[52px]">
              Full Body Wax, Face Wax &amp; Brazilian Wax in El Paso, TX
            </h2>
          </div>
          <div>
            <p className="max-w-[520px] text-[15px] leading-[1.75] text-text-soft">
              Book a full body wax, face wax, or Brazilian wax in El Paso, TX at
              Elara Glow Studio. Gentle technique for sensitive skin, private
              West Side suite by appointment, and calm aftercare that lasts —
              arms, legs, underarms, brows, lip, chin, bikini and Brazilian.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[48px] items-center rounded-full bg-posy px-8 text-[12px] uppercase tracking-[0.14em] text-white transition hover:bg-[#2b4e46]"
              >
                Book Your Wax in El Paso →
              </a>
              <Link
                to="/treatments"
                className="inline-flex h-[48px] items-center rounded-full border border-text px-8 text-[12px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white"
              >
                View Treatments &amp; Prices
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={100} className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          <Link
            to="/treatments"
            className="group rounded-[20px] border border-line bg-silence p-6 transition hover:shadow-[0_12px_36px_rgba(54,61,50,0.10)]"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">
              Body · Arms, Legs, Underarms
            </p>
            <p className="mt-3 font-display text-[22px] leading-[1.1]">
              Full Body Wax in El Paso, TX
            </p>
            <p className="mt-2 text-[13px] leading-[1.65] text-text-soft">
              Full-body waxing with skin-first care — smooth, long-lasting
              results in a private suite.
            </p>
            <span className="mt-4 inline-block border-b border-text pb-[2px] text-[11px] uppercase tracking-[0.18em] transition group-hover:opacity-60">
              Explore Body Wax →
            </span>
          </Link>
          <Link
            to="/treatments"
            className="group rounded-[20px] border border-line bg-silence p-6 transition hover:shadow-[0_12px_36px_rgba(54,61,50,0.10)]"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">
              Face · Brows, Lip, Chin, Full Face
            </p>
            <p className="mt-3 font-display text-[22px] leading-[1.1]">
              Face Wax in El Paso, TX
            </p>
            <p className="mt-2 text-[13px] leading-[1.65] text-text-soft">
              Precise, gentle face waxing for sensitive skin — brows, lip, chin
              and full face.
            </p>
            <span className="mt-4 inline-block border-b border-text pb-[2px] text-[11px] uppercase tracking-[0.18em] transition group-hover:opacity-60">
              Explore Face Wax →
            </span>
          </Link>
          <Link
            to="/treatments"
            className="group rounded-[20px] border border-line bg-silence p-6 transition hover:shadow-[0_12px_36px_rgba(54,61,50,0.10)]"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">
              Bikini &amp; Brazilian Specialist
            </p>
            <p className="mt-3 font-display text-[22px] leading-[1.1]">
              Brazilian Wax in El Paso, TX
            </p>
            <p className="mt-2 text-[13px] leading-[1.65] text-text-soft">
              Our signature Brazilian — precise, gentle, focused on comfort and
              long-lasting smoothness.
            </p>
            <span className="mt-4 inline-block border-b border-text pb-[2px] text-[11px] uppercase tracking-[0.18em] transition group-hover:opacity-60">
              Explore Brazilian Wax →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}