import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

export function Reveal({ children, className, delayMs = 0, as = 'div' }: RevealProps) {
  const Tag = as as 'div';
  const ref = useRef<HTMLDivElement>(null);
  const style: CSSProperties | undefined =
    delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' },
    );
    observer.observe(el);
    // Fallback: never leave content stuck invisible.
    const fallback = window.setTimeout(() => el.classList.add('is-visible'), 1200);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag ref={ref} className={cn('reveal', className)} style={style}>
      {children}
    </Tag>
  );
}
