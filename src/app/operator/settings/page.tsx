'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, Moon, Shield, Info, LogOut, ChevronRight, Smartphone } from 'lucide-react';
import { useAuthStore } from '@/context/AuthContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export default function OperatorSettingsPage() {
  const router = useRouter();
  const { logout, resetProfile } = useAuthStore();
  const [notifications, setNotifications] = useState(true);
  const [autoScan, setAutoScan] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/role-selection');
    router.refresh();
  };

  const handleReset = async () => {
    await resetProfile();
    router.push('/auth/role-selection');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col font-sans pb-16">
      {/* Header matching GidiFerry SettingsScreen */}
      <header className="px-6 pt-6 pb-4 max-w-2xl mx-auto w-full flex items-center">
        <button
          onClick={() => router.back()}
          className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl mr-4 text-gray-700 dark:text-slate-300 hover:bg-gray-200 transition-colors cursor-pointer"
          title="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-[#0070C0] dark:text-blue-400">
          Settings
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 space-y-6">
        {/* Settings Items Card matching GidiFerry */}
        <div className="bg-gray-50 dark:bg-slate-800 rounded-[32px] p-2 border border-gray-100 dark:border-slate-700">
          {/* Push Notifications */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-600 text-[#0070C0] dark:text-blue-400">
                <Bell size={20} />
              </div>
              <span className="ml-4 text-gray-800 dark:text-slate-100 font-bold">
                Push Notifications
              </span>
            </div>
            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                notifications ? 'bg-[#0070C0]' : 'bg-gray-300 dark:bg-slate-600'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-[1px] bg-gray-200 dark:bg-slate-700 mx-4" />

          {/* Auto Scanner */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-600 text-[#0070C0] dark:text-blue-400">
                <Smartphone size={20} />
              </div>
              <span className="ml-4 text-gray-800 dark:text-slate-100 font-bold">
                Auto-Scan QR Passes
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAutoScan(!autoScan)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                autoScan ? 'bg-[#0070C0]' : 'bg-gray-300 dark:bg-slate-600'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  autoScan ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-[1px] bg-gray-200 dark:bg-slate-700 mx-4" />

          {/* Privacy Policy */}
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-750 rounded-2xl transition-colors">
            <div className="flex items-center">
              <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-600 text-[#0070C0] dark:text-blue-400">
                <Shield size={20} />
              </div>
              <span className="ml-4 text-gray-800 dark:text-slate-100 font-bold">
                Maritime Safety Regulations
              </span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          <div className="h-[1px] bg-gray-200 dark:bg-slate-700 mx-4" />

          {/* About Surge */}
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-750 rounded-2xl transition-colors">
            <div className="flex items-center">
              <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-600 text-[#0070C0] dark:text-blue-400">
                <Info size={20} />
              </div>
              <span className="ml-4 text-gray-800 dark:text-slate-100 font-bold">
                About Surge Waterways
              </span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>

        {/* Log Out Button matching GidiFerry */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center justify-center bg-red-50 dark:bg-red-900/30 p-6 rounded-[24px] border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-lg hover:bg-red-100 transition-colors cursor-pointer"
        >
          <LogOut size={20} className="mr-3" />
          <span>Log Out</span>
        </button>

        {/* Reset Safety Profile Data */}
        <div className="text-center pt-2">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-gray-400 dark:text-slate-500 text-xs font-bold underline hover:text-gray-600 cursor-pointer"
          >
            Reset Safety Profile Data
          </button>
        </div>

        {/* Version Footer matching GidiFerry */}
        <div className="text-center pt-6 space-y-1">
          <p className="text-gray-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
            Version 1.0.0 (MVP)
          </p>
          <p className="text-gray-400 dark:text-slate-600 text-xs">
            Made with ❤️ for Lagos Waterways
          </p>
        </div>
      </main>

      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Confirm Logout"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-500 dark:text-slate-400 text-sm">
            Are you sure you want to log out of the operator deck?
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogout} className="flex-1">
              Logout
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reset Modal */}
      <Modal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="Reset All Data"
        size="sm"
      >
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 rounded-2xl">
            <p className="font-bold text-amber-800 text-sm mb-1">⚠️ Reset Warning</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              This will clear your local stored profile, manifests, and timetable data.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowResetConfirm(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReset} className="flex-1">
              Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}