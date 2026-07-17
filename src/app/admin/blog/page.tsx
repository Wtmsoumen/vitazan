"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, Calendar, X } from "lucide-react";
import DeleteModal from "@/components/admin/DeleteModal";
import ImageUpload from "@/components/admin/ImageUpload";

const postsData = [
  { id: 1, title: "VITAZAN Osteomac – Comprehensive Bone Health Support Explained", category: "Bone & Joint Health", author: "Admin", date: "Jul 12, 2026", status: "Published", views: 1240, image: "/images/blog1.png", excerpt: "Discover how VITAZAN Osteomac supports comprehensive bone health with natural Ayurvedic ingredients." },
  { id: 2, title: "Understanding Bone Health – The Key to Strength and Mobility", category: "Healthy Living", author: "Admin", date: "Jul 8, 2026", status: "Published", views: 890, image: "/images/blog2.png", excerpt: "Learn why bone health is crucial for maintaining strength and mobility throughout life." },
  { id: 3, title: "Healthy Living in the Modern Age – Small Habits That Create Big Impact", category: "Vitality Store", author: "Admin", date: "Jul 5, 2026", status: "Published", views: 650, image: "/images/blog3.png", excerpt: "Simple daily habits that can transform your health and wellbeing in the modern world." },
  { id: 4, title: "The Power of Turmeric in Ayurvedic Medicine", category: "Ingredients", author: "Admin", date: "Jun 28, 2026", status: "Draft", views: 0, image: "/images/blog1.png", excerpt: "Exploring the centuries-old healing properties of turmeric in Ayurvedic tradition." },
  { id: 5, title: "How HT-KOF Naturally Relieves Cold & Cough Symptoms", category: "Product Guide", author: "Admin", date: "Jun 20, 2026", status: "Published", views: 2100, image: "/images/blog2.png", excerpt: "A deep dive into the natural ingredients that make HT-KOF effective against cold and cough." },
];

type Post = typeof postsData[number];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Post | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);

  const filtered = postsData.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage blog content</p>
        </div>
        <button onClick={() => { setSelected(null); setModal("add"); }} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90">
          <Plus size={18} /> New Post
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal" />
        </div>
        <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none">
          <option>All Status</option><option>Published</option><option>Draft</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((post) => (
          <div key={post.id} className="group flex items-center gap-6 rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
            <div className="relative h-24 w-36 flex-shrink-0 overflow-hidden rounded-lg">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{post.category}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${post.status === "Published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{post.status}</span>
              </div>
              <h3 className="mt-2 text-base font-medium text-gray-900 truncate">{post.title}</h3>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                <span>By {post.author}</span>
                {post.views > 0 && <span>{post.views.toLocaleString()} views</span>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => { setSelected(post); setModal("view"); }} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-teal"><Eye size={18} /></button>
              <button onClick={() => { setSelected(post); setModal("edit"); }} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><Edit size={18} /></button>
              <button onClick={() => setDeleteTarget(post)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{modal === "add" ? "Create New Blog Post" : "Edit Blog Post"}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="mt-6 space-y-4">
              <ImageUpload label="Featured Image" value={modal === "edit" && selected ? selected.image : undefined} />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
                <input type="text" defaultValue={selected?.title || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="Post title..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
                  <select defaultValue={selected?.category || ""} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                    <option>Bone & Joint Health</option><option>Healthy Living</option><option>Vitality Store</option><option>Ingredients</option><option>Product Guide</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <select defaultValue={selected?.status || "Draft"} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                    <option>Draft</option><option>Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Excerpt</label>
                <textarea defaultValue={selected?.excerpt || ""} className="h-20 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal" placeholder="Brief excerpt..." />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Content</label>
                <textarea className="h-40 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal" placeholder="Write your blog post..." />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">Save Draft</button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">{modal === "add" ? "Publish" : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details */}
      {modal === "view" && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Post Details</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl mb-4">
              <Image src={selected.image} alt={selected.title} fill className="object-cover" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{selected.category}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${selected.status === "Published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{selected.status}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{selected.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{selected.excerpt}</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-400">Author</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{selected.author}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-400">Date</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{selected.date}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-400">Views</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{selected.views.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal("edit")} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Edit size={14} /> Edit Post</button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">Close</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal title="Delete Blog Post" message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`} onConfirm={() => setDeleteTarget(null)} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
