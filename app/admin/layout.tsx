"use client";

import Sidebar from "./components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
}
