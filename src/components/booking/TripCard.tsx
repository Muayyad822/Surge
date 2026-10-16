// TripCard component - GidiFerry Design System
'use client';

import { format } from 'date-fns';
import { Trip } from '@/types';

interface TripCardProps {
  trip: Trip;
  onBook: () => void;
  passengerCount: number;
  showBookButton?: boolean;
}

export function TripCard({ trip, onBook, passengerCount, showBookButton = true }: TripCardProps) {
  const boatName = trip.vessel?.name || trip.boatName || 'MFV Omoluabi';
  const departureDate = new Date(trip.departureTime);
  const occupancy = trip.occupancy || 0;
  const capacity = trip.vessel?.capacity || trip.capacity || 20;
  const seatsLeft = capacity - occupancy;
  const isFull = seatsLeft < passengerCount;

  const timeString = format(departureDate, 'HH:mm');

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 mb-4 flex items-center justify-between gap-4 font-sans hover:border-gray-200 transition-colors">
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-0.5">
          {boatName}
        </h3>
        <p className="text-[#0070C0] dark:text-blue-400 font-bold mb-2">
          {timeString}
        </p>
        <div className="flex items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full mr-2 ${
              isFull ? 'bg-red-500' : 'bg-green-500'
            }`}
          />
          <span className="text-sm text-gray-600 dark:text-slate-400 font-medium">
            {isFull ? 'Full capacity' : `${seatsLeft} seats left`}
          </span>
        </div>
      </div>

      {showBookButton && (
        <button
          disabled={isFull}
          onClick={onBook}
          className={`px-6 py-3 rounded-2xl font-bold transition-all text-sm cursor-pointer active:opacity-90 ${
            isFull
              ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
              : 'bg-[#0BD6FF] hover:bg-[#00B4D8] text-[#0070C0] shadow-sm'
          }`}
        >
          {isFull ? 'Sold Out' : 'Book'}
        </button>
      )}
    </div>
  );
}