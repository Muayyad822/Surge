'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Share2, Calendar, ArrowRight, Ticket } from 'lucide-react';
import QRCode from 'qrcode.react';

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const manifestId = searchParams.get('manifestId') || 'BK_123456789';
  const tripName = searchParams.get('tripName') || 'MFV Omoluabi';
  const origin = searchParams.get('origin') || 'CMS';
  const destination = searchParams.get('destination') || 'Ikorodu';
  const departureTimeParam = searchParams.get('departureTime');
  const passengerCount = parseInt(searchParams.get('passengerCount') || '1', 10);
  const departureTime = departureTimeParam ? new Date(departureTimeParam) : new Date();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = `Surge Booking Confirmed!\nBooking ID: ${manifestId}\nVessel: ${tripName}\nRoute: ${origin} → ${destination}\nPassengers: ${passengerCount}`;
    if (navigator.share) {
      navigator.share({ title: 'My Surge Ticket', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full px-6 py-10 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="bg-green-100 p-4 rounded-full mb-4">
          <CheckCircle2 size={64} className="text-[#10B981]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Booking Confirmed!
        </h1>
        <p className="text-gray-500 dark:text-slate-400 mt-2 px-4 text-base">
          Your seat on {tripName} is reserved. Show the QR code below at the jetty.
        </p>
      </div>

      {/* QR Code Container */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 mb-6 flex flex-col items-center border border-gray-100 dark:border-slate-700 shadow-sm">
        <div className="p-4 bg-white rounded-2xl border-2 border-gray-100">
          <QRCode value={manifestId} size={180} />
        </div>
        <p className="mt-4 text-xs font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
          Booking ID: {manifestId.substring(0, 16)}
        </p>
      </div>

      {/* Details Box matching GidiFerry */}
      <div className="bg-[#0BD6FF]/10 dark:bg-blue-900/20 rounded-3xl p-6 mb-6 border border-[#0BD6FF]/20">
        <div className="flex items-center mb-4">
          <Calendar size={20} className="text-[#0070C0] dark:text-blue-300" />
          <span className="ml-3 text-[#0070C0] dark:text-blue-300 font-bold text-lg">
            {departureTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-500 dark:text-slate-400 font-medium">Departure at</span>
          <span className="ml-2 text-[#0070C0] dark:text-blue-300 font-bold">
            {departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        {passengerCount > 1 && (
          <div className="flex items-center mt-3 text-sm">
            <span className="text-gray-500 dark:text-slate-400 font-medium">Passengers</span>
            <span className="ml-2 text-[#0070C0] dark:text-blue-300 font-bold">{passengerCount}</span>
          </div>
        )}
      </div>

      {/* Share and My Ticket Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={handleShare}
          className="bg-gray-100 dark:bg-slate-800 p-4 rounded-2xl flex justify-center items-center font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-200 transition-colors cursor-pointer text-base"
        >
          <Share2 size={18} className="mr-2" />
          <span>{copied ? 'Copied!' : 'Share'}</span>
        </button>

        <button
          onClick={() => router.push(`/commuter/ticket/${manifestId}?tripName=${encodeURIComponent(tripName)}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&departureTime=${encodeURIComponent(departureTime.toISOString())}`)}
          className="bg-[#0BD6FF]/10 dark:bg-blue-900/30 p-4 rounded-2xl flex justify-center items-center border border-[#0BD6FF]/20 font-bold text-[#0070C0] dark:text-blue-300 hover:bg-[#0BD6FF]/20 transition-colors cursor-pointer text-base"
        >
          <Ticket size={18} className="mr-2" />
          <span>My Ticket</span>
        </button>
      </div>

      {/* Back to Dashboard Button */}
      <button
        onClick={() => router.push('/commuter/dashboard')}
        className="w-full bg-[#0070C0] hover:bg-[#005A9C] text-white p-5 rounded-[24px] flex justify-center items-center shadow-lg font-bold text-xl active:opacity-90 transition-all cursor-pointer mb-8"
      >
        <span>Back to Dashboard</span>
        <ArrowRight size={22} className="ml-2" />
      </button>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col justify-center">
      <Suspense fallback={<div className="text-center p-12 text-[#0070C0]">Confirming booking...</div>}>
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
