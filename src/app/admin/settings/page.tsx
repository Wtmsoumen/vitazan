"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Shield, User, Loader2, Store } from "lucide-react";
import { useAuth, type User as AuthUser } from "@/context/AuthContext";
import { api, getResponseData, type ApiEnvelope } from "@/utils/api";
import { endpoints } from "@/utils/endpoints";
import { buildProfileFormFromUser, getProfileImageUrl } from "@/utils/profile";
import ImageUpload from "@/components/admin/ImageUpload";

const SETTINGS_UPLOAD_BASE = "https://vitazan.webtechnomind.in/public/uploads/settings/";

function resolveSettingsUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) return url;
  return `${SETTINGS_UPLOAD_BASE}${url}`;
}

const tabs = [
  { label: "Profile", icon: User },
  { label: "General", icon: Store },
  { label: "Security", icon: Shield },
];

interface SiteSettings {
  site_title?: string | null;
  site_phone?: string | null;
  site_address?: string | null;
  site_meta_title?: string | null;
  site_meta_keyword?: string | null;
  site_meta_description?: string | null;
  site_logo?: string | null;
  site_favicon?: string | null;
  site_footer_logo?: string | null;
  site_meta_image?: string | null;
}

function GeneralSettingsTab() {
  const [form, setForm] = useState<SiteSettings>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [footerLogoFile, setFooterLogoFile] = useState<File | null>(null);
  const [metaImageFile, setMetaImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<ApiEnvelope<SiteSettings>>(endpoints.settings, { auth: true });
      setForm(getResponseData(res) ?? {});
    } catch {
      setMsg({ type: "error", text: "Failed to load settings" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  useEffect(() => {
    if (msg) { const t = setTimeout(() => setMsg(null), 4000); return () => clearTimeout(t); }
  }, [msg]);

  const setField = (key: keyof SiteSettings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      const textFields: (keyof SiteSettings)[] = [
        "site_title", "site_phone", "site_address",
        "site_meta_title", "site_meta_keyword", "site_meta_description",
      ];
      textFields.forEach((k) => fd.append(k, form[k] ?? ""));
      if (logoFile) fd.append("site_logo", logoFile);
      if (faviconFile) fd.append("site_favicon", faviconFile);
      if (footerLogoFile) fd.append("site_footer_logo", footerLogoFile);
      if (metaImageFile) fd.append("site_meta_image", metaImageFile);

      await api(endpoints.settingsUpdate, { method: "POST", auth: true, body: fd });
      setMsg({ type: "success", text: "Settings saved" });
      setLogoFile(null); setFaviconFile(null); setFooterLogoFile(null); setMetaImageFile(null);
      fetchSettings();
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-12">
        <Loader2 size={24} className="animate-spin text-teal" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">Site Settings</h3>
      <p className="mt-1 text-sm text-gray-500">General information and branding for your site</p>

      {msg && (
        <div className={`mt-4 rounded-lg p-3 text-sm ${msg.type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      <div className="mt-6 space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Site Title</label>
            <input type="text" value={form.site_title ?? ""} onChange={setField("site_title")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" placeholder="Vitazan" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" value={form.site_phone ?? ""} onChange={setField("site_phone")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
          <input type="text" value={form.site_address ?? ""} onChange={setField("site_address")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
        </div>

        <hr className="border-gray-100" />
        <p className="text-sm font-medium text-gray-700">Branding</p>

        <div className="grid grid-cols-3 gap-5">
          <ImageUpload label="Site Logo" value={resolveSettingsUrl(form.site_logo)} onChange={(f) => setLogoFile(f)} />
          <ImageUpload label="Favicon" value={resolveSettingsUrl(form.site_favicon)} onChange={(f) => setFaviconFile(f)} />
          <ImageUpload label="Footer Logo" value={resolveSettingsUrl(form.site_footer_logo)} onChange={(f) => setFooterLogoFile(f)} />
        </div>

        <hr className="border-gray-100" />
        <p className="text-sm font-medium text-gray-700">SEO / Meta</p>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Title</label>
          <input type="text" value={form.site_meta_title ?? ""} onChange={setField("site_meta_title")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Keywords</label>
          <input type="text" value={form.site_meta_keyword ?? ""} onChange={setField("site_meta_keyword")} className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Description</label>
          <textarea value={form.site_meta_description ?? ""} onChange={setField("site_meta_description")} className="h-20 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal" />
        </div>
        <div>
          <ImageUpload label="Meta Image (OG image)" value={resolveSettingsUrl(form.site_meta_image)} onChange={(f) => setMetaImageFile(f)} />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90 disabled:opacity-70">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Settings
        </button>
      </div>
    </div>
  );
}

interface ProfileUpdateResponse {
  status: boolean;
  message?: string;
  user?: AuthUser;
}

function ProfileSettingsTab({
  user,
  fetchProfile,
  updateUser,
}: {
  user: AuthUser;
  fetchProfile: () => Promise<void>;
  updateUser: (user: AuthUser) => void;
}) {
  const [profileForm, setProfileForm] = useState(() => buildProfileFormFromUser(user));
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleProfileUpdate = async () => {
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      const formData = new FormData();
      Object.entries(profileForm).forEach(([key, val]) => formData.append(key, String(val)));
      if (profilePhoto) formData.append("profile_photo", profilePhoto);

      const data = await api<ProfileUpdateResponse>(endpoints.profileUpdate, {
        method: "POST",
        auth: true,
        body: formData,
      });

      if (data.user) {
        updateUser(data.user);
        setProfileForm(buildProfileFormFromUser(data.user));
      } else {
        await fetchProfile();
      }

      setProfilePhoto(null);
      setProfileMsg({
        type: "success",
        text: data.message || "Profile updated successfully",
      });
    } catch (err: unknown) {
      setProfileMsg({ type: "error", text: err instanceof Error ? err.message : "Failed to update profile" });
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">My Profile</h3>
      <p className="mt-1 text-sm text-gray-500">Update your personal information</p>

      {profileMsg && (
        <div className={`mt-4 rounded-lg p-3 text-sm ${profileMsg.type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
          {profileMsg.text}
        </div>
      )}

      <div className="mt-6 space-y-5">
        <ImageUpload
          key={`${user.id}-${user.updated_at ?? "no-ts"}-${user.profile_photo ?? "no-photo"}`}
          label="Profile Photo"
          value={getProfileImageUrl(user)}
          onChange={(file) => setProfilePhoto(file)}
        />

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={user.email || ""} disabled
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500 outline-none" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Mobile</label>
          <input type="tel" value={user.mobile || ""} disabled
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500 outline-none md:max-w-[calc(50%-0.625rem)]" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Gender</label>
            <select value={profileForm.gender} onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" value={profileForm.dob} onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
          <input type="text" value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Address Line 2</label>
          <input type="text" value={profileForm.address_2} onChange={(e) => setProfileForm({ ...profileForm, address_2: e.target.value })}
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
            <input type="text" value={profileForm.city} onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Country ID</label>
            <input type="text" value={profileForm.country_id} onChange={(e) => setProfileForm({ ...profileForm, country_id: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Zipcode</label>
            <input type="text" value={profileForm.zipcode} onChange={(e) => setProfileForm({ ...profileForm, zipcode: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleProfileUpdate} disabled={profileSaving}
          className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90 disabled:opacity-70">
          {profileSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const { user, fetchProfile, updateUser } = useAuth();

  const [passwordForm, setPasswordForm] = useState({ old_password: "", new_password: "", new_password_confirmation: "" });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChangePassword = async () => {
    setPasswordSaving(true);
    setPasswordMsg(null);
    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      setPasswordMsg({ type: "error", text: "New passwords do not match" });
      setPasswordSaving(false);
      return;
    }
    try {
      await api(endpoints.changePassword, { method: "POST", auth: true, body: passwordForm as unknown as Record<string, unknown> });
      setPasswordMsg({ type: "success", text: "Password changed successfully" });
      setPasswordForm({ old_password: "", new_password: "", new_password_confirmation: "" });
    } catch (err: unknown) {
      setPasswordMsg({ type: "error", text: err instanceof Error ? err.message : "Failed to change password" });
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your profile and store settings</p>
      </div>

      <div className="flex gap-8">
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.label} onClick={() => setActiveTab(tab.label)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === tab.label ? "bg-teal/10 text-teal" : "text-gray-600 hover:bg-gray-100"}`}>
                  <Icon size={18} /> {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1">
          {activeTab === "Profile" && (
            user ? (
              <ProfileSettingsTab key={user.id} user={user} fetchProfile={fetchProfile} updateUser={updateUser} />
            ) : (
              <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-12">
                <Loader2 size={24} className="animate-spin text-teal" />
              </div>
            )
          )}

          {activeTab === "General" && <GeneralSettingsTab />}

          {activeTab === "Security" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              <p className="mt-1 text-sm text-gray-500">Update your account password</p>

              {passwordMsg && (
                <div className={`mt-4 rounded-lg p-3 text-sm ${passwordMsg.type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
                  {passwordMsg.text}
                </div>
              )}

              <div className="mt-6 max-w-md space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Current Password</label>
                  <input type="password" value={passwordForm.old_password} onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">New Password</label>
                  <input type="password" value={passwordForm.new_password} onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input type="password" value={passwordForm.new_password_confirmation} onChange={(e) => setPasswordForm({ ...passwordForm, new_password_confirmation: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={handleChangePassword} disabled={passwordSaving}
                  className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90 disabled:opacity-70">
                  {passwordSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
