'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Plus } from 'lucide-react';
import { BookingCard } from '@/components/booking/BookingCard';
import { useBookings } from '@/hooks/useData';
import { useAuthStore } from '@/context/AuthContext';

export default function MyTripsPage() {
  const router = useRouter();
  const { userId } = useAuthStore();
  const { bookings, loading } = useBookings(userId || '');

  const activeBookings = bookings.filter((b) => !b.manifest?.checkInTime);
  const pastBookings = bookings.filter((b) => b.manifest?.checkInTime);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col font-sans pb-16">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 max-w-2xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-[#0070C0] dark:text-blue-400">
            My Trips
          </h1>
        </div>

        <button
          onClick={() => router.push('/commuter/booking')}
          className="bg-[#0070C0]/10 dark:bg-blue-900/30 p-3 rounded-2xl text-[#0070C0] dark:text-blue-300 hover:bg-[#0070C0]/20 transition-colors cursor-pointer"
          title="New Trip"
        >
          <Plus size={24} />
        </button>
      </header>

      {/* Main List */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 space-y-8">
        {/* Upcoming Section */}
        <div>
          <p className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            Upcoming
          </p>

          {loading ? (
            <p className="text-gray-400 dark:text-slate-500 text-center py-6">Loading trips...</p>
          ) : activeBookings.length > 0 ? (
            <div className="space-y-4">
              {activeBookings.map((booking) => {
                const tripName = booking.trip?.vessel?.name || booking.trip?.boatName || 'MFV Omoluabi';
                const origin = booking.trip?.origin || 'CMS';
                const destination = booking.trip?.destination || 'Ikorodu';
                const departureTime = booking.trip?.departureTime
                  ? new Date(booking.trip.departureTime).toISOString()
                  : new Date().toISOString();

                return (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onPress={() =>
                      router.push(
                        `/commuter/ticket/${booking.manifest?.id || booking.manifestId}?tripName=${encodeURIComponent(
                          tripName
                        )}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(
                          destination
                        )}&departureTime=${encodeURIComponent(departureTime)}&status=upcoming`
                      )
                    }
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-slate-800 p-10 rounded-[40px] flex flex-col items-center justify-center border border-dashed border-gray-200 dark:border-slate-700">
              <div className="w-36 h-24 relative mb-4">
                <Image
                  src="/assets/no_bookings_illustration.png"
                  alt="No bookings"
                  width={150}
                  height={100}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-400 dark:text-slate-500 mt-2 text-center font-medium">
                No upcoming trips. Ready to sail?
              </p>
            </div>
          )}
        </div>

        {/* Past Trips Section */}
        <div>
          <p className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            Past Trips
          </p>

          {pastBookings.length === 0 ? (
            <p className="text-gray-400 dark:text-slate-600 text-center text-sm py-4">
              Your completed trips will appear here.
            </p>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => {
                const tripName = booking.trip?.vessel?.name || booking.trip?.boatName || 'MFV Omoluabi';
                const origin = booking.trip?.origin || 'CMS';
                const destination = booking.trip?.destination || 'Ikorodu';
                const departureTime = booking.trip?.departureTime
                  ? new Date(booking.trip.departureTime).toISOString()
                  : new Date().toISOString();

                return (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onPress={() =>
                      router.push(
                        `/commuter/ticket/${booking.manifest?.id || booking.manifestId}?tripName=${encodeURIComponent(
                          tripName
                        )}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(
                          destination
                        )}&departureTime=${encodeURIComponent(departureTime)}&status=completed`
                      )
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}