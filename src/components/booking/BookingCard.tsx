// BookingCard component - GidiFerry Design System
'use client';

import { Ship, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Booking } from '@/types';

interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
}

export function BookingCard({ booking, onPress }: BookingCardProps) {
  const { manifest, trip } = booking;
  const boatName = trip?.vessel?.name || trip?.boatName || 'MFV Omoluabi';
  const departureTime = trip?.departureTime ? new Date(trip.departureTime) : new Date();
  const origin = trip?.origin || 'CMS';
  const destination = trip?.destination || 'Ikorodu';
  const isCheckedIn = !!manifest?.checkInTime;
  const status = isCheckedIn ? 'completed' : 'upcoming';
  const isUpcoming = status === 'upcoming';

  return (
    <div
      onClick={onPress}
      className="bg-white dark:bg-slate-800 rounded-3xl p-6 mb-4 border border-gray-100 dark:border-slate-700 shadow-sm hover:border-gray-200 cursor-pointer transition-all font-sans"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className={`p-2.5 rounded-2xl ${isUpcoming ? 'bg-[#0BD6FF]/10 text-[#0070C0]' : 'bg-gray-100 text-gray-500'}`}>
            <Ship size={20} />
          </div>
          <span className="ml-3 font-bold text-gray-800 dark:text-slate-100 text-lg">
            {boatName}
          </span>
        </div>
        <div className={`px-3 py-1 rounded-full ${isUpcoming ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-slate-700'}`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isUpcoming ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-slate-400'}`}>
            {status}
          </span>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex-1">
          <p className="text-gray-400 dark:text-slate-500 text-xs uppercase mb-1">From</p>
          <p className="text-gray-800 dark:text-slate-200 font-semibold">{origin}</p>
        </div>
        <div className="px-4 text-gray-400">
          <ArrowRight size={16} />
        </div>
        <div className="flex-1">
          <p className="text-gray-400 dark:text-slate-500 text-xs uppercase mb-1">To</p>
          <p className="text-gray-800 dark:text-slate-200 font-semibold">{destination}</p>
        </div>
      </div>

      <div className="flex items-center pt-4 border-t border-gray-100 dark:border-slate-700 justify-between">
        <div className="flex items-center">
          <Clock size={16} className="text-[#0070C0] dark:text-blue-400" />
          <span className="ml-2 text-[#0070C0] dark:text-blue-400 font-medium">
            {departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        {isUpcoming && (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <CheckCircle2 size={16} />
            <span className="ml-1 text-xs font-bold">Confirmed</span>
          </div>
        )}
      </div>
    </div>
  );
}