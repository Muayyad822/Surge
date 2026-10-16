// Simulation layer for demo mode - simulates backend operations

import { Trip, Vessel, Manifest, Booking, User } from '@/types';
import {
  mockTrips,
  mockVessels,
  mockManifests,
  mockBookings,
  mockUsers,
  jetties,
  farePerPassenger,
} from '@/data/mockData';
import { isNightBanActive, canIssueTicket } from '@/lib/safetyLogic';

// Simulated delay for realistic feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory state for demo
let trips = [...mockTrips];
let vessels = [...mockVessels];
let manifests = [...mockManifests];
let bookings = [...mockBookings];
let users = [...mockUsers];

let nextTripId = 8;
let nextManifestId = 4;
let nextBookingId = 4;

export const simulation = {
  // Trip operations
  async getTrips(filters?: { origin?: string; destination?: string; status?: string }): Promise<Trip[]> {
    await delay(300);
    let result = trips.filter(t => t.status !== 'completed');
    
    if (filters?.origin) {
      result = result.filter(t => t.origin === filters.origin);
    }
    if (filters?.destination) {
      result = result.filter(t => t.destination === filters.destination);
    }
    if (filters?.status) {
      result = result.filter(t => t.status === filters.status);
    }
    
    // Enrich with vessel data
    return result.map(trip => ({
      ...trip,
      vessel: vessels.find(v => v.id === trip.vesselId),
      occupancy: manifests.filter(m => m.tripId === trip.id).length,
    }));
  },

  async getTripById(id: string): Promise<Trip | null> {
    await delay(200);
    const trip = trips.find(t => t.id === id);
    if (!trip) return null;
    
    return {
      ...trip,
      vessel: vessels.find(v => v.id === trip.vesselId),
      occupancy: manifests.filter(m => m.tripId === trip.id).length,
    };
  },

  async createTrip(data: { vesselId: string; origin: string; destination: string; departureTime: Date }): Promise<Trip> {
    await delay(500);
    
    // Validate night ban
    if (isNightBanActive(data.departureTime)) {
      throw new Error('Maritime regulation prohibits trip scheduling after 18:30 (6:30 PM) for passenger safety.');
    }
    
    // Validate vessel capacity
    const vessel = vessels.find(v => v.id === data.vesselId);
    if (!vessel) throw new Error('Vessel not found');
    
    const newTrip: Trip = {
      id: `trip_${String(nextTripId++).padStart(3, '0')}`,
      vesselId: data.vesselId,
      origin: data.origin,
      destination: data.destination,
      departureTime: data.departureTime,
      status: 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date(),
      vessel,
      occupancy: 0,
    };
    
    trips.push(newTrip);
    return newTrip;
  },

  async updateTripStatus(id: string, status: Trip['status']): Promise<Trip | null> {
    await delay(300);
    const tripIndex = trips.findIndex(t => t.id === id);
    if (tripIndex === -1) return null;
    
    trips[tripIndex] = {
      ...trips[tripIndex],
      status,
      updatedAt: new Date(),
    };
    
    return trips[tripIndex];
  },

  // Vessel operations
  async getVessels(): Promise<Vessel[]> {
    await delay(200);
    return [...vessels];
  },

  async getVesselById(id: string): Promise<Vessel | null> {
    await delay(150);
    return vessels.find(v => v.id === id) || null;
  },

  // Manifest operations
  async getManifestByTripId(tripId: string): Promise<Manifest[]> {
    await delay(250);
    return manifests
      .filter(m => m.tripId === tripId)
      .map(m => ({
        ...m,
        trip: trips.find(t => t.id === m.tripId),
        user: users.find(u => u.id === m.userId),
      }));
  },

  async checkInPassenger(manifestId: string): Promise<Manifest | null> {
    await delay(400);
    const manifestIndex = manifests.findIndex(m => m.id === manifestId);
    if (manifestIndex === -1) return null;
    
    if (manifests[manifestIndex].checkInTime) {
      throw new Error('Passenger already checked in');
    }
    
    manifests[manifestIndex] = {
      ...manifests[manifestIndex],
      checkInTime: new Date(),
      updatedAt: new Date(),
    };
    
    return {
      ...manifests[manifestIndex],
      trip: trips.find(t => t.id === manifests[manifestIndex].tripId),
      user: users.find(u => u.id === manifests[manifestIndex].userId),
    };
  },

  // Booking operations
  async bookTicket(userId: string, tripId: string, passengerCount: number): Promise<{ booking: Booking; manifest: Manifest }> {
    await delay(600);
    
    const trip = trips.find(t => t.id === tripId);
    if (!trip) throw new Error('Trip not found');
    
    const vessel = vessels.find(v => v.id === trip.vesselId);
    if (!vessel) throw new Error('Vessel not found');
    
    const currentOccupancy = manifests.filter(m => m.tripId === tripId).length;
    
    // Check capacity
    if (!canIssueTicket(currentOccupancy + passengerCount, vessel.capacity)) {
      throw new Error('Vessel has reached maximum capacity');
    }
    
    // Check night ban
    if (isNightBanActive(trip.departureTime)) {
      throw new Error('Cannot book trips after 18:30 due to maritime night ban');
    }
    
    const totalFare = passengerCount * farePerPassenger;
    
    const newManifest: Manifest = {
      id: `manifest_${String(nextManifestId++).padStart(3, '0')}`,
      tripId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const newBooking: Booking = {
      id: `booking_${String(nextBookingId++).padStart(3, '0')}`,
      tripId,
      userId,
      passengerCount,
      totalFare,
      manifestId: newManifest.id,
      status: 'confirmed',
      createdAt: new Date(),
    };
    
    manifests.push(newManifest);
    bookings.push(newBooking);
    
    return { booking: newBooking, manifest: newManifest };
  },

  async getUserBookings(userId: string): Promise<(Booking & { manifest: Manifest; trip: Trip })[]> {
    await delay(300);
    return bookings
      .filter(b => b.userId === userId)
      .map(booking => {
        const manifest = manifests.find(m => m.id === booking.manifestId);
        const trip = trips.find(t => t.id === booking.tripId);
        return {
          ...booking,
          manifest: manifest!,
          trip: trip!,
        };
      });
  },

  // User operations
  async getUserById(id: string): Promise<User | null> {
    await delay(150);
    return users.find(u => u.id === id) || null;
  },

  // Utility
  getJetties(): string[] {
    return [...jetties];
  },

  getFarePerPassenger(): number {
    return farePerPassenger;
  },

  // Demo helpers
  resetToDefaults() {
    trips = [...mockTrips];
    vessels = [...mockVessels];
    manifests = [...mockManifests];
    bookings = [...mockBookings];
    users = [...mockUsers];
    nextTripId = 8;
    nextManifestId = 4;
    nextBookingId = 4;
  },

  // Simulate real-time updates
  subscribeToTripUpdates(tripId: string, callback: (trip: Trip) => void): () => void {
    // Simulate periodic updates
    const interval = setInterval(async () => {
      const trip = await this.getTripById(tripId);
      if (trip) callback(trip);
    }, 5000);
    
    return () => clearInterval(interval);
  },
};