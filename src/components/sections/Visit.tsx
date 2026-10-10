import { siteConfig } from '../../config/site';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function Visit() {
  return (
    <section id="contact" className="relative max-w-[100vw] overflow-hidden bg-icicle" aria-label="Book your visit">
      <div className="mx-auto max-w-[1280px] px-6 py-[72px] md:px-10 md:py-[96px]">
        <Reveal className="grid items-end gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="arch-full relative flex min-h-[460px] w-full max-w-full flex-col justify-between overflow-hidden bg-silence p-8 shadow-[0_20px_80px_rgba(54,61,50,0.08)] md:p-14 lg:p-16">
            <div>
              <p className="mb-6 text-[11px] uppercase tracking-[0.22em]">Book Your Visit</p>
              <h2 className="font-display text-[44px] leading-[0.9] md:text-[64px]">
                Ready for your
                <br />
                glow treatment?
              </h2>
              <p className="mt-6 max-w-[360px] text-[14px] leading-[1.7] text-text-soft">
                Book a full body wax, face wax, or Brazilian wax in El Paso, TX.
                One private West Side suite, slow mornings, soft wax and
                aftercare that lasts.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book on GlossGenius →
              </Button>
              <p className="inline-flex h-[48px] items-center gap-2 rounded-full border border-line px-6 text-[11px] uppercase tracking-[0.14em]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#7ab07a]" aria-hidden="true" />
                El Paso West Open
              </p>
            </div>
            <div className="absolute inset-x-[18%] top-0 h-[1px] bg-gradient-to-r from-transparent via-frosty/50 to-transparent" aria-hidden="true" />
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-line bg-white p-7">
              <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Location</p>
              <a
                href={siteConfig.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block font-display text-[22px] leading-[1.2] transition hover:opacity-70"
              >
                600 Sunland Park Dr
                <br />
                Ste 1-600, El Paso, TX 79912
              </a>
              <p className="mt-2 text-[13px] leading-[1.6] text-text-soft">
                Sunland Park area — easy parking, private entrance, calm
                interior. By appointment only.
              </p>
              <div className="mt-6 overflow-hidden rounded-[16px] border border-line">
                <iframe
                  title="Elara Glow Studio map — 600 Sunland Park Dr Ste 1-600, El Paso, TX 79912"
                  src={siteConfig.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-[220px] w-full border-0"
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>By Appointment Only</Badge>
                <Badge tone="outline">LGBTQ+ Friendly</Badge>
              </div>
            </div>
            <div className="rounded-[24px] bg-perch p-7 text-silence">
              <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Follow</p>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex font-display text-[22px] transition hover:opacity-80"
              >
                {siteConfig.instagram} ↗
              </a>
              <p className="mt-6 text-[13px] leading-[1.6] opacity-70">
                Tips, skin notes and quiet studio moments. No filters, just real skin.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
