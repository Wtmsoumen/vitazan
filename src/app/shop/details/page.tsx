"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/client/AnimatedSection";
import Carousel from "@/components/client/Carousel";

const servingInfo = [
    {
        label: "Serving Size",
        value: "Adults: 10ml (2 tsp); Children (4-14 Yrs): 5ml (1 tsp)",
    },
    {
        label: "Servings Per Container",
        value: "10 Servings (100ml pack) and 20 servings(200ml pack)",
    },
];

const trustBadges = [
    { image: "/images/FreeShipping.svg", title: "Free Shipping", desc: "Over ₱199.00 USD" },
    { image: "/images/30daysGuarantee.svg", title: "Secure Payments", desc: "With credit and debit card" },
    { image: "/images/SecurePayments.svg", title: "30-Day Guarantee", desc: "No question asked" },
    { image: "/images/SustainableMaterials.svg", title: "Sustainable Materials", desc: "100% eco-friendly" },
];

const ingredients = [
    { name: "Turmeric", image: "/images/Turmericsd.png" },
    { name: "Holy Basil", image: "/images/HolyBasilsd.png" },
    { name: "Malabar Nut", image: "/images/MalabarNutsd.png" },
    { name: "Long Pepper", image: "/images/LongPeppersd.png" },
    { name: "Ginger", image: "/images/Ginger.png" },
    { name: "Turmeric", image: "/images/Turmericsd.png" },
    { name: "Holy Basil", image: "/images/HolyBasilsd.png" },
    { name: "Malabar Nut", image: "/images/MalabarNutsd.png" },
    { name: "Long Pepper", image: "/images/LongPeppersd.png" },
    { name: "Ginger", image: "/images/Ginger.png" },
];

const faqs = [
    {
        q: "What makes VITAZAN™ HT-KOF different from regular cough syrups?",
        a: "Unlike chemical syrups, HT-KOF is sugar-free, non-drowsy, and made with 10 Ayurvedic herbs for safe, natural relief.",
    },
    { q: "Can diabetics use HT-KOF?", a: "Yes, HT-KOF is sugar-free and safe for diabetic patients." },
    { q: "Is HT-KOF suitable for children?", a: "Yes, HT-KOF is suitable for children aged 4 years and above with appropriate dosage." },
    { q: "Does it help with both dry and wet cough?", a: "Yes, HT-KOF is effective for both dry and productive (wet) cough." },
    { q: "Will it make me feel drowsy?", a: "No, HT-KOF is a non-drowsy formula made from natural Ayurvedic ingredients." },
    { q: "Can I take it along with other medicines?", a: "HT-KOF is generally safe, but we recommend consulting your healthcare provider before combining." },
    { q: "How quickly does HT-KOF work?", a: "Most users experience relief within 2-3 days of regular use." },
    { q: "Can elderly people take this syrup?", a: "Yes, HT-KOF is safe for elderly adults. Follow the recommended adult dosage." },
    { q: "Is it safe for long-term use?", a: "Yes, being 100% Ayurvedic with no chemicals, it is safe for extended use as directed." },
    { q: "Can it be used during seasonal flu?", a: "Absolutely. HT-KOF helps soothe throat irritation and supports respiratory comfort during seasonal flu." },
];

const bulletPoints = [
    "Provides Fast Relief from Cough And Throat Irritation",
    "Works Over Phlegm And Clears Breathing",
    "Strengthens Natural Respiratory Defences",
    "Sugar-Free And Safe for All Age Groups",
    "No Drowsiness Or Chemical Side Effects",
];

export default function ShopProductDetails() {
    const [openFaq, setOpenFaq] = useState<number>(0);

    return (
        <div className="w-full overflow-x-hidden bg-white">
            {/* Hero Banner */}
            <section className="relative mx-auto w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full"
                >
                    <Image
                        src="/images/shopDetailsBanner.png"
                        alt="VITAZAN HT-KOF"
                        width={1920}
                        height={1080}
                        className="w-full h-auto"
                        priority
                    />
                    <div className="absolute inset-0 z-[1] mx-auto max-w-[1600px] px-4 sm:px-10 pointer-events-none">
                        <div className="flex flex-col justify-center h-[60%] gap-2 sm:gap-4 w-[55%] sm:w-1/2">
                            <h1 className="font-display text-[18px] sm:text-[30px] md:text-[52px] lg:text-[67px] leading-[1.1] text-black mt-1 font-medium">VITAZAN™<br />HT-KOF</h1>
                            <p className="text-[9px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[14px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] text-black font-medium w-full sm:w-[70%] lg:w-[40%]">
                                Premium natural products crafted to support a healthier you and a better tomorrow.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Product Info Section */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] pb-10 md:pb-16">
                <AnimatedSection animation="fadeUp">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        {/* Product Image */}
                        <div className="relative flex items-center justify-center">
                            <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[500px] aspect-square mx-auto">
                                <Image
                                    src="/images/htkof1.png"
                                    alt="VITAZAN HT-KOF"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            <h1 className="font-display text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-semibold text-dark leading-tight">
                                VITAZAN™ HT-KOF
                            </h1>

                            <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.7] text-black">
                                Ayurvedic syrup combining 12 traditional herbal herbs to soothe cough and
                                support respiratory comfort.
                            </p>

                            <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.7] text-black">
                                VITAZAN™ HT-KOF is a herbal cough remedy carefully formulated using
                                time-tested Ayurvedic herbs. It provides fast, natural relief from cough,
                                congestion, and throat irritation without the side effects of chemical
                                syrups. Suitable for all ages, it is sugar-free, safe, and effective for daily
                                respiratory support.
                            </p>

                            <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.7] text-black">
                                Each VITAZAN™ HT-KOF pack is designed for convenient consumption,
                                providing safe relief from cough and throat discomforts.
                            </p>

                            {/* Serving Info */}
                            <div className="mt-6 space-y-3">
                                {servingInfo.map((info, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal">
                                            <Check size={12} className="text-white" />
                                        </div>
                                        <div>
                                            <span className="text-[14px] sm:text-[16px] font-semibold text-dark">{info.label}</span>
                                            <p className="text-[13px] sm:text-[14px] text-gray-600">{info.value}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* For Best Results */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal">
                                        <Check size={12} className="text-white" />
                                    </div>
                                    <div>
                                        <span className="text-[14px] sm:text-[16px] font-semibold text-dark">For Best Results</span>
                                        <p className="text-[13px] sm:text-[14px] text-gray-600">
                                            Consume 2 to 3 times a day without water, or as directed by a
                                            healthcare professional.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Enquiry Button */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="mt-8 w-fit rounded-full bg-pink px-8 sm:px-10 py-3 sm:py-3.5 text-[14px] sm:text-[16px] font-semibold text-white shadow-lg shadow-pink/25 transition-colors hover:bg-pink-light"
                            >
                                Enquiry Now
                            </motion.button>
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            {/* Trust Badges */}
            <AnimatedSection animation="fadeUp">
                <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] pb-10 md:pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-b border-gray-200 py-8">
                        {trustBadges.map((badge, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 md:border-r border-solid border-gray-200 md:pl-4 lg:pl-11 last:border-r-0 text-center sm:text-left">
                                <div className="relative bg-[#FFEFF8] p-3 rounded-xl flex-shrink-0">
                                    <Image src={badge.image} alt={badge.title} width={192} height={108} className="w-8 h-8 sm:w-10 sm:h-10" />
                                </div>
                                <div className="flex flex-col items-center sm:items-start">
                                    <h4 className="text-[12px] sm:text-[13px] md:text-[15px] font-semibold text-dark">{badge.title}</h4>
                                    <p className="text-[10px] sm:text-[11px] md:text-[13px] text-gray-500">{badge.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </AnimatedSection>

            {/* Description Section */}
            <section className="bg-[#ffffff]">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-10">
                    {/* <AnimatedSection animation="fadeUp">
                    </AnimatedSection> */}

                    <AnimatedSection animation="fadeUp">
                        <div className="flex flex-col lg:flex-row">
                            <div className="space-y-2 w-full lg:w-1/2 flex flex-col justify-between lg:mr-10">
                                <h2 className="font-display text-[28px] sm:text-[36px] md:text-[44px] text-dark">
                                    Description
                                </h2>
                                <p className="text-[14px] sm:text-[15px] text-black">
                                    Respiratory health is vital for overall wellness, yet countless triggers to dust,
                                    pollution, allergens, and seasonal changes often weave the throat irritated and
                                    airways congested. VITAZAN™ HT-KOF offers a gentle, Ayurveda-inspired
                                    solution for holistic cough relief and respiratory comfort.
                                </p>

                                <p className="text-[14px] sm:text-[15px] text-black">
                                    Unlike conventional syrups that may cause drowsiness or contain heavy sugars,
                                    HT-KOF relies on a blend of 12 herbs rooted in Ayurveda for generations. Each
                                    herb is carefully selected to work in synergy—soothing irritation, reducing cough
                                    frequency, clearing congestion, and naturally boosting immune defences. Whether it&apos;s a dry,
                                    scratchy cough or a productive one with chest heaviness, HT-KOF addresses
                                    bronchial spasms due to muscular build-up, or respiratory irritation caused by dust,
                                    smoke, or pollution. Its sugar-free formulation offers a healthier cough remedy
                                    that is also suitable for those monitoring their sugar intake.
                                </p>
                                <div>
                                    <p className="text-[14px] sm:text-[15px] text-black">
                                        VITAZAN™ HT-KOF is suitable for children, adults, and the elderly alike. It is
                                        an accessible natural wellness for those looking for:
                                    </p>

                                    {/* Bullet Points */}
                                    <ul className="space-y-2 pl-1 mt-4">
                                        {bulletPoints.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-pink" />
                                                <span className="text-[14px] sm:text-[15px] text-black">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-[14px] sm:text-[15px] text-black">
                                    At VITAZAN™, every product is designed with a focus on purity, safety, and
                                    efficacy. Our formulations undergo a batch quality check alongside each lot—using
                                    natural ingredients, offering you trusted wellness support for everyday life.
                                </p>
                                <div className="flex gap-2 w-full lg:w-[160%] mt-4">
                                    <div className="relative overflow-hidden flex-1 h-40 sm:h-52 lg:h-70 rounded-lg">
                                        <Image src="/images/DescriptionS1.png" alt="DescriptionS1" fill className="object-cover" />
                                    </div>
                                    <div className="relative overflow-hidden flex-1 h-40 sm:h-52 lg:h-70 rounded-lg">
                                        <Image src="/images/DescriptionS2.png" alt="DescriptionS2" fill className="object-cover" />
                                    </div>
                                    <div className="relative overflow-hidden flex-1 h-40 sm:h-52 lg:h-70 rounded-lg">
                                        <Image src="/images/DescriptionS3.png" alt="DescriptionS3" fill className="object-cover" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                                <Image
                                    src="/images/descriptionL1.png"
                                    alt="Natural wellness"
                                    width={1920}
                                    height={1080}
                                    className="w-full h-auto lg:h-full rounded-lg"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                </div>
            </section>

            {/* Our Ingredients Section */}
            <section className="bg-white">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-10">
                    <AnimatedSection animation="fadeUp">
                        <h2 className="font-display text-center text-[28px] sm:text-[36px] md:text-[44px] text-dark">
                            Our Ingredients
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp">
                        <p className="mt-4 md:mt-6 max-w-[800px] mx-auto text-center text-[14px] sm:text-[15px] leading-[1.8] text-black">
                            VITAZAN™ HT-KOF is crafted from 12 time-tested Ayurvedic herbs that work together to soothe the throat, clear congestion, and
                            support easy breathing. Vasili Tulsi helps reduce inflammation and throat irritation, while Tub Fimli (basil) strengthens
                            respiratory defences and aids in clearing mucus. Arishta (Malabar Nut) acts as a natural expectorant, easing cough and congestion,
                            and Kali Pepper (Long Pepper) enhances the blend&apos;s effectiveness by supporting mucus drainage. Adarak (Ginger) excels.
                        </p>

                        <p className="mt-4 max-w-[800px] mx-auto text-center text-[14px] sm:text-[15px] leading-[1.8] text-black">
                            These core botanicals are complemented by supportive herbs like Bahulia (Bharngi), Kalamdagh, Kapoor, Javithwah, Ilavacca,
                            and Pudine (Mint), which collectively provide holistic respiratory relief and long-term respiratory wellness.
                        </p>
                    </AnimatedSection>

                    {/* Ingredient Carousel */}
                    <AnimatedSection animation="fadeUp">
                        <div className="mt-10 md:mt-14  mx-auto px-4 md:px-10">
                            <Carousel itemsPerView={{ base: 2, sm: 2, md: 3, lg: 5 }} gap={20} showDots={true} showArrows={true} className="py-4">
                                {ingredients.map((ing, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className="flex flex-col items-center gap-3"
                                    >
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-55 lg:h-55 rounded-full overflow-hidden shadow-md">
                                            <Image src={ing.image} alt={ing.name} fill className="object-cover" />
                                        </div>
                                        <span className="text-[13px] sm:text-[15px] font-medium text-dark">{ing.name}</span>
                                    </motion.div>
                                ))}
                            </Carousel>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* How to Use / Caution */}
            <section className="relative overflow-hidden">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-10">
                    {/* Text Content */}
                    <AnimatedSection animation="fadeLeft">
                        <div className="flex flex-col lg:flex-row gap-2 h-full">
                            <div className="relative h-64 sm:h-80 lg:h-125 w-full lg:w-135 rounded-xl lg:rounded-l-xl lg:rounded-r-none overflow-hidden">
                                <Image
                                    src="/images/howToUse.png"
                                    alt="How to use VITAZAN HT-KOF"
                                    width={1920}
                                    height={1080}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="relative">
                                <Image src={"/images/palmleaf2.png"} alt="palmleaf2" width={192} height={108} className="h-20 lg:h-34 w-auto absolute top-0 leading-0 hidden sm:block" />
                                <Image src={"/images/palmleaf2.png"} alt="palmleaf2" width={192} height={108} className="h-20 lg:h-34 w-auto absolute bottom-0 right-0 rotate-180 hidden sm:block" />
                                <div className="bg-[#F4FFD3] rounded-xl lg:rounded-r-xl lg:rounded-l-none px-6 sm:px-8 lg:px-12 py-8 lg:py-0 flex flex-col items-start justify-center h-full">
                                    <h2 className="font-display text-[28px] sm:text-[36px] md:text-[44px] text-black">
                                        How to Use / Caution
                                    </h2>

                                    <div className="mt-8 space-y-6">
                                        <div>
                                            <h3 className="text-[16px] sm:text-[18px] font-semibold text-black">
                                                Recommended Use
                                            </h3>
                                            <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.8] text-black">
                                                Children: 2 tablespoon (approx. 5 ml), 2-3 times a day without water.<br />
                                                Adults: 2 tablespoons (10 ml), 2-3 times a day without water.*
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-[16px] sm:text-[18px] font-semibold text-black">
                                                Storage
                                            </h3>
                                            <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.8] text-black">
                                                Store in a cool, dark, dry and hygienic place. Close the cap tightly after every use.
                                                Keep out of reach of children.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Frequently Asked Questions */}
            <section className="bg-white">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-10">
                    <AnimatedSection animation="fadeUp">
                        <h2 className="font-display text-center text-[28px] sm:text-[36px] md:text-[44px] text-dark">
                            Frequently Asked Question
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp">
                        <div className="mt-8 md:mt-12 max-w-[800px] mx-auto space-y-3">
                            {faqs.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className={`rounded-xl border transition-colors ${openFaq === idx ? "border-teal bg-teal/5" : "border-gray-200 bg-white"}`}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                                        className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-pink text-[12px] font-bold text-white">
                                                Q
                                            </span>
                                            <span className="text-[13px] sm:text-[15px] font-medium text-dark">
                                                {faq.q}
                                            </span>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: openFaq === idx ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown size={18} className="text-gray-500 flex-shrink-0" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {openFaq === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 sm:px-6 pb-4 pl-[52px] sm:pl-[60px]">
                                                    <p className="text-[13px] sm:text-[14px] leading-[1.7] text-gray-600">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
