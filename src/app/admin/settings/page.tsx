"use client";

import { useState } from "react";
import { Save, Shield, User, Loader2 } from "lucide-react";
import { useAuth, type User as AuthUser } from "@/context/AuthContext";
import { api } from "@/utils/api";
import { endpoints } from "@/utils/endpoints";
import { buildProfileFormFromUser, getProfileImageUrl } from "@/utils/profile";
import ImageUpload from "@/components/admin/ImageUpload";

const tabs = [
  { label: "Profile", icon: User },
  // { label: "General", icon: Store },
  // { label: "Notifications", icon: Bell },
  // { label: "Email", icon: Mail },
  { label: "Security", icon: Shield },
];

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

          {activeTab === "General" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">Store Information</h3>
              <p className="mt-1 text-sm text-gray-500">Basic information about your store</p>
              <div className="mt-6 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Store Name</label>
                    <input type="text" defaultValue="Vitazan" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Store URL</label>
                    <input type="text" defaultValue="https://vitazan.ph" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Store Description</label>
                  <textarea defaultValue="Vitazan - Natural health supplements for wellness unleashed." className="h-24 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Contact Email</label>
                    <input type="email" defaultValue="support@vitazan.com" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" defaultValue="+91 98765 43210" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Currency</label>
                    <select className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal"><option>₱</option></select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Timezone</label>
                    <select className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal"><option>Philippines</option></select>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90"><Save size={16} /> Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
              <p className="mt-1 text-sm text-gray-500">Choose which notifications you want to receive</p>
              <div className="mt-6 space-y-4">
                {[
                  { label: "New Order", desc: "Get notified when a new order is placed" },
                  { label: "Order Status Update", desc: "Notifications for order status changes" },
                  { label: "Low Stock Alert", desc: "Notify when product stock is below threshold" },
                  { label: "New Customer Registration", desc: "Alert for new customer sign-ups" },
                  { label: "Daily Sales Report", desc: "Receive a daily summary of sales" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" defaultChecked={i < 3} className="peer sr-only" />
                      <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-teal peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90"><Save size={16} /> Save Preferences</button>
              </div>
            </div>
          )}

          {activeTab === "Email" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">Email Configuration</h3>
              <p className="mt-1 text-sm text-gray-500">Configure email templates and SMTP settings</p>
              <div className="mt-6 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">SMTP Host</label>
                    <input type="text" defaultValue="smtp.gmail.com" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">SMTP Port</label>
                    <input type="text" defaultValue="587" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">From Email</label>
                    <input type="email" defaultValue="noreply@vitazan.com" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">From Name</label>
                    <input type="text" defaultValue="Vitazan" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90"><Save size={16} /> Save Settings</button>
              </div>
            </div>
          )}

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
