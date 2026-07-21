"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, X, ImageIcon } from "lucide-react";
import DeleteModal from "@/components/admin/DeleteModal";
import ImageUpload from "@/components/admin/ImageUpload";

const productsData = [
  { id: 1, name: "VITAZAN™ HT-KOF", sku: "VZ-HTK-001", category: "Cold & Cough", price: "₱15.00", stock: 342, status: "Active", image: "/images/htkof-product.png", description: "Ayurvedic cold & cough relief formula with natural herbs." },
  { id: 2, name: "VITAZAN™ SENAX", sku: "VZ-SNX-002", category: "Gut Health", price: "₱15.00", stock: 218, status: "Active", image: "/images/senax-product.png", description: "Digestive health supplement for improved gut function." },
  { id: 3, name: "VITAZAN™ OSTEOMAC", sku: "VZ-OST-003", category: "Bone & Joint", price: "₱15.00", stock: 156, status: "Active", image: "/images/osteomac-product.png", description: "Comprehensive bone density and joint mobility support." },
  { id: 4, name: "VITAZAN™ RELOAD", sku: "VZ-RLD-004", category: "Vitamins & Nutrition", price: "₱15.00", stock: 0, status: "Out of Stock", image: "/images/reload-product.png", description: "Essential vitamins and minerals for daily wellness." },
  { id: 5, name: "VITAZAN™ HT-KOF Syrup", sku: "VZ-HTK-005", category: "Cold & Cough", price: "₱22.00", stock: 89, status: "Active", image: "/images/htkof-product.png", description: "Syrup format for faster cold & cough relief." },
  { id: 6, name: "VITAZAN™ SENAX Plus", sku: "VZ-SNX-006", category: "Gut Health", price: "₱18.00", stock: 45, status: "Low Stock", image: "/images/senax-product.png", description: "Enhanced gut health formula with probiotics." },
];

type Product = typeof productsData[number];

const statusColor: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  "Out of Stock": "bg-red-100 text-red-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  Draft: "bg-gray-100 text-gray-600",
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = productsData.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openView = (p: Product) => { setSelected(p); setModal("view"); };
  const openEdit = (p: Product) => { setSelected(p); setModal("edit"); };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Products</h1>
          <p className="mt-1 text-sm text-gray-900">Manage your Vitazan product catalog</p>
        </div>
        <button onClick={() => { setSelected(null); setModal("add"); }} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal/90">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal" />
        </div>
        <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none">
          <option>All Categories</option>
          <option>Cold & Cough</option>
          <option>Gut Health</option>
          <option>Bone & Joint</option>
          <option>Vitamins & Nutrition</option>
        </select>
        <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none">
          <option>All Status</option>
          <option>Active</option>
          <option>Out of Stock</option>
          <option>Low Stock</option>
          <option>Draft</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Product</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">SKU</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Category</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Price</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Stock</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Status</th>
              <th className="px-6 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
                      <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                    </div>
                    <span className="text-sm font-medium text-black">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.sku}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-sm font-medium text-black">{product.price}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[product.status]}`}>{product.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openView(product)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                    <button onClick={() => openEdit(product)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><Edit size={16} /></button>
                    <button onClick={() => setDeleteTarget(product)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3.5">
          <p className="text-sm text-gray-900">Showing {filtered.length} of {productsData.length} products</p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-100">Previous</button>
            <button className="rounded-lg bg-teal px-3 py-1.5 text-sm font-medium text-white">1</button>
            <button className="rounded-lg px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-100">2</button>
            <button className="rounded-lg px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-black">{modal === "add" ? "Add New Product" : "Edit Product"}</h2>
                <p className="mt-1 text-sm text-gray-900">{modal === "add" ? "Fill in the details for the new product" : "Update the product information"}</p>
              </div>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <div className="mt-6 space-y-4">
              <ImageUpload label="Product Image" value={modal === "edit" && selected ? selected.image : undefined} />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Product Name</label>
                <input type="text" defaultValue={selected?.name || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="VITAZAN™ Product Name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">SKU</label>
                  <input type="text" defaultValue={selected?.sku || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="VZ-XXX-000" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Price</label>
                  <input type="text" defaultValue={selected?.price || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="₱0.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
                  <select defaultValue={selected?.category || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                    <option>Cold & Cough</option>
                    <option>Gut Health</option>
                    <option>Bone & Joint</option>
                    <option>Vitamins & Nutrition</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Stock</label>
                  <input type="number" defaultValue={selected?.stock ?? ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                <select defaultValue={selected?.status || "Active"} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
                <textarea defaultValue={selected?.description || ""} className="h-24 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal" placeholder="Product description..." />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">
                {modal === "add" ? "Add Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details */}
      {modal === "view" && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">Product Details</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <div className="flex gap-6">
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                <Image src={selected.image} alt={selected.name} fill className="object-contain p-2" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-black">{selected.name}</h3>
                <span className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[selected.status]}`}>{selected.status}</span>
                <p className="mt-3 text-sm text-gray-900">{selected.description}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "SKU", value: selected.sku },
                { label: "Category", value: selected.category },
                { label: "Price", value: selected.price },
                { label: "Stock", value: String(selected.stock) },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-black">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => { setModal("edit"); }} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Edit size={14} /> Edit Product
              </button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <DeleteModal
          title="Delete Product"
          message={`Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`}
          onConfirm={() => setDeleteTarget(null)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
