"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Bell, BookOpen, Building2, CalendarDays, Check, ChevronRight, Clipboard, Clock3, Compass, Copy, GraduationCap, Info, Languages, LocateFixed, LogOut, MapPin, Navigation, Pause, Play, Search, Settings2, ShieldCheck, Sparkles, X, type LucideIcon } from "lucide-react";
import campus from "@/data/campus.json";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CourseCard } from "@/components/course-card";
import { RouteMap } from "@/components/route-map";
import { UpmLogo } from "@/components/upm-logo";
import { cn } from "@/lib/utils";
import type { Course, Location, Screen } from "@/types";

const locations = campus.locations as Location[];
const courses = campus.courses as Course[];

type Language = "English" | "Chinese" | "Bahasa Melayu";
type Notice = { title: string; body: string };

const copy = {
  English: {
    nav: { home: "Home", search: "Search", translator: "Translate", navigation: "Navigate", profile: "Profile" },
    common: { active: "Active", next: "NEXT", close: "Close", viewAll: "View all", clear: "Clear", copy: "Copy", copied: "Copied", backHome: "Back home", replay: "Replay" },
    home: {
      greeting: "Good morning, Aisha",
      hero: "Where are you\nheading today?",
      searchPlaceholder: "Search class, course or building",
      schedule: "Today's schedule",
      fullDay: "Full day overview",
      quick: "Quick access",
      decode: "Decode ESMP",
      decodeSub: "Understand room codes",
      explore: "Explore campus",
      exploreSub: "Browse popular places",
      current: "CURRENT LOCATION",
      live: "Live",
      locationNoticeTitle: "Location refreshed",
      locationNoticeBody: "Demo GPS is locked to Kolej Canselor for this walkthrough.",
    },
    search: {
      title: "Find a classroom",
      subtitle: "Search by room code or course",
      placeholder: "Try FSKTM A1-02 or SSE3200",
      helper: "Smart search checks codes, courses and common names",
      suggestions: "Suggestions",
      found: "found",
      noMatch: "No exact match",
      noMatchSub: "Check the code, or try a course name.",
      recent: "Recent searches",
      recentEmpty: "Recent searches cleared for this demo session.",
      popular: "Popular locations",
    },
    translator: {
      title: "ESMP translator",
      subtitle: "Codes, explained in plain language",
      enter: "ENTER CLASSROOM CODE",
      directory: "Demo directory loaded from campus sample data",
      matched: "Matched",
      noMatch: "No exact demo match. Try FSKTM, DKAP, PSAS, I-PUTRA or DEWAN.",
      result: "Translation result",
      block: "BLOCK",
      level: "LEVEL",
      room: "ROOM",
      landmark: "Landmark guide",
      start: "Start navigation",
      verify: "You can verify the destination before the route begins",
    },
    route: {
      destination: "Destination",
      eta: "ETA",
      distance: "DISTANCE",
      pace: "PACE",
      confirm: "Confirm your destination",
      notCorrect: "Not correct",
      yesStart: "Yes, start route",
      reached: "Destination reached",
      paused: "Route paused",
      step: "Step",
      of: "of",
      leave: "Leave Kolej Canselor",
      leaveDetail: "Walk to the main pedestrian path near the bus stop.",
      head: "Head towards",
      headDetail: "Stay on the shaded walkway and follow the red campus markers.",
      visible: "The destination landmark should now be visible ahead.",
      arrived: "Arrived at",
      ready: "is ready for check-in.",
      progress: "Route progress",
      arrivedNote: "You have arrived. Show this screen to confirm the classroom.",
      pausedNote: "Simulation paused. Resume to continue the route demo.",
      movingNote: "Live demo is moving to the next instruction automatically.",
      quit: "Quit",
      resume: "Resume",
      pause: "Pause",
      nextStep: "Next step",
      now: "Now",
    },
    profile: {
      title: "My profile",
      subtitle: "Student account and preferences",
      international: "International student",
      academic: "Academic details",
      faculty: "Faculty",
      programme: "Programme",
      matrix: "Matrix number",
      language: "Language preference",
      saved: "Language saved",
      preview: "Navigation prompts and profile labels are shown in English.",
      samples: ["Today's schedule", "Start navigation", "You are on the right path"],
      applied: "Applied to this prototype session",
      settings: "App settings",
      pace: "Walking pace: Normal",
      units: "Units: Metric",
      alerts: "Route alerts: On",
      offline: "Offline map: Ready",
      logout: "Log out",
    },
    notice: { title: "Next class reminder", body: "SSE3200 starts at 10:00 AM in FSKTM A1-02. Suggested departure: 9:52 AM." },
  },
  Chinese: {
    nav: { home: "首页", search: "搜索", translator: "翻译", navigation: "导航", profile: "我的" },
    common: { active: "已启用", next: "下一节", close: "收起", viewAll: "查看全部", clear: "清空", copy: "复制", copied: "已复制", backHome: "回首页", replay: "重播" },
    home: {
      greeting: "早上好，Aisha",
      hero: "今天要去\n哪里上课？",
      searchPlaceholder: "搜索课程、教室或建筑",
      schedule: "今日课表",
      fullDay: "全天课程总览",
      quick: "快捷入口",
      decode: "解析 ESMP",
      decodeSub: "看懂教室代码",
      explore: "探索校园",
      exploreSub: "浏览热门地点",
      current: "当前位置",
      live: "实时",
      locationNoticeTitle: "位置已刷新",
      locationNoticeBody: "演示 GPS 当前锁定在 Kolej Canselor。",
    },
    search: {
      title: "查找教室",
      subtitle: "按教室代码或课程搜索",
      placeholder: "试试 FSKTM A1-02 或 SSE3200",
      helper: "智能搜索会匹配代码、课程和常用名称",
      suggestions: "搜索建议",
      found: "个结果",
      noMatch: "没有精确匹配",
      noMatchSub: "请检查代码，或尝试课程名称。",
      recent: "最近搜索",
      recentEmpty: "本次演示的最近搜索已清空。",
      popular: "热门地点",
    },
    translator: {
      title: "ESMP 教室解析",
      subtitle: "把教室代码翻译成易懂位置",
      enter: "输入教室代码",
      directory: "演示目录来自校园样例数据",
      matched: "已匹配",
      noMatch: "没有匹配到演示数据。可试 FSKTM、DKAP、PSAS、I-PUTRA 或 DEWAN。",
      result: "解析结果",
      block: "楼栋",
      level: "楼层",
      room: "房间",
      landmark: "地标指引",
      start: "开始导航",
      verify: "路线开始前可以先确认目的地",
    },
    route: {
      destination: "目的地",
      eta: "预计",
      distance: "距离",
      pace: "速度",
      confirm: "确认目的地",
      notCorrect: "不正确",
      yesStart: "确认开始",
      reached: "已到达目的地",
      paused: "导航已暂停",
      step: "第",
      of: "步，共",
      leave: "离开 Kolej Canselor",
      leaveDetail: "走向巴士站旁的主步行道。",
      head: "前往",
      headDetail: "沿着有红色校园标识的阴凉步道前进。",
      visible: "现在应该可以看到目的地地标。",
      arrived: "已到达",
      ready: "可进行教室确认。",
      progress: "路线进度",
      arrivedNote: "你已到达，可用此页面确认教室。",
      pausedNote: "演示已暂停，继续后会推进路线。",
      movingNote: "实时演示会自动进入下一条指引。",
      quit: "退出",
      resume: "继续",
      pause: "暂停",
      nextStep: "下一步",
      now: "现在",
    },
    profile: {
      title: "我的资料",
      subtitle: "学生账户与偏好设置",
      international: "国际学生",
      academic: "学术信息",
      faculty: "学院",
      programme: "专业",
      matrix: "学号",
      language: "语言偏好",
      saved: "语言已保存",
      preview: "导航提示和个人资料标签将以中文展示。",
      samples: ["今日课表", "开始导航", "你正在正确路线中"],
      applied: "已应用到本次原型演示",
      settings: "应用设置",
      pace: "步行速度：正常",
      units: "单位：公制",
      alerts: "路线提醒：开启",
      offline: "离线地图：就绪",
      logout: "退出登录",
    },
    notice: { title: "下一节课提醒", body: "SSE3200 将在上午 10:00 于 FSKTM A1-02 开始。建议 9:52 出发。" },
  },
  "Bahasa Melayu": {
    nav: { home: "Utama", search: "Cari", translator: "Terjemah", navigation: "Navigasi", profile: "Profil" },
    common: { active: "Aktif", next: "SETERUSNYA", close: "Tutup", viewAll: "Lihat semua", clear: "Kosongkan", copy: "Salin", copied: "Disalin", backHome: "Ke utama", replay: "Ulang" },
    home: {
      greeting: "Selamat pagi, Aisha",
      hero: "Ke mana\nhari ini?",
      searchPlaceholder: "Cari kelas, kursus atau bangunan",
      schedule: "Jadual hari ini",
      fullDay: "Gambaran penuh hari ini",
      quick: "Akses pantas",
      decode: "Nyahkod ESMP",
      decodeSub: "Fahami kod bilik",
      explore: "Teroka kampus",
      exploreSub: "Lihat lokasi popular",
      current: "LOKASI SEMASA",
      live: "Langsung",
      locationNoticeTitle: "Lokasi dikemas kini",
      locationNoticeBody: "GPS demo dikunci pada Kolej Canselor.",
    },
    search: {
      title: "Cari bilik kuliah",
      subtitle: "Cari melalui kod bilik atau kursus",
      placeholder: "Cuba FSKTM A1-02 atau SSE3200",
      helper: "Carian pintar menyemak kod, kursus dan nama biasa",
      suggestions: "Cadangan",
      found: "dijumpai",
      noMatch: "Tiada padanan tepat",
      noMatchSub: "Semak kod atau cuba nama kursus.",
      recent: "Carian terkini",
      recentEmpty: "Carian terkini dikosongkan untuk sesi demo ini.",
      popular: "Lokasi popular",
    },
    translator: {
      title: "Penterjemah ESMP",
      subtitle: "Kod diterangkan dengan mudah",
      enter: "MASUKKAN KOD BILIK",
      directory: "Direktori demo dimuat daripada data contoh kampus",
      matched: "Sepadan",
      noMatch: "Tiada padanan demo. Cuba FSKTM, DKAP, PSAS, I-PUTRA atau DEWAN.",
      result: "Hasil terjemahan",
      block: "BLOK",
      level: "ARAS",
      room: "BILIK",
      landmark: "Panduan mercu tanda",
      start: "Mula navigasi",
      verify: "Anda boleh sahkan destinasi sebelum laluan bermula",
    },
    route: {
      destination: "Destinasi",
      eta: "ETA",
      distance: "JARAK",
      pace: "KELAJUAN",
      confirm: "Sahkan destinasi",
      notCorrect: "Tidak betul",
      yesStart: "Ya, mula laluan",
      reached: "Destinasi dicapai",
      paused: "Laluan dijeda",
      step: "Langkah",
      of: "daripada",
      leave: "Tinggalkan Kolej Canselor",
      leaveDetail: "Berjalan ke laluan pejalan kaki utama berhampiran hentian bas.",
      head: "Menuju ke",
      headDetail: "Ikut laluan berbumbung dan penanda merah kampus.",
      visible: "Mercu tanda destinasi kini sepatutnya kelihatan.",
      arrived: "Tiba di",
      ready: "sedia untuk daftar masuk.",
      progress: "Kemajuan laluan",
      arrivedNote: "Anda telah tiba. Tunjukkan skrin ini untuk sahkan bilik.",
      pausedNote: "Simulasi dijeda. Sambung untuk teruskan demo laluan.",
      movingNote: "Demo langsung akan bergerak ke arahan seterusnya secara automatik.",
      quit: "Keluar",
      resume: "Sambung",
      pause: "Jeda",
      nextStep: "Langkah seterusnya",
      now: "Kini",
    },
    profile: {
      title: "Profil saya",
      subtitle: "Akaun pelajar dan pilihan",
      international: "Pelajar antarabangsa",
      academic: "Butiran akademik",
      faculty: "Fakulti",
      programme: "Program",
      matrix: "Nombor matrik",
      language: "Pilihan bahasa",
      saved: "Bahasa disimpan",
      preview: "Arahan navigasi dan label profil dipaparkan dalam Bahasa Melayu.",
      samples: ["Jadual hari ini", "Mula navigasi", "Anda di laluan yang betul"],
      applied: "Digunakan untuk sesi prototaip ini",
      settings: "Tetapan aplikasi",
      pace: "Kelajuan berjalan: Normal",
      units: "Unit: Metrik",
      alerts: "Amaran laluan: Hidup",
      offline: "Peta luar talian: Sedia",
      logout: "Log keluar",
    },
    notice: { title: "Peringatan kelas seterusnya", body: "SSE3200 bermula 10:00 AM di FSKTM A1-02. Cadangan bertolak: 9:52 AM." },
  },
} as const;

const todayLabel = new Intl.DateTimeFormat("en-MY", { weekday: "long", day: "numeric", month: "long" }).format(new Date());

function findCourseLocation(course: Course) {
  return locations.find((location) => course.roomCode.toLowerCase().includes(location.shortName.toLowerCase()) || course.roomCode.toLowerCase().includes(location.code.toLowerCase()));
}

function DemoNotice({ notice, onDismiss }: { notice: Notice | null; onDismiss: () => void }) {
  if (!notice) return null;
  return <div className="pointer-events-none absolute left-4 right-4 top-4 z-[80]"><div className="pointer-events-auto flex gap-3 rounded-2xl border border-upm/10 bg-white p-4 shadow-float"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-upm-light text-upm"><Info size={18}/></div><div className="min-w-0 flex-1"><div className="font-heading text-sm font-semibold text-slate-900">{notice.title}</div><div className="mt-0.5 text-xs leading-5 text-slate-500">{notice.body}</div></div><button onClick={onDismiss} className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-slate-400 hover:bg-slate-50" aria-label="Dismiss"><X size={17}/></button></div></div>;
}

function Header({ title, subtitle, back, onBack, onNotify }: { title: string; subtitle?: string; back?: boolean; onBack?: () => void; onNotify: () => void }) {
  return <header className="flex items-center gap-3 px-5 pb-4 pt-6">{back ? <button onClick={onBack} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-100 bg-white text-slate-600"><ArrowLeft size={20}/></button> : <UpmLogo compact/>}<div className="min-w-0 flex-1"><h1 className="truncate font-heading text-xl font-semibold text-slate-900">{title}</h1>{subtitle && <p className="truncate text-xs text-slate-400">{subtitle}</p>}</div>{!back && <button onClick={onNotify} className="relative grid h-10 w-10 place-items-center rounded-xl bg-white shadow-card" aria-label="Notifications"><Bell size={18}/><span className="absolute right-2.5 top-2 h-2 w-2 rounded-full border-2 border-white bg-error"/></button>}</header>;
}

function HomeScreen({ t, setScreen, selectLocation, onNotify, showNotice }: { t: typeof copy[Language]; setScreen: (screen: Screen) => void; selectLocation: (location: Location) => void; onNotify: () => void; showNotice: (notice: Notice) => void }) {
  const [query, setQuery] = useState("");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const visibleCourses = courses.slice(0, 2);
  return <div className="animate-fade-up pb-28"><header className="bg-gradient-to-b from-upm-light/70 to-transparent px-5 pb-4 pt-6"><div className="flex items-center justify-between"><UpmLogo/><button onClick={onNotify} className="relative grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-card" aria-label="Notifications"><Bell size={19}/><span className="absolute right-3 top-2.5 h-2 w-2 rounded-full bg-error"/></button></div><div className="mt-8"><p className="text-sm text-slate-500">{t.home.greeting}</p><h1 className="mt-1 whitespace-pre-line font-heading text-[27px] font-semibold leading-tight text-slate-900">{t.home.hero}</h1></div><div className="relative mt-6"><Search className="absolute left-4 top-3.5 text-slate-400" size={20}/><Input value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setScreen("search")} placeholder={t.home.searchPlaceholder} className="h-14 border-0 pl-12 pr-12 shadow-card"/><button onClick={() => setScreen("search")} className="absolute right-3 top-2.5 grid h-9 w-9 place-items-center rounded-xl bg-upm text-white"><ArrowRight size={17}/></button></div></header>
    <section className="mt-3 px-5"><div className="mb-3 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-upm">{todayLabel}</p><h2 className="mt-1 font-heading text-xl font-semibold">{t.home.schedule}</h2></div><button onClick={() => setScheduleOpen(!scheduleOpen)} className="inline-flex items-center gap-1 rounded-full bg-upm-light px-3 py-1.5 text-xs font-bold text-upm">{scheduleOpen ? t.common.close : t.common.viewAll}<ChevronRight size={14} className={cn("transition", scheduleOpen && "rotate-90")}/></button></div><div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-4">{visibleCourses.map((course) => <div className="snap-start" key={course.id}><CourseCard course={course} nextLabel={t.common.next} onNavigate={() => { const found = findCourseLocation(course); if (found) selectLocation(found); }}/></div>)}</div>{scheduleOpen && <Card className="mt-1 overflow-hidden border-upm/10"><div className="flex items-center gap-2 border-b border-red-100 bg-white px-4 py-3 text-xs font-bold uppercase tracking-wider text-upm"><CalendarDays size={16}/> {t.home.fullDay}</div><div className="divide-y divide-slate-100">{courses.map((course) => { const found = findCourseLocation(course); return <button key={course.id} onClick={() => found && selectLocation(found)} className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-upm-light/70 active:scale-[.99]"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-upm text-white"><Clock3 size={17}/></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="font-heading text-sm font-semibold text-slate-900">{course.code}</span>{course.status === "next" && <span className="rounded-full bg-upm-light px-2 py-0.5 text-[9px] font-bold text-upm">{t.common.next}</span>}</div><div className="mt-0.5 truncate text-xs text-slate-500">{course.name}</div></div><div className="text-right"><div className="text-xs font-bold text-slate-800">{course.time}</div><div className="mt-0.5 text-[10px] font-semibold text-upm">{course.roomCode}</div></div></button>; })}</div></Card>}</section>
    <section className="px-5 pt-2"><h2 className="font-heading text-lg font-semibold">{t.home.quick}</h2><div className="mt-3 grid grid-cols-2 gap-3"><button onClick={() => setScreen("translator")} className="rounded-3xl border border-upm/10 bg-white p-4 text-left shadow-card transition active:scale-[.99]"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-upm text-white"><Languages size={20}/></div><div className="mt-5 font-heading text-sm font-semibold">{t.home.decode}</div><div className="mt-1 text-xs text-slate-500">{t.home.decodeSub}</div></button><button onClick={() => setScreen("search")} className="rounded-3xl bg-upm p-4 text-left text-white shadow-lg shadow-upm/20 transition active:scale-[.99]"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-upm"><MapPin size={20}/></div><div className="mt-5 font-heading text-sm font-semibold">{t.home.explore}</div><div className="mt-1 text-xs text-white/70">{t.home.exploreSub}</div></button></div></section>
    <section className="px-5 pt-6"><Card className="flex items-center gap-4 p-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-upm-light text-upm"><LocateFixed size={21}/></div><div className="flex-1"><div className="text-xs font-semibold text-slate-400">{t.home.current}</div><div className="mt-0.5 text-sm font-semibold">Kolej Canselor, UPM</div></div><button onClick={() => showNotice({ title: t.home.locationNoticeTitle, body: t.home.locationNoticeBody })} className="flex items-center gap-1 text-xs font-semibold text-success"><span className="h-2 w-2 rounded-full bg-success"/>{t.home.live}</button></Card></section></div>;
}

function SearchScreen({ t, selectLocation, recent, clearRecent, onNotify }: { t: typeof copy[Language]; selectLocation: (location: Location) => void; recent: Location[]; clearRecent: () => void; onNotify: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => { const q = query.toLowerCase().trim(); if (!q) return []; return locations.filter((location) => [location.shortName, location.fullName, location.code, location.category, ...location.keywords].join(" ").toLowerCase().includes(q) || q.split("").filter((char, index) => location.code.toLowerCase().includes(char) && index < 5).length >= Math.min(q.length, 3)); }, [query]);
  return <div className="animate-fade-up pb-28"><Header title={t.search.title} subtitle={t.search.subtitle} onNotify={onNotify}/><div className="px-5"><div className="relative"><Search className="absolute left-4 top-4 text-slate-400" size={20}/><Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search.placeholder} className="h-14 pl-12 pr-12 shadow-card"/>{query && <button onClick={() => setQuery("")} className="absolute right-4 top-4 text-slate-400"><X size={20}/></button>}</div><div className="mt-3 flex items-center gap-2 text-xs text-slate-400"><Sparkles size={14} className="text-warning"/>{t.search.helper}</div></div>{query ? <section className="px-5 pt-6"><div className="mb-3 flex items-center justify-between"><h2 className="font-heading text-lg font-semibold">{t.search.suggestions}</h2><span className="text-xs text-slate-400">{results.length} {t.search.found}</span></div><div className="space-y-3">{results.map((location) => <LocationRow key={location.id} location={location} onClick={() => selectLocation(location)}/>) }{results.length === 0 && <Card className="p-7 text-center"><Search className="mx-auto text-slate-300" size={30}/><h3 className="mt-3 font-heading font-semibold">{t.search.noMatch}</h3><p className="mt-1 text-sm text-slate-500">{t.search.noMatchSub}</p></Card>}</div></section> : <><section className="px-5 pt-7"><div className="flex items-center justify-between"><h2 className="font-heading text-lg font-semibold">{t.search.recent}</h2><button onClick={clearRecent} className="text-xs font-bold text-slate-400">{t.common.clear}</button></div><div className="mt-3 space-y-2">{recent.length ? recent.map((location) => <LocationRow key={location.id} location={location} onClick={() => selectLocation(location)} subtle/>) : <Card className="p-4 text-sm text-slate-500">{t.search.recentEmpty}</Card>}</div></section><section className="px-5 pt-7"><h2 className="font-heading text-lg font-semibold">{t.search.popular}</h2><div className="mt-3 grid grid-cols-2 gap-3">{locations.slice(0,4).map((location, index) => <button key={location.id} onClick={() => selectLocation(location)} className={cn("rounded-3xl border p-4 text-left transition active:scale-[.99]", index === 0 ? "border-upm bg-upm text-white shadow-lg shadow-upm/20" : "border-upm/10 bg-white shadow-card")}><div className="flex items-start justify-between"><Building2 size={22} className={cn(index === 0 ? "text-white" : "text-upm")}/><ArrowRight size={15} className={cn(index === 0 ? "text-white/70" : "text-upm/50")}/></div><div className="mt-8 font-heading font-semibold">{location.shortName}</div><div className={cn("mt-1 line-clamp-1 text-[11px]", index === 0 ? "text-white/70" : "text-slate-500")}>{location.category}</div></button>)}</div></section></>}</div>;
}

function LocationRow({ location, onClick, subtle = false }: { location: Location; onClick: () => void; subtle?: boolean }) {
  return <button onClick={onClick} className={cn("flex w-full items-center gap-3 rounded-2xl text-left transition active:scale-[.99]", subtle ? "py-2" : "border border-slate-100 bg-white p-4 shadow-card")}><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-upm-light text-upm"><Building2 size={19}/></div><div className="min-w-0 flex-1"><div className="font-heading text-sm font-semibold">{location.code}</div><div className="mt-0.5 truncate text-xs text-slate-500">{location.fullName}</div></div><ChevronRight size={18} className="text-slate-300"/></button>;
}

function TranslatorScreen({ t, selected, setSelected, startNavigation, onNotify }: { t: typeof copy[Language]; selected: Location; setSelected: (location: Location) => void; startNavigation: () => void; onNotify: () => void }) {
  const [input, setInput] = useState(selected.code);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<ReactNode>(null);
  const translate = () => { const q = input.toLowerCase(); const found = locations.find((location) => q.includes(location.shortName.toLowerCase()) || q.includes(location.code.toLowerCase()) || location.keywords.some((keyword) => q.includes(keyword))); if (found) { setSelected(found); setMessage(<span className="text-success">{t.translator.matched} {found.code}</span>); } else { setMessage(<span className="text-warning">{t.translator.noMatch}</span>); } };
  return <div className="animate-fade-up pb-28"><Header title={t.translator.title} subtitle={t.translator.subtitle} onNotify={onNotify}/><div className="px-5"><div className="rounded-3xl bg-upm p-5 text-white shadow-lg shadow-upm/20"><div className="flex items-center gap-2 text-xs font-bold text-white/70"><Languages size={16}/>{t.translator.enter}</div><div className="mt-3 flex gap-2"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && translate()} className="h-12 min-w-0 flex-1 rounded-2xl bg-white px-4 font-semibold text-slate-900 outline-none"/><button onClick={translate} className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-upm"><ArrowRight size={19}/></button></div><div className="mt-3 flex items-center gap-2 text-[11px] text-white/70"><ShieldCheck size={13}/>{t.translator.directory}</div></div>{message && <div className="mt-2 px-2 text-xs font-semibold">{message}</div>}</div><section className="px-5 pt-5"><Card className="overflow-hidden"><div className="bg-gradient-to-r from-upm-light to-white p-5"><div className="flex items-start justify-between"><span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-upm shadow-sm">{t.translator.result}</span><button onClick={() => { navigator.clipboard?.writeText(`${selected.fullName}, ${selected.code}`); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="flex items-center gap-1.5 text-xs font-bold text-upm">{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? t.common.copied : t.common.copy}</button></div><h2 className="mt-4 font-heading text-xl font-semibold leading-7">{selected.fullName}</h2><div className="mt-2 flex items-center gap-2 text-xs text-slate-500"><MapPin size={14} className="text-secondary"/>Universiti Putra Malaysia</div></div><div className="grid grid-cols-3 divide-x divide-slate-100 border-y border-slate-100 py-4">{[[t.translator.block,selected.block || "Main"],[t.translator.level,selected.level || "Ground"],[t.translator.room,selected.room?.replace("Room ","") || selected.code]].map(([label,value]) => <div key={label} className="px-3 text-center"><div className="text-[9px] font-bold tracking-widest text-slate-400">{label}</div><div className="mt-1 text-xs font-bold text-slate-800">{value}</div></div>)}</div><div className="p-5"><div className="flex items-center gap-2 font-heading text-sm font-semibold"><Compass size={17} className="text-upm"/>{t.translator.landmark}</div><div className="mt-4 space-y-3">{selected.landmarks.map((item, index) => <div key={item} className="flex gap-3 text-sm leading-5 text-slate-600"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-upm-light text-[10px] font-bold text-upm">{index+1}</span>{item}.</div>)}</div></div></Card></section><div className="sticky bottom-24 mt-5 px-5"><Button onClick={startNavigation} size="lg" className="w-full"><Navigation size={19}/>{t.translator.start}</Button><p className="mt-2 text-center text-[10px] text-slate-400">{t.translator.verify}</p></div></div>;
}

function NavigationScreen({ t, selected, isActive, setIsActive, quit }: { t: typeof copy[Language]; selected: Location; isActive: boolean; setIsActive: (value: boolean) => void; quit: () => void }) {
  const [paused, setPaused] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const routeSteps = [
    { title: t.route.leave, detail: t.route.leaveDetail, progress: 18, eta: selected.eta },
    { title: `${t.route.head} ${selected.landmarks[0].replace("Located behind the ", "")}`, detail: t.route.headDetail, progress: 42, eta: selected.eta },
    { title: selected.landmarks[1] || "Approaching destination", detail: t.route.visible, progress: 72, eta: "2 min" },
    { title: `${t.route.arrived} ${selected.code}`, detail: `${selected.room || selected.fullName} ${t.route.ready}`, progress: 100, eta: t.route.now },
  ];
  const currentStep = routeSteps[stepIndex];
  const arrived = isActive && stepIndex === routeSteps.length - 1;
  const progress = isActive ? currentStep.progress : 0;
  useEffect(() => { if (!isActive) { setStepIndex(0); setPaused(false); return; } setStepIndex(0); }, [isActive, selected.id]);
  useEffect(() => { if (!isActive || paused || arrived) return; const timer = window.setTimeout(() => setStepIndex((current) => Math.min(current + 1, routeSteps.length - 1)), 3000); return () => window.clearTimeout(timer); }, [arrived, isActive, paused, routeSteps.length, stepIndex]);
  return <div className="relative h-full animate-fade-up overflow-hidden bg-slate-100"><RouteMap selected={selected} progress={progress} instruction={isActive ? currentStep : undefined}/><div className="absolute left-4 right-4 top-5 z-20"><Card className="flex items-center gap-3 p-3.5"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-upm text-white"><Navigation size={18}/></div><div className="min-w-0 flex-1"><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t.route.destination}</div><div className="truncate font-heading text-sm font-semibold">{selected.code}</div></div><div className="rounded-xl bg-upm-light px-3 py-2 text-center"><div className="font-heading text-sm font-bold text-upm">{isActive ? currentStep.eta : selected.eta}</div><div className="text-[9px] text-upm/70">{t.route.eta}</div></div></Card></div><div className="absolute bottom-[82px] left-0 right-0 z-30 rounded-t-[32px] bg-white p-5 shadow-[0_-12px_40px_rgba(15,23,42,.12)]"><div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-slate-200"/>{!isActive ? <><div className="flex items-start gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#FFF4E5] text-warning"><ShieldCheck size={21}/></div><div><h2 className="font-heading text-lg font-semibold">{t.route.confirm}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{selected.fullName}<br/>{selected.block || selected.category} - {selected.level || "Ground"}</p></div></div><div className="mt-5 flex gap-3"><Button variant="outline" className="flex-1" onClick={quit}>{t.route.notCorrect}</Button><Button className="flex-[1.5]" onClick={() => setIsActive(true)}><Navigation size={17}/>{t.route.yesStart}</Button></div></> : <><div className="flex items-center justify-between"><div><div className="text-xs font-bold uppercase tracking-wider text-upm">{arrived ? t.route.reached : paused ? t.route.paused : `${t.route.step} ${stepIndex + 1} ${t.route.of} ${routeSteps.length}`}</div><h2 className="mt-1 font-heading text-xl font-semibold">{currentStep.title}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{currentStep.detail}</p></div><div className={cn("grid h-12 w-12 place-items-center rounded-2xl text-white", arrived ? "bg-success" : "bg-upm")}><ArrowRight size={22}/></div></div><div className="mt-5"><div className="mb-2 flex justify-between text-[11px] font-semibold text-slate-500"><span>{t.route.progress}</span><span>{progress}%</span></div><Progress value={progress}/></div><div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-2xl bg-slate-50 py-3">{[[currentStep.eta,t.route.eta],[selected.distance,t.route.distance],[paused || arrived ? "0 m/s" : "1.2 m/s",t.route.pace]].map(([value,label]) => <div className="text-center" key={label}><div className="font-heading text-sm font-bold">{value}</div><div className="mt-0.5 text-[9px] font-bold tracking-wider text-slate-400">{label}</div></div>)}</div><div className="mt-3 flex items-center gap-2 rounded-2xl bg-upm-light px-3 py-2 text-xs font-semibold text-upm">{arrived ? <Check size={16}/> : <Navigation size={16}/>} {arrived ? t.route.arrivedNote : paused ? t.route.pausedNote : t.route.movingNote}</div><div className="mt-4 flex gap-3">{arrived ? <><Button variant="outline" className="flex-1" onClick={() => { setStepIndex(0); setPaused(false); }}>{t.common.replay}</Button><Button className="flex-1" onClick={quit}><Check size={17}/>{t.common.backHome}</Button></> : <><Button variant="danger" className="flex-1" onClick={quit}><LogOut size={17}/>{t.route.quit}</Button><Button variant="outline" className="flex-1" onClick={() => setPaused(!paused)}>{paused ? <Play size={17}/> : <Pause size={17}/>} {paused ? t.route.resume : t.route.pause}</Button><Button className="flex-1" onClick={() => setStepIndex((current) => Math.min(current + 1, routeSteps.length - 1))}>{t.route.nextStep}</Button></>}</div></>}</div></div>;
}

function ProfileScreen({ t, language, setLanguage, logout, onNotify, showNotice }: { t: typeof copy[Language]; language: Language; setLanguage: (language: Language) => void; logout: () => void; onNotify: () => void; showNotice: (notice: Notice) => void }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const academicDetails: Array<[LucideIcon, string, string]> = [[GraduationCap,t.profile.faculty,campus.student.faculty],[BookOpen,t.profile.programme,campus.student.programme],[Clipboard,t.profile.matrix,campus.student.matrixNumber]];
  const languageLabels: Record<Language, string> = { English: "English", Chinese: "中文", "Bahasa Melayu": "Bahasa Melayu" };
  return <div className="animate-fade-up pb-28"><Header title={t.profile.title} subtitle={t.profile.subtitle} onNotify={onNotify}/><section className="px-5"><div className="rounded-[30px] bg-upm p-5 text-white shadow-lg shadow-upm/20"><div className="flex items-center gap-4"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 font-heading text-xl font-semibold ring-1 ring-white/20">AR</div><div><h2 className="font-heading text-xl font-semibold">{campus.student.name}</h2><div className="mt-1 text-sm text-white/70">{campus.student.matrixNumber}</div><span className="mt-2 inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold">{t.profile.international}</span></div></div></div></section><section className="px-5 pt-6"><h2 className="font-heading text-lg font-semibold">{t.profile.academic}</h2><Card className="mt-3 divide-y divide-slate-100 px-4">{academicDetails.map(([Icon,label,value]) => <div key={label} className="flex items-center gap-3 py-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-upm-light text-upm"><Icon size={18}/></div><div className="min-w-0"><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</div><div className="mt-1 text-sm font-medium leading-5 text-slate-700">{value}</div></div></div>)}</Card></section><section className="px-5 pt-6"><div className="flex items-center gap-2"><Languages size={18} className="text-upm"/><h2 className="font-heading text-lg font-semibold">{t.profile.language}</h2></div><div className="mt-3 grid grid-cols-3 gap-2">{(Object.keys(languageLabels) as Language[]).map((item) => <button key={item} onClick={() => { setLanguage(item); showNotice({ title: copy[item].profile.saved, body: `${languageLabels[item]} ${copy[item].profile.applied}` }); }} className={cn("relative rounded-2xl border px-2 py-3 text-xs font-semibold transition active:scale-[.98]", language === item ? "border-upm bg-upm text-white shadow-lg shadow-upm/20" : "border-slate-100 bg-white text-slate-500 hover:border-upm/30")}><span className="block h-5">{language === item && <Check className="mx-auto" size={15}/>}</span>{languageLabels[item]}{language === item && <span className="absolute -right-1 -top-2 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-upm shadow-sm">{t.common.active}</span>}</button>)}</div><div className="mt-3 rounded-2xl border border-upm/10 bg-upm-light px-4 py-3"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-upm"><Check size={15}/> {t.profile.saved}: {languageLabels[language]}</div><p className="mt-1 text-sm leading-5 text-slate-600">{t.profile.preview}</p><div className="mt-3 grid gap-2">{t.profile.samples.map((sample, index) => <div key={sample} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"><span className="grid h-5 w-5 place-items-center rounded-full bg-upm text-[10px] text-white">{index + 1}</span>{sample}</div>)}</div><div className="mt-3 rounded-xl bg-white px-3 py-2 text-xs font-bold text-success">{t.profile.applied}</div></div></section><section className="px-5 pt-6"><Card className="overflow-hidden"><button onClick={() => setSettingsOpen(!settingsOpen)} className="flex w-full items-center gap-3 p-4"><Settings2 size={19} className="text-slate-400"/><span className="flex-1 text-left text-sm font-semibold">{t.profile.settings}</span><ChevronRight size={18} className={cn("text-slate-300 transition", settingsOpen && "rotate-90")}/></button>{settingsOpen && <div className="border-t border-slate-100 bg-slate-50 px-4 py-3"><div className="grid grid-cols-2 gap-2 text-xs"><SettingPill>{t.profile.pace}</SettingPill><SettingPill>{t.profile.units}</SettingPill><SettingPill>{t.profile.alerts}</SettingPill><SettingPill>{t.profile.offline}</SettingPill></div></div>}<button onClick={logout} className="flex w-full items-center gap-3 border-t border-slate-100 p-4 text-error"><LogOut size={19}/><span className="flex-1 text-left text-sm font-semibold">{t.profile.logout}</span><ChevronRight size={18} className="text-red-200"/></button></Card></section></div>;
}

function SettingPill({ children }: { children: ReactNode }) {
  return <div className="rounded-xl bg-white px-3 py-2 font-semibold text-slate-600 shadow-sm">{children}</div>;
}

export function CampusApp({ onLogout }: { onLogout: () => void }) {
  const [language, setLanguage] = useState<Language>("English");
  const t = copy[language];
  const [screen, setScreen] = useState<Screen>("home");
  const [selected, setSelected] = useState<Location>(locations[0]);
  const [recent, setRecent] = useState<Location[]>([locations[0], locations[1], locations[4]]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const showNotice = (nextNotice: Notice) => setNotice(nextNotice);
  const showNotifications = () => showNotice(t.notice);
  const selectLocation = (location: Location) => { setSelected(location); setRecent((items) => [location, ...items.filter((item) => item.id !== location.id)].slice(0, 3)); setScreen("translator"); };
  const changeScreen = (next: Screen) => { setScreen(next); if (next !== "navigation") setIsNavigating(false); };

  return <main className="flex min-h-dvh justify-center sm:p-5"><div className="relative h-dvh w-full max-w-md overflow-hidden bg-[#FAFCFA] sm:h-[900px] sm:max-h-[calc(100vh-40px)] sm:rounded-[36px] sm:border-[7px] sm:border-slate-900 sm:shadow-float"><DemoNotice notice={notice} onDismiss={() => setNotice(null)}/><div className="h-full overflow-y-auto">
    {screen === "home" && <HomeScreen t={t} setScreen={setScreen} selectLocation={selectLocation} onNotify={showNotifications} showNotice={showNotice}/>}
    {screen === "search" && <SearchScreen t={t} selectLocation={selectLocation} recent={recent} clearRecent={() => setRecent([])} onNotify={showNotifications}/>}
    {screen === "translator" && <TranslatorScreen t={t} selected={selected} setSelected={setSelected} startNavigation={() => { setIsNavigating(false); setScreen("navigation"); }} onNotify={showNotifications}/>}
    {screen === "navigation" && <NavigationScreen t={t} selected={selected} isActive={isNavigating} setIsActive={setIsNavigating} quit={() => { setIsNavigating(false); setScreen("home"); }}/>}
    {screen === "profile" && <ProfileScreen t={t} language={language} setLanguage={setLanguage} logout={onLogout} onNotify={showNotifications} showNotice={showNotice}/>}
  </div><BottomNav active={screen} onChange={changeScreen} labels={t.nav}/></div></main>;
}
