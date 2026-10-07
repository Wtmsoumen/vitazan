"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, number } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchFooter, type FooterData } from "@/utils/public";

const colVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    }),
};

export default function Footer() {
    const [footerData, setFooterData] = useState<any>([]);
    const [socialIcon, setSocialIcon] = useState("");

    const categoryLinks: Record<string, string> = {
        "Bone, Joint & Muscle Care": "Bone, Joint & Muscle Care",
        "Gut Health": "Gut Health",
        "Vitamins & Nutrition": "Vitamins & Nutrition",
        "Sexual Health": "Sexual Health",
        "Hormonal Balance": "Hormonal Balance",
        "Fertility": "Fertility",
        "Iron Supplement": "Iron Supplement",
        "Menstruation": "Menstruation",
    };

    useEffect(() => {
        fetchFooter().then((data: any) => { if (data) setFooterData(data?.site_footer1_menu); });
    }, []);


    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-teal mt-8"
        >
            <div className="px-4 sm:px-8 md:px-10 transition-all duration-300 w-full py-3 md:py-4">
                <div className="mx-auto flex max-w-[1600px] items-center justify-between sm:px-8 md:px-10 px-4 py-8 sm:py-12 md:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">

                        {/* Logo & Info */}
                        <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={colVariants} className="sm:col-span-2 lg:col-span-1">
                            <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.25 }}>
                                <Image src="/images/logo.png" alt="Vitazan" width={1920} height={1080} className="brightness-0 invert w-[240px] h-[60px]" />
                            </motion.div>
                            {/* <p className="mt-4 text-[18px] leading-[22px] text-white">
                            Thoughtfully formulated wellness products, made to support your everyday vitality.
                        </p> */}
                            {/* Social icons — staggered on scroll */}
                            <motion.div
                                className="mt-10 flex"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
                                }}
                            >
                                {[
                                    { src: "/images/facebook.png", srcp: "/images/facebookPink.png", alt: "Facebook" },
                                    { src: "/images/twitter.png", srcp: "/images/twitterPink.png", alt: "Twitter" },
                                    { src: "/images/instagram.png", srcp: "/images/instagramPink.png", alt: "Instagram" },
                                    { src: "/images/linkedin.png", srcp: "/images/linkedinPink.png", alt: "LinkedIn" },
                                ].map((social) => (
                                    <motion.div
                                        key={social.alt}
                                        variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }}
                                        transition={{ duration: 0.35 }}
                                        className="mr-4"
                                        onMouseEnter={() => setSocialIcon(social.alt)}
                                        onMouseLeave={() => setSocialIcon("")}
                                    >
                                        <span aria-label={`${social.alt} profile URL not configured`}>
                                            <motion.div whileHover={{ scale: 1.18, y: -3 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                                                <Image src={social.alt === socialIcon ? social.srcp : social.src} alt={social.alt} width={1920} height={1080} className={`w-10 h-10 rounded ${social.alt === socialIcon ? "bg-black/50" : ""}`} />
                                            </motion.div>
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Shop */}
                        <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={colVariants}>
                            <h4 className="text-[24px] font-semibold text-white">Shop</h4>
                            <ul className="mt-4 space-y-3">
                                {[
                                    { name: "All Products", link: "/shop" },
                                    { name: "Bone, Joint & Muscle Care", icon: "/images/Category Icons/Bone, joint & muscle care 2.svg", bg: "#f3e4fd" },
                                    { name: "Cold & Cough", icon: "/images/Category Icons/Cold and Cough remedy.svg", bg: "#fff1e0" },
                                    { name: "Gut Health", icon: "/images/Category Icons/Gut Health.svg", bg: "#e2fbff" },
                                    { name: "Vitamins & Nutrition", icon: "/images/Category Icons/Vit & Nutrition 1.svg", bg: "#eaecff" },
                                    { name: "Sexual Health", icon: "/images/Category Icons/Sexual health.svg", bg: "#fce4ec" },
                                    { name: "Hormonal Balance", icon: "/images/Category Icons/Hormonal balance ref 1.svg", bg: "#e8f5e9" },
                                    { name: "Fertility", icon: "/images/Category Icons/fertility.svg", bg: "#fff3e0" },
                                    { name: "Iron Supplement", icon: "/images/Category Icons/Iron supplement.svg", bg: "#ffebee" },
                                    { name: "Menstruation", icon: "/images/Category Icons/menstruation.svg", bg: "#fce4ec" },
                                    { name: "Urinary Health", icon: "/images/Category Icons/Urology care.svg", bg: "#e0f7fa" },].map((item, idx) => (
                                        <motion.li key={idx} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                            <Link href={categoryLinks[item.name] ? `/shop?category=${encodeURIComponent(categoryLinks[item.name])}` : "/shop"} className="text-[16px] text-white hover:text-pink-light transition-colors font-medium! hover:border-b border-solid border-pink-light">
                                                {item.name}
                                            </Link>
                                        </motion.li>
                                    ))}
                            </ul>
                        </motion.div>
                        <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={colVariants}>
                            <h4 className="text-[24px] font-semibold text-white">Shop</h4>
                            <ul className="mt-4 space-y-3">
                                {[{ name: "Female Vitality", icon: "/images/Category Icons/Female Vitality symbol.svg", bg: "#fce4ec" },
                                { name: "Male Vitality", icon: "/images/Category Icons/Male Vitality symbol.png", bg: "#e3f2fd" },
                                { name: "Mental Wellness", icon: "/images/Category Icons/Mental Wellness 1.svg", bg: "#e8eaf6" },
                                { name: "General Wellness", icon: "/images/Category Icons/General Wellness Symbol.svg", bg: "#e0f2f1" },
                                { name: "Natal Care", icon: "/images/Category Icons/Natal Care.svg", bg: "#fff9c4" },
                                { name: "PCOS / PCOD", icon: "/images/Category Icons/PCOS_PCOD.svg", bg: "#f3e5f5" },
                                { name: "Nutrition Plus", icon: "/images/Category Icons/Vit & Nutrition 2.svg", bg: "#e8eaf6" },
                                { name: "Immunity Boost", icon: "/images/Category Icons/Vit & Nutrition 3.svg", bg: "#e0f7fa" },
                                { name: "Mind & Focus", icon: "/images/Category Icons/Mental Wellness 2.svg", bg: "#ede7f6" },
                                { name: "Hormonal Care", icon: "/images/Category Icons/Hormonal balance ref 2.svg", bg: "#e8f5e9" },].map((item, idx) => (
                                    <motion.li key={idx} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                        <Link href={categoryLinks[item.name] ? `/shop?category=${encodeURIComponent(categoryLinks[item.name])}` : "/shop"} className="text-[16px] text-white hover:text-pink-light transition-colors font-medium! hover:border-b border-solid border-pink-light">
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Company */}
                        <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={colVariants}>
                            <h4 className="text-[24px] font-semibold text-white">Site Map</h4>
                            <ul className="mt-4 space-y-3">
                                {footerData?.length ? footerData.map((item: any, idx: number) => (
                                    <motion.li key={idx} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                        <Link href={item?.slug === "home" ? "/" : `/${item?.slug}`} className="text-[15px] text-white hover:text-pink-light transition-colors font-medium! hover:border-b border-solid border-pink-light">
                                            {item?.page_name}
                                        </Link>
                                    </motion.li>
                                )) : [
                                    { name: "About Us", href: "/about" },
                                    { name: "Our Essence", href: "/our-essence" },
                                    { name: "Blog", href: "/blog" },
                                    { name: "Contact Us", href: "/contact-us" },
                                ].map((item) => (
                                    <motion.li key={item.href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                        <Link href={item.href} className="text-[15px] text-white hover:text-pink-light transition-colors font-medium! hover:border-b border-solid border-pink-light">
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact */}
                        <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={colVariants}>
                            <h4 className="text-[24px] font-semibold text-white">Newsletter&nbsp;Subscription</h4>
                            <ul className="mt-4 space-y-3">
                                {[
                                    { label: "Manila, Philippines", href: "/contact-us" },
                                    { label: "health@vitazan.co.uk", href: "mailto:health@vitazan.co.uk" },
                                ].map((item) => (
                                    <motion.li key={item.href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                        <a href={item.href} className="text-[15px] text-white hover:text-pink-light transition-colors font-medium! hover:border-b border-solid border-pink-light">
                                            {item.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="border-t border-white"
            >
                <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-center text-[12px] sm:text-[13px] text-white">
                        Copyright &copy; 2026 Vitazan. All rights reserved.
                    </p>
                    <nav aria-label="Legal" className="flex items-baseline gap-4 text-center text-[12px] sm:text-[13px] text-white">
                        <Link className="hover:text-pink-light" href="/terms">Terms</Link>
                        <span className="w-0.5 h-0.5 rounded-full bg-white" />
                        <Link className="hover:text-pink-light" href="/privacy-policy">Privacy Policy</Link>
                        <span className="w-0.5 h-0.5 rounded-full bg-white" />
                        <Link className="hover:text-pink-light" href="/faq">FAQ</Link>
                    </nav>
                </div>
            </motion.div>
        </motion.footer>
    );
}
