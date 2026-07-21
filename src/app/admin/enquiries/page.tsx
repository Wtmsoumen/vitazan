"use client";

import { useState } from "react";
import { Search, Eye, Mail, CheckCircle, Clock, AlertCircle } from "lucide-react";

const enquiries = [
  { id: 1, name: "Rahul Verma", email: "rahul@email.com", phone: "+91 98765 11111", product: "VITAZAN™ HT-KOF", message: "I want to know about the dosage for children under 5 years.", status: "New", date: "Jul 16, 2026" },
  { id: 2, name: "Meera Joshi", email: "meera@email.com", phone: "+91 87654 22222", product: "VITAZAN™ SENAX", message: "Is this product suitable for daily use? Any side effects?", status: "Replied", date: "Jul 15, 2026" },
  { id: 3, name: "Deepak Tiwari", email: "deepak@email.com", phone: "+91 76543 33333", product: "VITAZAN™ OSTEOMAC", message: "I would like to become a distributor in Delhi NCR region.", status: "New", date: "Jul 15, 2026" },
  { id: 4, name: "Anita Desai", email: "anita@email.com", phone: "+91 65432 44444", product: "VITAZAN™ RELOAD", message: "Can I take this along with other vitamin supplements?", status: "Pending", date: "Jul 14, 2026" },
  { id: 5, name: "Suresh Nair", email: "suresh@email.com", phone: "+91 54321 55555", product: "General", message: "Interested in bulk ordering for our pharmacy chain.", status: "Replied", date: "Jul 13, 2026" },
  { id: 6, name: "Pooja Reddy", email: "pooja@email.com", phone: "+91 43210 66666", product: "VITAZAN™ HT-KOF", message: "Does this contain any artificial colors or preservatives?", status: "Closed", date: "Jul 12, 2026" },
];

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  New: { icon: AlertCircle, color: "text-blue-600", bg: "bg-blue-100 text-blue-700" },
  Pending: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100 text-amber-700" },
  Replied: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100 text-emerald-700" },
  Closed: { icon: CheckCircle, color: "text-gray-900", bg: "bg-gray-100 text-gray-600" },
};

export default function EnquiriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<typeof enquiries[0] | null>(null);

  const filtered = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">Enquiries</h1>
        <p className="mt-1 text-sm text-gray-900">Manage product enquiries and customer questions</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {[
          { label: "Total Enquiries", value: "248", color: "text-teal" },
          { label: "New", value: "12", color: "text-blue-600" },
          { label: "Pending", value: "8", color: "text-amber-600" },
          { label: "Replied", value: "228", color: "text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-900">{s.label}</p>
            <p className={`mt-1 text-2xl font-semibold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Customer</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Product</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Message</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Status</th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Date</th>
              <th className="px-6 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((enquiry) => (
              <tr key={enquiry.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-black">{enquiry.name}</p>
                    <p className="text-xs text-gray-900">{enquiry.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{enquiry.product}</td>
                <td className="px-6 py-4 max-w-xs">
                  <p className="text-sm text-gray-600 truncate">{enquiry.message}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[enquiry.status].bg}`}>
                    {enquiry.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{enquiry.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-teal"
                    >
                      <Eye size={16} />
                    </button>
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600">
                      <Mail size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-black">{selectedEnquiry.name}</h2>
                <p className="text-sm text-gray-900">{selectedEnquiry.email} &bull; {selectedEnquiry.phone}</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[selectedEnquiry.status].bg}`}>
                {selectedEnquiry.status}
              </span>
            </div>
            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase text-gray-900">Product: {selectedEnquiry.product}</p>
              <p className="mt-2 text-sm text-gray-700">{selectedEnquiry.message}</p>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Reply</label>
              <textarea className="h-24 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal" placeholder="Type your reply..." />
            </div>
            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={() => setSelectedEnquiry(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Close</button>
              <button className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">Send Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
