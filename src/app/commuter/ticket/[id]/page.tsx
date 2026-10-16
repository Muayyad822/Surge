'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Share2,
  Ship,
  Calendar,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import QRCode from 'qrcode.react';

export default function TicketDetailPage() {
  const router = useRouter();
  const params = useParams();
  const manifestId = (params?.id as string) || 'BK_123456789';

  const [ticketData, setTicketData] = useState<{
    tripName: string;
    origin: string;
    destination: string;
    departureTime: string;
    status: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tripName = searchParams.get('tripName') || 'MFV Omoluabi';
    const origin = searchParams.get('origin') || 'CMS';
    const destination = searchParams.get('destination') || 'Ikorodu';
    const departureTime = searchParams.get('departureTime') || new Date().toISOString();
    const status = searchParams.get('status') || 'upcoming';

    setTicketData({ tripName, origin, destination, departureTime, status });
  }, []);

  if (!ticketData) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-[#0070C0] font-bold">Loading Ticket...</div>
      </div>
    );
  }

  const { tripName, origin, destination, departureTime, status } = ticketData;
  const depDate = new Date(departureTime);
  const isUpcoming = status === 'upcoming';

  const handleShare = () => {
    const text = `Surge Ticket\nBooking ID: ${manifestId}\nRoute: ${origin} → ${destination}\nVessel: ${tripName}\nDeparture: ${depDate.toLocaleString()}`;
    if (navigator.share) {
      navigator.share({ title: 'My Surge Ticket', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col font-sans pb-12">
      {/* Header */}
      <div className="flex items-center px-6 pt-6 pb-2 max-w-xl mx-auto w-full">
        <button
          onClick={() => router.back()}
          className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl mr-4 text-gray-600 dark:text-slate-300 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            My Ticket
          </h1>
          <p className="text-sm text-gray-400 dark:text-slate-500 font-mono">
            Booking #{manifestId.substring(0, 10)}
          </p>
        </div>
        <button
          onClick={handleShare}
          className="bg-[#0070C0]/10 dark:bg-blue-900/30 p-3 rounded-2xl text-[#0070C0] dark:text-blue-300 hover:bg-[#0070C0]/20 transition-colors cursor-pointer"
          title="Share Ticket"
        >
          <Share2 size={20} />
        </button>
      </div>

      <main className="flex-1 max-w-xl mx-auto w-full px-6 mt-4 space-y-6">
        {/* Status Banner */}
        <div
          className={`flex items-center justify-center p-4 rounded-2xl ${
            isUpcoming
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
              : 'bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400'
          }`}
        >
          <CheckCircle2 size={18} className="mr-2" />
          <span className="font-bold text-sm uppercase tracking-wide">
            {isUpcoming ? 'Confirmed • Ready for Boarding' : 'Completed'}
          </span>
        </div>

        {/* Route Card matching GidiFerry */}
        <div className="bg-[#0070C0] dark:bg-blue-800 rounded-[32px] p-6 text-white shadow-xl">
          <div className="flex items-center mb-5">
            <Ship size={20} className="text-white/70" />
            <span className="ml-2 text-white/80 font-medium">{tripName}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <span className="text-white/60 text-xs uppercase block mb-1">From</span>
              <span className="text-white text-2xl font-black">{origin}</span>
            </div>
            <div className="items-center px-4">
              <span className="text-[#0BD6FF] text-2xl font-bold">→</span>
            </div>
            <div className="flex-1 text-right">
              <span className="text-white/60 text-xs uppercase block mb-1">To</span>
              <span className="text-white text-2xl font-black">{destination}</span>
            </div>
          </div>

          <div className="flex justify-between mt-6 pt-4 border-t border-white/20 text-sm">
            <div className="flex items-center">
              <Calendar size={16} className="text-white/60 mr-2" />
              <span className="text-white/90 font-medium">
                {depDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="text-white/60 mr-2" />
              <span className="text-white/90 font-medium">
                {depDate.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* QR Code Container matching GidiFerry */}
        <div className="bg-white dark:bg-slate-800 rounded-[40px] p-8 flex flex-col items-center border border-gray-100 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">
            Scan at Jetty to Board
          </p>
          <div className="p-4 bg-white rounded-2xl border-4 border-[#0070C0]/10 shadow-sm">
            <QRCode value={manifestId} size={190} />
          </div>
          <div className="mt-6 bg-gray-50 dark:bg-slate-700 px-4 py-2 rounded-full">
            <span className="text-gray-500 dark:text-slate-400 font-bold text-xs tracking-widest uppercase font-mono">
              {manifestId.substring(0, 16)}
            </span>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full bg-[#0070C0] hover:bg-[#005A9C] text-white p-5 rounded-2xl flex justify-center items-center shadow-lg font-bold text-lg active:opacity-90 transition-all cursor-pointer"
        >
          <Share2 size={20} className="mr-3" />
          <span>{copied ? 'Link Copied!' : 'Share Ticket Details'}</span>
        </button>

        {/* Boarding Instructions Note */}
        <div className="bg-[#0BD6FF]/10 dark:bg-blue-900/20 border border-[#0BD6FF]/20 dark:border-blue-800 rounded-2xl p-4">
          <p className="text-[#0070C0] dark:text-blue-400 font-bold text-sm mb-1">
            💡 Boarding Instructions
          </p>
          <p className="text-gray-500 dark:text-slate-400 text-xs leading-5">
            Present this QR code or your Booking ID to the jetty officer before boarding. 
            Arrive at least 10 minutes before departure. 
            This ticket is non-transferable.
          </p>
        </div>
      </main>
    </div>
  );
}