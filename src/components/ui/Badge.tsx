import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface BadgeProps {
  children: ReactNode;
  tone?: 'icicle' | 'outline';
  className?: string;
}

export function Badge({ children, tone = 'icicle', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[11px]',
        tone === 'icicle' && 'bg-icicle',
        tone === 'outline' && 'border border-line bg-silence',
        className,
      )}
    >
      {children}
    </span>
  );
}
