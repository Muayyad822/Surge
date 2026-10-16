'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, MapPin, Clock, Users } from 'lucide-react';
import { useTrips } from '@/hooks/useData';

export default function OperatorTripsPage() {
  const router = useRouter();
  const { trips, loading } = useTrips();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col font-sans pb-16">
      {/* Header matching GidiFerry TripManagementScreen */}
      <header className="px-6 pt-6 pb-4 max-w-2xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-[#0070C0] dark:text-blue-400">
            Trips
          </h1>
        </div>

        <button
          onClick={() => router.push('/operator/trips/new')}
          className="bg-[#0070C0] hover:bg-[#005A9C] text-white p-3 rounded-2xl transition-colors shadow-md cursor-pointer"
          title="New Trip"
        >
          <Plus size={24} />
        </button>
      </header>

      {/* Trips List matching GidiFerry */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 space-y-4">
        {loading ? (
          <p className="text-gray-400 text-center py-8">Loading trips...</p>
        ) : trips.length === 0 ? (
          <div className="bg-gray-50 dark:bg-slate-800 p-10 rounded-[40px] flex flex-col items-center justify-center border border-dashed border-gray-200 dark:border-slate-700">
            <p className="text-gray-400 text-center font-medium">
              No trips scheduled. Click + to add your first trip.
            </p>
          </div>
        ) : (
          trips.map((trip) => {
            const departureTime = new Date(trip.departureTime);
            return (
              <div
                key={trip.id}
                onClick={() => router.push(`/operator/manifest/${trip.id}`)}
                className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:border-gray-200 cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#0BD6FF]/10 dark:bg-blue-900/40 px-3 py-1 rounded-full">
                    <span className="text-[#0070C0] dark:text-blue-300 font-bold text-[10px] uppercase tracking-wider">
                      {trip.status}
                    </span>
                  </div>
                  <span className="text-gray-400 font-mono text-xs">
                    #{trip.id.slice(-4).toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <MapPin size={18} className="text-[#0070C0] dark:text-blue-400 mr-2 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-slate-100 font-bold text-lg">
                    {trip.origin} ↔ {trip.destination}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-slate-700 text-sm">
                  <div className="flex items-center text-gray-500 dark:text-slate-400">
                    <Clock size={16} className="mr-1.5" />
                    <span>
                      {departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center text-[#0070C0] dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                    <Users size={16} className="mr-1.5" />
                    <span>View Manifest</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
