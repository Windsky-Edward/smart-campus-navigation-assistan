export function UpmLogo({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3">
    <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[17px] bg-upm text-white shadow-lg shadow-upm/20">
      <span className="font-heading text-xl font-bold tracking-tight">U</span>
      <span className="absolute bottom-0 left-0 h-1.5 w-full bg-white/85" />
    </div>
    {!compact && <div><div className="font-heading text-[15px] font-bold leading-tight text-upm-dark">UPM NAVIGATE</div><div className="text-[10px] font-semibold tracking-[.16em] text-slate-400">SMART CAMPUS</div></div>}
  </div>;
}
