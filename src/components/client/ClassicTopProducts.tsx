"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import Link from "next/link";

const products = [
    {
        name: "Acinil-O",
        desc: "Antacid & antiflatulent oral suspension for fast relief from acidity, heartburn and gas.",
        product: "/images/ACINIL_NEO.png",
        gradient: "from-[#f8e8ec] via-[#fce4ec] to-[#f3e5f5]",
    },
    {
        name: "Alfaktiv",
        desc: "Active capsules formulated to support male vitality, energy and overall well-being.",
        product: "/images/ALFAAKTIV.png",
        gradient: "from-[#fafafa] via-[#f5f5f5] to-[#ffebee]",
    },
    {
        name: "Cystnil",
        desc: "D-chiro-inositol and Myo-inositol tablets for hormonal balance and reproductive health support.",
        product: "/images/CYSTNIL SURE.png",
        gradient: "from-[#f3e5f5] via-[#ede7f6] to-[#e8eaf6]",
    },
    {
        name: "Citron-C",
        desc: "Citrus bioflavonoids, rosehip and vitamin C complex for immunity, skin health and antioxidant protection.",
        product: "/images/DIARON-C.png",
        gradient: "from-[#e8eaf6] via-[#e3f2fd] to-[#e0f2f1]",
    },
    {
        name: "Femisan A",
        desc: "100% natural supplement supporting normal physiological functions of female reproductive organs.",
        product: "/images/FEMISAN_A.png",
        gradient: "from-[#fce4ec] via-[#f8bbd0] to-[#f3e5f5]",
    },
    {
        name: "Femisan B",
        desc: "Herbal drops with natural plant extracts for women's health and hormonal support.",
        product: "/images/FEMISAN_B.png",
        gradient: "from-[#e3f2fd] via-[#e1f5fe] to-[#e0f7fa]",
    },
    {
        name: "Femisan Gold",
        desc: "Natural relief for menopause symptoms including hot flashes, sweating and restlessness.",
        product: "/images/FEMISAN_GOLD.png",
        gradient: "from-[#e0f7fa] via-[#e3f2fd] to-[#e8eaf6]",
    },
    {
        name: "Osteomac",
        desc: "Calcium citrate maleate with vitamin D3, magnesium and zinc tablets for bone health support.",
        product: "/images/osteomac-product.png",
        gradient: "from-[#e3f2fd] via-[#e8eaf6] to-[#fff9c4]",
    },
];

export default function ClassicTopProducts() {
    return (
        <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-10 md:py-14">
            {/* Section heading */}
            <AnimatedSection animation="fadeUp">
                <div className="text-center">
                    <p className="text-[12px] sm:text-[14px] font-medium uppercase tracking-[2.1px] text-pink">
                        CLASSIC TOP picks
                    </p>
                    <h2 className="font-display mt-2 text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] text-black">
                        Classic Top{" "}
                        <span className="relative inline-block text-pink">
                            Products
                        </span>
                    </h2>
                </div>
            </AnimatedSection>

            {/* Product cards grid */}
            <StaggerContainer className="mt-10 md:mt-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" staggerDelay={0.1}>
                {products.slice(0, 4).map((product, idx) => (
                    <StaggerItem key={idx} animation="scaleUp">
                        <Link href="/shop/details">
                            <motion.div
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                className={`group relative h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px] xl:h-[480px] overflow-hidden rounded-[16px] sm:rounded-[25px] cursor-pointer bg-gradient-to-br ${product.gradient}`}
                            >
                                {/* Glass shine sweep */}
                                <motion.div
                                    variants={{
                                        rest: { x: "-110%", y: "110%" },
                                        hover: { x: "110%", y: "-110%" },
                                    }}
                                    transition={{ duration: 0.7, ease: [0.22, 0.68, 0.36, 1] }}
                                    className="absolute inset-0 z-20 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.45) 43%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.45) 57%, rgba(255,255,255,0.12) 65%, transparent 80%)",
                                    }}
                                />
                                {/* Secondary trail */}
                                <motion.div
                                    variants={{
                                        rest: { x: "-110%", y: "110%" },
                                        hover: { x: "110%", y: "-110%" },
                                    }}
                                    transition={{ duration: 0.7, ease: [0.22, 0.68, 0.36, 1], delay: 0.12 }}
                                    className="absolute inset-0 z-20 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 42%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.08) 58%, transparent 70%)",
                                    }}
                                />
                                {/* Hover glow */}
                                <motion.div
                                    variants={{
                                        rest: { opacity: 0 },
                                        hover: { opacity: 1 },
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 z-[15] pointer-events-none rounded-[inherit]"
                                    style={{
                                        boxShadow: "inset 0 0 60px rgba(255,255,255,0.15), 0 0 30px rgba(255,255,255,0.08)",
                                    }}
                                />

                                {/* Floating product image */}
                                <motion.div
                                    variants={{
                                        rest: { y: 0 },
                                        hover: { y: -14 },
                                    }}
                                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="absolute inset-x-0 top-4 sm:top-6 bottom-[90px] sm:bottom-[110px] z-10 flex items-center justify-center"
                                >
                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative w-[75%] h-[60%]"
                                    >
                                        <Image
                                            src={product.product}
                                            alt={product.name}
                                            fill
                                            className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]"
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* Ellipse shadow beneath product */}
                                <div className="absolute bottom-[90px] sm:bottom-[110px] left-1/2 -translate-x-1/2 w-[60%] h-[12px] rounded-[50%] bg-black/10 blur-sm z-[5]" />

                                {/* Text content */}
                                <motion.div
                                    variants={{
                                        rest: { y: 0 },
                                        hover: { y: -6 },
                                    }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 z-20"
                                >
                                    <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-semibold leading-[1.2] text-[#08131e]">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 text-[12px] sm:text-[14px] md:text-[16px] text-black line-clamp-2">
                                        {product.desc}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </Link>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </section>
    );
}
