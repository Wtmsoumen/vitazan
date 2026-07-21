"use client";

import { useState } from "react";
import { TicketPercent, Plus, Search, Eye, Edit, Trash2, X, Zap, Gift } from "lucide-react";
import DeleteModal from "@/components/admin/DeleteModal";
import ImageUpload from "@/components/admin/ImageUpload";

const tabs = ["All Coupons", "Discount Campaigns", "Flash Sales", "Combo Offers", "Festival Offers"];

const couponsData = [
  { id: 1, code: "WELCOME20", type: "Percentage", value: "20%", minOrder: "₱500", usage: "156 / 500", usageCount: 156, maxUsage: 500, validUntil: "Aug 31, 2026", status: "Active", description: "Welcome discount for new customers" },
  { id: 2, code: "FLAT100", type: "Fixed", value: "₱100", minOrder: "₱1,000", usage: "89 / 200", usageCount: 89, maxUsage: 200, validUntil: "Jul 31, 2026", status: "Active", description: "Flat ₱100 off on orders above ₱1,000" },
  { id: 3, code: "SUMMER30", type: "Percentage", value: "30%", minOrder: "₱750", usage: "200 / 200", usageCount: 200, maxUsage: 200, validUntil: "Jun 30, 2026", status: "Expired", description: "Summer sale 30% discount" },
  { id: 4, code: "HEALTH15", type: "Percentage", value: "15%", minOrder: "₱300", usage: "45 / 1000", usageCount: 45, maxUsage: 1000, validUntil: "Dec 31, 2026", status: "Active", description: "Health awareness campaign discount" },
  { id: 5, code: "BUNDLE50", type: "Fixed", value: "₱50", minOrder: "₱400", usage: "0 / 300", usageCount: 0, maxUsage: 300, validUntil: "Sep 15, 2026", status: "Scheduled", description: "Upcoming bundle offer discount" },
];

type Coupon = typeof couponsData[number];

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Expired: "bg-gray-100 text-gray-600",
  Scheduled: "bg-blue-100 text-blue-700",
};

export default function CouponsPage() {
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Coupon | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Coupon | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black">Coupons & Offers</h1>
          <p className="mt-1 text-sm text-gray-900">Manage discounts, campaigns, and promotions</p>
        </div>
        <button onClick={() => { setSelected(null); setModal("add"); }} className="flex items-center gap-2 rounded-lg bg-[#00485d] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#003a4d]">
          <Plus size={18} /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal"><TicketPercent size={22} /></div>
          <div><p className="text-sm text-gray-900">Active Coupons</p><p className="text-2xl font-semibold text-black">12</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-600"><Zap size={22} /></div>
          <div><p className="text-sm text-gray-900">Flash Sales Running</p><p className="text-2xl font-semibold text-black">2</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Gift size={22} /></div>
          <div><p className="text-sm text-gray-900">Total Redemptions</p><p className="text-2xl font-semibold text-black">490</p></div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100">
          <div className="flex gap-0 px-6">
            {tabs.map((tab, i) => (
              <button key={tab} className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${i === 0 ? "border-[#00485d] text-[#00485d]" : "border-transparent text-gray-900 hover:text-gray-700"}`}>{tab}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="relative w-[300px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search coupons..." className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-[#00485d]" />
          </div>
          <select className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 outline-none">
            <option>All Status</option><option>Active</option><option>Expired</option><option>Scheduled</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Min Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Usage</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Valid Until</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {couponsData.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4"><span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm font-medium text-black">{coupon.code}</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">{coupon.type}</td>
                <td className="px-6 py-4 text-sm font-medium text-black">{coupon.value}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{coupon.minOrder}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{coupon.usage}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{coupon.validUntil}</td>
                <td className="px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[coupon.status]}`}>{coupon.status}</span></td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => { setSelected(coupon); setModal("view"); }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                    <button onClick={() => { setSelected(coupon); setModal("edit"); }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><Edit size={16} /></button>
                    <button onClick={() => setDeleteTarget(coupon)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">{modal === "add" ? "Create New Coupon" : "Edit Coupon"}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="mt-6 space-y-4">
              <ImageUpload label="Promotional Banner (Optional)" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Coupon Code</label>
                <input type="text" defaultValue={selected?.code || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm uppercase outline-none focus:border-[#00485d]" placeholder="e.g. SUMMER30" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
                <input type="text" defaultValue={selected?.description || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#00485d]" placeholder="Describe this coupon" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Discount Type</label>
                  <select defaultValue={selected?.type || "Percentage"} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#00485d]">
                    <option>Percentage</option>
                    <option>Fixed</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Discount Value</label>
                  <input type="text" defaultValue={selected?.value || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#00485d]" placeholder="20% or ₱100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Minimum Order</label>
                  <input type="text" defaultValue={selected?.minOrder || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#00485d]" placeholder="₱500" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Max Usage</label>
                  <input type="number" defaultValue={selected?.maxUsage ?? ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#00485d]" placeholder="500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Valid Until</label>
                  <input type="date" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#00485d]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <select defaultValue={selected?.status || "Active"} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#00485d]">
                    <option>Active</option><option>Scheduled</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-[#00485d] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a4d]">{modal === "add" ? "Create Coupon" : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details */}
      {modal === "view" && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">Coupon Details</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="mb-6 rounded-xl bg-gradient-to-r from-[#00485d] to-[#006d8e] p-5 text-white">
              <p className="text-sm opacity-70">Coupon Code</p>
              <p className="mt-1 text-2xl font-bold font-mono tracking-wider">{selected.code}</p>
              <p className="mt-2 text-sm opacity-80">{selected.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Discount", value: selected.value },
                { label: "Type", value: selected.type },
                { label: "Min Order", value: selected.minOrder },
                { label: "Valid Until", value: selected.validUntil },
                { label: "Usage", value: selected.usage },
                { label: "Status", value: selected.status },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-black">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-400 mb-1">Usage Progress</p>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-[#00485d]" style={{ width: `${(selected.usageCount / selected.maxUsage) * 100}%` }} />
                </div>
                <p className="mt-1 text-xs text-gray-900">{selected.usageCount} of {selected.maxUsage} used</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal("edit")} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Edit size={14} /> Edit</button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-[#00485d] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a4d]">Close</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal title="Delete Coupon" message={`Are you sure you want to delete coupon "${deleteTarget.code}"? This cannot be undone.`} onConfirm={() => setDeleteTarget(null)} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
