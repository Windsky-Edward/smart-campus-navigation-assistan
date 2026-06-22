import { Building2, LocateFixed, Minus, Navigation, Plus, Trees } from "lucide-react";
import type { Location } from "@/types";

type RouteInstruction = {
  title: string;
  detail: string;
  progress: number;
};

const routeStyles: Record<string, {
  label: string;
  landmark: string;
  path: string;
  destinationClass: string;
  markerClass: string;
  traveler: Array<{ left: string; top: string; rotate: number; label: string }>;
}> = {
  fsktm: {
    label: "FSKTM A1",
    landmark: "Central Library",
    path: "M75,355 C85,300 130,300 142,250 S175,185 220,190 S270,148 300,78",
    destinationClass: "right-[17%] top-[12%]",
    markerClass: "left-[48%] top-[42%]",
    traveler: [
      { left: "14%", top: "83%", rotate: -20, label: "Start" },
      { left: "35%", top: "61%", rotate: -8, label: "Walk north" },
      { left: "55%", top: "46%", rotate: 38, label: "Library area" },
      { left: "74%", top: "18%", rotate: 18, label: "Arrive" },
    ],
  },
  dkap: {
    label: "DKAP C2",
    landmark: "Engineering Gate",
    path: "M75,355 C110,320 105,270 155,250 S215,260 232,210 S250,122 318,118",
    destinationClass: "right-[11%] top-[23%]",
    markerClass: "left-[38%] top-[50%]",
    traveler: [
      { left: "14%", top: "83%", rotate: -20, label: "Start" },
      { left: "35%", top: "62%", rotate: 18, label: "Main path" },
      { left: "56%", top: "51%", rotate: -14, label: "Engineering gate" },
      { left: "79%", top: "28%", rotate: 30, label: "Arrive" },
    ],
  },
  iputra: {
    label: "I-PUTRA",
    landmark: "Great Hall",
    path: "M75,355 C115,325 142,300 142,250 S125,190 185,172 S250,170 275,112",
    destinationClass: "right-[21%] top-[21%]",
    markerClass: "left-[32%] top-[39%]",
    traveler: [
      { left: "14%", top: "83%", rotate: -20, label: "Start" },
      { left: "35%", top: "63%", rotate: -18, label: "Main path" },
      { left: "47%", top: "42%", rotate: 35, label: "Great Hall" },
      { left: "68%", top: "27%", rotate: 22, label: "Arrive" },
    ],
  },
  dewan: {
    label: "DEWAN B",
    landmark: "Clock Tower",
    path: "M75,355 C105,310 150,320 180,275 S188,202 244,204 S314,185 322,98",
    destinationClass: "right-[10%] top-[18%]",
    markerClass: "left-[56%] top-[47%]",
    traveler: [
      { left: "14%", top: "83%", rotate: -20, label: "Start" },
      { left: "44%", top: "67%", rotate: -6, label: "Main path" },
      { left: "61%", top: "50%", rotate: 42, label: "Clock tower" },
      { left: "81%", top: "24%", rotate: 18, label: "Arrive" },
    ],
  },
  library: {
    label: "PSAS",
    landmark: "Lake Steps",
    path: "M75,355 C92,302 120,285 160,270 S190,235 210,205 S232,160 260,132",
    destinationClass: "right-[27%] top-[25%]",
    markerClass: "left-[44%] top-[50%]",
    traveler: [
      { left: "14%", top: "83%", rotate: -20, label: "Start" },
      { left: "34%", top: "66%", rotate: 14, label: "Main path" },
      { left: "50%", top: "51%", rotate: 26, label: "Lake steps" },
      { left: "65%", top: "32%", rotate: 22, label: "Arrive" },
    ],
  },
};

function getTravelerPosition(progress: number, traveler: Array<{ left: string; top: string; rotate: number; label: string }>) {
  if (progress >= 100) return traveler[3];
  if (progress >= 70) return traveler[2];
  if (progress >= 35) return traveler[1];
  return traveler[0];
}

export function RouteMap({ compact = false, selected, progress = 0, instruction }: { compact?: boolean; selected: Location; progress?: number; instruction?: RouteInstruction }) {
  const route = routeStyles[selected.id] ?? routeStyles.fsktm;
  const travelerPosition = getTravelerPosition(progress, route.traveler);
  const routeDashOffset = 100 - progress;

  return <div className={`map-grid relative overflow-hidden ${compact ? "h-[270px]" : "h-[410px]"}`}>
    <div className="absolute -left-8 top-12 h-24 w-52 rotate-[-18deg] rounded-[40px] border-[18px] border-white/90"/>
    <div className="absolute -right-10 top-24 h-24 w-60 rotate-[12deg] rounded-[40px] border-[18px] border-white/90"/>
    <div className="absolute bottom-6 left-5 rounded-2xl bg-white/70 p-3 text-upm/40"><Trees size={35}/></div>
    <div className="absolute right-7 top-8 rounded-2xl bg-white/80 p-3 text-slate-400"><Building2 size={30}/></div>
    {instruction && <div className="absolute left-4 right-4 top-4 z-10 rounded-2xl border border-upm/10 bg-white/95 px-4 py-3 shadow-card">
      <div className="text-[10px] font-bold uppercase tracking-wider text-upm">Map is following: {travelerPosition.label}</div>
      <div className="mt-0.5 truncate font-heading text-sm font-semibold text-slate-900">{instruction.title}</div>
    </div>}
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-label={`Route from current location to ${selected.code}`}>
      <path d={route.path} fill="none" stroke="white" strokeWidth="15" strokeLinecap="round"/>
      <path d={route.path} fill="none" stroke="#F3B5BA" strokeWidth="8" strokeLinecap="round" strokeDasharray="2 1"/>
      <path d={route.path} fill="none" stroke="#B5121B" strokeWidth="8" strokeLinecap="round" strokeDasharray="100 100" strokeDashoffset={routeDashOffset} pathLength="100" className="transition-all duration-700 ease-out"/>
    </svg>
    <div
      className="absolute z-10 grid h-9 w-9 place-items-center rounded-full border-[3px] border-white bg-secondary shadow-lg transition-all duration-700 ease-out"
      style={{ left: travelerPosition.left, top: travelerPosition.top, transform: "translate(-50%, -50%)" }}
    >
      <span className="absolute -inset-2 rounded-full bg-secondary/20"/>
      <Navigation size={16} className="relative fill-white text-white transition-transform duration-700" style={{ transform: `rotate(${travelerPosition.rotate}deg)` }}/>
    </div>
    <div
      className="absolute z-10 max-w-[150px] rounded-xl bg-white px-3 py-2 text-[10px] font-bold leading-4 text-secondary shadow-md transition-all duration-700 ease-out"
      style={{ left: travelerPosition.left, top: travelerPosition.top, transform: "translate(-14px, 24px)" }}
    >
      You: {instruction ? instruction.title : "Ready"}
    </div>
    <div className={`absolute rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-600 shadow-md ${route.markerClass}`}>{route.landmark}</div>
    <div className={`absolute ${route.destinationClass}`}>
      <div className="absolute -inset-3 animate-pulse-ring rounded-full bg-upm/20"/>
      <div className="relative grid h-10 w-10 place-items-center rounded-full border-[3px] border-white bg-upm text-white shadow-lg"><Building2 size={18}/></div>
      <div className="absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[10px] font-bold text-white">{route.label}</div>
    </div>
    <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col rounded-xl bg-white shadow-card">
      <button className="grid h-10 w-10 place-items-center border-b border-slate-100" aria-label="Zoom in"><Plus size={17}/></button>
      <button className="grid h-10 w-10 place-items-center" aria-label="Zoom out"><Minus size={17}/></button>
    </div>
    <button className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-secondary shadow-card" aria-label="Center current location"><LocateFixed size={20}/></button>
  </div>;
}
