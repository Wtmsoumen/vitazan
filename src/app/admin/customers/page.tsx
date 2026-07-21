"use client";

import { useState } from "react";
import { Search, Download, Mail, Eye, X, ShoppingCart, Calendar, Phone } from "lucide-react";
import DeleteModal from "@/components/admin/DeleteModal";

const customersData = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@email.com", phone: "+91 98765 43210", orders: 12, spent: "₱1,450", joined: "Jan 2026", status: "Active", lastOrder: "Jul 16, 2026", address: "123 MG Road, Mumbai 400001" },
  { id: 2, name: "Priya Sharma", email: "priya@email.com", phone: "+91 87654 32109", orders: 8, spent: "₱960", joined: "Feb 2026", status: "Active", lastOrder: "Jul 16, 2026", address: "45 Park Street, Kolkata 700016" },
  { id: 3, name: "Amit Singh", email: "amit@email.com", phone: "+91 76543 21098", orders: 15, spent: "₱2,100", joined: "Dec 2025", status: "Active", lastOrder: "Jul 15, 2026", address: "78 Sector 18, Noida 201301" },
  { id: 4, name: "Neha Gupta", email: "neha@email.com", phone: "+91 65432 10987", orders: 3, spent: "₱280", joined: "Mar 2026", status: "Active", lastOrder: "Jul 15, 2026", address: "12 Brigade Road, Bangalore 560001" },
  { id: 5, name: "Vikram Patel", email: "vikram@email.com", phone: "+91 54321 09876", orders: 6, spent: "₱720", joined: "Apr 2026", status: "Inactive", lastOrder: "Jun 28, 2026", address: "56 SG Highway, Ahmedabad 380015" },
  { id: 6, name: "Sneha Rao", email: "sneha@email.com", phone: "+91 43210 98765", orders: 20, spent: "₱3,200", joined: "Nov 2025", status: "Active", lastOrder: "Jul 14, 2026", address: "89 Anna Salai, Chennai 600002" },
  { id: 7, name: "Arjun Mehta", email: "arjun@email.com", phone: "+91 32109 87654", orders: 1, spent: "₱45", joined: "Jun 2026", status: "Active", lastOrder: "Jul 13, 2026", address: "34 Connaught Place, Delhi 110001" },
  { id: 8, name: "Kavya Iyer", email: "kavya@email.com", phone: "+91 21098 76543", orders: 9, spent: "₱1,080", joined: "Jan 2026", status: "Active", lastOrder: "Jul 13, 2026", address: "67 MG Road, Pune 411001" },
];

type Customer = typeof customersData[number];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

  const filtered = customersData.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Customers</h1>
          <p className="mt-1 text-sm text-gray-900">Manage your customer base</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: "3,420", color: "text-teal" },
          { label: "Active", value: "3,180", color: "text-emerald-600" },
          { label: "New This Month", value: "142", color: "text-blue-600" },
          { label: "Avg. Spend", value: "₱185", color: "text-pink" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-900">{s.label}</p>
            <p className={`mt-1 text-2xl font-semibold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
        <input type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Customer</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Phone</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Orders</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Total Spent</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Joined</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Status</th>
              <th className="px-6 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-sm font-semibold text-teal">
                      {customer.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">{customer.name}</p>
                      <p className="text-xs text-gray-900">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-black">{customer.phone}</td>
                <td className="px-6 py-4 text-sm text-black">{customer.orders}</td>
                <td className="px-6 py-4 text-sm font-medium text-black">{customer.spent}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{customer.joined}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${customer.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-black"}`}>{customer.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setViewCustomer(customer)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                    <button className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-blue-600"><Mail size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3.5">
          <p className="text-sm text-gray-900">Showing {filtered.length} customers</p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-100">Previous</button>
            <button className="rounded-lg bg-teal px-3 py-1.5 text-sm font-medium text-white">1</button>
            <button className="rounded-lg px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {viewCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setViewCustomer(null)}>
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">Customer Details</h2>
              <button onClick={() => setViewCustomer(null)} className="text-black hover:text-black"><X size={20} /></button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-lg font-bold text-teal">
                {viewCustomer.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">{viewCustomer.name}</h3>
                <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${viewCustomer.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-black"}`}>{viewCustomer.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg bg-teal/5 p-3 text-center">
                <p className="text-2xl font-bold text-teal">{viewCustomer.orders}</p>
                <p className="text-xs text-gray-900">Total Orders</p>
              </div>
              <div className="rounded-lg bg-pink/5 p-3 text-center">
                <p className="text-2xl font-bold text-pink">{viewCustomer.spent}</p>
                <p className="text-xs text-gray-900">Total Spent</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: Mail, label: "Email", value: viewCustomer.email },
                { icon: Phone, label: "Phone", value: viewCustomer.phone },
                { icon: Calendar, label: "Joined", value: viewCustomer.joined },
                { icon: ShoppingCart, label: "Last Order", value: viewCustomer.lastOrder },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <item.icon size={16} className="text-black" />
                  <div>
                    <p className="text-xs text-black">{item.label}</p>
                    <p className="text-sm text-black">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-end">
              <button onClick={() => setViewCustomer(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">Close</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal title="Delete Customer" message={`Are you sure you want to delete "${deleteTarget.name}"?`} onConfirm={() => setDeleteTarget(null)} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
