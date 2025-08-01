"use client";

import AuthContextProvider from "@/context/AutnContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
