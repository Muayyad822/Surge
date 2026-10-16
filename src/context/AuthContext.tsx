// Auth context using Zustand for state management

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserRole, AuthState } from '@/types';

interface AuthStore extends AuthState {
  // Actions
  setUserRole: (role: UserRole) => void;
  completeProfile: (uid: string) => Promise<void>;
  logout: () => Promise<void>;
  resetProfile: () => Promise<void>;
  topUpBalance: (amount: number) => Promise<void>;
  deductBalance: (amount: number) => Promise<boolean>;
  // Demo helpers
  setDemoMode: (enabled: boolean) => void;
  demoMode: boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isProfileComplete: false,
      userRole: 'commuter',
      userId: null,
      walletBalance: 24500,
      demoMode: true,

      // Actions
      setUserRole: (role: UserRole) => {
        set({ userRole: role });
      },

      completeProfile: async (uid: string) => {
        set({ userId: uid, isProfileComplete: true });
      },

      logout: async () => {
        set({ userId: null, isProfileComplete: false });
      },

      resetProfile: async () => {
        set({
          isProfileComplete: false,
          userRole: 'commuter',
          userId: null,
          walletBalance: 24500,
        });
      },

      topUpBalance: async (amount: number) => {
        const newBalance = get().walletBalance + amount;
        set({ walletBalance: newBalance });
      },

      deductBalance: async (amount: number): Promise<boolean> => {
        const currentBalance = get().walletBalance;
        if (currentBalance < amount) return false;
        set({ walletBalance: currentBalance - amount });
        return true;
      },

      setDemoMode: (enabled: boolean) => {
        set({ demoMode: enabled });
      },
    }),
    {
      name: 'surge-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isProfileComplete: state.isProfileComplete,
        userRole: state.userRole,
        userId: state.userId,
        walletBalance: state.walletBalance,
        demoMode: state.demoMode,
      }),
    }
  )
);

// Hook for easy access
export const useAuth = () => useAuthStore();