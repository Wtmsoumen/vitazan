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
                </motion.div>
            </section>

            {/* <AnimatedSection animation="fadeUp" > */}
            <ClassicTopProducts />
            {/* </AnimatedSection> */}
        </div>
    );
}
