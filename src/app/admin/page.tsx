"use client";

import StatCard from "@/components/admin/StatCard";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200, orders: 180 },
  { month: "Feb", revenue: 5800, orders: 240 },
  { month: "Mar", revenue: 4900, orders: 200 },
  { month: "Apr", revenue: 7200, orders: 320 },
  { month: "May", revenue: 6100, orders: 280 },
  { month: "Jun", revenue: 8400, orders: 380 },
  { month: "Jul", revenue: 7800, orders: 350 },
];

const categoryData = [
  { name: "Cold & Cough", value: 35, color: "#00485d" },
  { name: "Gut Health", value: 25, color: "#e5097f" },
  { name: "Bone & Joint", value: 22, color: "#7c3aed" },
  { name: "Vitamins", value: 18, color: "#f59e0b" },
];

const topProducts = [
  { name: "VITAZAN™ HT-KOF", category: "Cold & Cough", sold: 1240, revenue: "₱18,600", trend: "+12%" },
  { name: "VITAZAN™ SENAX", category: "Gut Health", sold: 980, revenue: "₱14,700", trend: "+8%" },
  { name: "VITAZAN™ OSTEOMAC", category: "Bone & Joint", sold: 856, revenue: "₱12,840", trend: "+15%" },
  { name: "VITAZAN™ RELOAD", category: "Vitamins", sold: 720, revenue: "₱10,800", trend: "+5%" },
];

const recentOrders = [
  { id: "#VZ-1024", customer: "Rajesh Kumar", product: "HT-KOF", amount: "₱45.00", status: "Delivered", date: "Jul 16, 2026" },
  { id: "#VZ-1023", customer: "Priya Sharma", product: "SENAX", amount: "₱32.00", status: "Shipped", date: "Jul 16, 2026" },
  { id: "#VZ-1022", customer: "Amit Singh", product: "OSTEOMAC", amount: "₱55.00", status: "Processing", date: "Jul 15, 2026" },
  { id: "#VZ-1021", customer: "Neha Gupta", product: "RELOAD", amount: "₱28.00", status: "Delivered", date: "Jul 15, 2026" },
  { id: "#VZ-1020", customer: "Vikram Patel", product: "HT-KOF", amount: "₱90.00", status: "Pending", date: "Jul 14, 2026" },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Pending: "bg-gray-100 text-gray-600",
  Cancelled: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-900">
          Welcome back! Here&apos;s what&apos;s happening with Vitazan today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="₱48,200"
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          color="teal"
        />
        <StatCard
          title="Total Orders"
          value="1,948"
          change="+8.2%"
          trend="up"
          icon={ShoppingCart}
          color="pink"
        />
        <StatCard
          title="Total Customers"
          value="3,420"
          change="+15.3%"
          trend="up"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Products Sold"
          value="3,796"
          change="-2.1%"
          trend="down"
          icon={Package}
          color="amber"
        />
      </div>

      {/* Charts Row */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-black">Revenue Overview</h3>
              <p className="text-sm text-gray-900">Monthly revenue & orders</p>
            </div>
            <select className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 outline-none">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
              <option>This year</option>
            </select>
          </div>
          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00485d" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#00485d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00485d"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-black">Sales by Category</h3>
          <p className="text-sm text-gray-900">Product category distribution</p>
          <div className="mt-4 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2.5">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm text-gray-600">{cat.name}</span>
                </div>
                <span className="text-sm font-medium text-black">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-8 grid grid-cols-5 gap-6">
        {/* Recent Orders */}
        <div className="col-span-3 rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-black">Recent Orders</h3>
              <p className="text-sm text-gray-900">Latest customer orders</p>
            </div>
            <button className="flex items-center gap-1 text-sm font-medium text-teal hover:underline">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-3.5 text-sm font-medium text-teal">{order.id}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-700">{order.customer}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-600">{order.product}</td>
                    <td className="px-6 py-3.5 text-sm font-medium text-black">{order.amount}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="col-span-2 rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-black">Top Products</h3>
              <p className="text-sm text-gray-900">Best selling this month</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {topProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50">
                <div>
                  <p className="text-sm font-medium text-black">{product.name}</p>
                  <p className="text-xs text-gray-900">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-black">{product.revenue}</p>
                  <p className="text-xs text-emerald-500">{product.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
