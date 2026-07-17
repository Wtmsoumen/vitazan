"use client";

import { Bell, Search, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-gray-200 bg-white/80 px-8 backdrop-blur-md">
      {/* Search */}
      <div className="relative w-[400px]">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search products, orders, customers..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-teal focus:bg-white"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink text-[10px] font-bold text-white">
            3
          </span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200" />

        {/* User */}
        <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal">
            <span className="text-sm font-semibold text-white">AS</span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-[11px] text-gray-500">Super Admin</p>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
