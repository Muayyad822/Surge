'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/role-selection');
    }, 400);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-6 select-none font-sans">
      <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
        <div className="w-24 h-24 relative mb-2">
          <Image 
            src="/assets/GidiFerry-icon.png" 
            alt="Surge Waterways" 
            width={96} 
            height={96} 
            className="object-contain"
            priority
          />
        </div>

        <div>
          <h1 className="text-4xl font-black text-[#0070C0] tracking-tight">
            Surge
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-base mt-1 font-medium">
            The fastest way across Lagos.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-slate-800 rounded-full text-xs font-semibold text-[#0070C0]">
          <span className="w-2 h-2 rounded-full bg-[#0070C0] animate-ping" />
          <span>Connecting to Lagos Waterways...</span>
        </div>
      </div>
    </div>
  );
}