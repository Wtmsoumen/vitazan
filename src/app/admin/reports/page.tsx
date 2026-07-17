"use client";

import { BarChart3, TrendingUp, TrendingDown, Download, Calendar } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const monthlyRevenue = [
  { month: "Jan", revenue: 32000, orders: 180 },
  { month: "Feb", revenue: 41000, orders: 240 },
  { month: "Mar", revenue: 38000, orders: 200 },
  { month: "Apr", revenue: 52000, orders: 320 },
  { month: "May", revenue: 47000, orders: 280 },
  { month: "Jun", revenue: 61000, orders: 380 },
  { month: "Jul", revenue: 48200, orders: 350 },
];

const productSales = [
  { name: "HT-KOF", sales: 1240 },
  { name: "SENAX", sales: 980 },
  { name: "OSTEOMAC", sales: 856 },
  { name: "RELOAD", sales: 720 },
];

const stats = [
  { label: "Total Revenue", value: "₱3,19,200", change: "+12.5%", trend: "up" },
  { label: "Average Order Value", value: "₱680", change: "+4.2%", trend: "up" },
  { label: "Conversion Rate", value: "3.8%", change: "-0.3%", trend: "down" },
  { label: "Return Rate", value: "2.1%", change: "-0.8%", trend: "up" },
];

export default function ReportsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">Sales analytics and revenue reports</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>Jan 2026 - Jul 2026</span>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-[#00485d] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#003a4d]">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{s.value}</p>
            <div className={`mt-1 flex items-center gap-1 text-xs font-medium ${s.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
              {s.trend === "up" ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {s.change} vs last period
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          <p className="text-sm text-gray-500">Monthly revenue over time</p>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00485d" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#00485d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                <Area type="monotone" dataKey="revenue" stroke="#00485d" strokeWidth={2} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900">Product Sales</h3>
          <p className="text-sm text-gray-500">Units sold by product</p>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productSales} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={12} width={80} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                <Bar dataKey="sales" fill="#00485d" radius={[0, 6, 6, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
