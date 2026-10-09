import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  className,
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={cn(centered && 'text-center', className)}>
      <p className="text-[11px] tracking-[0.22em] uppercase">{kicker}</p>
      <h2
        className={cn(
          'mt-4 font-display text-[42px] leading-[0.95] md:text-[58px]',
          centered && 'mx-auto max-w-[640px]',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-6 max-w-[460px] text-[14px] leading-[1.7] text-text-soft',
            centered && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
