"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Eye, Edit, Trash2, X, Loader2, Mail, Phone, Calendar, MapPin } from "lucide-react";
import DeleteModal from "@/components/admin/DeleteModal";
import { api, getResponseData, type ApiEnvelope } from "@/utils/api";
import { endpoints } from "@/utils/endpoints";

interface User {
  id: number;
  name: string;
  email: string;
  mobile?: string;
  role: string;
  status: number;
  gender?: string;
  dob?: string;
  address?: string | null;
  address_2?: string | null;
  city?: string | null;
  country_id?: number | string | null;
  zipcode?: string | null;
  created_at?: string;
}

interface UserFormData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  password_confirmation: string;
  role: string;
  status: string;
  gender: string;
  dob: string;
  address: string;
  address_2: string;
  city: string;
  country_id: string;
  zipcode: string;
}

const emptyForm: UserFormData = {
  name: "",
  email: "",
  mobile: "",
  password: "",
  password_confirmation: "",
  role: "customer",
  status: "1",
  gender: "",
  dob: "",
  address: "",
  address_2: "",
  city: "",
  country_id: "",
  zipcode: "",
};

export default function CustomersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [form, setForm] = useState<UserFormData>(emptyForm);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<ApiEnvelope<User[]>>(endpoints.users, {
        auth: true,
        params: { role: "customer" },
      });
      setUsers(getResponseData(res) ?? []);
    } catch {
      setMsg({ type: "error", text: "Failed to load customers" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  useEffect(() => {
    if (msg) { const t = setTimeout(() => setMsg(null), 4000); return () => clearTimeout(t); }
  }, [msg]);

  const openAdd = () => { setSelected(null); setForm(emptyForm); setModal("add"); };

  const openEdit = async (user: User) => {
    setSelected(user);
    setModal("edit");
    try {
      const res = await api<ApiEnvelope<User>>(endpoints.userEdit, { auth: true, params: { id: String(user.id) } });
      const detail = getResponseData(res) ?? user;
      setForm({
        name: detail.name,
        email: detail.email,
        mobile: detail.mobile ?? "",
        password: "",
        password_confirmation: "",
        role: detail.role,
        status: String(detail.status),
        gender: detail.gender ?? "",
        dob: detail.dob ?? "",
        address: detail.address ?? "",
        address_2: detail.address_2 ?? "",
        city: detail.city ?? "",
        country_id: detail.country_id != null ? String(detail.country_id) : "",
        zipcode: detail.zipcode ?? "",
      });
    } catch {
      setForm({
        ...emptyForm,
        name: user.name,
        email: user.email,
        mobile: user.mobile ?? "",
        role: user.role,
        status: String(user.status),
      });
    }
  };

  const openView = (user: User) => { setSelected(user); setModal("view"); };

  const setField = (key: keyof UserFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const params: Record<string, string> = {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        role: form.role,
        status: form.status,
        gender: form.gender,
        dob: form.dob,
        address: form.address,
        address_2: form.address_2,
        city: form.city,
        country_id: form.country_id,
        zipcode: form.zipcode,
      };
      if (form.password) {
        params.password = form.password;
        params.password_confirmation = form.password_confirmation;
      }
      if (modal === "edit" && selected) params.id = String(selected.id);

      await api(modal === "add" ? endpoints.userAdd : endpoints.userUpdate, {
        method: "POST",
        params,
        auth: true,
      });
      setMsg({ type: "success", text: modal === "add" ? "Customer added" : "Customer updated" });
      setModal(null);
      fetchUsers();
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api(endpoints.userDelete, {
        method: "DELETE",
        params: { id: String(deleteTarget.id) },
        auth: true,
      });
      setMsg({ type: "success", text: "Customer deleted" });
      setDeleteTarget(null);
      fetchUsers();
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to delete" });
      setDeleteTarget(null);
    }
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const initials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div>
      {msg && (
        <div className={`mb-4 rounded-lg px-4 py-3 text-sm font-medium ${msg.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Customers</h1>
          <p className="mt-1 text-sm text-gray-900">Manage your customer base</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90">
          <Plus size={18} /> Add Customer
        </button>
      </div>

      <div className="mb-6 relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
        <input type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-teal" /></div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Customer</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Phone</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Gender</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-900">Status</th>
                <th className="px-6 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-sm text-gray-500">No customers found</td></tr>
              ) : filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-sm font-semibold text-teal">
                        {initials(user.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">{user.name}</p>
                        <p className="text-xs text-gray-900">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black">{user.mobile || "—"}</td>
                  <td className="px-6 py-4 text-sm text-black">{user.gender || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === 1 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-black"}`}>
                      {user.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openView(user)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-teal"><Eye size={16} /></button>
                      <button onClick={() => openEdit(user)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-blue-600"><Edit size={16} /></button>
                      <button onClick={() => setDeleteTarget(user)} className="rounded-lg p-1.5 text-black hover:bg-gray-100 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3.5">
            <p className="text-sm text-gray-900">Showing {filtered.length} of {users.length} customers</p>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">{modal === "add" ? "Add Customer" : "Edit Customer"}</h2>
              <button onClick={() => setModal(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
                  <input value={form.name} onChange={setField("name")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={form.email} onChange={setField("email")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Mobile</label>
                  <input value={form.mobile} onChange={setField("mobile")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Gender</label>
                  <select value={form.gender} onChange={setField("gender")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input type="date" value={form.dob} onChange={setField("dob")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <select value={form.status} onChange={setField("status")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">{modal === "edit" ? "New Password (leave blank to keep)" : "Password"}</label>
                <input type="password" value={form.password} onChange={setField("password")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
              </div>
              {form.password && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input type="password" value={form.password_confirmation} onChange={setField("password_confirmation")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
                <input value={form.address} onChange={setField("address")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
                  <input value={form.city} onChange={setField("city")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Zipcode</label>
                  <input value={form.zipcode} onChange={setField("zipcode")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50">Cancel</button>
              <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90 disabled:opacity-60">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {modal === "add" ? "Add Customer" : "Save Changes"}
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
              <h2 className="text-lg font-semibold text-black">Customer Details</h2>
              <button onClick={() => setModal(null)}><X size={20} /></button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-lg font-bold text-teal">
                {initials(selected.name)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">{selected.name}</h3>
                <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${selected.status === 1 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-black"}`}>
                  {selected.status === 1 ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: Mail, label: "Email", value: selected.email },
                { icon: Phone, label: "Phone", value: selected.mobile || "—" },
                { icon: Calendar, label: "Date of Birth", value: selected.dob || "—" },
                { icon: MapPin, label: "City", value: selected.city || "—" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <item.icon size={16} className="text-black" />
                  <div>
                    <p className="text-xs text-black">{item.label}</p>
                    <p className="text-sm text-black">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => openEdit(selected)} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Edit size={14} /> Edit
              </button>
              <button onClick={() => setModal(null)} className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/90">Close</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal
          title="Delete Customer"
          message={`Are you sure you want to delete "${deleteTarget.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
