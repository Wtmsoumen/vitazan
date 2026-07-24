"use client";

import { Search, ShoppingBasket, UserRound, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "About Us", link: "/about" },
    { name: "Our Essence", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Contact Us", link: "#" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 w-full z-50 bg-white transition-all duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"}`}>
            {/* Top bar */}
            <div className={`bg-teal w-full transition-all duration-300 overflow-hidden ${isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"}`}>
                <div className="mx-auto flex h-8 sm:h-9 max-w-[1600px] items-center justify-between px-4 sm:px-8 md:px-10">
                    <p className="text-[11px] sm:text-[13px] uppercase tracking-[0.65px] text-white">
                        free shipping over ₱199 &nbsp; | &nbsp; 100% Genuine product
                    </p>
                    <div className="hidden sm:flex items-center gap-4 md:gap-6">
                        <a
                            href="#"
                            className="flex items-center gap-2 text-[11px] md:text-[13px] uppercase tracking-[0.65px] text-white transition-opacity hover:opacity-75"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 6C2 3.79086 3.79086 2 6 2H10C12.2091 2 14 3.79086 14 6V14H6C3.79086 14 2 12.2091 2 10V6Z" stroke="white" strokeWidth="1.5" />
                                <path d="M5 7H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M5 10H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Customer Care &nbsp; |
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-2 text-[11px] md:text-[13px] uppercase tracking-[0.65px] text-white transition-opacity hover:opacity-75"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" />
                                <path d="M8 4V8L10.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Track My Order
                        </a>
                    </div>
                </div>
            </div>

            {/* Main nav */}
            <nav className={`px-4 sm:px-8 md:px-10 transition-all duration-300 bg-white w-full ${isScrolled ? "py-2 md:py-2.5" : "py-3 md:py-4"}`}>
                <div className="mx-auto flex max-w-[1600px] items-center justify-between sm:px-8 md:px-10">
                    {/* Logo */}
                    <motion.div className="flex-shrink-0" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                        <Link href="/">
                            <Image src="/images/logo.png" alt="Vitazan" width={238} height={62} className="w-[140px] sm:w-[180px] md:w-[238px] h-auto" priority />
                        </Link>
                    </motion.div>

                    {/* Desktop nav links */}
                    <motion.div
                        className="hidden lg:flex items-center gap-6 xl:gap-14"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
                        }}
                    >
                        {navLinks.map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, y: -12 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
                                }}
                                className="relative group"
                            >
                                <Link href={item.link} className="text-center font-medium text-base xl:text-xl text-black transition-colors hover:text-pink">
                                    {item.name}
                                </Link>
                                <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-pink transition-all duration-300 group-hover:w-full" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Icon buttons + hamburger */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <motion.div
                            className="hidden sm:flex items-center gap-1 sm:gap-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
                            }}
                        >
                            {[
                                {
                                    icon: <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#0284C7] group-hover:text-white transition-all duration-500" strokeWidth={2.2} />,
                                    bg: "bg-[#E0F2FE]",
                                    border: "border border-[#0284C7]",
                                    shadow: "shadow-md shadow-[#0284C7]/20",
                                    hoverBg: "#0284C7",
                                },
                                {
                                    icon: <ShoppingBasket className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5097F] group-hover:text-white transition-all duration-500" strokeWidth={2.2} />,
                                    bg: "bg-[#FCE7F3]",
                                    border: "border border-[#E5097F]",
                                    shadow: "shadow-md shadow-[#E5097F]/20",
                                    hoverBg: "#E5097F",
                                },
                                {
                                    icon: <UserRound className="w-5 h-5 sm:w-6 sm:h-6 text-[#7C3AED] group-hover:text-white transition-all duration-500" strokeWidth={2.2} />,
                                    bg: "bg-[#EDE9FE]",
                                    border: "border border-[#7C3AED]",
                                    shadow: "shadow-md shadow-[#7C3AED]/20",
                                    hoverBg: "#7C3AED",
                                },
                            ].map((btn, i) => (
                                <motion.button
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.7 },
                                        visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
                                    }}
                                    whileHover={{ scale: 1.12, backgroundColor: btn.hoverBg }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`relative flex w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 items-center justify-center rounded-full group ${btn.bg} ${btn.border} ${btn.shadow} transition-all`}
                                >
                                    {btn.icon}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Mobile hamburger */}
                        <button
                            className="lg:hidden flex w-10 h-10 items-center justify-center rounded-full bg-[#F8FAFB]"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5 text-[#00485D]" /> : <Menu className="w-5 h-5 text-[#00485D]" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
                    >
                        <div className="px-4 sm:px-8 py-4 space-y-1">
                            {navLinks.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                >
                                    <Link
                                        href={item.link}
                                        className="block py-3 px-3 text-[17px] font-medium text-black hover:text-pink hover:bg-pink/5 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            {/* Mobile-only icons row */}
                            <div className="sm:hidden flex items-center gap-3 pt-3 px-3 border-t border-gray-100 mt-2">
                                {[
                                    { icon: <Search className="w-5 h-5 text-[#0284C7]" />, label: "Search", bg: "bg-[#F0F9FF]" },
                                    { icon: <ShoppingBasket className="w-5 h-5 text-[#E5097F]" />, label: "Cart", bg: "bg-[#FDF2F8]" },
                                    { icon: <UserRound className="w-5 h-5 text-[#7C3AED]" />, label: "Account", bg: "bg-[#F5F3FF]" },
                                ].map((btn, i) => (
                                    <button key={i} className={`flex items-center gap-2 py-2 px-3 rounded-lg ${btn.bg} transition-colors`}>
                                        {btn.icon}
                                        <span className="text-[14px] font-medium text-black">{btn.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
