// Badge component - GidiFerry Design System
'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'sky';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300',
      primary: 'bg-[#0070C0]/10 text-[#0070C0] dark:bg-blue-900/40 dark:text-blue-300',
      sky: 'bg-[#0BD6FF]/10 text-[#0070C0] dark:bg-blue-900/30 dark:text-sky-300 border border-[#0BD6FF]/30',
      success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      danger: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      info: 'bg-blue-100 text-[#0070C0] dark:bg-blue-900/40 dark:text-blue-300',
      outline: 'bg-transparent border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300',
    };

    const sizes = {
      sm: 'px-2.5 py-0.5 text-[10px] tracking-wider uppercase font-bold',
      md: 'px-3 py-1 text-xs tracking-wider uppercase font-bold',
      lg: 'px-4 py-1.5 text-sm font-bold',
    };

    return (
      <span
        ref={ref}
        className={clsx('inline-flex items-center rounded-full font-sans', variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';