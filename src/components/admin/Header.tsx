"use client";

import { Bell, Search, ChevronDown, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[64px] sm:h-[72px] items-center justify-between border-b border-gray-100 bg-white/80 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      {/* Left: hamburger + search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex-shrink-0"
        >
          <Menu size={18} className="text-black" />
        </button>
        <div className="relative w-full max-w-[400px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
          />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-9 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-black focus:border-teal focus:bg-white focus:shadow-sm"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-3">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition-colors hover:bg-gray-50">
          <Bell size={17} className="text-black" />
          <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-pink text-[9px] font-bold text-white ring-2 ring-white">
            3
          </span>
        </button>

        <div className="hidden sm:block h-8 w-px bg-gray-200" />

        <button className="flex items-center gap-2 sm:gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-gray-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal to-dark-teal shadow-sm">
            <span className="text-[12px] font-semibold text-white">AS</span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-black">Admin User</p>
            <p className="text-[11px] text-black">Super Admin</p>
          </div>
          <ChevronDown size={14} className="hidden sm:block text-black" />
        </button>
      </div>
    </header>
  );
}
