export type UserRole = 'commuter' | 'operator';

export interface User {
  id: string;
  fullName: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vessel {
  id: string;
  name: string;
  capacity: number;
  licenseNumber: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trip {
  id: string;
  vesselId: string;
  origin: string;
  destination: string;
  departureTime: Date;
  status: 'scheduled' | 'boarding' | 'enroute' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  vessel?: Vessel;
  occupancy?: number;
  boatName?: string;
  capacity?: number;
}

export interface Manifest {
  id: string;
  tripId: string;
  userId: string;
  checkInTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  trip?: Trip;
  user?: User;
  commuter?: User;
}

export interface Booking {
  id: string;
  tripId: string;
  userId: string;
  passengerCount: number;
  totalFare: number;
  manifestId: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  manifest?: Manifest;
  trip?: Trip;
}

export interface AuthState {
  isProfileComplete: boolean;
  userRole: UserRole;
  userId: string | null;
  walletBalance: number;
  setUserRole: (role: UserRole) => void;
  completeProfile: (uid: string) => Promise<void>;
  logout: () => Promise<void>;
  resetProfile: () => Promise<void>;
  topUpBalance: (amount: number) => Promise<void>;
  deductBalance: (amount: number) => Promise<boolean>;
}