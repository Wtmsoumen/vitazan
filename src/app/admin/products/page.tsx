"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, X, Loader2, ImageIcon, XCircle } from "lucide-react";
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
  type?: number;
  section_type?: number;
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

interface ApiGalleryImage {
  id: number;
  image?: string | null;
  image_url?: string | null;
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
  gallery?: ApiGalleryImage[];
}

interface ProductEditResponse {
  data: Product;
  categories: Category[];
}

interface ExtraSectionFormData {
  id?: number;
  section_type: string;
  title: string;
  body: string;
  btn_url: string;
  btn_text: string;
  rank: string;
  image: File | null;
  image2: File | null;
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
  extraSections: ExtraSectionFormData[];
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
  extraSections: [],
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
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

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

  const loadDetail = async (product: Product) => {
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
        extraSections: detail.extra?.map((e) => ({
          id: e.id,
          section_type: String(e.section_type ?? e.type ?? 1),
          title: e.title ?? "",
          body: e.body ?? "",
          btn_url: e.btn_url ?? "",
          btn_text: e.btn_text ?? "",
          rank: String(e.rank ?? 1),
          image: null,
          image2: null,
        })) ?? [],
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
        extraSections: product.extra?.map((e) => ({
          id: e.id,
          section_type: String(e.section_type ?? e.type ?? 1),
          title: e.title ?? "",
          body: e.body ?? "",
          btn_url: e.btn_url ?? "",
          btn_text: e.btn_text ?? "",
          rank: String(e.rank ?? 1),
          image: null,
          image2: null,
        })) ?? [],
      });
    } finally {
      setDetailLoading(false);
    }
  };

  const openAdd = () => { setSelected(null); setForm(emptyForm); setModal("add"); };
  const openEdit = (product: Product) => { setSelected(product); setModal("edit"); loadDetail(product); };
  const openView = (product: Product) => { setSelected(product); setModal("view"); };

  // --- Delete helpers (used inside edit modal) ---

  const deleteProductImage = async () => {
    if (!selected) return;
    const key = `img-${selected.id}`;
    setDeletingImageId(key);
    try {
      await api(endpoints.productImageDelete, { method: "DELETE", params: { id: String(selected.id) }, auth: true });
      setSelected((p) => p ? { ...p, image: null, image_url: null } : p);
      setMsg({ type: "success", text: "Product image deleted" });
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to delete image" });
    } finally {
      setDeletingImageId(null);
    }
  };

  const deleteSectionImage = async (sectionId: number, field: "image" | "image2") => {
    const key = `sec-img-${sectionId}-${field}`;
    setDeletingImageId(key);
    try {
      await api(endpoints.productSectionImageDelete, {
        method: "DELETE",
        params: { id: String(sectionId), image_field: field },
        auth: true,
      });
      setSelected((p) => p ? {
        ...p,
        extra: p.extra?.map((s) => s.id === sectionId ? { ...s, [field]: null, [`${field}_url`]: null } : s),
      } : p);
      setMsg({ type: "success", text: "Section image deleted" });
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to delete image" });
    } finally {
      setDeletingImageId(null);
    }
  };

  const deleteSection = async (sectionId: number) => {
    const key = `sec-${sectionId}`;
    setDeletingImageId(key);
    try {
      await api(endpoints.productSectionDelete, {
        method: "DELETE",
        params: { id: String(sectionId) },
        auth: true,
      });
      setSelected((p) => p ? { ...p, extra: p.extra?.filter((s) => s.id !== sectionId) } : p);
      setMsg({ type: "success", text: "Section deleted" });
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to delete section" });
    } finally {
      setDeletingImageId(null);
    }
  };

  const deleteGalleryImage = async (galleryId: number) => {
    const key = `gal-${galleryId}`;
    setDeletingImageId(key);
    try {
      await api(endpoints.productGalleryDelete, {
        method: "DELETE",
        params: { id: String(galleryId) },
        auth: true,
      });
      setSelected((p) => p ? { ...p, gallery: p.gallery?.filter((g) => g.id !== galleryId) } : p);
      setMsg({ type: "success", text: "Gallery image deleted" });
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to delete gallery image" });
    } finally {
      setDeletingImageId(null);
    }
  };

  // --- Save / Delete product ---

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

      form.extraSections.forEach((section) => {
        fd.append("extra_section_type[]", section.section_type);
        fd.append("extra_title[]", section.title);
        fd.append("extra_body[]", section.body ?? "");
        fd.append("extra_btn_url[]", section.btn_url ?? "");
        fd.append("extra_btn_text[]", section.btn_text ?? "");
        fd.append("extra_rank[]", section.rank);
        if (section.image) fd.append("extra_image[]", section.image);
        if (section.image2) fd.append("extra_image2[]", section.image2);
      });

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
      await api(endpoints.productDelete, { method: "DELETE", params: { id: String(deleteTarget.id) }, auth: true });
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

  const addExtraSection = () => {
    setForm((p) => ({
      ...p,
      extraSections: [...p.extraSections, {
        section_type: "1",
        title: "",
        body: "",
        btn_url: "",
        btn_text: "",
        rank: String(p.extraSections.length + 1),
        image: null,
        image2: null,
      }],
    }));
  };

  const updateExtraSection = (idx: number, key: keyof ExtraSectionFormData, value: string | File | null) => {
    setForm((p) => ({
      ...p,
      extraSections: p.extraSections.map((s, i) => i === idx ? { ...s, [key]: value } : s),
    }));
  };

  const removeExtraSection = (idx: number) => {
    const section = form.extraSections[idx];
    if (section.id) deleteSection(section.id);
    setForm((p) => ({ ...p, extraSections: p.extraSections.filter((_, i) => i !== idx) }));
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Small helper component for deletable image ---
  const DeletableImage = ({ src, onDelete, deleteKey, label }: { src: string | null | undefined; onDelete: () => void; deleteKey: string; label?: string }) => {
    const resolved = resolveImageUrl(src);
    if (!resolved) return null;
    const busy = deletingImageId === deleteKey;
    return (
      <div className="relative inline-block">
        {label && <p className="mb-1 text-xs text-gray-500">{label}</p>}
        <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <Image src={resolved} alt="image" fill className="object-cover" />
          <button
            onClick={onDelete}
            disabled={busy}
            title="Delete image"
            className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-red-500 shadow hover:bg-red-500 hover:text-white disabled:opacity-50"
          >
            {busy ? <Loader2 size={11} className="animate-spin" /> : <XCircle size={13} />}
          </button>
        </div>
      </div>
    );
  };

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
                {/* Main image */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Product Image</label>
                  {modal === "edit" && (selected?.image_url || selected?.image) && (
                    <div className="mb-2 flex items-center gap-3">
                      <DeletableImage
                        src={selected.image_url || selected.image}
                        onDelete={deleteProductImage}
                        deleteKey={`img-${selected?.id}`}
                        label="Current image"
                      />
                    </div>
                  )}
                  <ImageUpload label="Upload new image" value={undefined} onChange={(f) => setForm((p) => ({ ...p, image: f }))} />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9\s-]/g, "")
                        .replace(/\s+/g, "-")
                        .replace(/-+/g, "-");
                      setForm((p) => ({ ...p, title, slug }));
                    }}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    Slug
                    <span className="text-[11px] font-normal text-gray-400">(auto-generated, editable)</span>
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 font-mono text-sm outline-none focus:border-teal"
                    placeholder="auto-generated from name"
                  />
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

                {/* Sections */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Extra Sections</label>
                    <button type="button" onClick={addExtraSection} className="flex items-center gap-1 text-xs font-medium text-teal hover:text-teal/80">
                      <Plus size={13} /> Add Section
                    </button>
                  </div>
                  {form.extraSections.length === 0 && (
                    <p className="text-xs text-gray-400 italic">No sections yet. Click "Add Section" to create one.</p>
                  )}
                  <div className="space-y-4">
                    {form.extraSections.map((section, idx) => (
                      <div key={idx} className="rounded-lg border border-gray-200 bg-gray-50/40 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-black">Section {idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeExtraSection(idx)}
                            disabled={section.id ? deletingImageId === `sec-${section.id}` : false}
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-red-500 hover:bg-red-50 disabled:opacity-50"
                          >
                            {(section.id && deletingImageId === `sec-${section.id}`) ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                            Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Type</label>
                            <input type="number" value={section.section_type} onChange={e => updateExtraSection(idx, "section_type", e.target.value)} className="h-8 w-full rounded-lg border border-gray-200 bg-white px-2 text-xs outline-none focus:border-teal" />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Rank</label>
                            <input type="number" value={section.rank} onChange={e => updateExtraSection(idx, "rank", e.target.value)} className="h-8 w-full rounded-lg border border-gray-200 bg-white px-2 text-xs outline-none focus:border-teal" />
                          </div>
                          <div className="col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">Title</label>
                            <input type="text" value={section.title} onChange={e => updateExtraSection(idx, "title", e.target.value)} className="h-8 w-full rounded-lg border border-gray-200 bg-white px-2 text-xs outline-none focus:border-teal" />
                          </div>
                          <div className="col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">Body</label>
                            <textarea value={section.body} onChange={e => updateExtraSection(idx, "body", e.target.value)} rows={3} className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-teal resize-none" />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Button Text</label>
                            <input type="text" value={section.btn_text} onChange={e => updateExtraSection(idx, "btn_text", e.target.value)} className="h-8 w-full rounded-lg border border-gray-200 bg-white px-2 text-xs outline-none focus:border-teal" />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Button URL</label>
                            <input type="text" value={section.btn_url} onChange={e => updateExtraSection(idx, "btn_url", e.target.value)} className="h-8 w-full rounded-lg border border-gray-200 bg-white px-2 text-xs outline-none focus:border-teal" />
                          </div>
                          {/* Image 1 */}
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Image 1</label>
                            {section.id && selected?.extra?.find(e => e.id === section.id)?.image_url && (
                              <div className="mb-2">
                                <DeletableImage
                                  src={selected.extra.find(e => e.id === section.id)?.image_url}
                                  onDelete={() => deleteSectionImage(section.id!, "image")}
                                  deleteKey={`sec-img-${section.id}-image`}
                                  label="Current"
                                />
                              </div>
                            )}
                            <ImageUpload label="Upload Image 1" value={undefined} onChange={f => updateExtraSection(idx, "image", f)} />
                          </div>
                          {/* Image 2 */}
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Image 2</label>
                            {section.id && selected?.extra?.find(e => e.id === section.id)?.image2_url && (
                              <div className="mb-2">
                                <DeletableImage
                                  src={selected.extra.find(e => e.id === section.id)?.image2_url}
                                  onDelete={() => deleteSectionImage(section.id!, "image2")}
                                  deleteKey={`sec-img-${section.id}-image2`}
                                  label="Current"
                                />
                              </div>
                            )}
                            <ImageUpload label="Upload Image 2" value={undefined} onChange={f => updateExtraSection(idx, "image2", f)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                {modal === "edit" && selected?.gallery && selected.gallery.length > 0 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Gallery</label>
                    <div className="flex flex-wrap gap-3">
                      {selected.gallery.map((img) => (
                        <DeletableImage
                          key={img.id}
                          src={img.image_url || img.image}
                          onDelete={() => deleteGalleryImage(img.id)}
                          deleteKey={`gal-${img.id}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
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
