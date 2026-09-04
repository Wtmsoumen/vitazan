"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimatedSection from "@/components/client/AnimatedSection";
import { Filter, X, ChevronDown, ShoppingBasket, Search } from "lucide-react";

const categories = [
    { name: "All", icon: "/images/Category Icons/General Wellness Symbol.svg" },
    { name: "Bone, Joint & Muscle Care", icon: "/images/Category Icons/Bone, joint & muscle care 2.svg" },
    { name: "Gut Health", icon: "/images/Category Icons/Gut Health.svg" },
    { name: "Vitamins & Nutrition", icon: "/images/Category Icons/Vit & Nutrition 1.svg" },
    { name: "Hormonal Balance", icon: "/images/Category Icons/Hormonal balance ref 1.svg" },
    { name: "Fertility", icon: "/images/Category Icons/fertility.svg" },
    { name: "Sexual Health", icon: "/images/Category Icons/Sexual health.svg" },
    { name: "Menstruation", icon: "/images/Category Icons/menstruation.svg" },
    { name: "Iron Supplement", icon: "/images/Category Icons/Iron supplement.svg" },
    { name: "PCOS/PCOD", icon: "/images/Category Icons/PCOS_PCOD.svg" },
];

const ageGroups = [
    "All Age",
    "(13-17) Adolescent",
    "(18–25 years) Young Adults",
    "(26–40 years) Adults",
    "(41–60 years) Middle-Aged",
    "(60+ years) Seniors",
];

const genders = ["All", "Male Vitality", "Female Vitality", "General Wellness"];

const allProducts = [
    {
        name: "ACINIL NEO",
        desc: "Antacid & antiflatulent oral suspension for fast relief from acidity, heartburn and gas.",
        price: 249,
        image: "/images/ACINIL_NEO.png",
        therapies: ["Gut Health"],
        gender: "General Wellness",
        ages: ["(18–25 years) Young Adults", "(26–40 years) Adults", "(41–60 years) Middle-Aged", "(60+ years) Seniors"],
    },
    {
        name: "ALFAAKTIV",
        desc: "Active capsules formulated to support male vitality, energy and overall well-being.",
        price: 349,
        image: "/images/ALFAAKTIV.png",
        therapies: ["Fertility", "Hormonal Balance", "Sexual Health"],
        gender: "Male Vitality",
        ages: ["(18–25 years) Young Adults", "(26–40 years) Adults", "(41–60 years) Middle-Aged"],
    },
    {
        name: "CYSTNIL SURE",
        desc: "D-chiro-inositol and Myo-inositol tablets for hormonal balance and reproductive health.",
        price: 299,
        image: "/images/CYSTNIL SURE.png",
        therapies: ["PCOS/PCOD", "Fertility", "Menstruation", "Sexual Health"],
        gender: "Female Vitality",
        ages: ["(13-17) Adolescent", "(18–25 years) Young Adults", "(26–40 years) Adults", "(41–60 years) Middle-Aged"],
    },
    {
        name: "DIARON-C",
        desc: "Citrus bioflavonoids, rosehip and vitamin C complex for immunity and skin health.",
        price: 279,
        image: "/images/DIARON-C.png",
        therapies: ["Iron Supplement", "Vitamins & Nutrition"],
        gender: "General Wellness",
        ages: ["(13-17) Adolescent", "(18–25 years) Young Adults", "(26–40 years) Adults", "(41–60 years) Middle-Aged", "(60+ years) Seniors"],
    },
    {
        name: "FEMISAN A",
        desc: "100% natural supplement supporting normal physiological functions of female reproductive organs.",
        price: 399,
        image: "/images/FEMISAN_A.png",
        therapies: ["Fertility", "Menstruation", "Hormonal Balance", "PCOS/PCOD", "Sexual Health", "Vitamins & Nutrition"],
        gender: "Female Vitality",
        ages: ["(13-17) Adolescent", "(18–25 years) Young Adults", "(26–40 years) Adults", "(41–60 years) Middle-Aged"],
    },
    {
        name: "FEMISAN B",
        desc: "Herbal drops with natural plant extracts for women's health and hormonal support.",
        price: 379,
        image: "/images/FEMISAN_B.png",
        therapies: ["Fertility", "Menstruation", "Hormonal Balance", "Sexual Health", "Vitamins & Nutrition"],
        gender: "Female Vitality",
        ages: ["(18–25 years) Young Adults", "(26–40 years) Adults", "(41–60 years) Middle-Aged"],
    },
    {
        name: "FEMISAN GOLD",
        desc: "Natural relief for menopause symptoms including hot flashes, sweating and restlessness.",
        price: 449,
        image: "/images/FEMISAN_GOLD.png",
        therapies: ["Hormonal Balance", "Vitamins & Nutrition"],
        gender: "Female Vitality",
        ages: ["(41–60 years) Middle-Aged", "(60+ years) Seniors"],
    },
    {
        name: "OSTEOMAC",
        desc: "Calcium citrate maleate with vitamin D3, magnesium and zinc tablets for bone health support.",
        price: 199,
        image: "/images/osteomac-product.png",
        therapies: ["Bone, Joint & Muscle Care", "Vitamins & Nutrition"],
        gender: "General Wellness",
        ages: ["(18–25 years) Young Adults", "(26–40 years) Adults", "(41–60 years) Middle-Aged", "(60+ years) Seniors"],
    },
];

export default function Shop() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedAge, setSelectedAge] = useState("All Age");
    const [selectedGender, setSelectedGender] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [expandedFilter, setExpandedFilter] = useState<string | null>("category");

    const filtered = allProducts.filter((p) => {
        if (selectedCategory !== "All" && !p.therapies.includes(selectedCategory)) return false;
        if (selectedGender !== "All" && selectedGender !== "General Wellness" && p.gender !== selectedGender && p.gender !== "General Wellness") return false;
        if (selectedGender === "General Wellness" && p.gender !== "General Wellness") return false;
        if (selectedAge !== "All Age" && !p.ages.includes(selectedAge)) return false;
        if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.desc.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const toggleFilter = (name: string) => {
        setExpandedFilter(expandedFilter === name ? null : name);
    };

    const filterSections = (
        <>
            {/* Category Filter */}
            <div className="border-b border-gray-100 pb-3">
                <button
                    onClick={() => toggleFilter("category")}
                    className="flex items-center justify-between w-full py-3 text-[15px] font-bold text-black uppercase tracking-wide"
                >
                    Categories
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedFilter === "category" ? "rotate-180" : ""}`} />
                </button>
                <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: expandedFilter === "category" ? "600px" : "0px", opacity: expandedFilter === "category" ? 1 : 0 }}
                >
                    <div className="space-y-1 pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors ${selectedCategory === cat.name ? "bg-pink/10 text-pink font-semibold" : "text-gray-700 hover:bg-gray-50 hover:text-black"}`}
                            >
                                <Image src={cat.icon} alt="" width={20} height={20} className={`w-5 h-5 flex-shrink-0 ${selectedCategory === cat.name ? "" : "opacity-60"}`} />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gender Filter */}
            <div className="border-b border-gray-100 pb-3">
                <button
                    onClick={() => toggleFilter("gender")}
                    className="flex items-center justify-between w-full py-3 text-[15px] font-bold text-black uppercase tracking-wide"
                >
                    Gender
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedFilter === "gender" ? "rotate-180" : ""}`} />
                </button>
                <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: expandedFilter === "gender" ? "300px" : "0px", opacity: expandedFilter === "gender" ? 1 : 0 }}
                >
                    <div className="space-y-1 pb-2">
                        {genders.map((g) => (
                            <button
                                key={g}
                                onClick={() => setSelectedGender(g)}
                                className={`block w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors ${selectedGender === g ? "bg-pink/10 text-pink font-semibold" : "text-gray-700 hover:bg-gray-50 hover:text-black"}`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Age Filter */}
            <div className="pb-3">
                <button
                    onClick={() => toggleFilter("age")}
                    className="flex items-center justify-between w-full py-3 text-[15px] font-bold text-black uppercase tracking-wide"
                >
                    Age Group
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedFilter === "age" ? "rotate-180" : ""}`} />
                </button>
                <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: expandedFilter === "age" ? "400px" : "0px", opacity: expandedFilter === "age" ? 1 : 0 }}
                >
                    <div className="space-y-1 pb-2">
                        {ageGroups.map((age) => (
                            <button
                                key={age}
                                onClick={() => setSelectedAge(age)}
                                className={`block w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors ${selectedAge === age ? "bg-pink/10 text-pink font-semibold" : "text-gray-700 hover:bg-gray-50 hover:text-black"}`}
                            >
                                {age}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="w-full bg-white">
            {/* Main content: sidebar + grid */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-8 md:py-12">
                {/* Mobile filter toggle */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 md:mb-8">
                    <button
                        onClick={() => setMobileFilterOpen(true)}
                        className="lg:hidden flex items-center justify-center gap-2 h-[48px] w-fit px-6 rounded-full bg-teal text-white text-[14px] font-medium"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                {/* Active filters */}
                {(selectedCategory !== "All" || selectedGender !== "All" || selectedAge !== "All Age") && (
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-[13px] text-black">Active filters:</span>
                        {selectedCategory !== "All" && (
                            <button onClick={() => setSelectedCategory("All")} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink/10 text-pink text-[13px] font-medium hover:bg-pink/20 transition-colors">
                                {selectedCategory} <X className="w-3 h-3" />
                            </button>
                        )}
                        {selectedGender !== "All" && (
                            <button onClick={() => setSelectedGender("All")} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-teal/10 text-teal text-[13px] font-medium hover:bg-teal/20 transition-colors">
                                {selectedGender} <X className="w-3 h-3" />
                            </button>
                        )}
                        {selectedAge !== "All Age" && (
                            <button onClick={() => setSelectedAge("All Age")} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-[13px] font-medium hover:bg-purple-200 transition-colors">
                                {selectedAge} <X className="w-3 h-3" />
                            </button>
                        )}
                        <button
                            onClick={() => { setSelectedCategory("All"); setSelectedGender("All"); setSelectedAge("All Age"); }}
                            className="text-[13px] text-gray-400 hover:text-black underline ml-1"
                        >
                            Clear all
                        </button>
                    </div>
                )}

                <div className="flex gap-8 lg:gap-12">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-[240px] xl:w-[270px] flex-shrink-0">
                        <div className="sticky top-28">
                            <div className="space-y-1">
                                {filterSections}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filtered.length === 0 ? (
                            <div className="py-20 text-center">
                                <p className="text-[18px] text-gray-400">No products match your filters.</p>
                                <button
                                    onClick={() => { setSelectedCategory("All"); setSelectedGender("All"); setSelectedAge("All Age"); setSearchQuery(""); }}
                                    className="mt-4 text-pink font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                                <AnimatePresence mode="popLayout">
                                    {filtered.map((product, idx) => (
                                        <motion.div
                                            key={product.name}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                                        >
                                            <Link href="/shop/details" className="group block">
                                                <div className="relative rounded-2xl sm:rounded-[20px] border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                                                    {/* Product image */}
                                                    <div className="relative h-[240px] sm:h-[280px] md:h-[300px] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6 overflow-hidden">
                                                        <motion.div
                                                            whileHover={{ y: -8, scale: 1.04 }}
                                                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                                            className="relative w-[70%] h-[85%]"
                                                        >
                                                            <Image
                                                                src={product.image}
                                                                alt={product.name}
                                                                fill
                                                                className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                                                            />
                                                        </motion.div>
                                                        <div className="absolute top-3 right-3">
                                                            <span className="px-2.5 py-1 rounded-full bg-teal/10 text-teal text-[11px] font-semibold">
                                                                {product.therapies[0] || product.gender}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Product info */}
                                                    <div className="p-4 sm:p-5">
                                                        <h3 className="text-[16px] sm:text-[18px] font-bold text-black leading-[1.3] group-hover:text-pink transition-colors">
                                                            {product.name}
                                                        </h3>
                                                        <p className="mt-1.5 text-[12px] sm:text-[13px] leading-[1.5] text-black line-clamp-2">
                                                            {product.desc}
                                                        </p>
                                                        <div className="mt-4 flex items-center justify-end">
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    router.push(`/enquiry?product=${encodeURIComponent(product.name)}`);
                                                                }}
                                                                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-pink text-white text-[13px] font-semibold hover:bg-pink/90 transition-colors cursor-pointer"
                                                            >
                                                                {/* <ShoppingBasket className="w-4 h-4" /> */}
                                                                Enquiry Now
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Mobile filter drawer */}
            <AnimatePresence>
                {mobileFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-[90]"
                            onClick={() => setMobileFilterOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 250 }}
                            className="fixed left-0 top-0 bottom-0 w-[300px] bg-white z-[95] shadow-2xl overflow-y-auto"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                <h3 className="text-[18px] font-bold text-black">Filters</h3>
                                <button onClick={() => setMobileFilterOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <X className="w-5 h-5 text-black" />
                                </button>
                            </div>
                            <div className="p-5">
                                <div className="space-y-1">{filterSections}</div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
