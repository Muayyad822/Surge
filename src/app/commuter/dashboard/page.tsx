'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Anchor, Map, Wallet, History, AlertTriangle, Ship, LogOut, User, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SOSButton } from '@/components/safety/SOSButton';
import { useAuthStore } from '@/context/AuthContext';
import { useBookings, useTrips } from '@/hooks/useData';

export default function CommuterDashboardPage() {
  const router = useRouter();
  const { walletBalance, userId, logout, topUpBalance } = useAuthStore();
  const { bookings } = useBookings();
  const { trips } = useTrips();
  const [showTopUp, setShowTopUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleTopUp = async (amount: number) => {
    try {
      await topUpBalance(amount);
      setShowTopUp(false);
    } catch (e) {
      alert('Failed to complete transaction.');
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/auth/role-selection');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col font-sans pb-24">
      {/* Top Navigation Bar */}
      <div className="max-w-4xl mx-auto w-full px-6 pt-6 pb-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 relative mr-3">
            <Image
              src="/assets/GidiFerry-icon.png"
              alt="Surge"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-gray-500 dark:text-slate-400 text-sm">Welcome back,</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0070C0] dark:text-blue-400">
              Commuter
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowProfile(true)}
            className="bg-[#0BD6FF]/10 dark:bg-blue-900/30 p-3 rounded-2xl text-[#0070C0] dark:text-blue-300 hover:bg-[#0BD6FF]/20 transition-colors cursor-pointer"
            title="Profile"
          >
            <User size={22} />
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-4 space-y-6">
        {/* Balance Card matching GidiFerry */}
        <div className="bg-[#0070C0] dark:bg-blue-800 p-6 sm:p-8 rounded-[32px] shadow-xl text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[#0BD6FF]/90 text-sm font-semibold uppercase tracking-wider">
                Total Balance
              </p>
              <p className="text-white text-3xl sm:text-4xl font-bold mt-1">
                ₦{walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <Wallet size={24} color="#FFFFFF" />
            </div>
          </div>
          <button
            className="w-full bg-white py-3.5 rounded-2xl items-center shadow-sm active:opacity-90 font-bold text-[#0070C0] hover:bg-gray-50 transition-colors cursor-pointer text-base"
            onClick={() => setShowTopUp(true)}
          >
            Top Up Wallet
          </button>
        </div>

        {/* Actions Grid matching GidiFerry */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/commuter/booking')}
              className="bg-[#0BD6FF]/10 dark:bg-blue-900/30 p-6 rounded-3xl flex flex-col items-center justify-center border border-[#0BD6FF]/20 dark:border-blue-700 hover:bg-[#0BD6FF]/20 transition-all cursor-pointer group"
            >
              <div className="bg-[#0070C0] dark:bg-blue-700 p-4 rounded-2xl mb-3 text-white group-hover:scale-105 transition-transform">
                <Anchor size={24} color="#FFFFFF" />
              </div>
              <span className="text-[#0070C0] dark:text-blue-300 font-bold text-lg text-center">
                Book Trip
              </span>
            </button>

            <button
              onClick={() => router.push('/commuter/live-map')}
              className="bg-[#0BD6FF]/10 dark:bg-blue-900/30 p-6 rounded-3xl flex flex-col items-center justify-center border border-[#0BD6FF]/20 dark:border-blue-700 hover:bg-[#0BD6FF]/20 transition-all cursor-pointer group"
            >
              <div className="bg-[#0070C0] dark:bg-blue-700 p-4 rounded-2xl mb-3 text-white group-hover:scale-105 transition-transform">
                <Map size={24} color="#FFFFFF" />
              </div>
              <span className="text-[#0070C0] dark:text-blue-300 font-bold text-lg text-center">
                Live Map
              </span>
            </button>

            <button
              onClick={() => router.push('/commuter/my-trips')}
              className="bg-[#0BD6FF]/10 dark:bg-blue-900/30 p-6 rounded-3xl flex flex-col items-center justify-center border border-[#0BD6FF]/20 dark:border-blue-700 hover:bg-[#0BD6FF]/20 transition-all cursor-pointer group"
            >
              <div className="bg-[#0070C0] dark:bg-blue-700 p-4 rounded-2xl mb-3 text-white group-hover:scale-105 transition-transform">
                <History size={24} color="#FFFFFF" />
              </div>
              <span className="text-[#0070C0] dark:text-blue-300 font-bold text-lg text-center">
                My Trips
              </span>
            </button>
          </div>
        </div>

        {/* Recent Activity matching GidiFerry */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">
              Recent Activity
            </h2>
            {bookings.length > 0 && (
              <button
                onClick={() => router.push('/commuter/my-trips')}
                className="text-sm font-bold text-[#0070C0] dark:text-blue-400 hover:underline flex items-center"
              >
                View All <ChevronRight size={16} />
              </button>
            )}
          </div>

          {bookings.length > 0 ? (
            <div className="space-y-3">
              {bookings.slice(0, 3).map((bk) => (
                <div
                  key={bk.id}
                  onClick={() => router.push(`/commuter/ticket/${bk.id}`)}
                  className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#0BD6FF]/10 text-[#0070C0]">
                      <Ship size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-slate-100 text-base">
                        {bk.trip?.boatName || 'MFV Omoluabi'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {bk.trip?.origin || 'CMS'} → {bk.trip?.destination || 'Ikorodu'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-600">
                      Confirmed
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {bk.trip?.departureTime ? new Date(bk.trip.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '17:30'}
                    </p>
                  </div>
                </div>
              ))}
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
              <p className="text-gray-400 dark:text-slate-400 text-center font-medium">
                No recent trips. Start sailing today!
              </p>
              <Button
                variant="primary"
                size="sm"
                className="mt-4"
                onClick={() => router.push('/commuter/booking')}
              >
                Find a Ferry
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Circular SOS Button */}
      <SOSButton />

      {/* Top Up Modal */}
      <Modal
        isOpen={showTopUp}
        onClose={() => setShowTopUp(false)}
        title="Top Up Wallet"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-500 dark:text-slate-400 text-sm">
            Select a payment amount to add to your Surge wallet:
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[2000, 5000, 10000].map((amt) => (
              <button
                key={amt}
                onClick={() => handleTopUp(amt)}
                className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-700 hover:bg-[#0BD6FF]/10 text-gray-800 dark:text-white font-bold text-lg border border-gray-200 dark:border-slate-600 transition-colors flex justify-between items-center cursor-pointer"
              >
                <span>Credit ₦{amt.toLocaleString()}</span>
                <span className="text-xs text-[#0070C0] font-semibold">Select</span>
              </button>
            ))}
          </div>
          <div className="pt-2">
            <Button variant="outline" fullWidth onClick={() => setShowTopUp(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Profile Modal */}
      <Modal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        title="Commuter Account"
        size="sm"
      >
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-2xl border border-gray-100 dark:border-slate-600 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0070C0] text-white flex items-center justify-center font-bold text-lg">
              <User size={24} />
            </div>
            <div>
              <p className="font-bold text-gray-800 dark:text-white">Registered Passenger</p>
              <p className="text-xs text-gray-500">ID: {userId ? userId.slice(0, 14) : 'USER_ONLINE'}</p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => router.push('/commuter/my-trips')}
              className="w-full text-left p-3.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-semibold text-sm flex justify-between items-center cursor-pointer"
            >
              <span>My Boarding Passes</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            <button
              onClick={() => router.push('/commuter/live-map')}
              className="w-full text-left p-3.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-semibold text-sm flex justify-between items-center cursor-pointer"
            >
              <span>Live Ferry Radar</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left p-3.5 rounded-2xl hover:bg-red-50 text-red-600 font-semibold text-sm flex justify-between items-center cursor-pointer"
            >
              <span>Sign Out</span>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}