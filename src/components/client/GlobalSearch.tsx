"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Search, X, ArrowRight, Clock, TrendingUp,
    Package, FileText, ShoppingBasket, MapPin, Sparkles, Command, Trash2
} from "lucide-react";

const pages = [
    { title: "Home", href: "/", icon: MapPin, category: "Pages", desc: "Main landing page & vital remedies" },
    { title: "Shop All Products", href: "/shop", icon: ShoppingBasket, category: "Pages", desc: "Browse full supplement catalog" },
    { title: "About Us", href: "/about", icon: FileText, category: "Pages", desc: "Our story, mission & quality standards" },
    { title: "Our Essence", href: "/our-essence", icon: Sparkles, category: "Pages", desc: "Ayurvedic philosophy & pure ingredients" },
    { title: "Health & Wellness Blog", href: "/blog", icon: FileText, category: "Pages", desc: "Expert articles, tips & guides" },
    { title: "Contact Us", href: "/contact-us", icon: MapPin, category: "Pages", desc: "Get in touch with customer care" },
    { title: "My Dashboard", href: "/dashboard", icon: MapPin, category: "Pages", desc: "Manage orders & personal account" },
    { title: "Shopping Cart", href: "#/cart", icon: ShoppingBasket, category: "Pages", desc: "Review items in your cart" },
    { title: "Login / Sign Up", href: "/login", icon: MapPin, category: "Pages", desc: "Account access & authentication" },
];

const products = [
    { title: "VITAZAN™ HT-KOF", href: "/shop/details", image: "/images/htkof1.png", category: "Products", desc: "Cold & Cough Relief • Herbal Cough Syrup" },
    { title: "VITAZAN™ OSTEOMAC", href: "/shop/details", image: "/images/osteomac-product.png", category: "Products", desc: "Bone & Joint Support • Calcium & Mineral Formula" },
    { title: "VITAZAN™ SENAX", href: "/shop/details", image: "/images/senax-product.png", category: "Products", desc: "Natural Vitality Booster • Energy & Endurance" },
    { title: "VITAZAN™ RELOAD", href: "/shop/details", image: "/images/reload-product.png", category: "Products", desc: "Daily Wellness Supplement • Multivitamin Complex" },
];

const blogPosts = [
    { title: "Comprehensive Bone Health Support Explained", href: "/blog", category: "Articles", desc: "Bone & Joint Health • 5 min read" },
    { title: "Understanding Bone Health - Strength and Mobility", href: "/blog", category: "Articles", desc: "Healthy Living • 4 min read" },
    { title: "Healthy Living in the Modern Age", href: "/blog", category: "Articles", desc: "Vitality & Wellness • 6 min read" },
    { title: "Natural Remedies for Seasonal Cough & Cold", href: "/blog", category: "Articles", desc: "Ayurvedic Care • 3 min read" },
];

const trending = ["Osteomac", "HT-KOF", "Bone Health", "SENAX", "Immunity Booster"];

export type SearchItem = {
    title: string;
    href: string;
    category: string;
    icon?: React.ComponentType<{ className?: string }>;
    image?: string;
    desc?: string;
};

const allItems: SearchItem[] = [
    ...pages,
    ...products,
    ...blogPosts,
];

interface GlobalSearchProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen?: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
    const [query, setQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const results = query.trim().length > 0
        ? allItems.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            (item.desc && item.desc.toLowerCase().includes(query.toLowerCase())) ||
            item.category.toLowerCase().includes(query.toLowerCase())
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
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("vitazan-recent-searches");
            if (saved) setRecentSearches(JSON.parse(saved));
        } catch {
            // ignore localStorage errors
        }
    }, []);

    const saveRecent = useCallback((term: string) => {
        if (!term.trim()) return;
        const updated = [term, ...recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 5);
        setRecentSearches(updated);
        try {
            localStorage.setItem("vitazan-recent-searches", JSON.stringify(updated));
        } catch {
            // ignore
        }
    }, [recentSearches]);

    const removeRecent = useCallback((term: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = recentSearches.filter((s) => s !== term);
        setRecentSearches(updated);
        try {
            localStorage.setItem("vitazan-recent-searches", JSON.stringify(updated));
        } catch {
            // ignore
        }
    }, [recentSearches]);

    const navigate = useCallback((href: string, title: string) => {
        saveRecent(title);
        onClose();
        router.push(href);
    }, [saveRecent, onClose, router]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (flatResults.length > 0 ? Math.min(prev + 1, flatResults.length - 1) : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (flatResults[selectedIndex]) {
                navigate(flatResults[selectedIndex].href, flatResults[selectedIndex].title);
            } else if (query.trim()) {
                saveRecent(query.trim());
                onClose();
                router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            onClose();
        }
    };

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Scroll active item into view
    useEffect(() => {
        if (resultsContainerRef.current) {
            const activeEl = resultsContainerRef.current.querySelector('[data-selected="true"]');
            if (activeEl) {
                activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }
        }
    }, [selectedIndex]);

    const categoryIcons: Record<string, React.ReactNode> = {
        Pages: <MapPin className="w-4 h-4 text-teal" />,
        Products: <Package className="w-4 h-4 text-pink" />,
        Articles: <FileText className="w-4 h-4 text-purple-600" />,
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] sm:pt-[12vh] px-3 sm:px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Spotlight Modal Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -16 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-[680px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100/80 z-[101] flex flex-col max-h-[82vh]"
                    >
                        {/* Search Input Bar (Mac Spotlight Style) */}
                        <div className="relative flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-white">
                            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" strokeWidth={2.2} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search products, pages, articles..."
                                className="flex-1 text-[16px] sm:text-[18px] text-gray-900 outline-none placeholder:text-gray-400 bg-transparent font-sans"
                            />
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {/* {query && (
                                    <button
                                        onClick={() => setQuery("")}
                                        className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                        title="Clear search"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-[11px] font-medium text-gray-400 border border-gray-200/80 select-none">
                                    <span>ESC</span>
                                </kbd> */}
                            </div>
                        </div>

                        {/* Content & Results Scroll Area */}
                        <div ref={resultsContainerRef} className="flex-1 overflow-y-auto custom-scrollbar min-h-[220px]">
                            {query.trim().length === 0 ? (
                                <div className="p-5 sm:p-6 space-y-6">
                                    {/* Recent Searches */}
                                    {recentSearches.length > 0 && (
                                        <div>
                                            <div className="flex items-center justify-between mb-2.5">
                                                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Recent Searches</p>
                                                <button
                                                    onClick={() => {
                                                        setRecentSearches([]);
                                                        localStorage.removeItem("vitazan-recent-searches");
                                                    }}
                                                    className="text-[11px] font-medium text-gray-400 hover:text-pink transition-colors"
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                            <div className="space-y-1">
                                                {recentSearches.map((term) => (
                                                    <div
                                                        key={term}
                                                        onClick={() => setQuery(term)}
                                                        className="group flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] text-gray-700 hover:bg-teal/5 hover:text-teal cursor-pointer transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Clock size={15} className="text-gray-400 group-hover:text-teal transition-colors" />
                                                            <span className="font-medium">{term}</span>
                                                        </div>
                                                        <button
                                                            onClick={(e) => removeRecent(term, e)}
                                                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-pink transition-opacity"
                                                            title="Remove"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Trending Searches */}
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">Trending Now</p>
                                        <div className="flex flex-wrap gap-2">
                                            {trending.map((term) => (
                                                <button
                                                    key={term}
                                                    onClick={() => setQuery(term)}
                                                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-50 text-[13px] font-medium text-gray-700 hover:bg-pink/10 hover:text-pink hover:border-pink/30 border border-gray-200/60 transition-all duration-200"
                                                >
                                                    <TrendingUp size={13} className="text-pink" />
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Quick Navigation Links */}
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">Quick Navigation</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { label: "Shop All Products", href: "/shop", icon: ShoppingBasket, color: "bg-pink/10 text-pink" },
                                                { label: "Our Essence", href: "/our-essence", icon: Sparkles, color: "bg-teal/10 text-teal" },
                                                { label: "Blog & Articles", href: "/blog", icon: FileText, color: "bg-purple-100 text-purple-600" },
                                                { label: "Contact Us", href: "/contact-us", icon: MapPin, color: "bg-amber-100 text-amber-600" },
                                            ].map((link) => {
                                                const Icon = link.icon;
                                                return (
                                                    <button
                                                        key={link.href}
                                                        onClick={() => navigate(link.href, link.label)}
                                                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-gray-50/70 hover:bg-gray-100/80 transition-colors text-left group border border-gray-100"
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${link.color}`}>
                                                            <Icon size={16} />
                                                        </div>
                                                        <span className="text-[14px] font-semibold text-gray-800 group-hover:text-black">{link.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : results.length === 0 ? (
                                <div className="py-16 text-center px-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto text-gray-400 mb-3">
                                        <Search className="w-7 h-7" />
                                    </div>
                                    <p className="text-[16px] font-semibold text-gray-800">No results found for &ldquo;{query}&rdquo;</p>
                                    <p className="text-[13px] text-gray-400 mt-1 max-w-xs mx-auto">
                                        Try checking for spelling errors or searching for broader terms like &ldquo;supplement&rdquo; or &ldquo;cough&rdquo;.
                                    </p>
                                </div>
                            ) : (
                                <div className="p-3 sm:p-4">
                                    {Object.entries(grouped).map(([category, items]) => (
                                        <div key={category} className="mb-4 last:mb-0">
                                            <div className="flex items-center gap-2 px-3 py-1.5 mb-1">
                                                {categoryIcons[category]}
                                                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{category}</p>
                                                <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{items.length}</span>
                                            </div>
                                            <div className="space-y-1">
                                                {items.map((item) => {
                                                    const globalIdx = flatResults.indexOf(item);
                                                    const isSelected = globalIdx === selectedIndex;
                                                    return (
                                                        <div
                                                            key={item.title + item.href}
                                                            data-selected={isSelected}
                                                            onClick={() => navigate(item.href, item.title)}
                                                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                                                            className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl cursor-pointer transition-all duration-150 ${isSelected
                                                                ? "bg-pink/10 border border-pink/30 shadow-sm"
                                                                : "hover:bg-gray-50 border border-transparent"
                                                                }`}
                                                        >
                                                            {item.image ? (
                                                                <div className="w-11 h-11 rounded-lg bg-white border border-gray-100 p-1 flex items-center justify-center flex-shrink-0 shadow-sm">
                                                                    <Image src={item.image} alt={item.title} width={44} height={44} className="w-full h-full object-contain" />
                                                                </div>
                                                            ) : (
                                                                <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-pink text-white" : "bg-gray-100 text-black"
                                                                    }`}>
                                                                    {item.icon ? <item.icon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                                                </div>
                                                            )}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <p className={`text-[14px] font-bold truncate ${isSelected ? "text-pink" : "text-gray-900"}`}>{item.title}</p>
                                                                    <span className="text-[10px] uppercase font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                                                                        {item.category}
                                                                    </span>
                                                                </div>
                                                                {item.desc && <p className="text-[12px] text-black truncate mt-0.5">{item.desc}</p>}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <ArrowRight size={15} className={`transition-transform duration-150 ${isSelected ? "text-pink translate-x-0.5" : "text-gray-300"}`} />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mac Spotlight Footer */}
                        {/* <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/80 text-[12px] text-black select-none">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5">
                                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-[10px] font-mono shadow-xs text-gray-600">↑↓</kbd>
                                    <span>Navigate</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-[10px] font-mono shadow-xs text-gray-600">↵</kbd>
                                    <span>Select</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-[10px] font-mono shadow-xs text-gray-600">ESC</kbd>
                                    <span>Dismiss</span>
                                </span>
                            </div>
                            <div className="hidden sm:flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                                <Command size={12} />
                                <span>Spotlight Search</span>
                            </div>
                        </div> */}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
