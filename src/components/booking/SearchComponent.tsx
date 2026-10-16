// SearchComponent for booking flow - GidiFerry Design System
'use client';

const JETTIES = ['Ikorodu', 'CMS', 'Falomo', 'Badore', 'Mile 2'];

interface SearchComponentProps {
  origin: string;
  destination: string;
  passengerCount: number;
  onSelectOrigin: (value: string) => void;
  onSelectDestination: (value: string) => void;
  onPassengerCountChange: (count: number) => void;
  onSearch: () => void;
  loading?: boolean;
}

export function SearchComponent({
  origin,
  destination,
  passengerCount,
  onSelectOrigin,
  onSelectDestination,
  onPassengerCountChange,
  onSearch,
  loading = false,
}: SearchComponentProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 mb-6 font-sans">
      {/* From Section */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2.5 uppercase tracking-wider">
          From
        </label>
        <div className="flex flex-wrap gap-2">
          {JETTIES.map((jetty) => {
            const isSelected = origin === jetty;
            return (
              <button
                key={`origin-${jetty}`}
                type="button"
                onClick={() => onSelectOrigin(jetty)}
                className={`px-4 py-2 rounded-full border text-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0070C0] border-[#0070C0] text-white font-bold shadow-sm'
                    : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-gray-300'
                }`}
              >
                {jetty}
              </button>
            );
          })}
        </div>
      </div>

      {/* To Section */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2.5 uppercase tracking-wider">
          To
        </label>
        <div className="flex flex-wrap gap-2">
          {JETTIES.map((jetty) => {
            const isSelected = destination === jetty;
            return (
              <button
                key={`dest-${jetty}`}
                type="button"
                onClick={() => onSelectDestination(jetty)}
                className={`px-4 py-2 rounded-full border text-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0BD6FF] border-[#0BD6FF] text-[#0070C0] font-bold shadow-sm'
                    : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-gray-300'
                }`}
              >
                {jetty}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stepper for Passenger Seats */}
      <div className="mb-7 flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-750 rounded-2xl border border-gray-100 dark:border-slate-700">
        <div>
          <span className="block font-bold text-gray-800 dark:text-slate-100 text-base">Seats</span>
          <span className="text-xs text-gray-400">Number of ferry passengers</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onPassengerCountChange(Math.max(1, passengerCount - 1))}
            disabled={passengerCount <= 1}
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-center font-bold text-gray-700 dark:text-slate-200 disabled:opacity-40 hover:bg-gray-100 cursor-pointer text-lg"
          >
            -
          </button>
          <span className="w-8 text-center font-bold text-xl text-gray-900 dark:text-white">
            {passengerCount}
          </span>
          <button
            type="button"
            onClick={() => onPassengerCountChange(Math.min(10, passengerCount + 1))}
            disabled={passengerCount >= 10}
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-center font-bold text-gray-700 dark:text-slate-200 disabled:opacity-40 hover:bg-gray-100 cursor-pointer text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Search Trips Button */}
      <button
        type="button"
        onClick={onSearch}
        disabled={loading}
        className="w-full bg-[#0070C0] hover:bg-[#005A9C] text-white p-5 rounded-2xl items-center shadow-lg shadow-waterway-blue/20 font-bold text-lg active:opacity-90 transition-all cursor-pointer flex justify-center disabled:opacity-50"
      >
        {loading ? 'Searching Waterways...' : 'Search Trips'}
      </button>
    </div>
  );
}