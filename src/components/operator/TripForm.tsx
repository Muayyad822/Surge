// TripForm component for operators - GidiFerry Design System
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Ship, Calendar } from 'lucide-react';
import { useVessels } from '@/hooks/useData';
import { simulation } from '@/lib/simulation';
import { Vessel } from '@/types';

export function TripForm() {
  const router = useRouter();
  const { vessels, loading: vesselsLoading } = useVessels();
  
  const [origin, setOrigin] = useState('CMS');
  const [destination, setDestination] = useState('Ikorodu');
  const [vesselId, setVesselId] = useState('');
  const [timeStr, setTimeStr] = useState('17:30');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (vessels.length > 0 && !vesselId) {
      setVesselId(vessels[0].id);
    }
  }, [vessels, vesselId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!origin || !destination) {
      setError('Please fill in all fields');
      return;
    }

    if (!vesselId) {
      setError('Please select a vessel');
      return;
    }

    const timeParts = timeStr.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1] || '0', 10);

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      setError('Please enter a valid time in HH:MM format (24-hour, e.g. 17:30).');
      return;
    }

    // Lagos maritime night-ban: no trips scheduled after 18:30 (6:30 PM)
    if (hours > 18 || (hours === 18 && minutes > 30)) {
      setError('Lagos State Night Ban: Maritime regulation prohibits trip scheduling after 18:30 (6:30 PM) for passenger safety.');
      return;
    }

    setSubmitting(true);
    try {
      const departureTime = new Date();
      departureTime.setHours(hours, minutes, 0, 0);

      await simulation.createTrip({
        vesselId,
        origin,
        destination,
        departureTime,
      });
      
      router.push('/operator/trips');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create trip');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      {error && (
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Route Details Box matching GidiFerry */}
      <div>
        <p className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">
          Route Details
        </p>

        <div className="bg-gray-50 dark:bg-slate-800 rounded-3xl p-2 border border-gray-100 dark:border-slate-700">
          <div className="flex items-center px-4 py-4">
            <MapPin size={20} className="text-[#0070C0] dark:text-blue-400 flex-shrink-0" />
            <input
              type="text"
              className="flex-1 ml-3 bg-transparent text-gray-800 dark:text-white font-medium focus:outline-none text-base"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Origin (e.g. CMS)"
            />
          </div>
          <div className="h-[1px] bg-gray-200 dark:bg-slate-700 mx-4" />
          <div className="flex items-center px-4 py-4">
            <MapPin size={20} className="text-[#0070C0] dark:text-blue-400 flex-shrink-0" />
            <input
              type="text"
              className="flex-1 ml-3 bg-transparent text-gray-800 dark:text-white font-medium focus:outline-none text-base"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination (e.g. Ikorodu)"
            />
          </div>
        </div>
      </div>

      {/* Select Vessel matching GidiFerry */}
      <div>
        <p className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">
          Select Vessel
        </p>
        <div className="flex flex-wrap gap-2.5">
          {vessels.map((v: Vessel) => {
            const isSelected = vesselId === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVesselId(v.id)}
                className={`flex items-center px-5 py-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0070C0] border-[#0070C0] text-white shadow-sm'
                    : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:border-gray-300'
                }`}
              >
                <Ship size={18} className={isSelected ? 'text-white' : 'text-[#0070C0]'} />
                <span className="ml-2 font-bold text-sm">
                  {v.name} ({v.capacity} seats)
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Departure Time */}
      <div>
        <p className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">
          Departure Time
        </p>
        <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-4 border border-gray-200 dark:border-slate-700 flex items-center">
          <Calendar size={20} className="text-[#0070C0] dark:text-blue-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            className="flex-1 bg-transparent text-gray-800 dark:text-white font-bold focus:outline-none text-base"
            value={timeStr}
            onChange={(e) => setTimeStr(e.target.value)}
            placeholder="Departure Time (e.g. 17:30)"
          />
          <span className="text-gray-400 text-xs">(24-hour HH:MM)</span>
        </div>
      </div>

      {/* Schedule Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#0070C0] hover:bg-[#005A9C] text-white p-6 rounded-[24px] items-center shadow-lg font-bold text-xl active:opacity-90 transition-all cursor-pointer disabled:opacity-50"
      >
        {submitting ? 'Scheduling...' : 'Schedule Trip'}
      </button>
    </form>
  );
}