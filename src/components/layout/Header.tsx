import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, siteConfig, type NavId } from '../../config/site';
import { cn } from '../../lib/cn';
import { BookNowButton } from '../ui/Button';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const activeNav: NavId = pathname === '/treatments' ? 'treatments' : 'home';

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/80 backdrop-blur-[12px] [padding-top:var(--safe-area-inset-top)]">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-3"
            aria-label="Elara Glow Studio — back to top"
          >
            <img
              src="/logo.png"
              alt="Elara Glow Studio logo"
              width={120}
              height={120}
              fetchPriority="high"
              decoding="async"
              className="h-[40px] w-auto object-contain"
            />
            <span className="hidden text-[11px] font-[400] tracking-[0.22em] sm:inline">
              {siteConfig.brand}
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] tracking-[0.06em] md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={activeNav === link.id ? 'true' : undefined}
                className={cn(
                  'transition hover:opacity-60',
                  activeNav === link.id && 'underline underline-offset-[6px]',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <BookNowButton className="hidden md:inline-flex" size="sm" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line md:hidden"
          >
            <span className="flex h-[10px] w-[14px] flex-col justify-between" aria-hidden="true">
              <span
                className={cn(
                  'block h-[1px] bg-text transition',
                  menuOpen && 'translate-y-[4.5px] rotate-45',
                )}
              />
              <span className={cn('block h-[1px] bg-text transition', menuOpen && 'opacity-0')} />
              <span
                className={cn(
                  'block h-[1px] bg-text transition',
                  menuOpen && '-translate-y-[4.5px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="flex flex-col gap-4 border-t border-line px-6 py-6 text-[14px] md:hidden"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-left"
            >
              {link.label}
            </Link>
          ))}
          <BookNowButton
            size="lg"
            className="mt-2 w-full"
          />
        </nav>
      )}
    </header>
  );
}
