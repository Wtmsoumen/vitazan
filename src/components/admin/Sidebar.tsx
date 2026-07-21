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
  Warehouse,
  TicketPercent,
  Star,
  BarChart3,
  MessageSquareText,
  X,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../public/images/logoWhite.png";

const navGroups = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Commerce",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Inventory", href: "/admin/inventory", icon: Warehouse },
      { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { label: "Coupons", href: "/admin/coupons", icon: TicketPercent },
    ],
  },
  {
    label: "People",
    items: [
      { label: "Customers", href: "/admin/customers", icon: Users },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquareText },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Blog", href: "/admin/blog", icon: FileText },
      { label: "Reports", href: "/admin/reports", icon: BarChart3 },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <aside
      className={`flex h-screen flex-col bg-gradient-to-b from-[#00485d] via-[#003d4f] to-[#08131e] border-r border-white/10 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-[260px]"}`}
    >
      {/* Logo */}
      <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-4 flex-shrink-0">
        {!collapsed ? (
          <div className="flex items-center justify-center w-full">
            <Image src={logo} alt="Vitazan" width={1920} height={1080} className="w-auto h-10" />
          </div>
        ) : (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <span className="text-sm font-bold text-white">V</span>
          </div>
        )}
        {/* Mobile close */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-5 right-4 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10"
        >
          <X size={18} className="text-white/70" />
        </button>
      </div>

      {/* Collapse toggle — desktop only */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-[80px] z-50 h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:shadow transition-all"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {navGroups.map((group, idx) => (
          <div key={idx} className={`${idx !== 0 ? "border-t border-solid border-white/15 pt-4" : ""}`}>
            {!collapsed && (
              <p className="mb-2 px-3 text-[13px] font-semibold uppercase tracking-wider text-white">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-medium transition-all duration-200 ${active
                        ? "bg-white/15 text-white shadow-sm backdrop-blur-sm"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                        } ${collapsed ? "justify-center" : ""}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={19} className={active ? "text-white" : "text-white/70 group-hover:text-white transition-colors"} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-3 flex-shrink-0">
        <a
          href="/admin/login"
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/50 transition-all hover:bg-red-500/15 hover:text-red-400 ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={19} />
          {!collapsed && <span>Logout</span>}
        </a>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 z-40 h-screen">
        {sidebarContent}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 h-full w-[260px] animate-slide-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
