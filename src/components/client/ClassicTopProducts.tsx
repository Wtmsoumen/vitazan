"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

export default function ClassicTopProducts() {
    return (
        <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-10 md:py-16">
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
            <StaggerContainer className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5" staggerDelay={0.15}>
                {[
                    {
                        name: "VITAZAN™ SENAX",
                        desc: "VITAZAN™ SENAX is a natural laxative supplement designed to promote healthy digestion and relieve occasional constipation.",
                        bg: "/images/senax-bg.jpg",
                        product: "/images/senax-product.png",
                    },
                    {
                        name: "VITAZAN™ HT-KOF",
                        desc: "VITAZAN™ HT-KOF is a natural laxative supplement designed to promote healthy digestion and relieve occasional constipation.",
                        bg: "/images/htkof-bg.jpg",
                        product: "/images/htkof-product.png",
                    },
                    {
                        name: "VITAZAN™ OSTEOMAC",
                        desc: "VITAZAN™ OSTEOMAC is a natural laxative supplement designed to promote healthy digestion and relieve occasional constipation.",
                        bg: "/images/osteomac-bg.jpg",
                        product: "/images/osteomac-product.png",
                    },
                    {
                        name: "VITAZAN™ RELOAD",
                        desc: "VITAZAN™ RELOAD is a natural laxative supplement designed to promote healthy digestion and relieve occasional constipation.",
                        bg: "/images/reload-bg.jpg",
                        product: "/images/reload-product.png",
                    },
                ].map((product, idx) => (
                    <StaggerItem key={idx} animation="scaleUp">
                        <motion.div
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                            className="group relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[760px] overflow-hidden rounded-[16px] sm:rounded-[25px] cursor-pointer"
                        >
                            <motion.div
                                variants={{
                                    rest: { scale: 1 },
                                    hover: { scale: 1.04 },
                                }}
                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={product.bg}
                                    alt=""
                                    fill
                                    className={`object-cover ${idx === 2 ? "scale-x-[-1]" : ""}`}
                                />
                            </motion.div>

                            <motion.div
                                variants={{
                                    rest: { opacity: 1 },
                                    hover: { opacity: 0.85 },
                                }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"
                            />

                            {/* Glass shine sweep — primary */}
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
                            {/* Glass shine sweep — secondary trail */}
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
                            {/* Hover glow overlay */}
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

                            <motion.div
                                variants={{
                                    rest: { y: 0 },
                                    hover: { y: -8 },
                                }}
                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                className="relative z-10 p-5 sm:p-7 md:p-10 pt-6 sm:pt-8 md:pt-12"
                            >
                                <h3 className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] font-semibold leading-[1.15] text-[#08131e]">
                                    {product.name}
                                </h3>
                                <p className="mt-2 sm:mt-4 max-w-[468px] text-[12px] sm:text-[13px] md:text-[14px] leading-[18px] sm:leading-[21px] text-black">
                                    {product.desc}
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="mt-4 sm:mt-6 rounded-full bg-dark-teal hover:bg-pink px-6 sm:px-8 py-2.5 sm:py-3 text-[13px] sm:text-[16px] text-white transition-opacity hover:opacity-90"
                                >
                                    Enquiry Now
                                </motion.button>
                            </motion.div>

                            <motion.div
                                variants={{
                                    rest: { y: 0 },
                                    hover: { y: -18 },
                                }}
                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                className={`absolute ${idx === 0 ? 'bottom-15 left-1/2' : idx === 1 ? 'bottom-25.5 left-[55%]' : idx === 2 ? 'bottom-8 left-[52%]' : 'bottom-25 left-1/2'} -translate-x-1/2 w-[80%] h-[50%] sm:h-[55%]`}
                            >
                                <Image
                                    src={product.product}
                                    alt={product.name}
                                    fill
                                    className="object-contain object-bottom drop-shadow-2xl"
                                />
                            </motion.div>
                        </motion.div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </section>
    );
}
