'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Ship, Navigation, Anchor } from 'lucide-react';

const cmsToIkoroduPath = [
  { name: 'CMS Jetty Pier', pct: 10, lat: 6.4485, lng: 3.4013 },
  { name: 'Marina Basin', pct: 22, lat: 6.4680, lng: 3.4140 },
  { name: 'Lagos Lagoon Fairway', pct: 40, lat: 6.5200, lng: 3.4380 },
  { name: 'Mid-Lagoon Channel', pct: 60, lat: 6.5650, lng: 3.4610 },
  { name: 'Ikorodu Channel Approach', pct: 80, lat: 6.6010, lng: 3.4880 },
  { name: 'Ikorodu Ferry Terminal', pct: 92, lat: 6.6169, lng: 3.5042 },
];

export default function LiveMapPage() {
  const router = useRouter();

  const [omoluabiProgress, setOmoluabiProgress] = useState(35);
  const [ekoProgress, setEkoProgress] = useState(70);
  const [omoluabiDir, setOmoluabiDir] = useState(1);
  const [ekoDir, setEkoDir] = useState(-1);

  useEffect(() => {
    const timer = setInterval(() => {
      setOmoluabiProgress((prev) => {
        let next = prev + omoluabiDir * 2;
        if (next >= 90) {
          setOmoluabiDir(-1);
          return 90;
        }
        if (next <= 12) {
          setOmoluabiDir(1);
          return 12;
        }
        return next;
      });

      setEkoProgress((prev) => {
        let next = prev + ekoDir * 2.5;
        if (next >= 90) {
          setEkoDir(-1);
          return 90;
        }
        if (next <= 12) {
          setEkoDir(1);
          return 12;
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [omoluabiDir, ekoDir]);

  const vessels = [
    {
      id: '1',
      name: 'MFV Omoluabi',
      speed: '18 knots',
      status: omoluabiDir === 1 ? 'CMS → Ikorodu' : 'Ikorodu → CMS',
      pct: omoluabiProgress,
      dir: omoluabiDir,
    },
    {
      id: '2',
      name: 'LAGFERRY Eko',
      speed: '22 knots',
      status: ekoDir === 1 ? 'CMS → Ikorodu' : 'Ikorodu → CMS',
      pct: ekoProgress,
      dir: ekoDir,
    },
  ];

  const [selectedVessel, setSelectedVessel] = useState(vessels[0]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col font-sans">
      {/* Header matching GidiFerry VesselMapScreen */}
      <header className="bg-[#0070C0] text-white p-5 sm:p-6 shadow-md z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
              title="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Live Vessel Map</h1>
              <p className="text-[#0BD6FF] font-medium text-sm">
                Track CMS ↔ Ikorodu ferries in real-time
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>AIS LIVE</span>
          </div>
        </div>
      </header>

      {/* Main Map View */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-6 flex flex-col">
        {/* Interactive Lagoon Channel Radar */}
        <div className="flex-1 min-h-[420px] bg-sky-50 dark:bg-slate-800 rounded-[32px] p-6 relative overflow-hidden border border-sky-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          {/* Fairway Water SVG Graphic */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="none">
            {/* Lagoon waterway band */}
            <path
              d="M 50 320 C 250 200, 500 280, 750 80"
              fill="none"
              stroke="#0BD6FF"
              strokeWidth="40"
              strokeOpacity="0.25"
            />
            {/* Shipping channel center line */}
            <path
              d="M 50 320 C 250 200, 500 280, 750 80"
              fill="none"
              stroke="#0070C0"
              strokeWidth="4"
              strokeDasharray="8 6"
            />
          </svg>

          {/* Jetties on Map */}
          <div className="relative z-10 flex justify-between items-center w-full mt-2">
            <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-600 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0070C0] text-white flex items-center justify-center">
                <Anchor size={16} />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-800 dark:text-white">CMS Terminal</p>
                <p className="text-[10px] text-gray-400">Pier 01-04</p>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-600 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0070C0] text-white flex items-center justify-center">
                <Anchor size={16} />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-800 dark:text-white">Ikorodu Hub</p>
                <p className="text-[10px] text-gray-400">Pier 01-02</p>
              </div>
            </div>
          </div>

          {/* Ferries moving dynamically along the channel */}
          <div className="relative z-10 h-48 w-full my-auto">
            {vessels.map((v) => {
              const xPos = v.pct;
              const yPos = 85 - (v.pct * 0.7); // slanting upward from CMS to Ikorodu

              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVessel(v)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-1000 group focus:outline-none"
                  style={{ left: `${xPos}%`, top: `${yPos}%` }}
                >
                  {/* Circular Marker matching GidiFerry */}
                  <div className="bg-[#0070C0] border-2 border-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Ship size={20} className="text-white" />
                  </div>
                  <div className="mt-1 px-3 py-1 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-full text-xs font-bold shadow-sm border border-gray-100 dark:border-slate-600 whitespace-nowrap">
                    {v.name}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 flex justify-between items-center text-xs text-gray-500 font-semibold px-2">
            <span>Sector: Lagos Lagoon Main Fairway</span>
            <span>Speed Limit: 25 Knots Max</span>
          </div>
        </div>

        {/* Selected Vessel Telemetry Card */}
        {selectedVessel && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0BD6FF]/10 text-[#0070C0] flex items-center justify-center">
                <Ship size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {selectedVessel.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0BD6FF]/15 text-[#0070C0]">
                    {selectedVessel.speed}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
                  Route: <strong className="text-gray-700 dark:text-slate-200">{selectedVessel.status}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push('/commuter/booking')}
              className="bg-[#0070C0] hover:bg-[#005A9C] text-white px-6 py-3 rounded-2xl font-bold shadow-md transition-all cursor-pointer text-sm w-full sm:w-auto text-center"
            >
              Book This Ferry
            </button>
          </div>
        )}
      </main>
    </div>
  );
}