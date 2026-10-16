// DepartureTrigger component for operators - Mature Marine Transit Design
'use client';

import { useState } from 'react';
import { Ship, Play, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { clsx } from 'clsx';
import { Trip } from '@/types';
import { getTripStatusColor, getTripStatusLabel } from '@/lib/safetyLogic';

interface DepartureTriggerProps {
  trip: Trip;
  onStatusChange: (status: Trip['status']) => void;
}

export function DepartureTrigger({ trip, onStatusChange }: DepartureTriggerProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const canBoard = trip.status === 'scheduled';
  const canDepart = trip.status === 'boarding';
  const canComplete = trip.status === 'enroute';

  const nextStatus = canBoard ? 'boarding' : canDepart ? 'enroute' : canComplete ? 'completed' : null;
  const nextStatusLabel = nextStatus ? getTripStatusLabel(nextStatus) : '';
  const nextIcon = canBoard ? Play : canDepart ? Ship : CheckCircle2;
  const NextIcon = nextIcon;

  const handleConfirm = () => {
    if (nextStatus) {
      onStatusChange(nextStatus);
    }
    setShowConfirm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <p className="text-[11px] font-mono font-bold text-slate-500 uppercase">Voyage Operational Status</p>
          <div className="mt-1">
            <Badge className={clsx('text-xs px-2.5 py-1', getTripStatusColor(trip.status))}>
              {getTripStatusLabel(trip.status)}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-slate-400">TRIP #{trip.id.slice(-4).toUpperCase()}</span>
          <p className="text-xs text-slate-500">Berth Clearance Active</p>
        </div>
      </div>

      {nextStatus && (
        <Button
          onClick={() => setShowConfirm(true)}
          variant={nextStatus === 'completed' ? 'success' : nextStatus === 'boarding' ? 'nautical' : 'primary'}
          fullWidth
          size="lg"
          className="gap-2.5 font-bold tracking-wider"
        >
          <NextIcon size={20} />
          <span>Authorize & Execute {nextStatusLabel}</span>
        </Button>
      )}

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        size="sm"
        title={`Authorize ${nextStatusLabel} Clearance`}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-100 dark:bg-[#142338] border border-slate-300 dark:border-slate-700 flex items-start gap-3">
            <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              This action updates the official passenger manifest, transmits vessel departure telemetry to LASWA Central Control, and notifies all booked commuters.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowConfirm(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              variant={nextStatus === 'completed' ? 'success' : nextStatus === 'boarding' ? 'nautical' : 'primary'}
              onClick={handleConfirm}
              className="flex-1"
            >
              Confirm Clearance
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}