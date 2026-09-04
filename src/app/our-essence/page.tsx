"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/client/AnimatedSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WellnessIsDailyRitual from "@/components/client/WellnessIsDailyRitual";

const allIngredients = [
    { name: "Saw Palmetto", subtitle: "(Serenoa repens)", image: "/images/Our Essence/Saw Palmetto.webp", products: ["ALFAAKTIV"] },
    { name: "Nettle Root", subtitle: "(Urtica dioica)", image: "/images/Our Essence/Nettle root.webp", products: ["ALFAAKTIV", "FEMISAN A"] },
    { name: "Pomegranate", subtitle: "(Punica granatum)", image: "/images/Our Essence/Pomegranate.webp", products: ["FEMISAN A", "FEMISAN B", "FEMISAN GOLD"] },
    { name: "Lady's Mantle", subtitle: "(Alchemilla vulgaris)", image: "/images/Our Essence/ladys mantle.jpg", products: ["FEMISAN A", "FEMISAN B"] },
    { name: "Marigold Flower", subtitle: "(Tagetes erecta)", image: "/images/Our Essence/marigold.jpeg", products: ["FEMISAN A", "DIARON-C"] },
    { name: "Yarrow", subtitle: "(Achillea millefolium)", image: "/images/Our Essence/Yarrow.jpeg", products: ["FEMISAN B", "FEMISAN GOLD"] },
    { name: "Turmeric", subtitle: "(Curcuma longa)", image: "/images/turmeric.png", products: ["OSTEOMAC", "ACINIL NEO"] },
    { name: "Malabar Nut", subtitle: "(Adhatoda vasica)", image: "/images/malabar.png", products: ["ACINIL NEO"] },
    { name: "Holy Basil", subtitle: "(Ocimum tenuiflorum)", image: "/images/tulsi.png", products: ["ACINIL NEO", "CYSTNIL SURE"] },
    { name: "Black Pepper", subtitle: "(Piper nigrum)", image: "/images/Our Essence/Saw Palmetto.webp", products: ["ALFAAKTIV", "OSTEOMAC"] },
];

const productDetails: Record<string, { image: string; desc: string }> = {
    "ACINIL NEO": { image: "/images/ACINIL_NEO.png", desc: "Antacid & antiflatulent oral suspension for fast relief from acidity, heartburn and gas." },
    "ALFAAKTIV": { image: "/images/ALFAAKTIV.png", desc: "Active capsules formulated to support male vitality, energy and overall well-being." },
    "CYSTNIL SURE": { image: "/images/CYSTNIL SURE.png", desc: "D-chiro-inositol and Myo-inositol tablets for hormonal balance and reproductive health." },
    "DIARON-C": { image: "/images/DIARON-C.png", desc: "Citrus bioflavonoids, rosehip and vitamin C complex for immunity and skin health." },
    "FEMISAN A": { image: "/images/FEMISAN_A.png", desc: "100% natural supplement supporting normal physiological functions of female reproductive organs." },
    "FEMISAN B": { image: "/images/FEMISAN_B.png", desc: "Herbal drops with natural plant extracts for women's health and hormonal support." },
    "FEMISAN GOLD": { image: "/images/FEMISAN_GOLD.png", desc: "Natural relief for menopause symptoms including hot flashes, sweating and restlessness." },
    "OSTEOMAC": { image: "/images/osteomac-product.png", desc: "Calcium citrate maleate with vitamin D3, magnesium and zinc tablets for bone health support." },
};

const ingredients = [{
    name: "Saw Palmetto",
    subtitle: "(Serenoa repens)",
    image: "/images/Our Essence/Saw Palmetto.webp",
    detailImages: ["/images/Our Essence/Saw Palmetto.webp"],
    paragraphs: [
        "A Native Remedy with a Rich History. Saw Palmetto is a small palm native to the southeastern United States, especially Florida, Georgia, and South Carolina. Native American tribes such as the Seminoles traditionally used its berries for urinary and reproductive wellness.",
        "The plant grows in sandy coastal regions and produces medicinal reddish-black berries. These berries are harvested in autumn and have long been valued in traditional herbal medicine.",
        "Modern herbal research recognises Saw Palmetto for supporting prostate health, urinary function, hormone balance, healthy hair growth, and reducing inflammation, making it one of the world's most trusted botanical supplements."
    ]
},
{
    name: "Nettle Root",
    subtitle: "(Urtica dioica)",
    image: "/images/Our Essence/Nettle root.webp",
    detailImages: ["/images/Our Essence/Nettle root.webp"],
    paragraphs: [
        "A Stinging Plant with Soothing Benefits. Nettle is a herbaceous perennial native to Europe, Asia, North America and northern Africa. Despite its stinging leaves, it has been treasured in traditional medicine for centuries.",
        "Ancient Greeks, Romans and medieval herbalists relied on nettle for a variety of medicinal applications, while its fibres were also used in textiles.",
        "Today, Nettle Root is widely recognised for supporting prostate health, urinary function, reducing inflammation, promoting healthy blood sugar levels and easing seasonal allergies."
    ]
},
{
    name: "Pomegranate",
    subtitle: "(Punica granatum)",
    image: "/images/Our Essence/Pomegranate.webp",
    detailImages: ["/images/Our Essence/Pomegranate.webp"],
    paragraphs: [
        "The Ancient Fruit of Vitality. Native to the region stretching from Iran to northern India, Pomegranate has symbolised abundance, longevity and health for over four thousand years.",
        "Celebrated in ancient Egypt, Greek mythology, Ayurveda and Traditional Chinese Medicine, it has remained one of the world's most respected medicinal fruits.",
        "Rich in antioxidants such as punicalagins and anthocyanins, Pomegranate supports cardiovascular health, healthy blood pressure, digestion, immunity and helps protect cells from oxidative stress."
    ]
},
{
    name: "Lady's Mantle",
    subtitle: "(Alchemilla vulgaris)",
    image: "/images/Our Essence/ladys mantle.jpg",
    detailImages: ["/images/Our Essence/ladys mantle.jpg"],
    paragraphs: [
        "The Herbal Embrace for Women's Health. Lady's Mantle is native to Europe and Asia and is recognised by its beautiful fan-shaped leaves that naturally collect dew.",
        "For centuries it has been an important herb in European traditional medicine and was highly valued by medieval herbalists and alchemists.",
        "Naturally rich in tannins, Lady's Mantle is traditionally used to support menstrual comfort, menopause, digestive wellness, wound healing and healthy skin."
    ]
},
{
    name: "Marigold Flower",
    subtitle: "(Tagetes erecta)",
    image: "/images/Our Essence/marigold.jpeg",
    detailImages: ["/images/Our Essence/marigold.jpeg"],
    paragraphs: [
        "The Vibrant Healer. Native to Mexico and Central America, Marigold is admired worldwide for its brilliant golden-orange flowers and remarkable medicinal value.",
        "Historically used by the Aztecs in ceremonies and healing traditions, Marigold continues to play an important role in herbal medicine and cultural celebrations.",
        "Its natural carotenoids, including lutein, provide antioxidant and anti-inflammatory support while promoting eye health, skin wellness and the healing of minor wounds."
    ]
},
{
    name: "Yarrow",
    subtitle: "(Achillea millefolium)",
    image: "/images/Our Essence/Yarrow.jpeg",
    detailImages: ["/images/Our Essence/Yarrow.jpeg"],
    paragraphs: [
        "The Warrior's Herb. Yarrow is a flowering perennial native to Europe, Asia and North America, famous for its delicate white flower clusters and feathery foliage.",
        "Named after the legendary Greek warrior Achilles, Yarrow has been used for thousands of years to help treat wounds and support healing.",
        "Known for its anti-inflammatory, antiseptic and astringent properties, Yarrow supports wound care, digestive health, circulation and women's wellness while promoting natural healing."
    ]
}]

export default function OurEssencePage() {
    return (
        <Suspense>
            <OurEssenceContent />
        </Suspense>
    );
}

function OurEssenceContent() {
    const searchParams = useSearchParams();
    const [selectedIndex, setSelectedIndex] = useState(() => {
        const name = searchParams.get("ingredient");
        if (!name) return 0;
        const idx = ingredients.findIndex(i => i.name.toLowerCase() === name.toLowerCase());
        return idx >= 0 ? idx : 0;
    });
    const carouselRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);
    const selected = ingredients[selectedIndex];

    useEffect(() => {
        const name = searchParams.get("ingredient");
        if (!name) return;
        const idx = ingredients.findIndex(i => i.name.toLowerCase() === name.toLowerCase());
        if (idx >= 0) {
            setSelectedIndex(idx);
            setTimeout(() => {
                detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 300);
        }
    }, [searchParams]);
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>("Saw Palmetto");
    const ingredientProductsRef = useRef<HTMLDivElement>(null);

    const handleIngredientClick = (name: string) => {
        setSelectedIngredient(name === selectedIngredient ? null : name);
        setTimeout(() => {
            ingredientProductsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    const activeIngredientData = allIngredients.find(i => i.name === selectedIngredient);

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
        <div className="w-full bg-white">
            {/* Hero Banner */}
            <section className="relative mx-auto w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full h-[50vh]"
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
                                        <div className="w-33 h-33 rounded-full border-2 border-solid border-[#E5097F] overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={1920}
                                                height={1080}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
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
            <div ref={detailRef} className="scroll-mt-24">
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
                                            className="w-full h-full object-cover rounded-2xl"
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
            </div>

            {/* Ingredients Section */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-10 md:py-14">
                <AnimatedSection animation="fadeUp">
                    <div className="text-center mb-8 md:mb-12">
                        <p className="text-[13px] sm:text-[15px] font-bold uppercase tracking-[2.1px] text-pink">Key Ingredients</p>
                        <h2 className="font-display mt-2 text-[28px] sm:text-[38px] md:text-[48px] text-black">
                            Our <span className="text-pink">Ingredients</span>
                        </h2>
                        <p className="mt-3 text-[14px] sm:text-[16px] text-gray-600">Click any ingredient to discover which products contain it.</p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                    {allIngredients.map((ing) => (
                        <motion.button
                            key={ing.name}
                            onClick={() => handleIngredientClick(ing.name)}
                            whileHover={{ y: -4 }}
                            className={`flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${selectedIngredient === ing.name ? "border-pink bg-pink/5 shadow-lg" : "border-gray-100 bg-white hover:border-pink/40 hover:shadow-md"}`}
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-solid border-[#E5097F] mb-3 flex-shrink-0">
                                <Image src={ing.image} alt={ing.name} width={200} height={200} className="w-full h-full object-cover" />
                            </div>
                            <p className={`text-[13px] sm:text-[14px] font-semibold leading-tight ${selectedIngredient === ing.name ? "text-pink" : "text-black"}`}>
                                {ing.name}
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5">{ing.subtitle}</p>
                        </motion.button>
                    ))}
                </div>

                {/* Products for selected ingredient */}
                <div ref={ingredientProductsRef}>
                    <AnimatePresence>
                        {selectedIngredient && activeIngredientData && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4 }}
                                className="mt-8 overflow-hidden"
                            >
                                <div className="bg-[#f9f9f9] rounded-2xl p-6 sm:p-8 md:p-10">
                                    <h3 className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-black mb-2">
                                        Products with <span className="text-pink">{selectedIngredient}</span>
                                    </h3>
                                    <p className="text-[13px] text-gray-500 mb-6">{activeIngredientData.products.length} product{activeIngredientData.products.length !== 1 ? "s" : ""} found</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                                        {activeIngredientData.products.map((productName) => {
                                            const p = productDetails[productName];
                                            if (!p) return null;
                                            return (
                                                <motion.div
                                                    key={productName}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                                >
                                                    <div className="h-[180px] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
                                                        <Image src={p.image} alt={productName} width={200} height={200} className="h-full w-auto object-contain" />
                                                    </div>
                                                    <div className="p-4">
                                                        <h4 className="font-bold text-[15px] text-black">{productName}</h4>
                                                        <p className="text-[12px] text-gray-600 mt-1 leading-[1.5] line-clamp-2">{p.desc}</p>
                                                        <a href={`/enquiry?product=${encodeURIComponent(productName)}`} className="mt-3 inline-block text-[13px] font-semibold text-pink hover:underline">
                                                            Enquire Now →
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Wellness is a daily ritual */}
            <WellnessIsDailyRitual />
        </div>
    );
}
