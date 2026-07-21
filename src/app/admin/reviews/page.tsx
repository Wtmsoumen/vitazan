"use client";

import { useState } from "react";
import { Star, Search, ThumbsUp, ThumbsDown, MoreHorizontal, Eye, Trash2, X } from "lucide-react";
import DeleteModal from "@/components/admin/DeleteModal";

const reviewsData = [
  { id: 1, customer: "Rajesh Kumar", email: "rajesh@email.com", product: "VITAZAN™ HT-KOF", rating: 5, comment: "Excellent product! Really helped with my cold symptoms. Will buy again.", date: "Jul 16, 2026", status: "Published" },
  { id: 2, customer: "Priya Sharma", email: "priya@email.com", product: "VITAZAN™ SENAX", rating: 4, comment: "Good quality supplement. Noticed improvement in digestion within a week.", date: "Jul 15, 2026", status: "Published" },
  { id: 3, customer: "Amit Singh", email: "amit@email.com", product: "VITAZAN™ OSTEOMAC", rating: 5, comment: "Best bone health supplement I've tried. Doctor recommended and it works.", date: "Jul 14, 2026", status: "Pending" },
  { id: 4, customer: "Neha Gupta", email: "neha@email.com", product: "VITAZAN™ RELOAD", rating: 3, comment: "Decent product but packaging could be better. Effectiveness is okay.", date: "Jul 13, 2026", status: "Published" },
  { id: 5, customer: "Vikram Patel", email: "vikram@email.com", product: "VITAZAN™ HT-KOF", rating: 1, comment: "Did not work for me at all. Very disappointed with the results.", date: "Jul 12, 2026", status: "Flagged" },
];

type Review = typeof reviewsData[number];

const statusStyles: Record<string, string> = {
  Published: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Flagged: "bg-red-100 text-red-700",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={14} className={s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [viewReview, setViewReview] = useState<Review | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">Reviews</h1>
        <p className="mt-1 text-sm text-gray-900">Manage customer ratings and reviews</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: "Average Rating", value: "4.3", sublabel: "out of 5.0" },
          { label: "Total Reviews", value: "1,284", sublabel: "+24 this week" },
          { label: "Pending Review", value: "18", sublabel: "needs moderation" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-900">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold text-black">{s.value}</p>
            <p className="mt-0.5 text-xs text-black">{s.sublabel}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="relative w-[300px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
            <input type="text" placeholder="Search reviews..." className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-[#00485d]" />
          </div>
          <div className="flex items-center gap-2">
            <select className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-black outline-none">
              <option>All Ratings</option><option>5 Stars</option><option>4 Stars</option><option>3 Stars</option><option>2 Stars</option><option>1 Star</option>
            </select>
            <select className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-black outline-none">
              <option>All Status</option><option>Published</option><option>Pending</option><option>Flagged</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {reviewsData.map((review) => (
            <div key={review.id} className="px-6 py-5 hover:bg-gray-50/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-black">
                      {review.customer.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">{review.customer}</p>
                      <p className="text-xs text-gray-900">{review.product} &middot; {review.date}</p>
                    </div>
                  </div>
                  <div className="mt-3 ml-12">
                    <StarRating rating={review.rating} />
                    <p className="mt-2 text-sm text-black">{review.comment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[review.status]}`}>{review.status}</span>
                  <button onClick={() => setViewReview(review)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                  <button onClick={() => setDeleteTarget(review)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
              {review.status === "Pending" && (
                <div className="mt-3 ml-12 flex gap-2">
                  <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50"><ThumbsUp size={13} /> Approve</button>
                  <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"><ThumbsDown size={13} /> Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Review Details Modal */}
      {viewReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setViewReview(null)}>
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">Review Details</h2>
              <button onClick={() => setViewReview(null)} className="text-black hover:text-black"><X size={20} /></button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-black">
                {viewReview.customer.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">{viewReview.customer}</h3>
                <p className="text-sm text-gray-900">{viewReview.email}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <StarRating rating={viewReview.rating} />
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[viewReview.status]}`}>{viewReview.status}</span>
                </div>
                <p className="text-sm text-gray-700">{viewReview.comment}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-black">Product</p>
                  <p className="mt-1 text-sm font-medium text-black">{viewReview.product}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-black">Date</p>
                  <p className="mt-1 text-sm font-medium text-black">{viewReview.date}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {viewReview.status === "Pending" && (
                  <>
                    <button className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100"><ThumbsUp size={13} /> Approve</button>
                    <button className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100"><ThumbsDown size={13} /> Reject</button>
                  </>
                )}
              </div>
              <button onClick={() => setViewReview(null)} className="rounded-lg bg-[#00485d] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a4d]">Close</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal title="Delete Review" message={`Are you sure you want to delete this review by "${deleteTarget.customer}"?`} onConfirm={() => setDeleteTarget(null)} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
