"use client";

import { useState } from "react";
import { Search, Download, Eye, X, Package, MapPin, CreditCard } from "lucide-react";

const ordersData = [
  { id: "#VZ-1024", customer: "Rajesh Kumar", email: "rajesh@email.com", phone: "+91 98765 43210", products: [{ name: "HT-KOF", qty: 2, price: "₱30.00" }, { name: "SENAX", qty: 1, price: "₱15.00" }], amount: "₱135.00", payment: "Paid", status: "Delivered", date: "Jul 16, 2026", address: "123 MG Road, Mumbai 400001" },
  { id: "#VZ-1023", customer: "Priya Sharma", email: "priya@email.com", phone: "+91 87654 32109", products: [{ name: "SENAX", qty: 1, price: "₱32.00" }], amount: "₱32.00", payment: "Paid", status: "Shipped", date: "Jul 16, 2026", address: "45 Park Street, Kolkata 700016" },
  { id: "#VZ-1022", customer: "Amit Singh", email: "amit@email.com", phone: "+91 76543 21098", products: [{ name: "OSTEOMAC", qty: 1, price: "₱15.00" }, { name: "RELOAD", qty: 2, price: "₱40.00" }], amount: "₱55.00", payment: "Paid", status: "Processing", date: "Jul 15, 2026", address: "78 Sector 18, Noida 201301" },
  { id: "#VZ-1021", customer: "Neha Gupta", email: "neha@email.com", phone: "+91 65432 10987", products: [{ name: "RELOAD", qty: 1, price: "₱28.00" }], amount: "₱28.00", payment: "Paid", status: "Delivered", date: "Jul 15, 2026", address: "12 Brigade Road, Bangalore 560001" },
  { id: "#VZ-1020", customer: "Vikram Patel", email: "vikram@email.com", phone: "+91 54321 09876", products: [{ name: "HT-KOF", qty: 4, price: "₱60.00" }, { name: "SENAX", qty: 2, price: "₱30.00" }], amount: "₱190.00", payment: "Pending", status: "Pending", date: "Jul 14, 2026", address: "56 SG Highway, Ahmedabad 380015" },
  { id: "#VZ-1019", customer: "Sneha Rao", email: "sneha@email.com", phone: "+91 43210 98765", products: [{ name: "OSTEOMAC", qty: 2, price: "₱30.00" }], amount: "₱64.00", payment: "Paid", status: "Delivered", date: "Jul 14, 2026", address: "89 Anna Salai, Chennai 600002" },
  { id: "#VZ-1018", customer: "Arjun Mehta", email: "arjun@email.com", phone: "+91 32109 87654", products: [{ name: "RELOAD", qty: 1, price: "₱15.00" }], amount: "₱15.00", payment: "Refunded", status: "Cancelled", date: "Jul 13, 2026", address: "34 Connaught Place, Delhi 110001" },
  { id: "#VZ-1017", customer: "Kavya Iyer", email: "kavya@email.com", phone: "+91 21098 76543", products: [{ name: "HT-KOF", qty: 2, price: "₱30.00" }, { name: "OSTEOMAC", qty: 1, price: "₱15.00" }], amount: "₱95.00", payment: "Paid", status: "Shipped", date: "Jul 13, 2026", address: "67 MG Road, Pune 411001" },
];

type Order = typeof ordersData[number];

const statusColor: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Pending: "bg-gray-100 text-gray-600",
  Cancelled: "bg-red-100 text-red-700",
};

const paymentColor: Record<string, string> = {
  Paid: "text-emerald-600",
  Pending: "text-amber-600",
  Refunded: "text-red-600",
};

const statusTabs = ["All Orders", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const filtered = ordersData.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab = activeTab === "All Orders" || o.status === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Orders</h1>
          <p className="mt-1 text-sm text-gray-900">Track and manage customer orders</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Download size={16} /> Export
        </button>
      </div>

      <div className="mb-6 flex items-center gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {statusTabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab ? "bg-white text-black shadow-sm" : "text-gray-900 hover:text-gray-700"}`}>{tab}</button>
        ))}
      </div>

      <div className="mb-6 relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search by order ID or customer..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Order ID</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Customer</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Products</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Amount</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Payment</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Status</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Date</th>
              <th className="px-6 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm font-medium text-teal">{order.id}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-black">{order.customer}</p>
                  <p className="text-xs text-gray-900">{order.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.products.length} items</td>
                <td className="px-6 py-4 text-sm font-medium text-black">{order.amount}</td>
                <td className="px-6 py-4"><span className={`text-sm font-medium ${paymentColor[order.payment]}`}>{order.payment}</span></td>
                <td className="px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[order.status]}`}>{order.status}</span></td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.date}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setViewOrder(order)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3.5">
          <p className="text-sm text-gray-900">Showing {filtered.length} of {ordersData.length} orders</p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-100">Previous</button>
            <button className="rounded-lg bg-teal px-3 py-1.5 text-sm font-medium text-white">1</button>
            <button className="rounded-lg px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setViewOrder(null)}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-black">Order {viewOrder.id}</h2>
                <p className="text-sm text-gray-900">{viewOrder.date}</p>
              </div>
              <button onClick={() => setViewOrder(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusColor[viewOrder.status]}`}>{viewOrder.status}</span>
              <span className={`text-sm font-medium ${paymentColor[viewOrder.payment]}`}>{viewOrder.payment}</span>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-3 text-sm font-medium text-black">
                  <Package size={16} className="text-gray-400" /> Order Items
                </div>
                <div className="space-y-2">
                  {viewOrder.products.map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">VITAZAN™ {p.name} <span className="text-gray-400">x{p.qty}</span></span>
                      <span className="font-medium text-black">{p.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 pt-2 mt-2 flex items-center justify-between text-sm font-semibold">
                    <span className="text-black">Total</span>
                    <span className="text-black">{viewOrder.amount}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-3 text-sm font-medium text-black">
                  <MapPin size={16} className="text-gray-400" /> Customer & Shipping
                </div>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <p className="font-medium text-black">{viewOrder.customer}</p>
                  <p>{viewOrder.email}</p>
                  <p>{viewOrder.phone}</p>
                  <p>{viewOrder.address}</p>
                </div>
              </div>

              {viewOrder.status !== "Delivered" && viewOrder.status !== "Cancelled" && (
                <div className="rounded-lg border border-gray-100 p-4">
                  <label className="mb-2 block text-sm font-medium text-black">Update Status</label>
                  <select defaultValue={viewOrder.status} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setViewOrder(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Close</button>
              {viewOrder.status !== "Delivered" && viewOrder.status !== "Cancelled" && (
                <button onClick={() => setViewOrder(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">Update Order</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
