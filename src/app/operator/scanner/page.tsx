'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Camera, CheckCircle2 } from 'lucide-react';
import { DepartureTrigger } from '@/components/operator/DepartureTrigger';
import { useTrips } from '@/hooks/useData';
import { simulation } from '@/lib/simulation';

function ScannerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripId = searchParams.get('tripId') || 'trip_001';
  const { trips, refetch } = useTrips();
  const currentTrip = trips.find(t => t.id === tripId) || trips[0];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [scannedPassengers, setScannedPassengers] = useState<string[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play();
          setCameraActive(true);
        }
      })
      .catch(() => {
        setCameraActive(false);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleScanCode = (ticketId: string) => {
    if (!scannedPassengers.includes(ticketId)) {
      setScannedPassengers(prev => [...prev, ticketId]);
      setSuccessMsg(`Passenger Ticket #${ticketId} Checked In!`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleDepart = async (status: string) => {
    if (currentTrip) {
      await simulation.updateTripStatus(currentTrip.id, status as any);
      await refetch();
      router.push('/operator/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between font-sans overflow-hidden">
      {/* Top Camera Stream Viewport */}
      <div className="absolute inset-0 z-0 bg-slate-900 flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />

        {/* Reticle Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-48">
          <div className="w-56 h-56 border-2 border-white/40 rounded-3xl relative">
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#0BD6FF]" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#0BD6FF]" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#0BD6FF]" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#0BD6FF]" />
          </div>
        </div>

        {!cameraActive && (
          <div className="absolute top-24 px-6 text-center">
            <p className="text-gray-400 text-sm">
              Camera simulated for testing. Tap quick tickets below.
            </p>
          </div>
        )}
      </div>

      {/* Top Back Button */}
      <div className="relative z-10 p-6 flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="bg-black/50 w-11 h-11 rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-black/70 cursor-pointer"
        >
          <ArrowLeft size={22} />
        </button>

        {successMsg && (
          <div className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg animate-fade-in">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Bottom Sheet Card matching GidiFerry */}
      <div className="relative z-10 bg-white dark:bg-slate-800 rounded-t-[40px] p-6 sm:p-8 shadow-2xl text-gray-900 dark:text-white">
        <div className="w-12 h-1 bg-gray-200 dark:bg-slate-600 rounded-full mx-auto mb-6" />

        <h2 className="text-2xl sm:text-3xl font-bold text-[#0070C0] dark:text-blue-400 mb-2">
          Manifest Scanner
        </h2>
        <p className="text-gray-500 dark:text-slate-400 mb-6 text-base sm:text-lg">
          Passengers checked in:{' '}
          <strong className="text-[#0070C0] dark:text-blue-400 font-bold">
            {scannedPassengers.length}
          </strong>
        </p>

        {/* Quick Simulation Buttons */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl border border-gray-100 dark:border-slate-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
            Simulate Passenger Boarding Pass Scan
          </p>
          <div className="flex flex-wrap gap-2">
            {['BK_948821', 'BK_110294', 'BK_774028'].map((code) => (
              <button
                key={code}
                onClick={() => handleScanCode(code)}
                disabled={scannedPassengers.includes(code)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  scannedPassengers.includes(code)
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-[#0BD6FF]/10 text-[#0070C0] hover:bg-[#0BD6FF]/20 border border-[#0BD6FF]/30'
                }`}
              >
                {scannedPassengers.includes(code) ? `✓ ${code}` : `Scan ${code}`}
              </button>
            ))}
          </div>
        </div>

        {/* Departure Trigger */}
        {currentTrip && (
          <DepartureTrigger
            trip={currentTrip}
            onStatusChange={handleDepart}
          />
        )}
      </div>
    </div>
  );
}

export default function QRScannerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-bold">Opening scanner...</div>}>
      <ScannerContent />
    </Suspense>
  );
}