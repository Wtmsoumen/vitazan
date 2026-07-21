"use client";

import { Warehouse, Search, AlertTriangle, XCircle, Upload, Download } from "lucide-react";

const inventoryItems = [
  { id: 1, sku: "VZ-HTK-001", name: "VITAZAN™ HT-KOF", category: "Cold & Cough", stock: 245, reorder: 50, status: "In Stock", price: "₱15.00" },
  { id: 2, sku: "VZ-SNX-001", name: "VITAZAN™ SENAX", category: "Gut Health", stock: 32, reorder: 50, status: "Low Stock", price: "₱15.00" },
  { id: 3, sku: "VZ-OST-001", name: "VITAZAN™ OSTEOMAC", category: "Bone & Joint", stock: 0, reorder: 50, status: "Out of Stock", price: "₱15.00" },
  { id: 4, sku: "VZ-RLD-001", name: "VITAZAN™ RELOAD", category: "Vitamins", stock: 189, reorder: 50, status: "In Stock", price: "₱15.00" },
  { id: 5, sku: "VZ-HTK-002", name: "VITAZAN™ HT-KOF (60 caps)", category: "Cold & Cough", stock: 18, reorder: 30, status: "Low Stock", price: "₱25.00" },
  { id: 6, sku: "VZ-SNX-002", name: "VITAZAN™ SENAX (60 caps)", category: "Gut Health", stock: 120, reorder: 30, status: "In Stock", price: "₱25.00" },
];

const statusStyles: Record<string, string> = {
  "In Stock": "bg-emerald-100 text-emerald-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

const stats = [
  { label: "Total Products", value: "48", icon: Warehouse, color: "bg-teal/10 text-teal" },
  { label: "Low Stock Alerts", value: "8", icon: AlertTriangle, color: "bg-amber-50 text-amber-600" },
  { label: "Out of Stock", value: "3", icon: XCircle, color: "bg-red-50 text-red-600" },
];

export default function InventoryPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black">Inventory</h1>
          <p className="mt-1 text-sm text-gray-900">Track stock levels and manage inventory</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[#00485d] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#003a4d]">
            <Upload size={16} /> Bulk Import
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-900">{s.label}</p>
              <p className="text-2xl font-semibold text-black">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="relative w-[300px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
            <input type="text" placeholder="Search by SKU or product name..." className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-[#00485d]" />
          </div>
          <div className="flex items-center gap-2">
            <select className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-black outline-none">
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <select className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-black outline-none">
              <option>All Categories</option>
              <option>Cold & Cough</option>
              <option>Gut Health</option>
              <option>Bone & Joint</option>
              <option>Vitamins</option>
            </select>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Reorder Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {inventoryItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm font-mono text-teal">{item.sku}</td>
                <td className="px-6 py-4 text-sm font-medium text-black">{item.name}</td>
                <td className="px-6 py-4 text-sm text-black">{item.category}</td>
                <td className="px-6 py-4 text-sm text-black">{item.price}</td>
                <td className="px-6 py-4 text-sm font-medium text-black">{item.stock}</td>
                <td className="px-6 py-4 text-sm text-black">{item.reorder}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[item.status]}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
