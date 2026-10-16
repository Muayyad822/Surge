'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { TripForm } from '@/components/operator/TripForm';

export default function NewTripPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col font-sans pb-16">
      {/* Header matching GidiFerry TripFormScreen */}
      <header className="px-6 pt-6 pb-4 max-w-2xl mx-auto w-full flex items-center">
        <button
          onClick={() => router.back()}
          className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl mr-4 text-gray-700 dark:text-slate-300 hover:bg-gray-200 transition-colors cursor-pointer"
          title="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-[#0070C0] dark:text-blue-400">
          New Trip
        </h1>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6">
        <TripForm />
      </main>
    </div>
  );
}
