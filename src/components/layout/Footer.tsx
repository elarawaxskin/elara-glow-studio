import { siteConfig } from '../../config/site';

function scrollToTop(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="max-w-[100vw] overflow-hidden bg-perch text-silence">
      <div className="mx-auto max-w-[1280px] px-6 py-[56px] md:px-10 md:py-[72px]">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-silence/30 font-display text-[18px]">
                E
              </span>
              <span className="text-[11px] tracking-[0.22em]">{siteConfig.brand}</span>
            </div>
            <p className="mt-6 max-w-[320px] text-[13px] leading-[1.7] opacity-70">
              Refined body care & waxing treatments. Softness, fluidity, self-care,
              harmony — El Paso, TX.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-[13px]">
            <nav className="space-y-3 opacity-80" aria-label="Footer">
              <p className="mb-4 text-[11px] uppercase tracking-[0.18em] opacity-50">
                Navigate
              </p>
              <a href="#top" onClick={scrollToTop} className="block text-left opacity-80 hover:opacity-100">
                Home
              </a>
              <a href="#services" className="block opacity-80 hover:opacity-100">
                Services
              </a>
              <a href="#about" className="block opacity-80 hover:opacity-100">
                About
              </a>
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block opacity-80 hover:opacity-100"
              >
                Book Now
              </a>
            </nav>
            <div className="space-y-3 opacity-80">
              <p className="mb-4 text-[11px] uppercase tracking-[0.18em] opacity-50">
                Connect
              </p>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                Instagram {siteConfig.instagram}
              </a>
              <p className="opacity-60">{siteConfig.location}</p>
              <p className="opacity-60">{siteConfig.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.12em] opacity-50 md:flex-row">
          <span>© {year} Elara Glow Studio — All rights reserved</span>
          <span className="flex gap-6">
            <span>Privacy — Calm</span>
            <span>Terms — Soft</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
