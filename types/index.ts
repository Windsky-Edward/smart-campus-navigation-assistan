export type Screen = "home" | "search" | "translator" | "navigation" | "profile";

export interface Course {
  id: string;
  code: string;
  name: string;
  roomCode: string;
  time: string;
  endTime: string;
  status: "next" | "later";
}

export interface Location {
  id: string;
  shortName: string;
  fullName: string;
  code: string;
  block?: string;
  level?: string;
  room?: string;
  category: string;
  distance: string;
  eta: string;
  landmarks: string[];
  keywords: string[];
}
