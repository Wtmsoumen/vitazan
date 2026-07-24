"use client";

import ClassicTopProducts from "@/components/client/ClassicTopProducts";
import AnimatedSection from "@/components/client/AnimatedSection";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Shop() {
    return (
        <div className="w-full overflow-x-hidden bg-white">
            {/* Hero Banner */}
            <section className="relative mx-auto w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <Image
                        src="/images/banner_shop.png"
                        alt="Vitazan Wellness"
                        width={1920}
                        height={1080}
                        className="w-full h-auto"
                        priority
                    />
                    <div className="absolute inset-0 z-[1] mx-auto max-w-[1600px] px-4 sm:px-20 pointer-events-none h-full">
                        <div className="flex flex-col justify-center h-full gap-2 sm:gap-4 w-[55%] sm:w-1/2">
                            <h1 className="font-display text-[24px] sm:text-[40px] md:text-[52px] lg:text-[67px] leading-[1.1] text-white font-medium">
                                Shop
                            </h1>
                            <p className="text-[10px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[14px] sm:leading-[20px] md:leading-[24px] text-white font-medium w-full sm:w-[70%] lg:w-[50%]">
                                Premium natural products crafted to support a healthier you and a better tomorrow.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* <AnimatedSection animation="fadeUp" > */}
            <ClassicTopProducts />
            {/* </AnimatedSection> */}
        </div>
    );
}
