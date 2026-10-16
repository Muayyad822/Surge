// Modal component - GidiFerry Design System
'use client';

import { Fragment, ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, size = 'md', className }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  const modalContent = (
    <Fragment>
      <div
        className="fixed inset-0 bg-black/40 z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={clsx(
          'fixed inset-0 z-50 flex items-center justify-center p-4',
          'animate-slide-up'
        )}
      >
        <div
          className={clsx(
            'w-full bg-white dark:bg-slate-800 rounded-[32px] border border-gray-100 dark:border-slate-700 shadow-2xl',
            'max-h-[90vh] overflow-hidden flex flex-col',
            sizes[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {title && (
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-slate-700">
              <h2 id="modal-title" className="text-xl font-bold text-[#0070C0] dark:text-blue-400">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-2xl bg-gray-100 dark:bg-slate-700 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modalContent, document.body);
}