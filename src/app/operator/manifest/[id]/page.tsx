'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, User, CheckCircle2, Circle } from 'lucide-react';
import { useManifest } from '@/hooks/useData';

export default function ManifestViewerPage() {
  const router = useRouter();
  const params = useParams();
  const tripId = (params?.id as string) || 'trip_001';
  
  const { passengers, loading, checkIn } = useManifest(tripId);

  const totalPassengers = passengers.length;
  const boardedCount = passengers.filter(p => p.checkInTime).length;

  const handleToggleCheckIn = async (manifestId: string, isChecked: boolean) => {
    if (!isChecked) {
      await checkIn(manifestId);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col font-sans pb-16">
      {/* Header matching GidiFerry */}
      <header className="px-6 pt-6 pb-4 max-w-2xl mx-auto w-full flex items-center">
        <button
          onClick={() => router.back()}
          className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl mr-4 text-gray-700 dark:text-slate-300 hover:bg-gray-200 transition-colors cursor-pointer"
          title="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#0070C0] dark:text-blue-400">
            Manifest
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            Trip #{tripId.slice(-4).toUpperCase()}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 space-y-6">
        {/* Metric Card matching GidiFerry */}
        <div className="bg-[#0BD6FF]/10 dark:bg-blue-900/30 p-6 rounded-[32px] border border-[#0BD6FF]/20 flex justify-between items-center">
          <div>
            <p className="text-[#0070C0] dark:text-blue-300 font-bold text-3xl">
              {totalPassengers}
            </p>
            <p className="text-[#0070C0]/70 dark:text-blue-300/70 text-xs font-bold uppercase tracking-wider mt-1">
              Total Passengers
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#0070C0] dark:text-blue-300 font-bold text-3xl">
              {boardedCount}
            </p>
            <p className="text-[#0070C0]/70 dark:text-blue-300/70 text-xs font-bold uppercase tracking-wider mt-1">
              Boarded
            </p>
          </div>
        </div>

        {/* Passenger Rows List */}
        <div>
          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading manifest...</p>
          ) : passengers.length === 0 ? (
            <div className="bg-gray-50 dark:bg-slate-800 p-10 rounded-[40px] flex flex-col items-center justify-center border border-dashed border-gray-200 dark:border-slate-700">
              <p className="text-gray-400 text-center font-medium">
                No passengers have booked this trip yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {passengers.map((passenger) => {
                const isBoarded = !!passenger.checkInTime;
                const name = passenger.user?.fullName || passenger.commuter?.fullName || 'Adebayo Ogunlesi';
                const phone = passenger.user?.phone || passenger.commuter?.phone || '08012345678';

                return (
                  <div
                    key={passenger.id}
                    onClick={() => handleToggleCheckIn(passenger.id, isBoarded)}
                    className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 px-2 rounded-2xl transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl mr-4 text-gray-500">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-gray-800 dark:text-slate-100 font-bold text-base">
                          {name}
                        </p>
                        <p className="text-gray-400 text-xs font-mono">
                          ID: {passenger.id.slice(-6)} • {phone}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isBoarded ? (
                        <CheckCircle2 size={24} className="text-[#10B981]" />
                      ) : (
                        <Circle size={24} className="text-gray-300 dark:text-slate-600 hover:text-gray-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}