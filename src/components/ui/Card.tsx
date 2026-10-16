// Card component - GidiFerry Design System
'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'sky' | 'waterway';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm',
      elevated: 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-md',
      outlined: 'bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600',
      sky: 'bg-[#0BD6FF]/10 dark:bg-blue-900/30 border border-[#0BD6FF]/20 dark:border-blue-700',
      waterway: 'bg-[#0070C0] dark:bg-blue-800 text-white shadow-xl',
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-5 sm:p-6',
      lg: 'p-6 sm:p-8',
    };

    return (
      <div
        ref={ref}
        className={clsx('rounded-3xl transition-all duration-150', variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';