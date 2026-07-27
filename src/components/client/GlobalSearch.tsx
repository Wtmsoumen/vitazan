"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Search, X, ArrowRight, Clock, TrendingUp,
    Package, FileText, ShoppingBasket, MapPin,
} from "lucide-react";

const pages = [
    { title: "Home", href: "/", icon: MapPin, category: "Pages" },
    { title: "Shop", href: "/shop", icon: ShoppingBasket, category: "Pages" },
    { title: "About Us", href: "/about", icon: FileText, category: "Pages" },
    { title: "Our Essence", href: "/our-essence", icon: FileText, category: "Pages" },
    { title: "Blog", href: "/blog", icon: FileText, category: "Pages" },
    { title: "Contact Us", href: "/contact-us", icon: MapPin, category: "Pages" },
    { title: "My Dashboard", href: "/dashboard", icon: MapPin, category: "Pages" },
    { title: "Cart", href: "/cart", icon: ShoppingBasket, category: "Pages" },
    { title: "Login / Sign Up", href: "/login", icon: MapPin, category: "Pages" },
];

const products = [
    { title: "VITAZAN™ HT-KOF", href: "/shop/details", image: "/images/htkof1.png", category: "Products", desc: "Herbal cough remedy" },
    { title: "VITAZAN™ OSTEOMAC", href: "/shop/details", image: "/images/osteomac-product.png", category: "Products", desc: "Bone health support" },
    { title: "VITAZAN™ SENAX", href: "/shop/details", image: "/images/senax-product.png", category: "Products", desc: "Natural vitality booster" },
    { title: "VITAZAN™ RELOAD", href: "/shop/details", image: "/images/reload-product.png", category: "Products", desc: "Energy supplement" },
];

const blogPosts = [
    { title: "Comprehensive Bone Health Support Explained", href: "/blog", category: "Blog", desc: "Bone & Joint Health" },
    { title: "Understanding Bone Health - Strength and Mobility", href: "/blog", category: "Blog", desc: "Healthy Living" },
    { title: "Healthy Living in the Modern Age", href: "/blog", category: "Blog", desc: "Vitality Store" },
];

const trending = ["Osteomac", "Bone Health", "Immunity", "HT-KOF", "Vitality"];

type SearchItem = {
    title: string;
    href: string;
    category: string;
    icon?: React.ComponentType<{ className?: string }>;
    image?: string;
    desc?: string;
};

const allItems: SearchItem[] = [
    ...pages.map((p) => ({ ...p, icon: p.icon })),
    ...products,
    ...blogPosts,
];

interface GlobalSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
    const [query, setQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const results = query.length > 0
        ? allItems.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            (item.desc && item.desc.toLowerCase().includes(query.toLowerCase()))
        )
        : [];

    const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const flatResults = Object.values(grouped).flat();

    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const saved = localStorage.getItem("vitazan-recent-searches");
        if (saved) setRecentSearches(JSON.parse(saved));
    }, []);

    const saveRecent = useCallback((term: string) => {
        const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem("vitazan-recent-searches", JSON.stringify(updated));
    }, [recentSearches]);

    const navigate = useCallback((href: string, title: string) => {
        saveRecent(title);
        onClose();
        router.push(href);
    }, [saveRecent, onClose, router]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && flatResults[selectedIndex]) {
            navigate(flatResults[selectedIndex].href, flatResults[selectedIndex].title);
        } else if (e.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
            }
        };
        if (isOpen) window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen]);

    const categoryIcons: Record<string, React.ReactNode> = {
        Pages: <MapPin className="w-4 h-4" />,
        Products: <Package className="w-4 h-4" />,
        Blog: <FileText className="w-4 h-4" />,
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-[92%] max-w-[640px] z-[101]"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-5 sm:px-6 border-b border-gray-100">
                                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search pages, products, articles..."
                                    className="flex-1 h-14 sm:h-16 text-[15px] sm:text-[17px] text-black outline-none placeholder:text-gray-400 bg-transparent"
                                />
                                <div className="flex items-center gap-2">
                                    {query && (
                                        <button onClick={() => setQuery("")} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                                            <X size={15} className="text-gray-400" />
                                        </button>
                                    )}
                                    <kbd className="hidden sm:flex items-center px-2 py-1 rounded-md bg-gray-100 text-[11px] font-medium text-gray-400 border border-gray-200">
                                        ESC
                                    </kbd>
                                </div>
                            </div>

                            {/* Results Area */}
                            <div className="max-h-[60vh] overflow-y-auto">
                                {query.length === 0 ? (
                                    <div className="p-5 sm:p-6">
                                        {/* Recent Searches */}
                                        {recentSearches.length > 0 && (
                                            <div className="mb-6">
                                                <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Recent</p>
                                                <div className="space-y-1">
                                                    {recentSearches.map((term) => (
                                                        <button
                                                            key={term}
                                                            onClick={() => setQuery(term)}
                                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] text-gray-600 hover:bg-gray-50 transition-colors text-left"
                                                        >
                                                            <Clock size={15} className="text-gray-400" />
                                                            {term}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Trending */}
                                        <div>
                                            <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Trending</p>
                                            <div className="flex flex-wrap gap-2">
                                                {trending.map((term) => (
                                                    <button
                                                        key={term}
                                                        onClick={() => setQuery(term)}
                                                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gray-50 text-[13px] font-medium text-gray-600 hover:bg-pink/10 hover:text-pink transition-colors border border-gray-100"
                                                    >
                                                        <TrendingUp size={13} />
                                                        {term}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quick Links */}
                                        <div className="mt-6">
                                            <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Quick Links</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {[
                                                    { label: "Shop All", href: "/shop", icon: ShoppingBasket },
                                                    { label: "Blog", href: "/blog", icon: FileText },
                                                    { label: "Contact Us", href: "/contact-us", icon: MapPin },
                                                    { label: "About Us", href: "/about", icon: FileText },
                                                ].map((link) => {
                                                    const Icon = link.icon;
                                                    return (
                                                        <button
                                                            key={link.href}
                                                            onClick={() => navigate(link.href, link.label)}
                                                            className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                                                        >
                                                            <div className="w-8 h-8 rounded-lg bg-pink/10 flex items-center justify-center">
                                                                <Icon size={15} className="text-pink" />
                                                            </div>
                                                            <span className="text-[14px] font-medium text-gray-700">{link.label}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ) : results.length === 0 ? (
                                    <div className="py-14 text-center">
                                        <Search className="w-10 h-10 text-gray-200 mx-auto" />
                                        <p className="mt-3 text-[15px] text-gray-400">No results for &ldquo;{query}&rdquo;</p>
                                        <p className="mt-1 text-[13px] text-gray-300">Try a different search term</p>
                                    </div>
                                ) : (
                                    <div className="p-3 sm:p-4">
                                        {Object.entries(grouped).map(([category, items]) => (
                                            <div key={category} className="mb-4 last:mb-0">
                                                <div className="flex items-center gap-2 px-3 py-2">
                                                    <span className="text-gray-400">{categoryIcons[category]}</span>
                                                    <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-400">{category}</p>
                                                    <span className="text-[11px] text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded">{items.length}</span>
                                                </div>
                                                <div className="space-y-0.5">
                                                    {items.map((item) => {
                                                        const globalIdx = flatResults.indexOf(item);
                                                        const isSelected = globalIdx === selectedIndex;
                                                        return (
                                                            <button
                                                                key={item.title + item.href}
                                                                onClick={() => navigate(item.href, item.title)}
                                                                onMouseEnter={() => setSelectedIndex(globalIdx)}
                                                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${isSelected ? "bg-pink/5 border border-pink/20" : "hover:bg-gray-50 border border-transparent"}`}
                                                            >
                                                                {item.image ? (
                                                                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                                                                        <Image src={item.image} alt={item.title} width={60} height={60} className="w-7 h-7 object-contain" />
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                                                                        {item.icon ? <item.icon className="w-4 h-4 text-gray-400" /> : <FileText className="w-4 h-4 text-gray-400" />}
                                                                    </div>
                                                                )}
                                                                <div className="flex-1 min-w-0">
                                                                    <p className={`text-[14px] font-semibold truncate ${isSelected ? "text-pink" : "text-black"}`}>{item.title}</p>
                                                                    {item.desc && <p className="text-[12px] text-gray-400 mt-0.5 truncate">{item.desc}</p>}
                                                                </div>
                                                                <ArrowRight size={14} className={`flex-shrink-0 ${isSelected ? "text-pink" : "text-gray-300"}`} />
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-t border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-gray-200 text-[10px] font-mono">↑↓</kbd> Navigate</span>
                                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-gray-200 text-[10px] font-mono">↵</kbd> Open</span>
                                </div>
                                <p className="text-[11px] text-gray-300">Powered by Vitazan</p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
