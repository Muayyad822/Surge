// SOS Button component - GidiFerry Design System
'use client';

import { useState } from 'react';
import { AlertTriangle, Phone, Shield, Radio, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { clsx } from 'clsx';

export function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<'confirm' | 'calling' | 'sent'>('confirm');

  const handleTrigger = () => {
    setStage('confirm');
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setStage('calling');
    setTimeout(() => {
      setStage('sent');
    }, 1800);
  };

  const handleClose = () => {
    setIsOpen(false);
    setStage('confirm');
  };

  return (
    <>
      <button
        onClick={handleTrigger}
        className={clsx(
          'fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full shadow-2xl',
          'bg-red-600 hover:bg-red-700 text-white',
          'flex items-center justify-center transition-transform hover:scale-105 active:scale-95'
        )}
        aria-label="Emergency Distress Signal"
      >
        <AlertTriangle size={32} color="#FFFFFF" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
        title="Maritime Emergency Signal"
      >
        <div className="space-y-6">
          {stage === 'confirm' && (
            <>
              <div className="text-center">
                <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-600/30">
                  <ShieldAlert size={44} color="#FFFFFF" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Maritime Distress Signal</h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm mt-2">
                  This will dispatch your location directly to LASWA Emergency and your Next of Kin.
                </p>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-800 text-center">
                <p className="text-red-700 dark:text-red-300 font-bold text-xs uppercase tracking-wider mb-1">
                  GPS Status: Active
                </p>
                <p className="text-gray-600 dark:text-slate-300 text-xs font-mono">
                  Coordinates: Lat 6.448500 | Lon 3.401300 (CMS Jetty Corridor)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-2xl border border-gray-100 dark:border-slate-700 text-sm">
                  <span className="font-bold text-gray-800 dark:text-slate-200">LASWA Emergency</span>
                  <span className="text-red-600 font-bold">0800-WATER-SOS</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-2xl border border-gray-100 dark:border-slate-700 text-sm">
                  <span className="font-bold text-gray-800 dark:text-slate-200">Marine Police</span>
                  <span className="text-red-600 font-bold">112</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm} className="flex-1">
                  <Phone size={18} className="mr-2" />
                  Dispatch SOS
                </Button>
              </div>
            </>
          )}

          {stage === 'calling' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mx-auto animate-pulse">
                <Radio size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dispatching Distress Signal...
              </h3>
              <p className="text-sm text-gray-500">
                Transmitting coordinates to LASWA Patrol Vessel 04
              </p>
            </div>
          )}

          {stage === 'sent' && (
            <div className="space-y-5 text-center py-4">
              <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <Shield size={44} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Distress Broadcast Dispatched
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-300 mt-2 max-w-sm mx-auto">
                  LASWA Patrol Boat has been dispatched to your coordinates. Put on your lifejacket and remain calm.
                </p>
              </div>

              <Button onClick={handleClose} variant="primary" fullWidth size="lg">
                Understood & Standing By
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}