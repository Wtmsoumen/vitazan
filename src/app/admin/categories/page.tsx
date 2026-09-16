"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit, Trash2, Package, Eye, X, Loader2, Search } from "lucide-react";
import DeleteModal from "@/components/admin/DeleteModal";
import ImageUpload from "@/components/admin/ImageUpload";
import { api, getResponseData, type ApiEnvelope } from "@/utils/api";
import { endpoints } from "@/utils/endpoints";

interface Category {
  id: number;
  name: string;
  slug: string;
  status: number;
  parent_id?: number | null;
  image?: string | null;
  image_url?: string | null;
  products_count?: number;
}

interface CategoryFormData {
  name: string;
  slug: string;
  status: string;
  parent_id: string;
  image?: File | null;
}

const emptyForm: CategoryFormData = {
  name: "",
  slug: "",
  status: "1",
  parent_id: "",
  image: null,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [form, setForm] = useState<CategoryFormData>(emptyForm);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<ApiEnvelope<Category[]>>(endpoints.categories, { auth: true });
      setCategories(getResponseData(res) ?? []);
    } catch {
      setMsg({ type: "error", text: "Failed to load categories" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  useEffect(() => {
    if (msg) { const t = setTimeout(() => setMsg(null), 4000); return () => clearTimeout(t); }
  }, [msg]);

  const openAdd = () => { setSelected(null); setForm(emptyForm); setModal("add"); };
  const openEdit = (cat: Category) => {
    setSelected(cat);
    setForm({ name: cat.name, slug: cat.slug, status: String(cat.status), parent_id: cat.parent_id ? String(cat.parent_id) : "", image: null });
    setModal("edit");
  };
  const openView = (cat: Category) => { setSelected(cat); setModal("view"); };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("slug", form.slug);
      fd.append("status", form.status);
      if (form.parent_id) fd.append("parent_id", form.parent_id);
      if (form.image) fd.append("image", form.image);
      if (modal === "edit" && selected) fd.append("id", String(selected.id));

      await api(modal === "add" ? endpoints.categoryAdd : endpoints.categoryUpdate, {
        method: "POST",
        body: fd,
        auth: true,
      });
      setMsg({ type: "success", text: modal === "add" ? "Category added" : "Category updated" });
      setModal(null);
      fetchCategories();
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api(endpoints.categoryDelete, {
        method: "DELETE",
        params: { id: String(deleteTarget.id) },
        auth: true,
      });
      setMsg({ type: "success", text: "Category deleted" });
      setDeleteTarget(null);
      fetchCategories();
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to delete" });
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {msg && (
        <div className={`mb-4 rounded-lg px-4 py-3 text-sm font-medium ${msg.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Categories</h1>
          <p className="mt-1 text-sm text-gray-900">Organize your products into categories</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="mb-6 relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
        <input type="text" placeholder="Search categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-teal" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white py-20 text-center text-sm text-gray-500">No categories found</div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {filtered.map((cat) => (
            <div key={cat.id} className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-3 bg-teal/20" />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10">
                    {cat.image_url || cat.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cat.image_url || cat.image || ""} alt={cat.name} className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <Package size={22} className="text-gray-700" />
                    )}
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.status === 1 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-black"}`}>
                    {cat.status === 1 ? "Active" : "Draft"}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black">{cat.name}</h3>
                <p className="mt-1 text-sm text-gray-500 font-mono">{cat.slug}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-900">{cat.products_count ?? 0} products</span>
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button onClick={() => openView(cat)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                    <button onClick={() => openEdit(cat)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-blue-600"><Edit size={16} /></button>
                    <button onClick={() => setDeleteTarget(cat)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">{modal === "add" ? "Add New Category" : "Edit Category"}</h2>
              <button onClick={() => setModal(null)} className="text-black hover:text-black"><X size={20} /></button>
            </div>
            <div className="mt-6 space-y-4">
              <ImageUpload label="Category Image" value={selected?.image_url || selected?.image || undefined} onChange={(f) => setForm((p) => ({ ...p, image: f }))} />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Category Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Slug</label>
                <input type="text" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Parent Category (optional)</label>
                <select value={form.parent_id} onChange={(e) => setForm((p) => ({ ...p, parent_id: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                  <option value="">None</option>
                  {categories.filter((c) => selected ? c.id !== selected.id : true).map((c) => (
                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                  <option value="1">Active</option>
                  <option value="0">Draft</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50">Cancel</button>
              <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90 disabled:opacity-60">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {modal === "add" ? "Add Category" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {modal === "view" && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">Category Details</h2>
              <button onClick={() => setModal(null)}><X size={20} /></button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10">
                {selected.image_url || selected.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selected.image_url || selected.image || ""} alt={selected.name} className="h-12 w-12 rounded-lg object-cover" />
                ) : (
                  <Package size={26} className="text-gray-700" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">{selected.name}</h3>
                <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${selected.status === 1 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-black"}`}>
                  {selected.status === 1 ? "Active" : "Draft"}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Slug", value: selected.slug },
                { label: "Products", value: `${selected.products_count ?? 0} products` },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-black">{item.label}</p>
                  <p className="mt-1 text-sm text-black">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => openEdit(selected)} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Edit size={14} /> Edit</button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">Close</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal
          title="Delete Category"
          message={`Are you sure you want to delete "${deleteTarget.name}"? All products in this category will be uncategorized.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
