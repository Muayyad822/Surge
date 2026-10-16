# 🌊 Surge — Lagos Waterway Transit

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **The fastest, safest way across Lagos.**  
> Surge transforms urban transit across Lagos waterways by bypassing road gridlock with digital ferry ticketing, live vessel tracking, passenger safety profiling, and unified operator fleet management.

---

## 🚀 Overview

Traffic congestion in Lagos costs commuters over 1 billion hours each year. While the mainland and islands are connected by extensive waterways and lagoons, water transportation has historically been held back by manual ticketing, unpredictable schedules, and safety concerns.

**Surge** is a purpose-built multi-sided transit platform designed for the Lagos lagoon ecosystem:
- **For Commuters:** Instant route search, contactless QR boarding passes, real-time vessel tracking, and emergency SOS safety features.
- **For Operators:** Fleet scheduling, passenger manifest tracking, camera-based QR ticket scanning, and live departure management.

---

## ✨ Features

### 🚤 Commuter Experience
- **Interactive Route Search**: Discover ferry routes across major Lagos jetties (Ikorodu, CMS Marina, Falomo / Victoria Island, Lekki Phase 1, Badore, Ebute Ero, and Apapa).
- **Seat Booking & Fare Calculation**: Transparent pricing, travel duration estimates, and seat selection.
- **Digital QR Tickets**: Instant scannable boarding passes compatible with high-speed terminal scanners.
- **Live Vessel Tracking**: Real-time map visualization showing ferry coordinates, heading, and live ETA updates.
- **Safety Profile & SOS Dispatch**:
  - Passenger safety onboarding (swimming capability, life jacket verification, next of kin).
  - One-tap SOS button transmitting real-time coordinates and emergency contact notifications.
- **Trip History & Management**: View upcoming departures, active passes, and past journey receipts.

### ⚓ Operator & Terminal Operations
- **Operations Dashboard**: Real-time overview of active vessels, daily passenger counts, on-time performance, and revenue metrics.
- **Trip Scheduler**: Create new trips, select vessels, define route stops, departure times, capacity limits, and fares.
- **High-Speed Boarding Scanner**: Integrated camera and manual code entry for instant passenger check-in.
- **Digital Passenger Manifest**: Live passenger lists displaying emergency contacts, check-in status, and safety readiness required by maritime regulators.
- **Departure Controls**: Manage trip states from *Scheduled* → *Boarding* → *Departed* → *Docked*.
- **Fleet & Vessel Settings**: Manage terminal assignments, vessel maintenance status, and passenger limits.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router & Server Components)
- **Language**: [TypeScript 5.4](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + PostCSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) & React Context
- **QR Code Generation**: [qrcode.react](https://github.com/zpao/qrcode.react)
- **Date & Time**: [date-fns](https://date-fns.org/)

---

## 📁 Project Structure

```text
Surge/
├── public/
│   ├── assets/               # Logos, hero banners, and brand assets
│   ├── favicon.ico           # Primary website favicon
│   └── favicon.png
├── src/
│   ├── app/                  # Next.js 14 App Router
│   │   ├── auth/             # Role selection & passenger safety profile
│   │   ├── commuter/         # Commuter portal (booking, map, trips, tickets)
│   │   ├── operator/         # Operator portal (dashboard, scanner, manifest, trips)
│   │   ├── globals.css       # Tailwind & custom animation styles
│   │   ├── layout.tsx        # Root layout with font and metadata configuration
│   │   └── page.tsx          # Splash & landing redirect
│   ├── components/
│   │   ├── booking/          # Search, booking cards, and QR displays
│   │   ├── operator/         # Departure controls, manifest rows, trip forms
│   │   ├── safety/           # SOS button & emergency alerts
│   │   └── ui/               # Reusable buttons, badges, inputs, modals, cards
│   ├── context/              # Authentication & user role state
│   ├── data/                 # Lagos waterway routes, terminals & mock datasets
│   ├── hooks/                # Data fetching and local state hooks
│   ├── lib/                  # Simulation engines & safety algorithms
│   └── types/                # Core TypeScript definitions (Trips, Bookings, Vessels)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17.0 or later recommended)
- `npm` or `yarn` or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Muayyad822/Surge.git
   cd Surge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🚢 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the Next.js development server on `localhost:3000` |
| `npm run build` | Compiles the production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs Next.js ESLint checks |

---

## 🗺️ Key Lagos Waterway Terminals Supported

- **Ikorodu Terminal** (Ipakodo Ferry Terminal)
- **CMS / Marina Ferry Terminal**
- **Falomo Terminal** (Ikoyi / Victoria Island)
- **Lekki Phase 1 Jetty** (Admiralty Way)
- **Badore Jetty** (Ajah / Sangotedo corridor)
- **Ebute Ero Terminal** (Lagos Island Market)
- **Apapa Wharf Jetty**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
