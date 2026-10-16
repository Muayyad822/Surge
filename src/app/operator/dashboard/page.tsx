'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Scan, Users, Ship, ClipboardList, Settings, Plus } from 'lucide-react';
import { useTrips } from '@/hooks/useData';

export default function OperatorDashboardPage() {
  const router = useRouter();
  const { trips } = useTrips();

  // Active trip
  const currentTrip = trips.find(t => t.status === 'boarding' || t.status === 'enroute') || trips[0];
  const boatName = currentTrip?.vessel?.name || currentTrip?.boatName || 'MFV Omoluabi';
  const tripIdStr = currentTrip?.id ? currentTrip.id.slice(-4).toUpperCase() : '1284';
  const origin = currentTrip?.origin || 'CMS';
  const destination = currentTrip?.destination || 'Ikorodu';
  const occupancy = currentTrip?.occupancy || 15;
  const capacity = currentTrip?.vessel?.capacity || currentTrip?.capacity || 20;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col font-sans pb-16">
      {/* Header matching GidiFerry */}
      <header className="px-6 pt-6 pb-2 max-w-2xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 relative mr-3">
            <Image
              src="/assets/GidiFerry-icon.png"
              alt="Surge"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-gray-500 dark:text-slate-400 text-sm">Station Master,</p>
            <h1 className="text-3xl font-bold text-[#0070C0] dark:text-blue-400">
              Operator
            </h1>
          </div>
        </div>

        <button
          onClick={() => router.push('/operator/settings')}
          className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl text-gray-700 dark:text-slate-300 hover:bg-gray-200 transition-colors cursor-pointer"
          title="Settings"
        >
          <Settings size={22} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-4 space-y-6">
        {/* Current Trip Card matching GidiFerry */}
        <div className="bg-[#0BD6FF]/10 dark:bg-blue-900/30 p-6 sm:p-8 rounded-[32px] border-2 border-[#0BD6FF]/30 dark:border-blue-700 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-[#0070C0]/10 dark:bg-blue-800/40 px-4 py-2 rounded-full">
              <span className="text-[#0070C0] dark:text-blue-300 font-bold text-xs uppercase tracking-widest">
                En Route
              </span>
            </div>
            <span className="text-gray-500 dark:text-slate-400 font-mono font-medium text-sm">
              TRIP #{tripIdStr}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-gray-500 dark:text-slate-400 text-xs uppercase font-semibold mb-1">
              Vessel
            </p>
            <h2 className="text-[#0070C0] dark:text-blue-300 text-2xl sm:text-3xl font-bold">
              {boatName}
            </h2>
          </div>

          <div className="flex justify-between mb-8">
            <div>
              <p className="text-gray-500 dark:text-slate-400 text-xs uppercase font-semibold mb-1">
                Passengers
              </p>
              <div className="flex items-center">
                <Users size={18} className="text-[#0070C0] dark:text-blue-300 mr-2" />
                <span className="text-[#0070C0] dark:text-blue-300 font-bold text-xl font-mono">
                  {occupancy} / {capacity}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-500 dark:text-slate-400 text-xs uppercase font-semibold mb-1">
                Route
              </p>
              <span className="text-[#0070C0] dark:text-blue-300 font-bold text-xl">
                {origin} ↔ {destination}
              </span>
            </div>
          </div>

          <button
            onClick={() => router.push(`/operator/scanner?tripId=${currentTrip?.id || 'TRIP_1284'}`)}
            className="w-full bg-[#0070C0] hover:bg-[#005A9C] text-white p-5 rounded-2xl flex justify-center items-center shadow-lg active:opacity-90 font-bold text-lg transition-all cursor-pointer"
          >
            <Scan size={22} className="mr-2" />
            <span>Scan Boarding Pass</span>
          </button>
        </div>

        {/* Quick Actions Grid matching GidiFerry */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <button
            onClick={() => router.push(currentTrip?.id ? `/operator/manifest/${currentTrip.id}` : '/operator/trips')}
            className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center hover:border-gray-300 transition-all cursor-pointer"
          >
            <div className="bg-[#0BD6FF]/10 dark:bg-blue-900/30 p-3.5 rounded-2xl mb-3 text-[#0070C0] dark:text-blue-300">
              <ClipboardList size={24} />
            </div>
            <span className="text-gray-800 dark:text-slate-100 font-bold text-center">
              View Manifest
            </span>
          </button>

          <button
            onClick={() => router.push('/operator/trips/new')}
            className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center hover:border-gray-300 transition-all cursor-pointer"
          >
            <div className="bg-[#0BD6FF]/10 dark:bg-blue-900/30 p-3.5 rounded-2xl mb-3 text-[#0070C0] dark:text-blue-300">
              <Plus size={24} />
            </div>
            <span className="text-gray-800 dark:text-slate-100 font-bold text-center">
              Schedule Trip
            </span>
          </button>

          <button
            onClick={() => router.push('/operator/settings')}
            className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center hover:border-gray-300 transition-all cursor-pointer col-span-2 sm:col-span-1"
          >
            <div className="bg-[#0BD6FF]/10 dark:bg-blue-900/30 p-3.5 rounded-2xl mb-3 text-[#0070C0] dark:text-blue-300">
              <Ship size={24} />
            </div>
            <span className="text-gray-800 dark:text-slate-100 font-bold text-center">
              App Settings
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}