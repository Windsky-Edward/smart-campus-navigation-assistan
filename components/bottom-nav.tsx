"use client";
import { Home, Languages, MapPinned, Search, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Screen } from "@/types";

const items = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "search" as const, label: "Search", icon: Search },
  { id: "translator" as const, label: "Translate", icon: Languages },
  { id: "navigation" as const, label: "Navigate", icon: MapPinned },
  { id: "profile" as const, label: "Profile", icon: UserRound },
];
export function BottomNav({ active, onChange, labels }: { active: Screen; onChange: (screen: Screen) => void; labels?: Partial<Record<Screen, string>> }) {
  return <nav className="safe-bottom absolute bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white/95 px-3 pt-2 backdrop-blur-xl">
    <div className="mx-auto flex max-w-lg justify-around">{items.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onChange(id)} className={cn("relative flex min-w-[58px] flex-col items-center gap-1 rounded-2xl px-2 py-1.5 text-[10px] font-semibold transition", active === id ? "text-upm" : "text-slate-400 hover:text-slate-600")} aria-label={labels?.[id] ?? label}>
      {active === id && <span className="absolute -top-2 h-1 w-5 rounded-full bg-upm"/>}<Icon size={21} strokeWidth={active === id ? 2.7 : 2}/><span>{labels?.[id] ?? label}</span>
    </button>)}</div>
  </nav>;
}
