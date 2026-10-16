// Input component - GidiFerry Design System
'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2 ml-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full rounded-2xl border transition-colors duration-150',
              'bg-gray-100 dark:bg-slate-800',
              'text-gray-900 dark:text-slate-100 text-base',
              'placeholder:text-gray-400 dark:placeholder:text-slate-500',
              'focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:border-[#0070C0]',
              'disabled:bg-gray-200 dark:disabled:bg-slate-900 disabled:cursor-not-allowed',
              leftIcon ? 'pl-11' : 'pl-4',
              rightIcon ? 'pr-11' : 'pr-4',
              'py-4',
              error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-slate-700',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs font-medium text-red-600 ml-1">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-gray-500 ml-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';