# Smart Campus Navigation Assistant

A production-style mobile-first prototype for international students navigating Universiti Putra Malaysia. It unifies timetable context, ESMP room-code translation, classroom discovery, landmark guidance, and walking navigation in one interface.

## Features

- Secure-style matrix number, password, and Face ID login
- Home dashboard with today’s timetable and quick actions
- Fuzzy classroom search by ESMP code, course, building, or common name
- ESMP translator with human-readable block, level, room, and landmarks
- Destination verification and live-style route guidance with ETA, distance, and pace
- Profile, academic details, and language preferences
- Consistent mobile bottom navigation and responsive desktop device frame
- Local JSON mock data with no API or account required

## Tech stack

- Next.js 14 App Router
- React 18 and TypeScript
- Tailwind CSS
- Local shadcn/ui-style primitives using Radix UI
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The demo credentials are prefilled; any values can be submitted. Face ID is also interactive.

## Production build

```bash
npm run build
npm start
```

## Project structure

```text
app/                  Next.js app entry, layout, and global styles
components/           Screens, map, navigation, and reusable UI
components/ui/        shadcn-style Button, Card, Input, and Progress
data/campus.json      Mock student, course, and campus location data
lib/utils.ts          Tailwind class merging helper
types/index.ts        Shared TypeScript application types
```

## Prototype notes

Route geometry and location status are intentionally mocked. The experience is fully navigable and demonstrates the intended production flow without connecting to ESMP, GPS, or Google Maps.
