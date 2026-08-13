"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Edit, Trash2, Eye, X, Loader2, GripVertical } from "lucide-react";
import { api, getResponseData, type ApiEnvelope } from "@/utils/api";
import { endpoints } from "@/utils/endpoints";
import DeleteModal from "@/components/admin/DeleteModal";
import ImageUpload from "@/components/admin/ImageUpload";

interface ApiPageSection {
  id: number;
  page_id?: number;
  section_type: number;
  title: string;
  sub_title?: string | null;
  body?: string | null;
  btn_text?: string | null;
  btn_url?: string | null;
  image?: string | null;
  image2?: string | null;
  image_url?: string | null;
  image2_url?: string | null;
  rank?: number;
  status?: number;
  status_show?: number;
}

interface PageSection {
  id?: number;
  extra_section_type: string;
  extra_title: string;
  extra_sub_title: string;
  extra_body: string;
  extra_image?: File | null;
  extra_image2?: File | null;
  extra_image_url?: string | null;
  extra_image2_url?: string | null;
  extra_btn_url: string;
  extra_btn_text: string;
}

interface PageItem {
  id: number;
  page_name: string;
  page_title: string;
  slug: string;
  display_in: number;
  status: number;
  body: string;
  meta_keyword?: string | null;
  meta_description?: string | null;
  menu_order: number;
  page_schema?: string | null;
  sections?: ApiPageSection[];
}

const emptySection: PageSection = {
  extra_section_type: "1",
  extra_title: "",
  extra_sub_title: "",
  extra_body: "",
  extra_image: null,
  extra_image2: null,
  extra_image_url: null,
  extra_image2_url: null,
  extra_btn_url: "",
  extra_btn_text: "",
};

function mapApiSectionToForm(section: ApiPageSection): PageSection {
  return {
    id: section.id,
    extra_section_type: String(section.section_type ?? 1),
    extra_title: section.title || "",
    extra_sub_title: section.sub_title || "",
    extra_body: section.body || "",
    extra_btn_url: section.btn_url || "",
    extra_btn_text: section.btn_text || "",
    extra_image: null,
    extra_image2: null,
    extra_image_url: section.image_url || section.image || null,
    extra_image2_url: section.image2_url || section.image2 || null,
  };
}

export default function PagesAdmin() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<PageItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PageItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    page_name: "",
    page_title: "",
    slug: "",
    display_in: "1",
    status: "1",
    body: "",
    meta_keyword: "",
    meta_description: "",
    page_schema: "",
  });
  const [sections, setSections] = useState<PageSection[]>([]);

  const fetchPages = useCallback(async () => {
    try {
      const data = await api<ApiEnvelope<PageItem[]>>(endpoints.pages, { auth: true });
      setPages(getResponseData(data) ?? []);
    } catch {
      setPages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const openAdd = () => {
    setSelected(null);
    setForm({ page_name: "", page_title: "", slug: "", display_in: "1", status: "1", body: "", meta_keyword: "", meta_description: "", page_schema: "" });
    setSections([]);
    setMsg(null);
    setDetailError(null);
    setDetailLoading(false);
    setModal("add");
  };

  const populateFormFromPage = (page: PageItem) => {
    setForm({
      page_name: page.page_name,
      page_title: page.page_title,
      slug: page.slug,
      display_in: String(page.display_in),
      status: String(page.status),
      body: page.body || "",
      meta_keyword: page.meta_keyword || "",
      meta_description: page.meta_description || "",
      page_schema: page.page_schema || "",
    });
    setSections((page.sections || []).map(mapApiSectionToForm));
  };

  const fetchPageDetails = async (id: number): Promise<PageItem> => {
    const data = await api<ApiEnvelope<PageItem>>(endpoints.pageEdit, {
      auth: true,
      params: { id: String(id) },
    });
    const page = getResponseData(data);
    if (!page) throw new Error("Page not found");
    return page;
  };

  const openEdit = async (page: PageItem) => {
    setSelected(page);
    setMsg(null);
    setDetailError(null);
    setModal("edit");
    setDetailLoading(true);
    try {
      const details = await fetchPageDetails(page.id);
      setSelected(details);
      populateFormFromPage(details);
    } catch (err: unknown) {
      setDetailError(err instanceof Error ? err.message : "Failed to load page details");
    } finally {
      setDetailLoading(false);
    }
  };

  const openView = async (page: PageItem) => {
    setSelected(page);
    setDetailError(null);
    setModal("view");
    setDetailLoading(true);
    try {
      const details = await fetchPageDetails(page.id);
      setSelected(details);
    } catch (err: unknown) {
      setDetailError(err instanceof Error ? err.message : "Failed to load page details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const params: Record<string, string> = { ...form };

      sections.forEach((s, i) => {
        params[`extra_section_type[${i}]`] = s.extra_section_type;
        params[`extra_title[${i}]`] = s.extra_title;
        params[`extra_sub_title[${i}]`] = s.extra_sub_title;
        params[`extra_body[${i}]`] = s.extra_body;
        params[`extra_btn_url[${i}]`] = s.extra_btn_url;
        params[`extra_btn_text[${i}]`] = s.extra_btn_text;
        if (s.id) params[`extra_id[${i}]`] = String(s.id);
      });

      if (modal === "edit" && selected) {
        params.id = String(selected.id);
        params.menu_order = String(selected.menu_order);
        await api(endpoints.pageUpdate, { method: "POST", auth: true, params });
      } else {
        await api(endpoints.pageAdd, { method: "POST", auth: true, params });
      }
      await fetchPages();
      setModal(null);
    } catch (err: unknown) {
      setMsg({ type: "error", text: err instanceof Error ? err.message : "Failed to save page" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api(endpoints.pageDelete, { method: "DELETE", auth: true, body: { id: deleteTarget.id } });
      await fetchPages();
    } catch {
      // handle silently
    }
    setDeleteTarget(null);
  };

  const handleSectionDelete = async (sectionId: number) => {
    try {
      await api(endpoints.pageSectionDelete, { method: "DELETE", auth: true, params: { id: String(sectionId) } });
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
    } catch {
      // handle silently
    }
  };

  const addSection = () => {
    setSections([...sections, { ...emptySection }]);
  };

  const updateSection = (index: number, field: keyof PageSection, value: string | File | null) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const removeSection = (index: number) => {
    const s = sections[index];
    if (s.id) {
      handleSectionDelete(s.id);
    } else {
      setSections(sections.filter((_, i) => i !== index));
    }
  };

  const filtered = pages.filter((p) =>
    p.page_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pages</h1>
          <p className="mt-1 text-sm text-gray-500">Manage website pages and content sections</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90">
          <Plus size={18} /> Add Page
        </button>
      </div>

      <div className="mb-6 relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search pages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-teal" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Page Name</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Slug</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Display In</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">No pages found</td></tr>
              ) : (
                filtered.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{page.page_name}</p>
                        <p className="text-xs text-gray-500">{page.page_title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-teal">/{page.slug}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{page.display_in === 1 ? "Header" : page.display_in === 2 ? "Footer" : "Both"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{page.menu_order}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${page.status === 1 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                        {page.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openView(page)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                        <button onClick={() => openEdit(page)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><Edit size={16} /></button>
                        <button onClick={() => setDeleteTarget(page)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{modal === "add" ? "Add New Page" : "Edit Page"}</h2>
                <p className="mt-1 text-sm text-gray-500">Fill in the page details and content sections</p>
              </div>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            {msg && (
              <div className={`mt-4 rounded-lg p-3 text-sm ${msg.type === "error" ? "bg-red-50 border border-red-200 text-red-700" : "bg-emerald-50 border border-emerald-200 text-emerald-700"}`}>
                {msg.text}
              </div>
            )}

            {detailError && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {detailError}
              </div>
            )}

            {detailLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 size={24} className="animate-spin text-teal" />
              </div>
            ) : (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Page Name</label>
                  <input type="text" value={form.page_name} onChange={(e) => setForm({ ...form, page_name: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="Home" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Page Title</label>
                  <input type="text" value={form.page_title} onChange={(e) => setForm({ ...form, page_title: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="Home Page" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Slug</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="home" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Display In</label>
                  <select value={form.display_in} onChange={(e) => setForm({ ...form, display_in: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                    <option value="1">Header</option>
                    <option value="2">Footer</option>
                    <option value="3">Both</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Body Content</label>
                <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
                  className="h-32 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal" placeholder="Page content..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Keyword</label>
                  <input type="text" value={form.meta_keyword} onChange={(e) => setForm({ ...form, meta_keyword: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Description</label>
                  <input type="text" value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
              </div>

              {/* Extra Sections */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-900">Content Sections</h4>
                  <button onClick={addSection} className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-teal hover:bg-teal/5">
                    <Plus size={14} /> Add Section
                  </button>
                </div>

                {sections.length === 0 && (
                  <p className="text-center text-sm text-gray-400 py-6">No sections yet. Click &ldquo;Add Section&rdquo; to create one.</p>
                )}

                <div className="space-y-4">
                  {sections.map((section, idx) => (
                    <div key={idx} className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <GripVertical size={16} className="text-gray-300" />
                          <span className="text-sm font-medium text-gray-700">Section {idx + 1}</span>
                        </div>
                        <button onClick={() => removeSection(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1 block text-xs text-gray-500">Title</label>
                          <input type="text" value={section.extra_title} onChange={(e) => updateSection(idx, "extra_title", e.target.value)}
                            className="h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs text-gray-500">Sub Title</label>
                          <input type="text" value={section.extra_sub_title} onChange={(e) => updateSection(idx, "extra_sub_title", e.target.value)}
                            className="h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="mb-1 block text-xs text-gray-500">Body</label>
                        <textarea value={section.extra_body} onChange={(e) => updateSection(idx, "extra_body", e.target.value)}
                          className="h-20 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal" />
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1 block text-xs text-gray-500">Button URL</label>
                          <input type="text" value={section.extra_btn_url} onChange={(e) => updateSection(idx, "extra_btn_url", e.target.value)}
                            className="h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs text-gray-500">Button Text</label>
                          <input type="text" value={section.extra_btn_text} onChange={(e) => updateSection(idx, "extra_btn_text", e.target.value)}
                            className="h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <ImageUpload
                          key={`section-${section.id ?? idx}-image-${section.extra_image_url ?? "none"}`}
                          label="Section Image"
                          value={section.extra_image_url || undefined}
                          onChange={(file) => updateSection(idx, "extra_image", file)}
                        />
                        <ImageUpload
                          key={`section-${section.id ?? idx}-image2-${section.extra_image2_url ?? "none"}`}
                          label="Section Image 2"
                          value={section.extra_image2_url || undefined}
                          onChange={(file) => updateSection(idx, "extra_image2", file)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving || detailLoading || !!detailError}
                className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90 disabled:opacity-70">
                {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                {modal === "add" ? "Create Page" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details */}
      {modal === "view" && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Page Details</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            {detailLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 size={24} className="animate-spin text-teal" />
              </div>
            ) : detailError ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {detailError}
              </div>
            ) : (
            <>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{selected.page_name}</h3>
              <p className="mt-1 text-sm font-mono text-teal">/{selected.slug}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Title", value: selected.page_title },
                { label: "Display In", value: selected.display_in === 1 ? "Header" : selected.display_in === 2 ? "Footer" : "Both" },
                { label: "Status", value: selected.status === 1 ? "Active" : "Inactive" },
                { label: "Menu Order", value: String(selected.menu_order) },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            {selected.body && (
              <div className="rounded-lg bg-gray-50 p-3 mb-4">
                <p className="text-xs text-gray-400">Body Content</p>
                <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{selected.body}</p>
              </div>
            )}

            {selected.meta_keyword && (
              <div className="rounded-lg bg-gray-50 p-3 mb-4">
                <p className="text-xs text-gray-400">Meta Keywords</p>
                <p className="mt-1 text-sm text-gray-700">{selected.meta_keyword}</p>
              </div>
            )}

            {selected.sections && selected.sections.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Content Sections ({selected.sections.length})</h4>
                <div className="space-y-3">
                  {selected.sections.map((s, i) => (
                    <div key={s.id ?? i} className="rounded-lg border border-gray-100 p-3">
                      <p className="text-sm font-medium text-gray-900">{s.title || `Section ${i + 1}`}</p>
                      {s.sub_title && <p className="text-xs text-gray-500">{s.sub_title}</p>}
                      {s.body && <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">{s.body}</p>}
                      {(s.btn_text || s.btn_url) && (
                        <p className="mt-1 text-xs text-teal">
                          {s.btn_text || "Link"}{s.btn_url ? `: ${s.btn_url}` : ""}
                        </p>
                      )}
                      {s.image_url && (
                        <p className="mt-1 text-xs text-gray-400 truncate">Image: {s.image_url}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              {!detailLoading && !detailError && (
              <button onClick={() => openEdit(selected)} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Edit size={14} /> Edit Page
              </button>
              )}
              <button onClick={() => setModal(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">Close</button>
            </div>
            </>
            )}
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal
          title="Delete Page"
          message={`Are you sure you want to delete "${deleteTarget.page_name}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
