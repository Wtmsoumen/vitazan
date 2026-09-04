"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/client/AnimatedSection";
import { ArrowRight, Clock, Search, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Bone & Joint Health", "Healthy Living", "Vitality Store", "Immunity", "Nutrition"];

const blogPosts = [
    {
        id: 1,
        img: "/images/blog1.png",
        tag: "Bone & Joint Health",
        title: "VITAZAN Osteomac - Comprehensive Bone Health Support Explained",
        desc: "Bone health requires more than just calcium. VITAZAN OSTEOMAC delivers a complete, research-backed solution for maintaining bone density and joint flexibility throughout life.",
        date: "Jul 20, 2026",
        readTime: "5 min read",
        featured: true,
    },
    {
        id: 2,
        img: "/images/blog2.png",
        tag: "Healthy Living",
        title: "Understanding Bone Health - The Key to Strength and Mobility",
        desc: "Strong bones are the foundation of an active lifestyle. Learn how proper nutrition, exercise, and supplementation work together to support your skeletal system.",
        date: "Jul 18, 2026",
        readTime: "4 min read",
        featured: true,
    },
    {
        id: 3,
        img: "/images/blog3.png",
        tag: "Vitality Store",
        title: "Healthy Living in the Modern Age - Small Habits That Create Big Impact",
        desc: "In today's fast-paced world, maintaining wellness can feel overwhelming. Discover simple, evidence-based habits that make a real difference in your daily health.",
        date: "Jul 15, 2026",
        readTime: "6 min read",
        featured: true,
    },
    {
        id: 4,
        img: "/images/blog1-alt.png",
        tag: "Immunity",
        title: "Boosting Your Immune System Naturally - A Complete Guide",
        desc: "Your immune system is your body's first line of defense. Explore natural ways to strengthen immunity through diet, lifestyle choices, and targeted supplementation.",
        date: "Jul 12, 2026",
        readTime: "7 min read",
        featured: false,
    },
    {
        id: 5,
        img: "/images/blog2.png",
        tag: "Nutrition",
        title: "The Role of Micronutrients in Daily Wellness",
        desc: "Vitamins and minerals play crucial roles in every bodily function. Understanding micronutrient needs can help you make better choices for long-term health.",
        date: "Jul 10, 2026",
        readTime: "5 min read",
        featured: false,
    },
    {
        id: 6,
        img: "/images/blog3.png",
        tag: "Healthy Living",
        title: "Ayurvedic Wisdom for Modern Wellness Challenges",
        desc: "Ancient Ayurvedic principles offer timeless solutions for today's health concerns. Learn how traditional knowledge meets modern science in holistic wellness.",
        date: "Jul 8, 2026",
        readTime: "6 min read",
        featured: false,
    },
    {
        id: 7,
        img: "/images/blog1.png",
        tag: "Bone & Joint Health",
        title: "Why Calcium Alone Isn't Enough for Strong Bones",
        desc: "Many people rely solely on calcium for bone health, but research shows that a combination of nutrients is essential for optimal bone density and strength.",
        date: "Jul 5, 2026",
        readTime: "4 min read",
        featured: false,
    },
    {
        id: 8,
        img: "/images/blog2.png",
        tag: "Vitality Store",
        title: "From Fatigue to Vitality - Reclaiming Your Energy Naturally",
        desc: "Chronic fatigue affects millions worldwide. Discover how targeted nutrition, sleep optimization, and herbal supplements can restore your natural energy levels.",
        date: "Jul 2, 2026",
        readTime: "5 min read",
        featured: false,
    },
    {
        id: 9,
        img: "/images/blog3.png",
        tag: "Immunity",
        title: "Seasonal Wellness - Preparing Your Body for Every Change",
        desc: "Each season brings unique health challenges. Learn proactive strategies to keep your immune system strong and your body resilient throughout the year.",
        date: "Jun 28, 2026",
        readTime: "4 min read",
        featured: false,
    },
];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = blogPosts.filter((post) => {
        const matchesCategory = activeCategory === "All" || post.tag === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featured = filtered.filter((p) => p.featured);
    const rest = filtered.filter((p) => !p.featured);

    return (
        <div className="w-full bg-white">
            {/* Hero Banner */}
            <section className="relative w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full h-[30vh]"
                >
                    <Image
                        src="/images/FiveMinuteReads.png"
                        alt="Blog"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                    <div className="absolute inset-0 z-10 mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] flex flex-col justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="font-display mt-2 sm:mt-3 text-[36px] sm:text-[52px] md:text-[64px] leading-[1.1] text-white"
                        >
                            Notes on<br />Living Well
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-3 sm:mt-4 text-[15px] sm:text-[17px] leading-[1.6] text-white max-w-[500px]"
                        >
                            Five-minute reads for a healthier you. Expert insights on wellness, nutrition, and natural health.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* Search & Categories */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-8 md:py-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all ${activeCategory === cat
                                    ? "bg-pink text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 w-full sm:w-[260px] rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none focus:border-pink focus:bg-white focus:ring-2 focus:ring-pink/10"
                        />
                    </div>
                </div>

                {/* Featured Posts */}
                {featured.length > 0 && !searchQuery && activeCategory === "All" && (
                    <div className="mt-8 md:mt-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Main featured */}
                            <AnimatedSection animation="fadeUp">
                                <Link href={`/blog/${featured[0].id}`}>
                                <motion.div
                                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                                    className="group rounded-2xl overflow-hidden shadow-lg h-fit cursor-pointer"
                                >
                                    <div className="relative h-[280px] sm:h-[340px] overflow-hidden">
                                        <Image src={featured[0].img} alt={featured[0].title} width={1920} height={1080} className="w-full h-full transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                                            <span className="rounded-full bg-pink px-4 py-1.5 text-[12px] uppercase tracking-[0.26px] text-white font-semibold">
                                                {featured[0].tag}
                                            </span>
                                            <h2 className="mt-3 text-[22px] sm:text-[26px] font-bold leading-[1.2] text-white">
                                                {featured[0].title}
                                            </h2>
                                            <div className="mt-3 flex items-center gap-4 text-white/70 text-[13px]">
                                                <span>{featured[0].date}</span>
                                                <span className="flex items-center gap-1"><Clock size={13} /> {featured[0].readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                </Link>
                            </AnimatedSection>

                            {/* Side featured */}
                            <div className="flex flex-col gap-6">
                                {featured.slice(1, 3).map((post, idx) => (
                                    <AnimatedSection key={post.id} animation="fadeUp" delay={0.1 * (idx + 1)}>
                                        <Link href={`/blog/${post.id}`}>
                                        <motion.div
                                            whileHover={{ y: -4, transition: { duration: 0.3 } }}
                                            className="group flex flex-col sm:flex-row gap-4 rounded-2xl overflow-hidden shadow-md cursor-pointer bg-white h-full"
                                        >
                                            <div className="relative w-full sm:w-[200px] md:w-[240px] h-[180px] sm:h-auto flex-shrink-0 overflow-hidden">
                                                <Image src={post.img} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                            </div>
                                            <div className="flex flex-col justify-center p-4 sm:p-5">
                                                <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-[11px] uppercase tracking-[0.26px] text-gray-600 font-semibold">
                                                    {post.tag}
                                                </span>
                                                <h3 className="mt-2 text-[17px] sm:text-[19px] font-bold leading-[1.3] text-black">
                                                    {post.title}
                                                </h3>
                                                <div className="mt-2 flex items-center gap-3 text-gray-400 text-[12px]">
                                                    <span>{post.date}</span>
                                                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                                </div>
                                                <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-pink hover:text-pink/80 transition-colors">
                                                    Read More <ArrowRight size={14} />
                                                </span>
                                            </div>
                                        </motion.div>
                                        </Link>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* All Posts Grid */}
                <div className="mt-10 md:mt-14">
                    {(searchQuery || activeCategory !== "All") && (
                        <div className="mb-6">
                            <h2 className="text-[22px] sm:text-[28px] font-bold text-black">
                                {searchQuery ? `Results for "${searchQuery}"` : activeCategory}
                            </h2>
                            <p className="text-sm text-black mt-1">{filtered.length} article{filtered.length !== 1 ? "s" : ""} found</p>
                        </div>
                    )}
                    {!searchQuery && activeCategory === "All" && (
                        <div className="mb-8">
                            <h2 className="font-display text-[28px] sm:text-[36px] text-black">Latest Articles</h2>
                        </div>
                    )}

                    {filtered.length === 0 ? (
                        <div className="py-20 text-center">
                            <p className="text-lg text-gray-400">No articles found matching your criteria.</p>
                            <button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} className="mt-4 text-pink font-semibold hover:underline">
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {(searchQuery || activeCategory !== "All" ? filtered : rest).map((post, idx) => (
                                <AnimatedSection key={post.id} animation="fadeUp" delay={0.05 * idx}>
                                    <Link href={`/blog/${post.id}`}>
                                    <motion.div
                                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                                        className="group flex flex-col h-full cursor-pointer shadow-md rounded-2xl overflow-hidden bg-white"
                                    >
                                        <div className="relative h-[200px] sm:h-[230px] md:h-[255px] overflow-hidden">
                                            <Image src={post.img} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute bottom-4 left-4">
                                                <span className="rounded-full bg-white px-4 sm:px-5 py-2 text-[12px] sm:text-[13px] uppercase tracking-[0.26px] text-black font-semibold">
                                                    {post.tag}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 p-5">
                                            <div className="flex items-center gap-3 text-gray-400 text-[12px] mb-3">
                                                <span>{post.date}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                            </div>
                                            <h3 className="text-[18px] sm:text-[20px] font-bold leading-[1.3] text-black">
                                                {post.title}
                                            </h3>
                                            <p className="mt-2 text-[14px] leading-[1.6] text-black line-clamp-2">
                                                {post.desc}
                                            </p>
                                            <span className="mt-auto pt-4 inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-pink transition-colors hover:text-pink/80">
                                                Read More
                                                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                                                    <path d="M1 6H17M17 6L12 1M17 6L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </div>
                                    </motion.div>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
