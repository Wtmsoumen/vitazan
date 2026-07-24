"use client"

import React from 'react'
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection'
import { motion } from "framer-motion";
import Image from 'next/image';


export default function WellnessIsDailyRitual() {
    return (
        <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-12 md:py-20">
            <AnimatedSection animation="fadeUp">
                <div className="text-center">
                    <p className="text-[13px] sm:text-[15px] md:text-[16px] font-bold uppercase tracking-[2.1px] text-pink">
                        CLASSIC TOP picks
                    </p>
                    <h2 className="font-display mt-2 text-[28px] sm:text-[38px] md:text-[50px] lg:text-[60px] text-black">
                        Wellness is a{" "}
                        <span className="relative inline-block text-pink">daily ritual,
                        </span>{" "}
                        not a quick fix.
                    </h2>
                </div>
            </AnimatedSection>

            <StaggerContainer className="mt-10 md:mt-16 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-0" staggerDelay={0.2}>
                {[
                    {
                        title: "30 Day Supply Packs",
                        desc: "Our vitality enriching supplements are designed with an adequate number of servings to allow consumption for up to 30 days.",
                        img: "/images/SupplyPacks.png",
                    },
                    {
                        title: "Premium Quality",
                        desc: "Our products are meticulously formulated with quality ingredients to provide premium supplements for your health and vitality.",
                        img: "/images/PremiumQuality.png",
                    },
                    {
                        title: "International",
                        desc: "We bring you internationally established product to your doorstep with the technical guidance of ZANIQ CARE LIMITED, London, United Kingom",
                        img: "/images/International.png",
                    },
                ].map((item, idx) => (
                    <React.Fragment key={item.title}>
                        <StaggerItem className="flex-1 text-center z-1" animation="fadeUp">
                            <motion.div
                                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            >
                                <div className="mx-auto mb-4 sm:mb-6 relative h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] md:h-[180px] md:w-[180px]">
                                    <Image src={item.img} alt={item.title} fill className="object-contain" />
                                </div>
                                <h3 className="text-[22px] sm:text-[26px] md:text-[30px] font-semibold leading-[28px] sm:leading-[34px] md:leading-[38px] text-black">
                                    {item.title}
                                </h3>
                                <p className="mx-auto mt-2 sm:mt-3 max-w-[400px] text-[15px] sm:text-[17px] md:text-[18px] leading-[22px] sm:leading-[26px] md:leading-[28px] text-black">
                                    {item.desc}
                                </p>
                            </motion.div>
                        </StaggerItem>
                        {idx < 2 && (
                            <div className="hidden md:flex items-center pt-16.5">
                                <div className="relative w-[86px] h-[24px] ">
                                    <motion.div
                                        className="absolute inset-0 flex items-center"
                                        animate={{ x: ["-200%", "200%"] }}
                                        transition={{
                                            duration: 1.6,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    >
                                        <Image src="/images/arrowRight.png" alt="" width={86} height={24} />
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </StaggerContainer>
        </section>
    )
}