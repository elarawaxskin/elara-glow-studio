import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';

const PURCHASE_URL = 'https://elaraglowstudio.com';

const TILES = [
  'BLACK FRIDAY DEAL · WAXING',
  'BOGO 50% off · Brazilian · Eyebrows · Underarms',
  'Brazilian $97.50 · Eyebrows $30 · Underarms $37.50',
  'Available · November 27, 2026',
  'Purchase at · elaraglowstudio.com',
];

function useReduceMotion() {
  const [reduce, setReduce] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setReduce(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduce;
}

export function BlackFridayBanner() {
  const reduceMotion = useReduceMotion();

  return (
    <section
      aria-label="Black Friday promo — waxing BOGO deal"
      className="bg-perch border-t border-line border-b border-line"
    >
      <div className="overflow-x-hidden">
        <div
          className={`flex items-center gap-16 animate-marquee ${
            reduceMotion ? 'animate-none' : ''
          }`}
        >
          {TILES.map((tile, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-[15px] font-semibold uppercase tracking-[0.16em] text-silence md:text-[18px]"
            >
              {tile}
            </span>
          ))}
          {TILES.map((tile, i) => (
            <span
              key={`dup-${i}`}
              className="whitespace-nowrap text-[15px] font-semibold uppercase tracking-[0.16em] text-silence md:text-[18px]"
            >
              {tile}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
