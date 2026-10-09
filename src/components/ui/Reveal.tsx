import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

export function Reveal({ children, className, delayMs = 0, as = 'div' }: RevealProps) {
  const Tag = as;
  const style: CSSProperties | undefined =
    delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  return (
    <Tag className={cn('reveal', className)} style={style}>
      {children}
    </Tag>
  );
}
