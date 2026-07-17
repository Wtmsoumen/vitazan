"use client";

import { useState } from "react";
import { Save, Store, Mail, Bell, Shield, Globe, Palette } from "lucide-react";

const tabs = [
  { label: "General", icon: Store },
  { label: "Notifications", icon: Bell },
  { label: "Email", icon: Mail },
  { label: "Security", icon: Shield },
  { label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your store settings and preferences</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Tabs */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === tab.label
                      ? "bg-teal/10 text-teal"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
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
                    <input type="text" defaultValue="https://vitazan.com" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Store Description</label>
                  <textarea
                    defaultValue="Vitazan - Natural health supplements for wellness unleashed. Shop cold & cough remedies, gut health, bone & joint care, vitamins & nutrition."
                    className="h-24 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal"
                  />
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
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    defaultValue="ZANIQ CARE LIMITED, London, United Kingdom"
                    className="h-20 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Currency</label>
                    <select className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                      <option>USD ($)</option>
                      <option>INR (₹)</option>
                      <option>GBP (£)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Timezone</label>
                    <select className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal">
                      <option>Asia/Kolkata (IST)</option>
                      <option>Europe/London (GMT)</option>
                      <option>America/New_York (EST)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90">
                  <Save size={16} />
                  Save Changes
                </button>
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
                  { label: "New Enquiry", desc: "Alert when a customer submits an enquiry" },
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
                      <input type="checkbox" defaultChecked={i < 4} className="peer sr-only" />
                      <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-teal peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90">
                  <Save size={16} />
                  Save Preferences
                </button>
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
                <button className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90">
                  <Save size={16} />
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Manage authentication and security preferences</p>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Two-Factor Authentication", desc: "Add an extra layer of security", enabled: false },
                  { label: "Login Notifications", desc: "Get notified of new login attempts", enabled: true },
                  { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", enabled: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" defaultChecked={item.enabled} className="peer sr-only" />
                      <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-teal peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-900">Change Password</h4>
                <div className="mt-4 max-w-md space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Current Password</label>
                    <input type="password" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90">
                  <Save size={16} />
                  Update Security
                </button>
              </div>
            </div>
          )}

          {activeTab === "Appearance" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">Brand Appearance</h3>
              <p className="mt-1 text-sm text-gray-500">Customize your store&apos;s look and feel</p>
              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Store Logo</label>
                  <div className="flex h-24 w-60 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm text-gray-400">
                    Click to upload logo
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Primary Color (Teal)</label>
                    <div className="flex items-center gap-2">
                      <input type="color" defaultValue="#00485d" className="h-10 w-14 rounded border border-gray-200" />
                      <input type="text" defaultValue="#00485D" className="h-10 flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Accent Color (Pink)</label>
                    <div className="flex items-center gap-2">
                      <input type="color" defaultValue="#e5097f" className="h-10 w-14 rounded border border-gray-200" />
                      <input type="text" defaultValue="#E5097F" className="h-10 flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Dark Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" defaultValue="#08131e" className="h-10 w-14 rounded border border-gray-200" />
                      <input type="text" defaultValue="#08131E" className="h-10 flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-teal" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Favicon</label>
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm text-gray-400">
                    32x32
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90">
                  <Save size={16} />
                  Save Appearance
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
