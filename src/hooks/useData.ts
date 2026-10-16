// Custom hooks for data fetching

import { useState, useEffect, useCallback } from 'react';
import { simulation } from '@/lib/simulation';
import { Trip, Manifest, Booking, Vessel } from '@/types';

// Trip hooks
export function useTrips(filters?: { origin?: string; destination?: string }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await simulation.getTrips(filters);
      setTrips(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  }, [filters?.origin, filters?.destination]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return { trips, loading, error, refetch: fetchTrips };
}

export function useTrip(tripId: string) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await simulation.getTripById(tripId);
        setTrip(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trip');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();

    // Subscribe to real-time updates
    const unsubscribe = simulation.subscribeToTripUpdates(tripId, (updatedTrip) => {
      setTrip(updatedTrip);
    });

    return () => unsubscribe();
  }, [tripId]);

  return { trip, loading, error };
}

// Vessel hooks
export function useVessels() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVessels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await simulation.getVessels();
      setVessels(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vessels');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVessels();
  }, [fetchVessels]);

  return { vessels, loading, error, refetch: fetchVessels };
}

// Manifest hooks
export function useManifest(tripId: string) {
  const [passengers, setPassengers] = useState<Manifest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchManifest = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await simulation.getManifestByTripId(tripId);
      setPassengers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch manifest');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchManifest();
  }, [fetchManifest]);

  const checkIn = async (manifestId: string) => {
    try {
      const updated = await simulation.checkInPassenger(manifestId);
      if (updated) {
        setPassengers(prev => prev.map(p => p.id === manifestId ? updated : p));
      }
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return { passengers, loading, error, checkIn, refetch: fetchManifest };
}

// Booking hooks
export function useBookings(userId?: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await simulation.getUserBookings(userId || '');
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, loading, error, refetch: fetchBookings };
}

export function useBookTicket() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookTicket = async (userId: string, tripId: string, passengerCount: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await simulation.bookTicket(userId, tripId, passengerCount);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to book ticket';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { bookTicket, loading, error };
}

// Utility hooks
export function useJetties() {
  return simulation.getJetties();
}

export function useFarePerPassenger() {
  return simulation.getFarePerPassenger();
}