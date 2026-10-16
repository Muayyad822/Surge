// Button component - GidiFerry Design System
'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger' | 'success' | 'nautical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold tracking-normal rounded-2xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:opacity-90';
    
    const variants = {
      primary: 'bg-[#0070C0] hover:bg-[#005A9C] text-white focus:ring-[#0070C0] shadow-md shadow-waterway-blue/20',
      secondary: 'bg-[#0BD6FF]/10 hover:bg-[#0BD6FF]/20 text-[#0070C0] border-2 border-[#0BD6FF]/30 focus:ring-[#0070C0]',
      accent: 'bg-[#0BD6FF] hover:bg-[#00B4D8] text-[#0070C0] focus:ring-[#0BD6FF] shadow-sm',
      outline: 'bg-transparent border-2 border-[#0070C0] text-[#0070C0] hover:bg-[#0070C0]/5 focus:ring-[#0070C0]',
      ghost: 'bg-transparent text-[#0070C0] dark:text-[#38BDF8] hover:bg-[#0BD6FF]/10 focus:ring-[#0070C0]',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md',
      success: 'bg-[#10B981] hover:bg-[#059669] text-white focus:ring-[#10B981]',
      nautical: 'bg-[#0070C0] hover:bg-[#005A9C] text-white focus:ring-[#0070C0] shadow-md shadow-waterway-blue/20',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs font-semibold rounded-xl',
      md: 'px-5 py-3 text-sm font-bold rounded-2xl',
      lg: 'px-6 py-4 text-base font-bold rounded-2xl',
      xl: 'px-8 py-5 text-lg font-bold rounded-3xl',
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';