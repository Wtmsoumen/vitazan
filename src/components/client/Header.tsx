"use client";

import { Search, ShoppingBasket, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
    return (
        <>
            <div className="h-32.5" />
            {/* Slide down on mount */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed w-full overflow-x-hidden bg-white z-20 shadow-sm"
            >
                {/* top header */}
                <div className="bg-teal w-full">
                    <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between px-10">
                        <p className="text-[13px] uppercase tracking-[0.65px] text-white">
                            free shipping over ₱199 &nbsp; | &nbsp; 100% Genuine product
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="flex items-center gap-2 text-[13px] uppercase tracking-[0.65px] text-white transition-opacity hover:opacity-75"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 6C2 3.79086 3.79086 2 6 2H10C12.2091 2 14 3.79086 14 6V14H6C3.79086 14 2 12.2091 2 10V6Z"
                                        stroke="white"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M5 7H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M5 10H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Customer Care &nbsp; |
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 text-[13px] uppercase tracking-[0.65px] text-white transition-opacity hover:opacity-75"
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

                {/* main nav */}
                <nav className="px-10 py-4 z-10 bg-white w-full">
                    <div className="mx-auto flex items-center justify-between max-w-[1600px]">
                        {/* Logo — subtle scale on hover */}
                        <motion.div
                            className="flex-shrink-0"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.25 }}
                        >
                            <Image src="/images/logo.png" alt="Vitazan" width={238} height={62} priority />
                        </motion.div>

                        {/* Nav links — staggered entrance */}
                        <motion.div
                            className="flex items-center gap-10"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
                            }}
                        >
                            {[
                                { name: "Home", link: "/" },
                                { name: "Shop", link: "/shop" },
                                { name: "About Us", link: "#" },
                                { name: "Our Essence", link: "#" },
                                { name: "Blog", link: "#" },
                                { name: "Contact Us", link: "#" },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: -12 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
                                    }}
                                    className="relative group"
                                >
                                    <Link
                                        href={item.link}
                                        className="text-center text-lg text-black transition-colors hover:text-pink"
                                    >
                                        {item.name}
                                    </Link>
                                    {/* Animated underline on hover */}
                                    <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-pink transition-all duration-300 group-hover:w-full" />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Icon buttons — staggered entrance + scale on hover */}
                        <motion.div
                            className="flex items-center gap-2"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
                            }}
                        >
                            {[
                                { icon: <Search className="w-5.5 h-5.5 text-[#00485D]" /> },
                                { icon: <ShoppingBasket className="w-5.5 h-5.5 text-[#00485D]" /> },
                                { icon: <UserRound className="w-5.5 h-5.5 text-[#00485D]" /> },
                            ].map((btn, i) => (
                                <motion.button
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.7 },
                                        visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
                                    }}
                                    whileHover={{ scale: 1.12, backgroundColor: "#f0f7f9" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative flex w-13 h-13 items-center justify-center rounded-full bg-[#F8FAFB] border border-solid border-[#00485D08]"
                                >
                                    {btn.icon}
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>
                </nav>
            </motion.div>
        </>
    );
}