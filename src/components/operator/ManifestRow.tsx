// ManifestRow component for operator manifest viewer - Mature Marine Transit Design
'use client';

import { User, CheckCircle2, Circle, Phone, Shield } from 'lucide-react';
import { clsx } from 'clsx';
import { Manifest } from '@/types';
import { Button } from '@/components/ui/Button';

interface ManifestRowProps {
  passenger: Manifest;
  onCheckIn: (manifestId: string) => void;
}

export function ManifestRow({ passenger, onCheckIn }: ManifestRowProps) {
  const isCheckedIn = !!passenger.checkInTime;

  return (
    <div className="flex items-center justify-between py-3.5 px-4 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#142338] transition-colors">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className={clsx(
          'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-mono font-bold text-xs',
          isCheckedIn
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
        )}>
          {passenger.user?.fullName ? passenger.user.fullName.substring(0, 2).toUpperCase() : 'PA'}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
              {passenger.user?.fullName || 'Registered Passenger'}
            </p>
            <span className="text-[10px] font-mono text-slate-400">
              #{passenger.id.slice(-5).toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
            {passenger.user?.phone && (
              <span className="flex items-center gap-1 font-mono">
                <Phone size={12} className="text-slate-400" />
                {passenger.user.phone}
              </span>
            )}
            {passenger.user?.emergencyContactPhone && (
              <span className="text-[10px] text-slate-400">
                (NOK: {passenger.user.emergencyContactPhone})
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {isCheckedIn ? (
          <span className="px-2.5 py-1 rounded bg-[#059669] text-white text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-1">
            <CheckCircle2 size={13} />
            <span>BOARDED</span>
          </span>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onCheckIn(passenger.id)}
            className="text-xs font-mono font-bold"
          >
            Gate Check-in
          </Button>
        )}
      </div>
    </div>
  );
}