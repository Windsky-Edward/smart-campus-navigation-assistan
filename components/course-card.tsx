import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Course } from "@/types";

export function CourseCard({ course, onNavigate, nextLabel = "NEXT" }: { course: Course; onNavigate: () => void; nextLabel?: string }) {
  return <Card className="min-w-[290px] overflow-hidden p-0">
    <div className="h-1.5 bg-upm"/><div className="p-5">
      <div className="flex items-start justify-between"><div><div className="text-xs font-bold tracking-wider text-upm">{course.code}</div><h3 className="mt-1 font-heading text-[17px] font-semibold text-slate-900">{course.name}</h3></div>{course.status === "next" && <span className="rounded-full bg-upm-light px-2.5 py-1 text-[10px] font-bold text-upm">{nextLabel}</span>}</div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><div className="space-y-1.5 text-xs text-slate-500"><div className="flex items-center gap-2"><Clock3 size={14}/>{course.time}–{course.endTime}</div><div className="flex items-center gap-2 font-semibold text-slate-700"><MapPin size={14} className="text-secondary"/>{course.roomCode}</div></div><button onClick={onNavigate} className="grid h-10 w-10 place-items-center rounded-xl bg-upm-light text-upm" aria-label={`Navigate to ${course.roomCode}`}><ArrowUpRight size={19}/></button></div>
    </div>
  </Card>;
}
