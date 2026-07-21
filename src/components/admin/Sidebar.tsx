"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FolderTree,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Tag,
  Warehouse,
  TicketPercent,
  Star,
  BarChart3,
  Store,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  // { label: "Brands", href: "/admin/brands", icon: Store },
  { label: "Inventory", href: "/admin/inventory", icon: Warehouse },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Coupons", href: "/admin/coupons", icon: TicketPercent },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${collapsed ? "w-[72px]" : "w-[260px]"
        }`}
    >
      {/* Logo */}
      <div className="flex h-[72px] items-center justify-between border-b border-gray-200 px-4">
        {!collapsed && (
          <div className="flex items-center justify-center w-full">
            {/* <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal">
              <span className="text-sm font-bold text-white">V</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-black">Vitazan</p>
              <p className="text-[11px] text-gray-900">Admin Panel</p>
            </div> */}
            <Image src={logo} alt="Vitazan" width={1920} height={1080} className="w-auto h-10" />
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-teal">
            <span className="text-sm font-bold text-white">V</span>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[80px] flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active
                    ? "bg-teal text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-3">
        <a
          href="/admin/login"
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 ${collapsed ? "justify-center" : ""
            }`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </a>
      </div>
    </aside>
  );
}
