'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export default function SafetyProfilePage() {
  const router = useRouter();
  const { completeProfile, userRole } = useAuthStore();
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !emergencyName || !emergencyPhone) {
      setError('All fields including emergency contact details are mandatory for maritime safety laws.');
      return;
    }
    
    setSubmitting(true);
    setError('');
    try {
      const userId = `user_${Date.now()}`;
      await completeProfile(userId);
      
      if (userRole === 'operator') {
        router.push('/operator/dashboard');
      } else {
        router.push('/commuter/dashboard');
      }
      router.refresh();
    } catch (err) {
      console.error('Failed to save profile:', err);
      setError('Failed to save safety profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col justify-between font-sans">
      <main className="flex-1 max-w-lg mx-auto w-full p-6 py-8 flex flex-col justify-center">
        {/* Header */}
        <div className="mb-8 mt-2">
          <h1 className="text-4xl font-bold text-[#0070C0] mb-2">Surge</h1>
          <p className="text-lg text-gray-500 dark:text-slate-400">Complete your maritime safety profile</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2 ml-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full bg-gray-100 dark:bg-slate-800 p-4 rounded-2xl text-base border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:border-[#0070C0] text-gray-900 dark:text-white"
              placeholder="e.g. Adebayo Ogunlesi"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full bg-gray-100 dark:bg-slate-800 p-4 rounded-2xl text-base border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:border-[#0070C0] text-gray-900 dark:text-white"
              placeholder="e.g. 08012345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Emergency Contact Box matching GidiFerry */}
          <div className="p-6 bg-[#0BD6FF]/10 dark:bg-blue-900/30 rounded-3xl border border-[#0BD6FF]/20 dark:border-blue-700 space-y-4">
            <div>
              <h2 className="text-[#0070C0] dark:text-sky-300 font-bold text-xl mb-1">
                Emergency Contact
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Mandatory for maritime safety laws in Lagos.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1.5 ml-1">
                Contact Name
              </label>
              <input
                type="text"
                className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0070C0] text-gray-900 dark:text-white text-sm"
                placeholder="Next of kin name"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1.5 ml-1">
                Contact Phone
              </label>
              <input
                type="tel"
                className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0070C0] text-gray-900 dark:text-white text-sm"
                placeholder="Emergency phone number"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0070C0] hover:bg-[#005A9C] text-white p-5 rounded-2xl items-center shadow-lg active:opacity-90 font-bold text-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Saving Profile...' : 'Save Profile'}
          </button>
        </form>
      </main>
    </div>
  );
}