"use client";
import { useState } from "react";
import { CheckCircle2, Eye, EyeOff, ScanFace, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpmLogo } from "@/components/upm-logo";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");
  const [faceScan, setFaceScan] = useState(false);

  const handleFaceLogin = () => {
    setFaceScan(true);
    setMessage("Face ID verified for demo account.");
    window.setTimeout(onLogin, 650);
  };

  return <main className="flex min-h-dvh items-center justify-center p-0 sm:p-6">
    <section className="relative flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-white px-7 pb-8 pt-10 sm:min-h-[820px] sm:rounded-[36px] sm:shadow-float">
      <div className="absolute -right-24 -top-20 h-64 w-64 rounded-full bg-upm-light" />
      <div className="absolute right-10 top-16 h-20 w-20 rounded-full border-[18px] border-[#F7C948]/20" />
      <div className="relative"><UpmLogo /></div>
      <div className="relative mt-24">
        <span className="rounded-full bg-upm-light px-3 py-1.5 text-xs font-bold text-upm">WELCOME TO UPM</span>
        <h1 className="mt-5 font-heading text-[34px] font-semibold leading-[1.15] text-slate-900">Your campus,<br/><span className="text-upm">made simple.</span></h1>
        <p className="mt-3 max-w-xs text-[15px] leading-6 text-slate-500">Find every class, decode every room and arrive with confidence.</p>
      </div>
      <form className="relative mt-10 space-y-4" onSubmit={(event) => { event.preventDefault(); onLogin(); }}>
        <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Matrix number</span><Input defaultValue="GS62814" aria-label="Matrix number" /></label>
        <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Password</span><div className="relative"><Input type={showPassword ? "text" : "password"} defaultValue="upmnavigate" className="pr-12" aria-label="Password"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400" aria-label="Toggle password visibility">{showPassword ? <EyeOff size={19}/> : <Eye size={19}/>}</button></div></label>
        <div className="flex items-center justify-between py-1 text-sm"><label className="flex cursor-pointer items-center gap-2.5 text-slate-600"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 accent-upm"/>Remember me</label><button type="button" onClick={() => setMessage("A reset link would be sent to the student's registered email.")} className="font-semibold text-upm">Forgot password?</button></div>
        {message && <div className="flex items-start gap-2 rounded-2xl bg-upm-light px-3 py-2 text-xs font-semibold leading-5 text-upm"><CheckCircle2 className="mt-0.5 shrink-0" size={15}/>{message}</div>}
        <Button className="w-full" size="lg" type="submit" onClick={onLogin}>Login securely <ShieldCheck size={18}/></Button>
        <div className="flex items-center gap-3 py-1"><span className="h-px flex-1 bg-slate-100"/><span className="text-xs text-slate-400">or continue with</span><span className="h-px flex-1 bg-slate-100"/></div>
        <Button type="button" variant="outline" size="lg" className="w-full" onClick={handleFaceLogin} disabled={faceScan}><ScanFace size={21} className="text-upm"/> {faceScan ? "Verifying Face ID..." : "Login with Face ID"}</Button>
      </form>
      <p className="mt-auto pt-7 text-center text-[11px] leading-5 text-slate-400">Official prototype for UPM students<br/>Secure access - Student data protected</p>
    </section>
  </main>;
}
