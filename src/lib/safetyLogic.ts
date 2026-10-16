// Safety logic utilities for Surge - Mature Marine Transit Design

export const isNightBanActive = (departureDate: Date): boolean => {
  const hours = departureDate.getHours();
  const minutes = departureDate.getMinutes();

  // 18:30 is 6:30 PM - Lagos maritime night ban
  if (hours > 18 || (hours === 18 && minutes >= 30)) {
    return true; // Ban is active
  }
  return false;
};

export const canIssueTicket = (vesselOccupancy: number, vesselCapacity: number): boolean => {
  if (vesselOccupancy >= vesselCapacity) {
    return false; // Vessel is full or overloaded
  }
  return true; // Safe to issue
};

export const getTripStatusColor = (status: string): string => {
  switch (status) {
    case 'scheduled':
      return 'bg-[#0A192F] text-sky-200 border border-[#1A3B69]';
    case 'boarding':
      return 'bg-[#D97706] text-white border border-[#B45309]';
    case 'enroute':
      return 'bg-[#0284C7] text-white border border-[#0369A1]';
    case 'completed':
      return 'bg-slate-700 text-slate-100 border border-slate-600';
    case 'cancelled':
      return 'bg-[#DC2626] text-white border border-[#B91C1C]';
    default:
      return 'bg-slate-700 text-slate-100 border border-slate-600';
  }
};

export const getTripStatusLabel = (status: string): string => {
  switch (status) {
    case 'scheduled':
      return 'Scheduled';
    case 'boarding':
      return 'Boarding';
    case 'enroute':
      return 'En Route';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};