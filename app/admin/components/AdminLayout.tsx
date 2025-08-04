"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen((prev) => !prev);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="relative flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div
        ref={sidebarRef}
        className={`fixed transition-all duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}`}
      >
        <Sidebar />
      </div>
      <section className="flex flex-1 flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <section className="flex-1 bg-gray-200/70">{children}</section>
      </section>
    </main>
  );
}
