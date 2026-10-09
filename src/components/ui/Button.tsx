import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { siteConfig } from '../../config/site';

type Variant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-posy text-white hover:bg-[#2b4e46]',
  outline:
    'border border-text text-text hover:bg-text hover:text-white',
  ghost: 'underline underline-offset-[8px] decoration-line hover:decoration-text',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-[38px] px-[22px] text-[12px] tracking-[0.12em] uppercase',
  md: 'h-[44px] px-7 text-[11px] tracking-[0.18em] uppercase',
  lg: 'h-[48px] px-8 text-[12px] tracking-[0.14em] uppercase',
};

export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  className,
  ...rest
}: ButtonProps) {
  const isGhost = variant === 'ghost';
  return (
    <a
      {...rest}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-posy',
        !isGhost && variantStyles[variant],
        isGhost && variantStyles.ghost,
        !isGhost && sizeStyles[size],
        className,
      )}
    >
      {children}
    </a>
  );
}

export function BookNowButton({
  className,
  size = 'sm',
  children = 'Book Now',
}: {
  className?: string;
  size?: ButtonProps['size'];
  children?: ReactNode;
}) {
  return (
    <Button
      href={siteConfig.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}
