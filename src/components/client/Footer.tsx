"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const colVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    }),
};

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-teal mt-16"
        >
            <div className="mx-auto max-w-[1600px] px-[140px] py-16">
                <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-12">

                    {/* Logo & Info */}
                    <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={colVariants}>
                        <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.25 }}>
                            <Image src="/images/logoWhite.png" alt="Vitazan" width={180} height={50} />
                        </motion.div>
                        <p className="mt-4 text-[18px] leading-[22px] text-white">
                            Bone health requires more than just calcium. VITAZAN OSTEOMAC delivers a complete, research-backed solution for maintaining bone density.
                        </p>
                        {/* Social icons — staggered on scroll */}
                        <motion.div
                            className="mt-6 flex"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
                            }}
                        >
                            {[
                                { src: "/images/facebook.png", alt: "Facebook" },
                                { src: "/images/twitter.png", alt: "Twitter" },
                                { src: "/images/instagram.png", alt: "Instagram" },
                                { src: "/images/linkedin.png", alt: "LinkedIn" },
                            ].map((social) => (
                                <motion.div
                                    key={social.alt}
                                    variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }}
                                    transition={{ duration: 0.35 }}
                                    className="mr-4"
                                >
                                    <Link href="#">
                                        <motion.div whileHover={{ scale: 1.18, y: -3 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                                            <Image src={social.src} alt={social.alt} width={1920} height={1080} className="w-10 h-10" />
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Shop */}
                    <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={colVariants}>
                        <h4 className="text-[24px] font-semibold text-white">Shop</h4>
                        <ul className="mt-4 space-y-3">
                            {["All Products", "VITAZAN™ HT-Kof", "VITAZAN™ Senax", "VITAZAN™ Reload", "VITAZAN™ Osteomac"].map((item) => (
                                <motion.li key={item} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                    <a href="#" className="text-[16px] text-white hover:text-white transition-colors font-medium! hover:border-b border-solid border-white">
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company */}
                    <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={colVariants}>
                        <h4 className="text-[24px] font-semibold text-white">Company</h4>
                        <ul className="mt-4 space-y-3">
                            {["Home", "Shop", "About Us", "Our Essence", "Blog", "Contact Us"].map((item) => (
                                <motion.li key={item} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                    <a href="#" className="text-[15px] text-white hover:text-white transition-colors font-medium! hover:border-b border-solid border-white">
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={colVariants}>
                        <h4 className="text-[24px] font-semibold text-white">Contact</h4>
                        <ul className="mt-4 space-y-3">
                            {[
                                "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore - 560016",
                                "health@vitazan.co.uk",
                            ].map((item) => (
                                <motion.li key={item} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                    <a href="#" className="text-[15px] text-white hover:text-white transition-colors font-medium! hover:border-b border-solid border-white">
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
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
                <div className="mx-auto max-w-[1600px] px-[140px] py-4 flex items-center justify-between">
                    <p className="text-center text-[13px] text-white">
                        Copyright &copy; 2026 Vitazan. All rights reserved.
                    </p>
                    <p className="text-center text-[13px] text-white flex items-baseline gap-4">
                        Terms <span className="w-0.5 h-0.5 rounded-full bg-white" /> Privacy Policy <span className="w-0.5 h-0.5 rounded-full bg-white" /> FAQ
                    </p>
                </div>
            </motion.div>
        </motion.footer>
    );
}