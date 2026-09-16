"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, X, Loader2, ImageIcon } from "lucide-react";
import DeleteModal from "@/components/admin/DeleteModal";
import ImageUpload from "@/components/admin/ImageUpload";
import { api, getResponseData, type ApiEnvelope } from "@/utils/api";
import { endpoints } from "@/utils/endpoints";

const PRODUCT_UPLOAD_BASE = "https://vitazan.webtechnomind.in/public/uploads/product/";

function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) return url;
  return `${PRODUCT_UPLOAD_BASE}${url}`;
}

interface Category {
  id: number;
  name: string;
}

interface ApiProductSection {
  id: number;
  product_id?: number;
  section_type: number;
  title: string;
  body?: string | null;
  btn_text?: string | null;
  btn_url?: string | null;
  image?: string | null;
  image2?: string | null;
  image_url?: string | null;
  image2_url?: string | null;
  rank?: number;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  body?: string | null;
  meta_title?: string | null;
  meta_keyword?: string | null;
  meta_description?: string | null;
  regular_price: number | string;
  sale_price?: number | string | null;
  stock_quantity?: number | string | null;
  status: number;
  image?: string | null;
  image_url?: string | null;
  category?: Category[];
  extra?: ApiProductSection[];
}

interface ProductEditResponse {
  data: Product;
  categories: Category[];
}

interface ProductFormData {
  title: string;
  slug: string;
  body: string;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
  regular_price: string;
  sale_price: string;
  stock_quantity: string;
  status: string;
  category_ids: string[];
  image?: File | null;
}

const emptyForm: ProductFormData = {
  title: "",
  slug: "",
  body: "",
  meta_title: "",
  meta_keyword: "",
  meta_description: "",
  regular_price: "",
  sale_price: "",
  stock_quantity: "",
  status: "1",
  category_ids: [],
  image: null,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<ApiEnvelope<Product[]>>(endpoints.products, { auth: true });
      setProducts(getResponseData(res) ?? []);
    } catch {
      setMsg({ type: "error", text: "Failed to load products" });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await api<ApiEnvelope<Category[]>>(endpoints.categories, { auth: true });
      setCategories(getResponseData(res) ?? []);
    } catch {
      // non-critical
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    if (msg) { const t = setTimeout(() => setMsg(null), 4000); return () => clearTimeout(t); }
  }, [msg]);

  const openAdd = () => { setSelected(null); setForm(emptyForm); setModal("add"); };

  const openEdit = async (product: Product) => {
    setSelected(product);
    setModal("edit");
    setDetailLoading(true);
    try {
      const res = await api<ApiEnvelope<ProductEditResponse>>(endpoints.productEdit, { auth: true, params: { id: String(product.id) } });
      const payload = getResponseData(res);
      const detail = payload?.data ?? product;
      if (payload?.categories?.length) setCategories(payload.categories);
      setSelected(detail);
      setForm({
        title: detail.title,
        slug: detail.slug,
        body: detail.body ?? "",
        meta_title: detail.meta_title ?? "",
        meta_keyword: detail.meta_keyword ?? "",
        meta_description: detail.meta_description ?? "",
        regular_price: String(detail.regular_price ?? ""),
        sale_price: String(detail.sale_price ?? ""),
        stock_quantity: String(detail.stock_quantity ?? ""),
        status: String(detail.status),
        category_ids: detail.category?.map((c) => String(c.id)) ?? [],
        image: null,
      });
    } catch {
      setForm({
        title: product.title,
        slug: product.slug,
        body: product.body ?? "",
        meta_title: product.meta_title ?? "",
        meta_keyword: product.meta_keyword ?? "",
        meta_description: product.meta_description ?? "",
        regular_price: String(product.regular_price ?? ""),
        sale_price: String(product.sale_price ?? ""),
        stock_quantity: String(product.stock_quantity ?? ""),
        status: String(product.status),
        category_ids: product.category?.map((c) => String(c.id)) ?? [],
        image: null,
      });
    } finally {
      setDetailLoading(false);
    }
  };

  const openView = (product: Product) => { setSelected(product); setModal("view"); };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("slug", form.slug);
      fd.append("body", form.body);
      fd.append("meta_title", form.meta_title);
      fd.append("meta_keyword", form.meta_keyword);
      fd.append("meta_description", form.meta_description);
      fd.append("regular_price", form.regular_price);
      fd.append("sale_price", form.sale_price);
      fd.append("stock_quentity", form.stock_quantity);
      fd.append("status", form.status);
      form.category_ids.forEach((id) => fd.append("category_ids[]", id));
      if (form.image) fd.append("image", form.image);
      if (modal === "edit" && selected) fd.append("id", String(selected.id));

      await api(modal === "add" ? endpoints.productAdd : endpoints.productUpdate, {
        method: "POST",
        body: fd,
        auth: true,
      });
      setMsg({ type: "success", text: modal === "add" ? "Product added" : "Product updated" });
      setModal(null);
      fetchProducts();
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api(endpoints.productDelete, {
        method: "DELETE",
        params: { id: String(deleteTarget.id) },
        auth: true,
      });
      setMsg({ type: "success", text: "Product deleted" });
      setDeleteTarget(null);
      fetchProducts();
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to delete" });
      setDeleteTarget(null);
    }
  };

  const toggleCategory = (id: string) => {
    setForm((p) => ({
      ...p,
      category_ids: p.category_ids.includes(id) ? p.category_ids.filter((c) => c !== id) : [...p.category_ids, id],
    }));
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-2xl font-semibold text-black">Products</h1>
          <p className="mt-1 text-sm text-gray-900">Manage your Vitazan product catalog</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal/90">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-teal" /></div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Product</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Price</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Sale Price</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Stock</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Status</th>
                <th className="px-6 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="py-10 text-center text-sm text-gray-500">No products found</td></tr>
              ) : filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                        {resolveImageUrl(product.image_url || product.image) ? (
                          <Image src={resolveImageUrl(product.image_url || product.image)!} alt={product.title} fill className="object-contain p-1" />
                        ) : (
                          <ImageIcon size={18} className="text-gray-400" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-black">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-black">₹{product.regular_price}</td>
                  <td className="px-6 py-4 text-sm text-black">{product.sale_price ? `₹${product.sale_price}` : "—"}</td>
                  <td className="px-6 py-4 text-sm text-black">{product.stock_quantity ?? "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${product.status === 1 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-black"}`}>
                      {product.status === 1 ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openView(product)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                      <button onClick={() => openEdit(product)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-blue-600"><Edit size={16} /></button>
                      <button onClick={() => setDeleteTarget(product)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3.5">
            <p className="text-sm text-gray-900">Showing {filtered.length} of {products.length} products</p>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-black">{modal === "add" ? "Add New Product" : "Edit Product"}</h2>
                <p className="mt-1 text-sm text-gray-900">{modal === "add" ? "Fill in the details" : "Update the product information"}</p>
              </div>
              <button onClick={() => setModal(null)}><X size={20} /></button>
            </div>

            {detailLoading ? (
              <div className="flex items-center justify-center py-12"><Loader2 size={28} className="animate-spin text-teal" /></div>
            ) : (
              <div className="mt-6 space-y-4">
                <ImageUpload label="Product Image" value={resolveImageUrl(selected?.image_url || selected?.image) ?? undefined} onChange={(f) => setForm((p) => ({ ...p, image: f }))} />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Product Name</label>
                  <input type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Slug</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="auto-generated if empty" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Regular Price</label>
                    <input type="number" value={form.regular_price} onChange={(e) => setForm((p) => ({ ...p, regular_price: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="0" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Sale Price</label>
                    <input type="number" value={form.sale_price} onChange={(e) => setForm((p) => ({ ...p, sale_price: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="0" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Stock</label>
                    <input type="number" value={form.stock_quantity} onChange={(e) => setForm((p) => ({ ...p, stock_quantity: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="0" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                    <option value="1">Active</option>
                    <option value="0">Draft</option>
                  </select>
                </div>
                {categories.length > 0 && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" checked={form.category_ids.includes(String(cat.id))} onChange={() => toggleCategory(String(cat.id))} className="rounded border-gray-300 text-teal" />
                          <span className="text-sm text-gray-700">{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
                  <textarea value={form.body} onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))} className="h-24 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal" placeholder="Product description..." />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Title</label>
                  <input type="text" value={form.meta_title} onChange={(e) => setForm((p) => ({ ...p, meta_title: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Keywords</label>
                    <input type="text" value={form.meta_keyword} onChange={(e) => setForm((p) => ({ ...p, meta_keyword: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Description</label>
                    <input type="text" value={form.meta_description} onChange={(e) => setForm((p) => ({ ...p, meta_description: e.target.value }))} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50">Cancel</button>
              <button onClick={handleSubmit} disabled={saving || detailLoading} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90 disabled:opacity-60">
                {saving && <Loader2 size={14} className="animate-spin" />}
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
              <button onClick={() => setModal(null)}><X size={20} /></button>
            </div>
            <div className="flex gap-6">
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center">
                {resolveImageUrl(selected.image_url || selected.image) ? (
                  <Image src={resolveImageUrl(selected.image_url || selected.image)!} alt={selected.title} fill className="object-contain p-2" />
                ) : (
                  <ImageIcon size={32} className="text-gray-300" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-black">{selected.title}</h3>
                <span className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${selected.status === 1 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-black"}`}>
                  {selected.status === 1 ? "Active" : "Draft"}
                </span>
                {selected.body && <p className="mt-3 text-sm text-gray-900">{selected.body}</p>}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "Regular Price", value: `₹${selected.regular_price}` },
                { label: "Sale Price", value: selected.sale_price ? `₹${selected.sale_price}` : "—" },
                { label: "Stock", value: String(selected.stock_quantity ?? "—") },
                { label: "Slug", value: selected.slug },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-black">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-black">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => openEdit(selected)} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Edit size={14} /> Edit Product
              </button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">Close</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal
          title="Delete Product"
          message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
