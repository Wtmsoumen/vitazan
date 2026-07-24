"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import AnimatedSection from "@/components/client/AnimatedSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WellnessIsDailyRitual from "@/components/client/WellnessIsDailyRitual";


const ingredients = [
    {
        name: "Turmeric",
        subtitle: "(Curcuma longa)",
        image: "/images/turmericOE.png",
        detailImages: ["/images/turmericOED.png"],
        paragraphs: [
            "Legends describe Turmeric, also known as Haldi, as the golden gift of the earth, a herb sanctified in rituals and celebrated in kitchens. Ancient Vedic texts call it Haridra, meaning 'yellow one', symbolising purity, protection, and healing. In weddings, the Haldi ceremony was more than a cosmetic ritual; it was believed to guard the Bride and Groom against evil and disease, blessing them with Health and Fertility.",
            "Ayurvedic Physicians prescribed Haldi for Wounds, Skin Conditions, Digestive Imbalances, and Liver Disorders. Warriors returning from battle were treated with Turmeric paste to disinfect injuries and speed up recovery. Its golden Colour became a symbol of Vitality, often referred to as 'the Body's inner sunlight'.",
            "Modern Science validates these traditions: curcumin, Turmeric's active compound, is a potent anti-inflammatory and antioxidant. It helps with Arthritis, Liver Detoxification, Diabetes Management, and even supports Heart Health. A warm cup of Haldi Doodh (Turmeric Milk), still common in Indian homes, carries both History and Healing in every sip.",
        ],
    },
    {
        name: "Long Pepper",
        subtitle: "(Pippali)",
        image: "/images/longPepperOE.png",
        detailImages: ["/images/longPepperOE.png"],
        paragraphs: [
            "Long Pepper, known as Pippali in Sanskrit, has been revered in Ayurveda for thousands of years as a powerful rejuvenating herb. It was once more valued than black pepper and was a prized commodity along ancient trade routes.",
            "In traditional medicine, Pippali is classified as a 'Rasayana' — a rejuvenative tonic that promotes longevity. It is known to enhance bioavailability of other herbs and nutrients, making it an essential companion in many Ayurvedic formulations.",
            "Modern research has identified piperine and piperlongumine as key active compounds in Long Pepper. These compounds exhibit anti-inflammatory, immunomodulatory, and hepatoprotective properties, supporting respiratory health, digestive function, and metabolic balance.",
        ],
    },
    {
        name: "Bibhitaki",
        subtitle: "(Terminalia bellirica)",
        image: "/images/bibhitakiOE.png",
        detailImages: ["/images/bibhitakiOE.png"],
        paragraphs: [
            "Bibhitaki, one of the three fruits in the legendary Triphala formulation, has been a cornerstone of Ayurvedic medicine for centuries. Its name translates to 'the one that keeps away disease,' reflecting its profound healing reputation.",
            "Ancient texts describe Bibhitaki as a powerful detoxifier that helps cleanse the body of accumulated toxins. It was traditionally used to support respiratory health, improve digestion, and promote healthy hair and skin.",
            "Scientific studies have revealed that Bibhitaki is rich in tannins, ellagic acid, and gallic acid — compounds with potent antioxidant and anti-inflammatory properties. It supports healthy cholesterol levels, promotes liver function, and aids in maintaining balanced blood sugar.",
        ],
    },
    {
        name: "Malabar Nut",
        subtitle: "Leaves",
        image: "/images/malabarNutLeavesOE.png",
        detailImages: ["/images/malabarNutLeavesOE.png"],
        paragraphs: [
            "Malabar Nut, known as Vasaka or Adhatoda vasica, has been a trusted remedy in traditional Indian medicine for over 2,000 years. The plant's leaves, flowers, and roots have all been used therapeutically, with the leaves being the most potent.",
            "In Ayurveda, Vasaka is primarily known for its remarkable respiratory benefits. It was traditionally used as an expectorant and bronchodilator, helping to clear congestion, soothe coughs, and support healthy breathing patterns.",
            "Modern pharmacological research has identified vasicine and vasicinone as the key alkaloids responsible for Malabar Nut's therapeutic effects. These compounds have demonstrated significant bronchodilatory, anti-inflammatory, and antimicrobial properties.",
        ],
    },
    {
        name: "Carom Seeds",
        subtitle: "(Ajwain)",
        image: "/images/caromSeedsOE.png",
        detailImages: ["/images/caromSeedsOE.png"],
        paragraphs: [
            "Carom Seeds, known as Ajwain in Hindi, have been an integral part of Indian culinary and medicinal traditions for centuries. These tiny, ridged seeds pack a powerful punch of flavour and therapeutic benefits.",
            "In traditional medicine, Ajwain was revered as a digestive powerhouse. Grandmothers across India would prescribe Ajwain water for stomachaches, bloating, and indigestion. It was also used as a natural remedy for cold and cough symptoms.",
            "The primary active compound in Carom Seeds is thymol, which gives them their distinctive aroma and potent medicinal properties. Thymol is a powerful antimicrobial, antifungal, and antispasmodic agent that supports digestive health and respiratory function.",
        ],
    },
    {
        name: "Holy Basil",
        subtitle: "(Tulsi)",
        image: "/images/holyBasilOE.png",
        detailImages: ["/images/holyBasilOE.png"],
        paragraphs: [
            "Holy Basil, known as Tulsi, is regarded as the 'Queen of Herbs' in Ayurveda and holds a sacred place in Indian culture. For thousands of years, Tulsi has been worshipped and cultivated in Indian households for its spiritual significance and medicinal properties.",
            "In Ayurvedic tradition, Tulsi is classified as a Rasayana — an herb that promotes perfect health and longevity. It was used to treat a wide range of ailments including respiratory disorders, digestive issues, skin problems, and stress-related conditions.",
            "Modern science has validated many of Tulsi's traditional uses. Research shows that Holy Basil contains eugenol, rosmarinic acid, and ursolic acid — compounds with powerful adaptogenic, anti-inflammatory, and immunomodulatory properties that help the body resist stress and maintain homeostasis.",
        ],
    },
    {
        name: "Ginger",
        subtitle: "(Zingiber officinale)",
        image: "/images/mintOE.png",
        detailImages: ["/images/mintOE.png"],
        paragraphs: [
            "Ginger, one of the most widely used spices in the world, has been a cornerstone of traditional medicine systems across Asia for over 5,000 years. Ancient Chinese and Indian healers recognized its potent warming and healing properties.",
            "In Ayurveda, Ginger is known as 'Vishwabhesaj' — the universal medicine. It was prescribed for digestive ailments, nausea, cold and flu symptoms, and joint inflammation. Fresh ginger juice with honey was a common household remedy for sore throats.",
            "Gingerols and shogaols are the bioactive compounds responsible for Ginger's therapeutic effects. These compounds have demonstrated powerful anti-inflammatory, antioxidant, and antiemetic properties, making Ginger effective for managing nausea, reducing muscle pain, and supporting cardiovascular health.",
        ],
    },
    {
        name: "Turmeric",
        subtitle: "(Curcuma longa)",
        image: "/images/turmericOE.png",
        detailImages: ["/images/turmericOED.png"],
        paragraphs: [
            "Legends describe Turmeric, also known as Haldi, as the golden gift of the earth, a herb sanctified in rituals and celebrated in kitchens. Ancient Vedic texts call it Haridra, meaning 'yellow one', symbolising purity, protection, and healing. In weddings, the Haldi ceremony was more than a cosmetic ritual; it was believed to guard the Bride and Groom against evil and disease, blessing them with Health and Fertility.",
            "Ayurvedic Physicians prescribed Haldi for Wounds, Skin Conditions, Digestive Imbalances, and Liver Disorders. Warriors returning from battle were treated with Turmeric paste to disinfect injuries and speed up recovery. Its golden Colour became a symbol of Vitality, often referred to as 'the Body's inner sunlight'.",
            "Modern Science validates these traditions: curcumin, Turmeric's active compound, is a potent anti-inflammatory and antioxidant. It helps with Arthritis, Liver Detoxification, Diabetes Management, and even supports Heart Health. A warm cup of Haldi Doodh (Turmeric Milk), still common in Indian homes, carries both History and Healing in every sip.",
        ],
    },
    {
        name: "Long Pepper",
        subtitle: "(Pippali)",
        image: "/images/longPepperOE.png",
        detailImages: ["/images/longPepperOE.png"],
        paragraphs: [
            "Long Pepper, known as Pippali in Sanskrit, has been revered in Ayurveda for thousands of years as a powerful rejuvenating herb. It was once more valued than black pepper and was a prized commodity along ancient trade routes.",
            "In traditional medicine, Pippali is classified as a 'Rasayana' — a rejuvenative tonic that promotes longevity. It is known to enhance bioavailability of other herbs and nutrients, making it an essential companion in many Ayurvedic formulations.",
            "Modern research has identified piperine and piperlongumine as key active compounds in Long Pepper. These compounds exhibit anti-inflammatory, immunomodulatory, and hepatoprotective properties, supporting respiratory health, digestive function, and metabolic balance.",
        ],
    },
    {
        name: "Bibhitaki",
        subtitle: "(Terminalia bellirica)",
        image: "/images/bibhitakiOE.png",
        detailImages: ["/images/bibhitakiOE.png"],
        paragraphs: [
            "Bibhitaki, one of the three fruits in the legendary Triphala formulation, has been a cornerstone of Ayurvedic medicine for centuries. Its name translates to 'the one that keeps away disease,' reflecting its profound healing reputation.",
            "Ancient texts describe Bibhitaki as a powerful detoxifier that helps cleanse the body of accumulated toxins. It was traditionally used to support respiratory health, improve digestion, and promote healthy hair and skin.",
            "Scientific studies have revealed that Bibhitaki is rich in tannins, ellagic acid, and gallic acid — compounds with potent antioxidant and anti-inflammatory properties. It supports healthy cholesterol levels, promotes liver function, and aids in maintaining balanced blood sugar.",
        ],
    },
    {
        name: "Malabar Nut",
        subtitle: "Leaves",
        image: "/images/malabarNutLeavesOE.png",
        detailImages: ["/images/malabarNutLeavesOE.png"],
        paragraphs: [
            "Malabar Nut, known as Vasaka or Adhatoda vasica, has been a trusted remedy in traditional Indian medicine for over 2,000 years. The plant's leaves, flowers, and roots have all been used therapeutically, with the leaves being the most potent.",
            "In Ayurveda, Vasaka is primarily known for its remarkable respiratory benefits. It was traditionally used as an expectorant and bronchodilator, helping to clear congestion, soothe coughs, and support healthy breathing patterns.",
            "Modern pharmacological research has identified vasicine and vasicinone as the key alkaloids responsible for Malabar Nut's therapeutic effects. These compounds have demonstrated significant bronchodilatory, anti-inflammatory, and antimicrobial properties.",
        ],
    },
    {
        name: "Carom Seeds",
        subtitle: "(Ajwain)",
        image: "/images/caromSeedsOE.png",
        detailImages: ["/images/caromSeedsOE.png"],
        paragraphs: [
            "Carom Seeds, known as Ajwain in Hindi, have been an integral part of Indian culinary and medicinal traditions for centuries. These tiny, ridged seeds pack a powerful punch of flavour and therapeutic benefits.",
            "In traditional medicine, Ajwain was revered as a digestive powerhouse. Grandmothers across India would prescribe Ajwain water for stomachaches, bloating, and indigestion. It was also used as a natural remedy for cold and cough symptoms.",
            "The primary active compound in Carom Seeds is thymol, which gives them their distinctive aroma and potent medicinal properties. Thymol is a powerful antimicrobial, antifungal, and antispasmodic agent that supports digestive health and respiratory function.",
        ],
    },
    {
        name: "Holy Basil",
        subtitle: "(Tulsi)",
        image: "/images/holyBasilOE.png",
        detailImages: ["/images/holyBasilOE.png"],
        paragraphs: [
            "Holy Basil, known as Tulsi, is regarded as the 'Queen of Herbs' in Ayurveda and holds a sacred place in Indian culture. For thousands of years, Tulsi has been worshipped and cultivated in Indian households for its spiritual significance and medicinal properties.",
            "In Ayurvedic tradition, Tulsi is classified as a Rasayana — an herb that promotes perfect health and longevity. It was used to treat a wide range of ailments including respiratory disorders, digestive issues, skin problems, and stress-related conditions.",
            "Modern science has validated many of Tulsi's traditional uses. Research shows that Holy Basil contains eugenol, rosmarinic acid, and ursolic acid — compounds with powerful adaptogenic, anti-inflammatory, and immunomodulatory properties that help the body resist stress and maintain homeostasis.",
        ],
    },
    {
        name: "Ginger",
        subtitle: "(Zingiber officinale)",
        image: "/images/mintOE.png",
        detailImages: ["/images/mintOE.png"],
        paragraphs: [
            "Ginger, one of the most widely used spices in the world, has been a cornerstone of traditional medicine systems across Asia for over 5,000 years. Ancient Chinese and Indian healers recognized its potent warming and healing properties.",
            "In Ayurveda, Ginger is known as 'Vishwabhesaj' — the universal medicine. It was prescribed for digestive ailments, nausea, cold and flu symptoms, and joint inflammation. Fresh ginger juice with honey was a common household remedy for sore throats.",
            "Gingerols and shogaols are the bioactive compounds responsible for Ginger's therapeutic effects. These compounds have demonstrated powerful anti-inflammatory, antioxidant, and antiemetic properties, making Ginger effective for managing nausea, reducing muscle pain, and supporting cardiovascular health.",
        ],
    },
];

export default function OurEssencePage() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const selected = ingredients[selectedIndex];

    const scrollCarousel = (direction: "left" | "right") => {
        const newIndex = direction === "left"
            ? Math.max(0, selectedIndex - 1)
            : Math.min(ingredients.length - 1, selectedIndex + 1);
        setSelectedIndex(newIndex);
        if (!carouselRef.current) return;
        const buttons = carouselRef.current.querySelectorAll("button");
        buttons[newIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

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
                        src="/images/ourEssence.png"
                        alt="Our Essence"
                        width={1920}
                        height={1080}
                        className="w-full h-auto"
                        priority
                    />
                    <div className="absolute inset-0 z-[1] mx-auto max-w-[1600px] px-4 sm:px-12 pointer-events-none h-full">
                        <div className="flex flex-col justify-center h-full gap-2 sm:gap-4 w-[55%] sm:w-1/2">
                            <h1 className="font-display text-[24px] sm:text-[40px] md:text-[52px] lg:text-[67px] leading-[1.1] text-black font-medium">
                                Our Essence
                            </h1>
                            <p className="text-[10px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[14px] sm:leading-[20px] md:leading-[24px] text-black font-medium w-full sm:w-[70%] lg:w-[50%]">
                                Premium natural products crafted to support a healthier you and a better tomorrow.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Ingredient Selector Carousel */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-8 md:py-12 mt-[-10rem]">
                <AnimatedSection animation="fadeUp">
                    <div className="relative">
                        <button
                            onClick={() => scrollCarousel("left")}
                            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:scale-110"
                        >
                            <ChevronLeft className="w-5 h-5 text-[#00485d]" />
                        </button>

                        <div
                            ref={carouselRef}
                            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-2 py-4"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {ingredients.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedIndex(idx)}
                                    className={`flex flex-col items-center gap-3 flex-shrink-0 transition-all duration-300 bg-white rounded-2xl overflow-hidden shadow ${selectedIndex === idx ? "scale-105 border-b border-[#FF84C6]" : "hover:scale-102 hover:bg-[#e8f5e9]"}`}
                                >
                                    <div
                                        className={`p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 
                                           
                                            `
                                        }
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={1920}
                                            height={1080}
                                            className="w-33 h-33 object-contain rounded-full border-2 border-solid border-[#E5097F]"
                                        />
                                        <span
                                            className={`text-[12px] sm:text-[13px] md:text-[14px] text-center font-semibold leading-tight transition-colors ${selectedIndex === idx ? "text-[#00485d]" : "text-gray-600"
                                                }`}
                                        >
                                            {item.name}
                                            {item.subtitle && (
                                                <>
                                                    <br />
                                                    {item.subtitle}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => scrollCarousel("right")}
                            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:scale-110"
                        >
                            <ChevronRight className="w-5 h-5 text-[#00485d]" />
                        </button>
                    </div>
                </AnimatedSection>
            </section>

            {/* Selected Ingredient Detail */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] pb-8 md:pb-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        {/* Ingredient Title */}
                        <h2 className="font-display text-center text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-dark underline underline-offset-8 decoration-1 mb-10 md:mb-14">
                            {selected.name} {selected.subtitle}
                        </h2>

                        {/* Detail Card */}
                        <div className="bg-[#f9f9f9] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14">
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
                                {/* Left - Overlapping Circular Images */}
                                <div className="relative w-full lg:w-[45%] flex justify-center">
                                    <div className="relative w-[280px] h-[320px] sm:w-[340px] sm:h-[380px] md:w-[400px] md:h-[440px]">
                                        <Image
                                            src={selected.detailImages[0]}
                                            alt={selected.name}
                                            width={1920}
                                            height={1080}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                </div>

                                {/* Right - Text Content */}
                                <div className="w-full lg:w-[55%]">
                                    <h3 className="font-display text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-dark font-semibold mb-5">
                                        {selected.name} {selected.subtitle}
                                    </h3>
                                    <div className="space-y-4 sm:space-y-5">
                                        {selected.paragraphs.map((p, idx) => (
                                            <p
                                                key={idx}
                                                className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] text-black/80"
                                            >
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* Wellness is a daily ritual */}
            <WellnessIsDailyRitual />
        </div>
    );
}
