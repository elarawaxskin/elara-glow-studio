import { useCallback, useEffect, useRef, useState } from 'react';
import type { ImgHTMLAttributes, KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import type { HeroImage } from '../../config/site';

interface HeroCarouselProps {
  images: HeroImage[];
  intervalMs?: number;
  className?: string;
}

const AUTOPLAY_MS = 5000;

export function HeroCarousel({ images, intervalMs = AUTOPLAY_MS, className }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<number | null>(null);
  const count = images.length;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    const onChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay with pause on hover/focus and full respect for reduced motion.
  useEffect(() => {
    if (reduceMotion || isPaused || count <= 1) return;
    timerRef.current = window.setTimeout(goNext, intervalMs);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [goNext, index, intervalMs, isPaused, reduceMotion, count]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  if (count === 0) return null;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Elara Glow Studio gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={cn('group/carousel relative h-full w-full overflow-hidden bg-icicle', className)}
    >
      {images.map((image, i) => {
        const isActive = reduceMotion ? i === 0 : i === index;
        return (
          <div
            key={image.src}
            aria-hidden={!isActive}
            className={cn(
              'hero-slide absolute inset-0',
              isActive ? 'hero-slide-active z-[1]' : 'hero-slide-hidden z-0',
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              {...(i === 0 ? ({ fetchpriority: 'high' } as ImgHTMLAttributes<HTMLImageElement>) : {})}
              draggable={false}
              className="h-full w-full object-cover object-center brightness-[0.92] max-md:object-[center_25%] max-md:brightness-[0.78]"
            />
          </div>
        );
      })}

      {/* Soft legibility gradient so carousel dots always read well */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#1C211A]/50 via-transparent to-transparent"
      />

      {/* Arrows */}
      {!reduceMotion && count > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 z-[3] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#1C211A]/60 text-[18px] text-silence opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur transition hover:bg-[#1C211A]/85 focus-visible:opacity-100 group-hover/carousel:opacity-100 max-md:hidden"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 z-[3] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#1C211A]/60 text-[18px] text-silence opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur transition hover:bg-[#1C211A]/85 focus-visible:opacity-100 group-hover/carousel:opacity-100 max-md:hidden"
          >
            →
          </button>
        </>
      )}

      {/* Dots + counter */}
      {!reduceMotion && count > 1 && (
        <div className="absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 items-center gap-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1} of ${count}`}
              aria-current={i === index ? 'true' : undefined}
              className={cn(
                'h-[6px] rounded-full transition-all duration-500 backdrop-blur',
                i === index ? 'w-[26px] bg-silence shadow' : 'bg-silence/40 hover:bg-silence/70 w-[6px]',
              )}
            />
          ))}
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        Photo {index + 1} of {count}
      </p>
    </div>
  );
}
