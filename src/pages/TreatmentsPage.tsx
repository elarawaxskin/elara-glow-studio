import { Link } from 'react-router-dom';
import { SeoLocalStrip } from '../components/sections/SeoLocalStrip';
import { PackagesSection } from '../components/packages/PackagesSection';
import { siteConfig } from '../config/site';
import { TREATMENTS } from '../data/treatments';
import { Reveal } from '../components/ui/Reveal';
import { TreatmentCatalogue } from '../components/treatments/TreatmentCatalogue';

export function TreatmentsPage() {
  return (
    <div className="bg-icicle">
      <section className="grain relative overflow-hidden bg-silence" aria-label="Treatments intro">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 pb-12 pt-[64px] md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-10 md:pt-[88px]">
          <Reveal>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em]">
              <Link to="/" className="opacity-60 hover:opacity-100">Home</Link>
              <span className="mx-2 opacity-40">/</span>Treatments
            </p>
            <h1 className="font-display text-[46px] leading-[0.95] md:text-[72px]">
              Every treatment,<br />one calm menu.
            </h1>
            <p className="mt-6 max-w-[440px] text-[15px] leading-[1.7] text-text-soft">
              {TREATMENTS.length} treatments · live prices from GlossGenius. Book
              a full body wax, face wax, or Brazilian wax in our private suite
              in West El Paso, TX.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-[48px] items-center rounded-full bg-posy px-8 text-[12px] uppercase tracking-[0.14em] text-white transition hover:bg-[#2b4e46]">
                Book Now
              </a>
              <Link to="/#services" className="inline-flex h-[48px] items-center rounded-full border border-text px-8 text-[12px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white">
                Back to Services
              </Link>
            </div>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="grid grid-cols-2 gap-[10px] rounded-[24px] bg-white/40 p-[10px]">
              <div className="arch-top overflow-hidden rounded-b-[16px]">
                <img src="/treatments/face.jpg" alt="Face wax in El Paso, TX — treatment preview" loading="eager" decoding="async" className="h-[180px] w-full object-cover md:h-[220px]" />
              </div>
              <div className="overflow-hidden rounded-[16px]">
                <img src="/treatments/front_bikini.jpg" alt="Brazilian and bikini wax in El Paso, TX — treatment preview" loading="eager" decoding="async" className="h-[180px] w-full object-cover md:h-[220px]" />
              </div>
              <div className="overflow-hidden rounded-[16px]">
                <img src="/treatments/half_legs.jpg" alt="Full body leg wax in El Paso, TX — treatment preview" loading="lazy" decoding="async" className="h-[180px] w-full object-cover md:h-[220px]" />
              </div>
              <div className="overflow-hidden rounded-[16px]">
                <img src="/treatments/hydro_jelly_mask.jpg" alt="Hydro jelly mask preview" loading="lazy" decoding="async" className="h-[180px] w-full object-cover md:h-[220px]" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <TreatmentCatalogue />
      <PackagesSection compact />
      <SeoLocalStrip />
    </div>
  );
}
