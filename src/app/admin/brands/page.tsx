"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, X } from "lucide-react";
import DeleteModal from "@/components/admin/DeleteModal";
import ImageUpload from "@/components/admin/ImageUpload";

const brandsData = [
  { id: 1, name: "VITAZAN", products: 4, status: "Active", logo: "V", color: "#00485d", description: "Premium Ayurvedic health supplements", story: "Founded with a mission to bring traditional Ayurvedic wellness to the modern world." },
  { id: 2, name: "Himalaya", products: 12, status: "Active", logo: "H", color: "#2d6b3f", description: "Herbal healthcare products", story: "A pioneer in herbal healthcare since 1930." },
  { id: 3, name: "Dabur", products: 8, status: "Active", logo: "D", color: "#e5097f", description: "Natural health & beauty products", story: "India's leading natural health company." },
  { id: 4, name: "Patanjali", products: 15, status: "Active", logo: "P", color: "#f59e0b", description: "Ayurvedic wellness range", story: "Bringing Ayurveda to every household." },
  { id: 5, name: "Zandu", products: 6, status: "Inactive", logo: "Z", color: "#7c3aed", description: "Traditional Ayurvedic medicines", story: "Trusted name in traditional medicines for over a century." },
];

type Brand = typeof brandsData[number];

export default function BrandsPage() {
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Brand | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Brands</h1>
          <p className="mt-1 text-sm text-gray-500">Manage product brands and manufacturers</p>
        </div>
        <button onClick={() => { setSelected(null); setModal("add"); }} className="flex items-center gap-2 rounded-lg bg-[#00485d] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#003a4d]">
          <Plus size={18} /> Add Brand
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="relative w-[300px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search brands..." className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-[#00485d]" />
          </div>
          <select className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {brandsData.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold text-sm" style={{ backgroundColor: brand.color }}>{brand.logo}</div>
                    <span className="text-sm font-medium text-gray-900">{brand.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{brand.description}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{brand.products}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${brand.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{brand.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => { setSelected(brand); setModal("view"); }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                    <button onClick={() => { setSelected(brand); setModal("edit"); }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><Edit size={16} /></button>
                    <button onClick={() => setDeleteTarget(brand)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 size={16} /></button>
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
              <h2 className="text-lg font-semibold text-gray-900">{modal === "add" ? "Add New Brand" : "Edit Brand"}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="mt-6 space-y-4">
              <ImageUpload label="Brand Logo" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Brand Name</label>
                <input type="text" defaultValue={selected?.name || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#00485d]" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
                <input type="text" defaultValue={selected?.description || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#00485d]" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Brand Story</label>
                <textarea defaultValue={selected?.story || ""} className="h-24 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#00485d]" placeholder="Tell the brand story..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Brand Color</label>
                  <input type="color" defaultValue={selected?.color || "#00485d"} className="h-10 w-full rounded-lg border border-gray-200 cursor-pointer" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <select defaultValue={selected?.status || "Active"} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#00485d]">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-[#00485d] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a4d]">{modal === "add" ? "Add Brand" : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details */}
      {modal === "view" && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Brand Details</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl text-white font-bold text-2xl" style={{ backgroundColor: selected.color }}>{selected.logo}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selected.name}</h3>
                <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${selected.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{selected.status}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-400">Description</p>
                <p className="mt-1 text-sm text-gray-900">{selected.description}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-400">Brand Story</p>
                <p className="mt-1 text-sm text-gray-900">{selected.story}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-400">Total Products</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{selected.products}</p>
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
        <DeleteModal title="Delete Brand" message={`Are you sure you want to delete "${deleteTarget.name}"? ${deleteTarget.products} products will lose their brand association.`} onConfirm={() => setDeleteTarget(null)} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
