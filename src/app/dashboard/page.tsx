"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    User, Package, Heart, MapPin, CreditCard, LogOut,
    ShoppingBasket, Star, Eye, Truck, Clock,
    CheckCircle2, XCircle, Edit3, Plus, ArrowUpRight,
    Settings, ChevronRight, Camera, Shield, Bell,
    Menu, X,
} from "lucide-react";

const sidebarItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Profile Settings", icon: Settings },
];

const orders = [
    {
        id: "VTZ-20260715-001",
        date: "Jul 15, 2026",
        items: [
            { name: "VITAZAN™ HT-KOF", variant: "200ml", qty: 2, image: "/images/htkof1.png" },
            { name: "VITAZAN™ OSTEOMAC", variant: "60 Tabs", qty: 1, image: "/images/osteomac-product.png" },
        ],
        total: 1097,
        status: "Delivered",
    },
    {
        id: "VTZ-20260720-002",
        date: "Jul 20, 2026",
        items: [
            { name: "VITAZAN™ SENAX", variant: "100ml", qty: 1, image: "/images/senax-product.png" },
        ],
        total: 349,
        status: "In Transit",
    },
    {
        id: "VTZ-20260725-003",
        date: "Jul 25, 2026",
        items: [
            { name: "VITAZAN™ RELOAD", variant: "30 Caps", qty: 2, image: "/images/reload-product.png" },
        ],
        total: 898,
        status: "Processing",
    },
];

const wishlistItems = [
    { id: 1, name: "VITAZAN™ HT-KOF", price: 299, originalPrice: 399, image: "/images/htkof1.png", inStock: true },
    { id: 2, name: "VITAZAN™ OSTEOMAC", price: 499, originalPrice: 649, image: "/images/osteomac-product.png", inStock: true },
    { id: 3, name: "VITAZAN™ SENAX", price: 349, originalPrice: 449, image: "/images/senax-product.png", inStock: false },
];

const initialAddresses = [
    { id: 1, label: "Home", name: "User", address: "Akshya Nagar 1st Block 1st Cross, Rammurthy Nagar", city: "Bangalore", state: "Karnataka", zip: "560016", phone: "+91 98765 43210", isDefault: true },
    { id: 2, label: "Office", name: "User", address: "Koramangala 4th Block, 80 Feet Road", city: "Bangalore", state: "Karnataka", zip: "560034", phone: "+91 98765 43210", isDefault: false },
];

const emptyAddress = { id: 0, label: "", name: "", address: "", city: "", state: "", zip: "", phone: "", isDefault: false };

const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
    Delivered: { color: "text-emerald-700", bg: "bg-emerald-100", icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
    "In Transit": { color: "text-blue-700", bg: "bg-blue-100", icon: <Truck className="w-4 h-4 text-blue-600" /> },
    Processing: { color: "text-amber-700", bg: "bg-amber-100", icon: <Clock className="w-4 h-4 text-amber-600" /> },
    Cancelled: { color: "text-red-700", bg: "bg-red-100", icon: <XCircle className="w-4 h-4 text-red-600" /> },
};

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    const [profile, setProfile] = useState({
        firstName: "User",
        lastName: "",
        email: "amit.singh@example.com",
        phone: "+91 98765 43210",
        dob: "1990-01-15",
        gender: "Male",
    });

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
        }
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [addresses, setAddresses] = useState(initialAddresses);
    const [addressForm, setAddressForm] = useState(emptyAddress);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

    const openAddForm = () => {
        setAddressForm({ ...emptyAddress, id: Date.now() });
        setEditingAddressId(null);
        setShowAddressForm(true);
    };

    const openEditForm = (addr: typeof emptyAddress) => {
        setAddressForm({ ...addr });
        setEditingAddressId(addr.id);
        setShowAddressForm(true);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddressSave = () => {
        if (editingAddressId !== null) {
            setAddresses((prev) => prev.map((a) => a.id === editingAddressId ? { ...addressForm, isDefault: a.isDefault } : a));
        } else {
            setAddresses((prev) => [...prev, addressForm]);
        }
        setShowAddressForm(false);
    };

    const handleDeleteAddress = (id: number) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    const handleSetDefault = (id: number) => {
        setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    };

    const ActiveIcon = sidebarItems.find((i) => i.id === activeTab)?.icon ?? User;

    return (
        <div className="min-h-screen bg-[#f8f9fb] flex">
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-[260px] bg-gradient-to-b from-[#00485d] via-[#003d4f] to-[#08131e] border-r border-white/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            {avatarUrl ? (
                                <Image src={avatarUrl} alt="Profile" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold">
                                    AS
                                </div>
                            )}
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#003d4f]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[15px] font-bold text-white truncate">User</p>
                            <p className="text-[12px] text-white">Member since Jul 2026</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium transition-all duration-200 ${isActive
                                    ? "bg-white/15 text-white shadow-sm backdrop-blur-sm"
                                    : "text-white hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <Icon className={`w-[18px] h-[18px] ${isActive ? "text-white" : "text-white"}`} />
                                {item.label}
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-white/10">
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white hover:bg-red-500/15 hover:text-red-400 transition-all"
                    >
                        <LogOut className="w-[18px] h-[18px]" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
                <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50" onClick={() => setSidebarOpen(true)}>
                            <Menu size={20} />
                        </button>
                        <div className="flex items-center gap-2 text-black">
                            <ActiveIcon className="w-5 h-5" />
                            <h1 className="text-xl sm:text-2xl font-bold text-black">
                                {sidebarItems.find((i) => i.id === activeTab)?.label}
                            </h1>
                        </div>
                    </div>
                    <p className="hidden sm:block text-sm text-black">Welcome back, User!</p>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                    {activeTab === "overview" && (
                        <div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                                {[
                                    { label: "Total Orders", value: "3", icon: <Package className="w-5 h-5" />, color: "bg-[#00485d]" },
                                    { label: "Wishlist", value: "3", icon: <Heart className="w-5 h-5" />, color: "bg-[#E5097F]" },
                                    { label: "Total Spent", value: "₱2,344", icon: <CreditCard className="w-5 h-5" />, color: "bg-[#7c3aed]" },
                                    { label: "Reward Points", value: "120", icon: <Star className="w-5 h-5" />, color: "bg-[#f59e0b]" },
                                ].map((stat, idx) => (
                                    <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[13px] sm:text-[15px] font-medium text-gray-500">{stat.label}</p>
                                                <p className="text-[26px] sm:text-[32px] font-bold text-black mt-1">{stat.value}</p>
                                            </div>
                                            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
                                                {stat.icon}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 sm:mt-8 grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
                                <div className="xl:col-span-3 rounded-xl border border-gray-200 bg-white">
                                    <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-black">Recent Orders</h3>
                                            <p className="text-[14px] text-gray-500">Your latest purchases</p>
                                        </div>
                                        <button onClick={() => setActiveTab("orders")} className="flex items-center gap-1 text-sm font-medium text-[#00485d] hover:underline">
                                            View All <ArrowUpRight size={14} />
                                        </button>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {orders.map((order) => {
                                            const status = statusConfig[order.status];
                                            return (
                                                <div key={order.id} className="flex items-center justify-between px-5 sm:px-6 py-4 hover:bg-gray-50/50">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex -space-x-2">
                                                            {order.items.slice(0, 2).map((item, i) => (
                                                                <div key={i} className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                                                                    <Image src={item.image} alt={item.name} width={100} height={100} className="w-7 h-7 object-contain" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div>
                                                            <p className="text-[15px] font-semibold text-black">{order.id}</p>
                                                            <p className="text-[13px] text-gray-500">{order.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.color}`}>
                                                            {order.status}
                                                        </span>
                                                        <span className="text-[15px] font-bold text-black">&#8369;{order.total}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="xl:col-span-2 rounded-xl border border-gray-200 bg-white">
                                    <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-black">Account Details</h3>
                                            <p className="text-[14px] text-gray-500">Your profile information</p>
                                        </div>
                                        <button onClick={() => setActiveTab("settings")} className="flex items-center gap-1 text-sm font-medium text-[#00485d] hover:underline">
                                            <Edit3 size={14} /> Edit
                                        </button>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {[
                                            { label: "Full Name", value: profile.firstName },
                                            { label: "Email", value: profile.email },
                                            { label: "Phone", value: profile.phone },
                                            { label: "Member Since", value: "July 2026" },
                                        ].map((item, idx) => (
                                            <div key={idx} className="px-5 sm:px-6 py-3.5">
                                                <p className="text-[12px] font-medium text-black uppercase tracking-wider">{item.label}</p>
                                                <p className="text-[15px] font-semibold text-black mt-0.5">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className="rounded-xl border border-gray-200 bg-white">
                            <div className="px-5 sm:px-6 py-4 border-b border-gray-100">
                                <h3 className="text-xl font-bold text-black">Order History</h3>
                                <p className="text-[14px] text-gray-500">All your past orders</p>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {orders.map((order) => {
                                    const status = statusConfig[order.status];
                                    return (
                                        <div key={order.id} className="p-5 sm:p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                                <div>
                                                    <p className="text-[16px] font-bold text-black">{order.id}</p>
                                                    <p className="text-[13px] text-gray-500 mt-0.5">Placed on {order.date}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.bg} ${status.color}`}>
                                                        {status.icon} {order.status}
                                                    </span>
                                                    <span className="text-lg font-bold text-[#00485d]">&#8369;{order.total}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2.5">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                                        <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                                                            <Image src={item.image} alt={item.name} width={100} height={100} className="w-8 h-8 object-contain" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[15px] font-semibold text-black">{item.name}</p>
                                                            <p className="text-[13px] text-gray-500">{item.variant} &times; {item.qty}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex gap-3 mt-4">
                                                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                                    <Eye size={14} /> View Details
                                                </button>
                                                {order.status === "Delivered" && (
                                                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00485d] text-xs font-medium text-white hover:bg-[#003a4d] transition-colors">
                                                        <Star size={14} /> Write Review
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === "wishlist" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {wishlistItems.map((item) => (
                                <div key={item.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="relative p-6 bg-gray-50 flex items-center justify-center h-[180px]">
                                        <Image src={item.image} alt={item.name} width={200} height={200} className="w-[110px] h-[110px] object-contain" />
                                        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-red-50 transition-colors">
                                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                        </button>
                                        {!item.inStock && (
                                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                                <span className="px-4 py-1.5 rounded-full bg-gray-800 text-white text-xs font-semibold">Out of Stock</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 sm:p-5">
                                        <h3 className="text-[15px] font-bold text-black">{item.name}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-xl font-bold text-[#00485d]">&#8369;{item.price}</span>
                                            <span className="text-xs text-black line-through">&#8369;{item.originalPrice}</span>
                                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                            </span>
                                        </div>
                                        <button disabled={!item.inStock} className="mt-4 w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-[#E5097F] text-white text-sm font-medium hover:bg-[#c4087a] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                                            <ShoppingBasket size={16} />
                                            {item.inStock ? "Add to Cart" : "Notify Me"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "addresses" && (
                        <div>
                            {/* Address Form Modal */}
                            {showAddressForm && (
                                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddressForm(false)}>
                                    <div className="bg-white rounded-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                            <div>
                                                <h3 className="text-lg font-bold text-black">{editingAddressId ? "Edit Address" : "Add New Address"}</h3>
                                                <p className="text-sm text-gray-500 mt-0.5">{editingAddressId ? "Update your address details" : "Enter your new address details"}</p>
                                            </div>
                                            <button onClick={() => setShowAddressForm(false)} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                                                <X size={18} className="text-gray-500" />
                                            </button>
                                        </div>
                                        <div className="p-6 space-y-5">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Label</label>
                                                    <input type="text" name="label" value={addressForm.label} onChange={handleAddressChange} placeholder="e.g. Home, Office" className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Full Name</label>
                                                    <input type="text" name="name" value={addressForm.name} onChange={handleAddressChange} placeholder="Recipient name" className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1.5">Street Address</label>
                                                <input type="text" name="address" value={addressForm.address} onChange={handleAddressChange} placeholder="House no., Street, Area" className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">City</label>
                                                    <input type="text" name="city" value={addressForm.city} onChange={handleAddressChange} placeholder="City" className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">State</label>
                                                    <input type="text" name="state" value={addressForm.state} onChange={handleAddressChange} placeholder="State" className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">ZIP Code</label>
                                                    <input type="text" name="zip" value={addressForm.zip} onChange={handleAddressChange} placeholder="PIN / ZIP" className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Phone Number</label>
                                                    <input type="tel" name="phone" value={addressForm.phone} onChange={handleAddressChange} placeholder="+91 XXXXX XXXXX" className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                                            <button onClick={() => setShowAddressForm(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                                Cancel
                                            </button>
                                            <button onClick={handleAddressSave} className="px-6 py-2.5 rounded-xl bg-[#00485d] text-white text-sm font-semibold hover:bg-[#003a4d] transition-colors">
                                                {editingAddressId ? "Update Address" : "Save Address"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {addresses.map((addr) => (
                                    <div key={addr.id} className={`rounded-xl border bg-white p-5 sm:p-6 relative ${addr.isDefault ? "border-[#00485d]" : "border-gray-200"}`}>
                                        {addr.isDefault && (
                                            <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-[#00485d] text-white text-[10px] font-semibold">Default</span>
                                        )}
                                        <div className="flex items-center gap-2 mb-3">
                                            <MapPin className="w-4 h-4 text-[#E5097F]" />
                                            <span className="text-[15px] font-bold text-black">{addr.label}</span>
                                        </div>
                                        <p className="text-[15px] font-semibold text-black">{addr.name}</p>
                                        <p className="text-[14px] text-gray-500 mt-1 leading-[1.6]">
                                            {addr.address}<br />
                                            {addr.city} - {addr.zip}
                                        </p>
                                        <p className="text-sm text-black mt-2">{addr.phone}</p>
                                        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                                            <button onClick={() => openEditForm(addr)} className="flex items-center gap-1.5 text-xs font-medium text-[#00485d] hover:underline">
                                                <Edit3 size={13} /> Edit
                                            </button>
                                            {!addr.isDefault && (
                                                <>
                                                    <button onClick={() => handleSetDefault(addr.id)} className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:underline">Set as Default</button>
                                                    <button onClick={() => handleDeleteAddress(addr.id)} className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:underline ml-auto">
                                                        <XCircle size={13} /> Remove
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button onClick={openAddForm} className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white p-8 hover:border-[#00485d] hover:bg-gray-50 transition-all min-h-[200px]">
                                    <div className="w-11 h-11 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                                        <Plus className="w-5 h-5 text-[#00485d]" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#00485d]">Add New Address</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className="space-y-6">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="relative">
                                        {avatarUrl ? (
                                            <Image src={avatarUrl} alt="Profile" width={96} height={96} className="w-24 h-24 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00485d] to-[#006078] flex items-center justify-center text-white text-3xl font-bold">
                                                AS
                                            </div>
                                        )}
                                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                                        <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#E5097F] flex items-center justify-center text-white shadow-lg hover:bg-[#c4087a] transition-colors">
                                            <Camera size={14} />
                                        </button>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-xl font-bold text-black">{profile.firstName}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{profile.email}</p>
                                        <p className="text-xs text-black mt-1">Member since July 2026</p>
                                        {avatarUrl && (
                                            <button onClick={() => setAvatarUrl(null)} className="mt-2 text-xs font-medium text-red-500 hover:underline">
                                                Remove Photo
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white">
                                <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center gap-2">
                                    <User className="w-5 h-5 text-[#00485d]" />
                                    <h3 className="text-lg font-bold text-black">Personal Information</h3>
                                </div>
                                <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">First Name</label>
                                        <input type="text" name="firstName" value={profile.firstName} onChange={handleProfileChange} className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Last Name</label>
                                        <input type="text" name="lastName" value={profile.lastName} onChange={handleProfileChange} className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Email Address</label>
                                        <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Phone Number</label>
                                        <input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Date of Birth</label>
                                        <input type="date" name="dob" value={profile.dob} onChange={handleProfileChange} className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Gender</label>
                                        <select name="gender" value={profile.gender} onChange={handleProfileChange} className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                            <option>Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="px-6 sm:px-8 py-4 border-t border-gray-100 flex justify-end">
                                    <button className="px-6 py-2.5 rounded-xl bg-[#00485d] text-white text-sm font-semibold hover:bg-[#003a4d] transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white">
                                <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-[#00485d]" />
                                    <h3 className="text-lg font-bold text-black">Security</h3>
                                </div>
                                <div className="p-6 sm:p-8 space-y-5">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <div>
                                            <p className="text-[15px] font-semibold text-black">Password</p>
                                            <p className="text-sm text-gray-500 mt-0.5">Last changed 30 days ago</p>
                                        </div>
                                        <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                            Change
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <div>
                                            <p className="text-[15px] font-semibold text-black">Two-Factor Authentication</p>
                                            <p className="text-sm text-gray-500 mt-0.5">Add an extra layer of security</p>
                                        </div>
                                        <button className="px-4 py-2 rounded-lg border border-[#00485d] text-sm font-medium text-[#00485d] hover:bg-[#00485d] hover:text-white transition-colors">
                                            Enable
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white">
                                <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-[#00485d]" />
                                    <h3 className="text-lg font-bold text-black">Notifications</h3>
                                </div>
                                <div className="p-6 sm:p-8 space-y-4">
                                    {[
                                        { label: "Order Updates", desc: "Get notified about order status changes" },
                                        { label: "Promotions", desc: "Receive offers and discount alerts" },
                                        { label: "Newsletter", desc: "Weekly wellness tips and product updates" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                                            <div>
                                                <p className="text-[15px] font-semibold text-black">{item.label}</p>
                                                <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked={idx === 0} className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-[#00485d]/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00485d]"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
