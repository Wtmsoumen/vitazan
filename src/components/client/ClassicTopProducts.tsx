"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

export default function ClassicTopProducts() {
    return (
        <section className="mx-auto max-w-[1600px] px-[140px] py-16">
            {/* Section heading */}
            <AnimatedSection animation="fadeUp">
                <div className="text-center">
                    <p className="text-[14px] font-medium uppercase tracking-[2.1px] text-pink">
                        CLASSIC TOP picks
                    </p>
                    <h2 className="font-display mt-2 text-[52px] text-black">
                        Classic Top{" "}
                        <span className="relative inline-block">
                            Products
                            <span className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-pink opacity-60" />
                        </span>
                    </h2>
                </div>
            </AnimatedSection>

            {/* Product cards grid */}
            <StaggerContainer className="mt-16 grid grid-cols-2 gap-5" staggerDelay={0.15}>
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
                ].map((product) => (
                    <StaggerItem key={product.name} animation="scaleUp">
                        <motion.div
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                            className="group relative h-[760px] overflow-hidden rounded-[25px] cursor-pointer"
                        >
                            {/* Background image — subtle zoom on hover */}
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
                                    className="object-cover"
                                />
                            </motion.div>

                            {/* Gradient overlay — deepens on hover */}
                            <motion.div
                                variants={{
                                    rest: { opacity: 1 },
                                    hover: { opacity: 0.85 },
                                }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"
                            />

                            {/* Text content — slides up slightly on hover */}
                            <motion.div
                                variants={{
                                    rest: { y: 0 },
                                    hover: { y: -8 },
                                }}
                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                className="relative z-10 p-10 pt-12"
                            >
                                <h3 className="text-[40px] font-medium leading-[45px] text-[#08131e]">
                                    {product.name}
                                </h3>
                                <p className="mt-4 max-w-[468px] text-[14px] leading-[21px] text-black">
                                    {product.desc}
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="mt-6 rounded-full bg-dark-teal px-8 py-3 text-[16px] text-white transition-opacity hover:opacity-90"
                                >
                                    Enquiry Now
                                </motion.button>
                            </motion.div>

                            {/* Product image — floats up on hover */}
                            <motion.div
                                variants={{
                                    rest: { y: 0 },
                                    hover: { y: -18 },
                                }}
                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[55%]"
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