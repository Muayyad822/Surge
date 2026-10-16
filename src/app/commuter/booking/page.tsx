'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Wallet, AlertCircle } from 'lucide-react';
import { SearchComponent } from '@/components/booking/SearchComponent';
import { TripCard } from '@/components/booking/TripCard';
import { useTrips, useBookTicket } from '@/hooks/useData';
import { useAuthStore } from '@/context/AuthContext';
import { Trip } from '@/types';
import { isNightBanActive } from '@/lib/safetyLogic';

export default function BookingPage() {
  const router = useRouter();
  const { userId, walletBalance, deductBalance } = useAuthStore();
  const { bookTicket, loading: bookingLoading } = useBookTicket();

  const [origin, setOrigin] = useState('CMS');
  const [destination, setDestination] = useState('Ikorodu');
  const [passengerCount, setPassengerCount] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { trips, loading: tripsLoading } = useTrips({
    origin,
    destination,
  });

  const handleSearch = () => {
    if (origin === destination) {
      setErrorMessage('Origin and destination cannot be the same jetty.');
      return;
    }
    setErrorMessage(null);
    setHasSearched(true);
  };

  const handleBook = async (trip: Trip) => {
    if (isNightBanActive(trip.departureTime)) {
      setErrorMessage('Cannot book trips after 18:30 due to Lagos maritime night ban.');
      return;
    }

    const ticketFare = 1500;
    const totalFare = passengerCount * ticketFare;

    if (walletBalance < totalFare) {
      setErrorMessage(
        `Insufficient wallet balance. Total fare is ₦${totalFare.toLocaleString()}. Current balance: ₦${walletBalance.toLocaleString()}. Please top up your wallet.`
      );
      return;
    }

    try {
      setErrorMessage(null);
      const result = await bookTicket(userId || 'ANON_USER', trip.id, passengerCount);
      await deductBalance(totalFare);
      const boatName = trip.vessel?.name || trip.boatName || 'MFV Omoluabi';
      router.push(
        `/commuter/booking/confirmation?manifestId=${result.manifest.id}&tripName=${encodeURIComponent(boatName)}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&departureTime=${encodeURIComponent(new Date(trip.departureTime).toISOString())}&passengerCount=${passengerCount}`
      );
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to book ticket');
    }
  };

  const filteredTrips = hasSearched
    ? trips.filter(
        (t) =>
          (t.origin === origin && t.destination === destination) ||
          (!t.origin && !t.destination)
      )
    : [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col font-sans">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 max-w-4xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#0070C0] dark:text-blue-400">
              Book a Trip
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Find your next ferry ride in Lagos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#0BD6FF]/10 dark:bg-blue-900/30 px-4 py-2.5 rounded-2xl border border-[#0BD6FF]/20">
          <Wallet className="text-[#0070C0]" size={18} />
          <span className="font-bold text-sm text-[#0070C0] dark:text-blue-300">
            ₦{walletBalance.toLocaleString()}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-6">
        <SearchComponent
          origin={origin}
          destination={destination}
          passengerCount={passengerCount}
          onSelectOrigin={(val) => { setOrigin(val); setHasSearched(false); }}
          onSelectDestination={(val) => { setDestination(val); setHasSearched(false); }}
          onPassengerCountChange={setPassengerCount}
          onSearch={handleSearch}
          loading={tripsLoading}
        />

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 flex items-start justify-between text-sm">
            <div className="flex items-center gap-2 font-medium">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-500 hover:text-red-700 font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Available Trips Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
            Available Trips
          </h2>

          {!hasSearched ? (
            <div className="bg-gray-50 dark:bg-slate-800 p-8 rounded-3xl flex flex-col items-center justify-center border border-dashed border-gray-300 dark:border-slate-700">
              <span className="text-3xl mb-2">🛥️</span>
              <p className="text-gray-400 dark:text-slate-400 text-center font-medium">
                Select a route above and tap Search Trips
              </p>
            </div>
          ) : tripsLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-base">Finding ferries...</p>
            </div>
          ) : filteredTrips.length === 0 ? (
            <div className="bg-gray-50 dark:bg-slate-800 p-8 rounded-3xl flex flex-col items-center justify-center border border-dashed border-gray-300 dark:border-slate-700">
              <span className="text-3xl mb-2">🌊</span>
              <p className="text-gray-500 dark:text-slate-400 text-center font-medium">
                No trips found for {origin} → {destination}
              </p>
              <p className="text-gray-400 dark:text-slate-500 text-center text-xs mt-1">
                Try another route or check back later.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  passengerCount={passengerCount}
                  onBook={() => handleBook(trip)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
