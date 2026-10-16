'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/context/AuthContext';
import { Shield } from 'lucide-react';

export default function RoleSelectionPage() {
  const router = useRouter();
  const { setUserRole } = useAuthStore();
  const [loadingRole, setLoadingRole] = useState<'commuter' | 'operator' | null>(null);

  const handleRoleSelect = (role: 'commuter' | 'operator') => {
    setLoadingRole(role);
    setUserRole(role);
    setTimeout(() => {
      router.push('/auth/safety-profile');
    }, 200);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-end bg-slate-900 overflow-hidden font-sans">
      {/* Background Hero Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/lagos_waterway_hero.png')" }}
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Main Content Card matching GidiFerry */}
      <div className="relative z-10 w-full max-w-xl mx-auto p-4 sm:p-6 mb-4 sm:mb-8">
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[48px] shadow-2xl border border-gray-100 dark:border-slate-800">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-20 h-20 relative mb-4">
              <Image 
                src="/assets/GidiFerry-icon.png" 
                alt="Surge Waterways" 
                width={80} 
                height={80} 
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0070C0] tracking-tight">
              Surge
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-lg sm:text-xl mt-2 font-medium">
              The fastest way across Lagos.
            </p>
          </div>

          <div className="space-y-4">
            <button 
              type="button"
              disabled={loadingRole !== null}
              onClick={() => handleRoleSelect('commuter')}
              className="w-full bg-[#0070C0] hover:bg-[#005A9C] text-white p-5 sm:p-6 rounded-3xl font-bold text-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-center cursor-pointer"
            >
              {loadingRole === 'commuter' ? 'Entering Terminal...' : 'I am a Commuter'}
            </button>

            <button 
              type="button"
              disabled={loadingRole !== null}
              onClick={() => handleRoleSelect('operator')}
              className="w-full bg-[#0BD6FF]/10 hover:bg-[#0BD6FF]/20 text-[#0070C0] dark:text-[#38BDF8] p-5 sm:p-6 rounded-3xl font-bold text-xl border-2 border-[#0BD6FF]/30 transition-all active:scale-[0.99] flex items-center justify-center cursor-pointer"
            >
              {loadingRole === 'operator' ? 'Connecting Deck...' : 'I am an Operator'}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-slate-500">
            <Shield size={14} className="text-[#0070C0]" />
            <span>Lagos State Waterways Authority (LASWA) Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}