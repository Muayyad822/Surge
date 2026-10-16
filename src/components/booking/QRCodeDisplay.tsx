// QRCodeDisplay component
'use client';

import QRCode from 'qrcode.react';
import { clsx } from 'clsx';

interface QRCodeDisplayProps {
  value: string;
  label?: string;
  size?: number;
}

export function QRCodeDisplay({ value, label, size = 200 }: QRCodeDisplayProps) {
  return (
    <div className={clsx('flex flex-col items-center', 'bg-white p-6 rounded-2xl border border-gray-100 dark:border-slate-700')}>
      {label && (
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-4 text-center">
          {label}
        </p>
      )}
      <div className="p-4 bg-white rounded-xl border-4 border-waterway-blue/10">
        <QRCode
          value={value}
          size={size}
          level="M"
          includeMargin={true}
          color="#005A9C"
          bgColor="#ffffff"
        />
      </div>
      <p className="mt-4 text-xs font-bold text-gray-400 dark:text-slate-500 tracking-widest uppercase">
        {value.substring(0, 16)}
      </p>
    </div>
  );
}