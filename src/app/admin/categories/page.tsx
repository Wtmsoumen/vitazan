"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Package, Eye, X } from "lucide-react";
import DeleteModal from "@/components/admin/DeleteModal";
import ImageUpload from "@/components/admin/ImageUpload";

const categoriesData = [
  { id: 1, name: "Cold & Cough Remedy", slug: "cold-cough", description: "Natural Ayurvedic remedies for cold, cough, and respiratory wellness", products: 8, color: "#fff1e0", status: "Active" },
  { id: 2, name: "Gut Health", slug: "gut-health", description: "Digestive health supplements for a healthy gut microbiome", products: 5, color: "#e2fbff", status: "Active" },
  { id: 3, name: "Bone Joint Muscle Care", slug: "bone-joint", description: "Comprehensive bone density and joint mobility support", products: 6, color: "#f3e4fd", status: "Active" },
  { id: 4, name: "Vitamin & Nutrition", slug: "vitamins", description: "Essential vitamins and nutrition supplements for daily wellness", products: 4, color: "#eaecff", status: "Active" },
  { id: 5, name: "Immunity Boosters", slug: "immunity", description: "Natural immunity boosting supplements with Ayurvedic herbs", products: 0, color: "#fef3c7", status: "Draft" },
];

type Category = typeof categoriesData[number];

export default function CategoriesPage() {
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Categories</h1>
          <p className="mt-1 text-sm text-gray-900">Organize your products into categories</p>
        </div>
        <button onClick={() => { setSelected(null); setModal("add"); }} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {categoriesData.map((cat) => (
          <div key={cat.id} className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-3" style={{ backgroundColor: cat.color }} />
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: cat.color }}>
                  <Package size={22} className="text-gray-700" />
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{cat.status}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-black">{cat.name}</h3>
              <p className="mt-1.5 text-sm text-gray-900 line-clamp-2">{cat.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-900">{cat.products} products</span>
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => { setSelected(cat); setModal("view"); }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                  <button onClick={() => { setSelected(cat); setModal("edit"); }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><Edit size={16} /></button>
                  <button onClick={() => setDeleteTarget(cat)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">{modal === "add" ? "Add New Category" : "Edit Category"}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="mt-6 space-y-4">
              <ImageUpload label="Category Image" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Category Name</label>
                <input type="text" defaultValue={selected?.name || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Slug</label>
                <input type="text" defaultValue={selected?.slug || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
                <textarea defaultValue={selected?.description || ""} className="h-20 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Accent Color</label>
                  <input type="color" defaultValue={selected?.color || "#e2fbff"} className="h-10 w-full rounded-lg border border-gray-200 cursor-pointer" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <select defaultValue={selected?.status || "Active"} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">{modal === "add" ? "Add Category" : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details */}
      {modal === "view" && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">Category Details</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl" style={{ backgroundColor: selected.color }}>
                <Package size={26} className="text-gray-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">{selected.name}</h3>
                <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${selected.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{selected.status}</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Slug", value: selected.slug },
                { label: "Products", value: `${selected.products} products` },
                { label: "Description", value: selected.description },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="mt-1 text-sm text-black">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal("edit")} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Edit size={14} /> Edit</button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">Close</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal title="Delete Category" message={`Are you sure you want to delete "${deleteTarget.name}"? All products in this category will be uncategorized.`} onConfirm={() => setDeleteTarget(null)} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
