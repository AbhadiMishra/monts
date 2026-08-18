import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'sale' | 'new' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  className,
}) => {
  const base = 'inline-flex items-center font-medium uppercase tracking-widest rounded-full';
  
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-earth-100 text-earth-900',
    accent: 'bg-accent text-white',
    sale: 'bg-rose-600 text-white font-semibold',
    new: 'bg-emerald-700 text-white font-semibold',
    outline: 'border border-slate-300 text-slate-700',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  return <span className={clsx(base, variants[variant], sizes[size], className)}>{children}</span>;
};
