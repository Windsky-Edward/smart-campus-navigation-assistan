import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPM Navigate | Smart Campus Assistant",
  description: "Timetable-aware campus navigation for UPM international students.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#3F7FA6" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
