"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginPage) {
      router.replace("/admin/login");
    } else if (user && isLoginPage) {
      router.replace("/admin");
    }
  }, [loading, user, isLoginPage, router]);

  if (isLoginPage) {
    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#00485d]" />
        </div>
      );
    }
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#00485d]" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className={`${collapsed ? "ml-[72px]" : "ml-[260px]"} transition-all duration-300`}>
        <Header />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}
