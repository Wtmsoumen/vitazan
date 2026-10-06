"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/client/AnimatedSection";
import { ArrowRight, Leaf, FlaskConical, ShieldCheck, Info } from "lucide-react";
import WellnessIsDailyRitual from "@/components/client/WellnessIsDailyRitual";

const howItWorksSteps = [
    {
        step: "01",
        title: "Nature-Powered",
        desc: "Using the finest, naturally sourced ingredients to promote vitality.",
        icon: Leaf,
        bgClass: "bg-[#e8f5e9] text-[#2e7d32]",
    },
    {
        step: "02",
        title: "Scientifically Formulated",
        desc: "Designed with cutting-edge research to ensure effectiveness and safety.",
        icon: FlaskConical,
        bgClass: "bg-[#e3f2fd] text-[#1565c0]",
    },
    {
        step: "03",
        title: "Commitment to Quality",
        desc: "Our products undergo stringent quality controls, delivering on our promise of purity and reliability.",
        icon: ShieldCheck,
        bgClass: "bg-[#fce4ec] text-[#c2185b]",
    },
];


const whyCards = [
    { icon: "/images/bodySafeProducts.svg", title: "Body-safe products", desc: "Our portfolio contains products which are non-toxic, non-irritating, and free from harmful chemicals." },
    { icon: "/images/NONGMO.svg", title: "NON-GMO", desc: "Our portfolio contains products which are completely GMO free, safe, and effective." },
    { icon: "/images/vegan.svg", title: "Thoughtfully Formulated", desc: "Each product is thoughtfully developed with carefully selected ingredients and a focus on quality and wellness." },
    { icon: "/images/steroidFree.svg", title: "Steroid Free", desc: "Our supplements have been carefully formulated without the inclusion of steroids." },
    { icon: "/images/WHO.svg", title: "WHO", desc: "All our products are under the compliances set by the World Health Organisation." },
    { icon: "/images/glutenFree.svg", title: "Gluten-free", desc: "Some of our carefully selected offerings are completely free from the common gluten protein." },
];

const wellnessItems = [
    {
        image: "/images/SupplyPacks.png",
        title: "30 Day Supply Packs",
        desc: "Our vitality enriching supplements are designed with an adequate number of servings to allow consumption for up to 30 days.",
    },
    {
        image: "/images/PremiumQuality.png",
        title: "Premium Quality",
        desc: "Our products are meticulously formulated with quality ingredients to provide premium supplements for your health and vitality.",
    },
    {
        image: "/images/International.png",
        title: "International",
        desc: "We bring you internationally established product to your doorstep with the technical guidance of ZANIQ CARE LIMITED, London, United Kingdom.",
    },
];

export default function AboutPage() {
    return (
        <div className="w-full bg-white">
            {/* Hero Banner */}
            <section className="relative mx-auto w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full h-[30vh] flex"
                >
                    <Image
                        src="/images/aboutBanner.png"
                        alt="About Us"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover"
                        priority
                    />
                    <div className="absolute inset-0 z-[1] mx-auto max-w-[1600px] px-4 sm:px-20 pointer-events-none h-full flex items-center justify-between">
                        <div className="flex flex-col justify-center h-full gap-2 sm:gap-4 w-[55%] sm:w-1/2">
                            <h1 className="font-display text-[24px] sm:text-[40px] md:text-[52px] lg:text-[67px] leading-[1.1] text-black font-medium">
                                About Us
                            </h1>
                        </div>
                        <div className="mr-75 lg:block hidden">
                            <Image
                                src="/images/logo.png"
                                alt="About Us"
                                width={1920}
                                height={1080}
                                className="w-[140px] sm:w-[180px] md:w-[238px] h-auto"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Welcome to Your Vitality Store */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-10">
                <AnimatedSection animation="fadeUp">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-end">
                        <div className="w-full lg:w-1/2">
                            <h2 className="font-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-dark leading-tight">
                                Welcome to<br />Your Vitality Store
                            </h2>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <p className="text-[14px] sm:text-[16px] leading-[1.8] text-black">
                                In today&apos;s fast-paced world, changing lifestyles, dietary habits, and everyday demands can make it challenging to maintain a balanced intake of essential nutrients. At VITAZAN, your vitality partner, we believe that informed nutritional choices and quality supplementation can play an important role in supporting overall health and well-being.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeUp">
                    <div className="mt-8 md:mt-12 w-full flex flex-col lg:flex-row justify-between gap-4">
                        <div className="flex flex-col justify-between gap-4 lg:gap-0">
                            <Image src="/images/wvs1.png" alt="Welcome" width={1920} height={1080} className="w-full h-[200px] sm:h-[300px] lg:h-[390px] object-cover rounded-lg" />
                            <div className="text-[14px] sm:text-[16px] mt-2 text-black flex flex-col gap-2">
                                <p>Backed by a management team with over three decades of experience in the pharmaceutical industry, VITAZAN brings together knowledge, quality, and innovation to create a thoughtfully selected range of nutraceutical and wellness products. Our portfolio is sourced and developed with a focus on quality ingredients, purposeful formulations, and contemporary nutritional needs, bringing carefully considered wellness solutions closer to consumers.</p>

                                <p>Each product is developed with attention to ingredient quality, formulation science, safety, and consistency. Our formulations draw upon scientific research and the expertise of qualified professionals, while our quality-focused approach helps ensure that every product meets the standards we strive to uphold.</p>

                                <p>From everyday nutritional support to targeted wellness solutions, VITAZAN is committed to making accessible, thoughtfully formulated, and research-informed nutraceutical products a part of modern lifestyles.</p>

                                <p>Our products are thoughtfully packaged in convenient monthly formats, making daily supplementation simple and consistent. Along with a commitment to quality, innovation, and wellness, VITAZAN continues its journey to help individuals make better-informed choices for their everyday well-being.</p>
                            </div>
                        </div>
                        <Image src="/images/wvs2.png" alt="Welcome" width={1920} height={1080} className="w-full lg:w-auto h-[300px] sm:h-[400px] lg:h-[698px] object-cover rounded-lg" />
                    </div>
                </AnimatedSection>
            </section>

            {/* Wellness is a daily ritual */}
            <WellnessIsDailyRitual />

            {/* How It Works */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-10 md:py-14">
                <AnimatedSection animation="fadeUp">
                    <div className="text-center max-w-[700px] mx-auto">
                        <h2 className="font-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-dark leading-tight">
                            How It Works
                        </h2>
                        <p className="mt-3 text-[14px] sm:text-[16px] md:text-[18px] text-black font-medium">
                            The steps for your wellness to be unleashed
                        </p>
                    </div>
                </AnimatedSection>

                <StaggerContainer className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
                    {howItWorksSteps.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                            <StaggerItem key={idx} animation="fadeUp" className="h-full">
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative h-full bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bgClass} shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                                                <IconComponent className="w-7 h-7" />
                                            </div>
                                            <span className="font-display text-3xl font-bold text-gray-200 group-hover:text-[#E5097F]/40 transition-colors">
                                                {item.step}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-[18px] sm:text-[22px] font-semibold text-dark mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-[14px] sm:text-[15px] leading-[1.8] text-black">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </section>

            {/* Why VITAZAN? */}
            <section className="bg-[#EAFFAD]">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-10">
                    <AnimatedSection animation="fadeUp">
                        <h2 className="font-display text-center text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-dark">
                            Why VITAZAN?
                        </h2>
                        <p className="mt-3 text-center text-[13px] sm:text-[15px] text-black italic max-w-[600px] mx-auto">
                            Scientifically backed, globally sourced, and thoughtfully curated wellness solutions for a healthier you.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" className="relative">
                        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {whyCards.map((card, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 transition-shadow hover:shadow-md group"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#eaffadbe] inset-shadow-sm shadow-sm group-hover:scale-105 transition-all duration-200">
                                        <Image src={card.icon} alt={card.title} width={30} height={30} className="w-7 h-7" />
                                    </div>
                                    <h3 className="mt-4 text-[16px] sm:text-[18px] font-display font-semibold text-dark">
                                        {card.title}
                                    </h3>
                                    <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.7] text-black">
                                        {card.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <hr className="my-16" />

                        {/* Our Origin */}
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                            <div className="w-full lg:w-1/2">
                                <Image
                                    src="/images/ourOrigin.png"
                                    alt="Our Origin"
                                    width={1920}
                                    height={1080}
                                    className="w-full h-auto lg:mb-[-15rem]"
                                />
                            </div>
                            <div className="w-full lg:w-1/2">
                                <h2 className="font-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-dark leading-tight">
                                    Our Origin
                                </h2>
                                <div className="mt-4 md:mt-6 space-y-4">
                                    <p className="text-[14px] sm:text-[15px] leading-[1.8] text-black">
                                        VITAZAN, a wellness initiative, is dedicated to providing high-quality nutraceutical products crafted to support and protect vitality. The name “VITAZAN” combines “vitality” with “Zan,” a term meaning “defending man,” highlighting our mission to enhance and defend your body&apos;s natural resilience. With VITAZAN, we bring you nature-inspired wellness solutions that are scientifically strengthened to nurture, heal, and fortify your health.
                                    </p>
                                    <p className="text-[14px] sm:text-[15px] leading-[1.8] text-black">
                                        Our carefully formulated products harness the healing power of nature, ensuring each supplement supports the body&apos;s vitality and overall well-being. From immune support to cognitive health, VITAZAN offers reliable solutions rooted in natural ingredients, optimised by science for superior results.
                                    </p>
                                    {/* <p className="text-[14px] sm:text-[15px] leading-[1.8] text-black">
                                        VITAZAN is the division of ZANIQ CARE LIMITED offering premium
                                        nutraceutical and OTC healthcare solutions.
                                    </p> */}
                                </div>
                                <Image
                                    src="/images/signArrow.png"
                                    alt="signArrow"
                                    width={1080}
                                    height={1920}
                                    className="w-[100px] lg:w-[146px] h-auto hidden sm:block lg:absolute lg:bottom-[-14rem] lg:right-[18rem] mt-4 lg:mt-0"
                                />
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>


            {/* Our Mission & Vision */}
            <section className="bg-[#ffffff]">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-10 mt-8 lg:mt-50">

                    <AnimatedSection animation="fadeUp">
                        <div className="mt-8 md:mt-12 flex flex-col lg:flex-row gap-6 lg:gap-12">
                            <div className="w-full lg:w-1/2 flex flex-col gap-8 justify-evenly">
                                <h2 className="font-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-dark leading-tight">
                                    Our Mission &amp;<br />Vision
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
                                    {[{ icon: "/images/shakeHand.svg", name: "Our Promise", description: "With VITAZAN, we are committed to being a trusted partner in your wellness journey, helping you unlock a lifestyle of energy, balance, and holistic health. Our products not only enhance vitality but also provide the assurance of quality you can depend on." },
                                    { icon: "/images/pinPoient.svg", name: "What we stand for?", description: "VITAZAN vision is to become a prominent figure in the wellness industry, recognised for our commitment to quality, innovation, and the power of nature. We aspire to create a world where natural wellness solutions are accessible to all, empowering people to lead healthier, more vibrant lives." },
                                    ]?.map((itm, idx) =>
                                        <div key={idx} className="border border-solid border-[#DBD8D8] rounded-xl p-4 flex flex-col items-start gap-6 h-[-webkit-fill-available] w-1/2">
                                            <div className="bg-[#E5097F]/10 w-[58px] h-[58px] rounded-full flex items-center justify-center">
                                                <Image src={itm?.icon} alt={itm?.name} width={1920} height={1080} className="w-[36px] h-[36px]" />
                                            </div>
                                            <h3 className="text-[18px] sm:text-[22px] font-display font-semibold text-dark">
                                                {itm?.name}
                                            </h3>
                                            <p className="text-[14px] sm:text-[15px] leading-[1.8] text-black">
                                                {itm?.description}
                                            </p>
                                        </div>)}
                                </div>
                            </div>
                            <Image src={"/images/omv.png"} alt="omv" width={1920} height={1080} className="w-full lg:w-1/2 h-auto rounded-lg" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 mt-8">
                            {[{ icon: "/images/shakeHand.svg", name: "What drives us", description: "VITAZAN mission is to deliver premium wellness offerings that blend ancient wisdom with modern science. By meticulously sourcing and formulating natural ingredients, we aim to provide solutions that boost the immune system, enhance cognitive function, and optimise daily wellness routines. Our commitment to quality and sustainability ensures that every product we offer supports the holistic well-being of our customers." },
                            ]?.map((itm, idx) =>
                                <div key={idx} className="border border-solid border-[#DBD8D8] rounded-xl p-4 flex flex-col items-start gap-6 h-fit">
                                    <div className="bg-[#E5097F]/10 w-[58px] h-[58px] rounded-full flex items-center justify-center">
                                        <Info strokeWidth={1} className="w-[36px] h-[36px] text-[#e5267f]" />
                                    </div>
                                    <h3 className="text-[18px] sm:text-[22px] font-display font-semibold text-dark">
                                        {itm?.name}
                                    </h3>
                                    <p className="text-[14px] sm:text-[15px] leading-[1.8] text-black">
                                        {itm?.description}
                                    </p>
                                </div>)}
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
