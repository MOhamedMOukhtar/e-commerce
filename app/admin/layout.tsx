"use client";

import AuthContextProvider, { useAuth } from "@/context/AutnContext";
import AdminLayout from "../admin/components/AdminLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <AdminChecking>{children}</AdminChecking>
    </AuthContextProvider>
  );
}

function AdminChecking({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Skelton...</div>;
  }

  if (!user) return;

  return <AdminLayout>{children}</AdminLayout>;
}
