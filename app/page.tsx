"use client";
import { useState } from "react";
import { CampusApp } from "@/components/campus-app";
import { LoginScreen } from "@/components/login-screen";

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <CampusApp onLogout={() => setLoggedIn(false)}/> : <LoginScreen onLogin={() => setLoggedIn(true)}/>;
}
