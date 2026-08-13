"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Bell, Search, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getProfileImageUrl } from "@/utils/profile";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const profileImageUrl = getProfileImageUrl(user);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-gray-100 bg-white/80 px-8 backdrop-blur-md">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative w-full max-w-[400px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-9 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-teal focus:bg-white focus:shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0 ml-3">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition-colors hover:bg-gray-50">
          <Bell size={17} className="text-gray-600" />
          <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-pink text-[9px] font-bold text-white ring-2 ring-white">
            3
          </span>
        </button>

        <div className="h-8 w-px bg-gray-200" />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-gray-50"
          >
            {profileImageUrl ? (
              <Image
                key={profileImageUrl}
                src={profileImageUrl}
                alt={user?.name || "Profile"}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover shadow-sm"
                unoptimized
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal to-dark-teal shadow-sm">
                <span className="text-[12px] font-semibold text-white">{initials}</span>
              </div>
            )}
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">{user?.name || "Admin"}</p>
              <p className="text-[11px] text-gray-500">{user?.email || "admin@vitazan.com"}</p>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg">
              <button
                onClick={() => { setDropdownOpen(false); router.push("/admin/settings"); }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User size={16} /> Profile
              </button>
              <button
                onClick={() => { setDropdownOpen(false); router.push("/admin/settings"); }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Settings size={16} /> Settings
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
