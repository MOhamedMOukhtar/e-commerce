"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "@/context/AutnContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const { data: admin, error, isLoading } = useAdmin({ email: user?.email });

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!admin)
    return (
      <>
        <div>You are not admin!</div>
        <button
          onClick={async () => {
            try {
              await signOut(auth);
              toast.success("Logout successfully", {
                style: {
                  border: "3px solid #dedede",
                },
              });
            } catch {
              toast.error("Failed to logout");
            }
          }}
          className="flex cursor-pointer items-center gap-1 rounded-l-md p-2 font-semibold transition-all duration-200 ease-out hover:bg-gray-200"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </>
    );

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
