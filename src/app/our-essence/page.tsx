"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/client/AnimatedSection";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import WellnessIsDailyRitual from "@/components/client/WellnessIsDailyRitual";

const allIngredients = [
    { name: "Saw Palmetto", subtitle: "(Serenoa repens)", image: "/images/Our Essence/Saw Palmetto.webp", products: ["ALFAAKTIV"] },
    { name: "Nettle Root", subtitle: "(Urtica dioica)", image: "/images/Our Essence/Nettle root.webp", products: ["ALFAAKTIV", "FEMISAN A"] },
    { name: "Pomegranate", subtitle: "(Punica granatum)", image: "/images/Our Essence/Pomegranate.webp", products: ["FEMISAN A", "FEMISAN B", "FEMISAN GOLD"] },
    { name: "Lady's Mantle", subtitle: "(Alchemilla vulgaris)", image: "/images/Our Essence/ladys mantle.jpg", products: ["FEMISAN A", "FEMISAN B"] },
    { name: "Marigold Flower", subtitle: "(Calendula officinalis)", image: "/images/Our Essence/MarigoldFlower.jpg", products: ["FEMISAN A", "DIARON-C"] },
    { name: "Yarrow", subtitle: "(Achillea millefolium)", image: "/images/Our Essence/Yarrow.jpeg", products: ["FEMISAN B", "FEMISAN GOLD"] },
    { name: "Turmeric", subtitle: "(Curcuma longa)", image: "/images/turmeric.png", products: ["OSTEOMAC", "ACINIL NEO"] },
    { name: "Malabar Nut", subtitle: "(Adhatoda vasica)", image: "/images/malabar.png", products: ["ACINIL NEO"] },
    { name: "Holy Basil", subtitle: "(Ocimum tenuiflorum)", image: "/images/tulsi.png", products: ["ACINIL NEO", "CYSTNIL SURE"] },
    { name: "Black Pepper", subtitle: "(Piper nigrum)", image: "/images/Our Essence/Saw Palmetto.webp", products: ["ALFAAKTIV", "OSTEOMAC"] },
    { name: "Shepherd's Purse", subtitle: "(Capsella bursa-pastoris)", image: "/images/Our Essence/ShepherdsPurse.webp", products: ["FEMISAN A"] },
    { name: "Herb Robert", subtitle: "(Geranium robertianum)", image: "/images/Our Essence/HerbRobert.jpeg", products: ["FEMISAN A"] },
    { name: "Golden Maca", subtitle: "(Lepidium meyenii)", image: "/images/Our Essence/GoldenMaca.jpg", products: ["FEMISAN A"] },
    { name: "White Mistletoe Herb", subtitle: "(Viscum album)", image: "/images/Our Essence/WhiteMistletoeHerb.jpeg", products: ["FEMISAN B"] },
    { name: "Lemon Balm Leaves", subtitle: "(Melissa officinalis)", image: "/images/Our Essence/LemonBalmLeaves.jpeg", products: ["FEMISAN B"] },
    { name: "Valerian Root", subtitle: "(Valeriana officinalis)", image: "/images/Our Essence/ValerianRoot.jpg", products: ["FEMISAN B"] },
    { name: "Chaste Tree", subtitle: "(Vitex agnus-castus)", image: "/images/Our Essence/ChasteTree.jpeg", products: ["FEMISAN GOLD"] },
    { name: "Wild Yam", subtitle: "(Dioscorea villosa)", image: "/images/Our Essence/WildYam.avif", products: ["FEMISAN GOLD"] },
    { name: "Hops", subtitle: "(Humulus lupulus)", image: "/images/Our Essence/Hops.jpeg", products: ["FEMISAN GOLD"] },
    { name: "Black Cohosh", subtitle: "(Actaea racemosa)", image: "/images/Our Essence/BlackCohosh.jpg", products: ["FEMISAN GOLD"] },
    { name: "Angelica", subtitle: "(Angelica archangelica L.)", image: "/images/Our Essence/Angelica.webp", products: ["FEMISAN GOLD"] },
    { name: "Ginseng", subtitle: "(Panax ginseng)", image: "/images/Our Essence/ginseng.webp", products: ["FEMISAN GOLD"] },
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
    subtitle: "(Calendula officinalis)",
    image: "/images/Our Essence/MarigoldFlower.jpg",
    detailImages: ["/images/Our Essence/MarigoldFlower.jpg"],
    paragraphs: [
        "Marigold flower, particularly Calendula officinalis, is commonly known as pot marigold and is one of the best-known traditional botanical ingredients for skin and general wellness. Its bright orange-yellow flowers contain a diverse range of naturally occurring phytochemicals. Calendula officinalis belongs to the Asteraceae family and is an aromatic annual or short-lived perennial herb.",
        "Its flower heads contain carotenoids, flavonoids, triterpenoids, coumarins and other compounds responsible for their characteristic colour and biological properties. Calendula has traditionally been used for minor skin irritation, wounds, inflammation and digestive complaints. Modern investigations have reported antioxidant, anti-inflammatory, antimicrobial and wound-healing-related activities. Clinical research has explored calendula preparations in areas including wound care, radiodermatitis, oral mucosal conditions and inflammatory skin concerns.",
        "Beyond herbal medicine, calendula flowers have culinary and cosmetic applications and have historically been used as a natural colouring ingredient. Today, calendula remains an important botanical in creams, ointments, teas, extracts and women's wellness formulations."
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
},
{
    name: "Shepherd's Purse",
    subtitle: "(Capsella bursa-pastoris)",
    image: "/images/Our Essence/ShepherdsPurse.webp",
    detailImages: ["/images/Our Essence/ShepherdsPurse.webp"],
    paragraphs: [
        "Shepherd's purse, Capsella bursa-pastoris, is a widespread annual or biennial herb recognised by its distinctive heart-shaped seed pods. It has been used traditionally in several cultures, particularly in herbal preparations associated with women's health and digestive wellness. This member of the Brassicaceae family forms a basal rosette of leaves with an upright flowering stem bearing small white flowers. Its characteristic triangular or heart-shaped seed pods give the plant its common name.",
        "Phytochemical investigations have identified flavonoids, phenolic acids, phytosterols, amino acids and other constituents. Traditional applications include support for digestive function and preparations associated with bleeding and women's health. Modern studies have investigated antioxidant, anti-inflammatory, antimicrobial and other biological activities. Research has also explored its potential relevance to gynaecological applications, although traditional uses should not be interpreted as established clinical treatments.",
        "Shepherd's purse has been used both medicinally and as an edible plant. Its recognition in modern pharmacognosy, including inclusion in the European Pharmacopoeia, illustrates the continuing relationship between traditional herbal knowledge and contemporary botanical medicine."
    ]
},
{
    name: "Herb Robert",
    subtitle: "(Geranium robertianum)",
    image: "/images/Our Essence/HerbRobert.jpeg",
    detailImages: ["/images/Our Essence/HerbRobert.jpeg"],
    paragraphs: [
        "Herb Robert, Geranium robertianum, also known as red robin, is a delicate annual or biennial herb found widely across Europe and parts of Asia and North America. It has a long history in folk herbal practices. Herb Robert belongs to the Geraniaceae family and is characterised by finely divided leaves, reddish stems and small pink to purplish flowers.",
        "Its phytochemical profile is particularly notable for phenolic compounds, including flavonoids, tannins and phenolic acids. Traditional herbal use has associated Herb Robert with a variety of everyday health applications. Modern phytochemical research has identified antioxidant, antimicrobial, anti-inflammatory and other biological activities in extracts of the plant. Some experimental studies have also examined metabolic and cellular effects, although these findings should not be equated with established clinical efficacy.",
        "Herb Robert represents the broader European tradition of using locally available wild plants for household herbal preparations. Contemporary scientific interest is focused on understanding its phenolic constituents and determining how its traditional applications relate to experimentally observed biological activities."
    ]
},
{
    name: "Golden Maca",
    subtitle: "(Lepidium meyenii)",
    image: "/images/Our Essence/GoldenMaca.jpg",
    detailImages: ["/images/Our Essence/GoldenMaca.jpg"],
    paragraphs: [
        "Maca, Lepidium meyenii or closely related cultivated Lepidium forms, is a root vegetable originating in the high Andes of Peru and Bolivia. Often described as an adaptogenic or vitality-supporting botanical, maca has become globally recognised for its traditional association with energy, fertility and sexual wellness.",
        "Maca is a small biennial herb belonging to the Brassicaceae family. Its underground storage organ develops in several natural colour forms, including yellow or golden, red and black. Its phytochemical profile includes macamides, macaenes, glucosinolates, sterols and other compounds. Research has investigated maca for sexual function, fertility, energy, mood, antioxidant activity and physical performance. Some clinical studies have reported improvements in aspects of sexual desire and wellbeing, although results vary according to preparation, dose and study design.",
        "Maca has been cultivated in the Andes for at least 2,000 years and has traditionally served both nutritional and medicinal purposes. Its transition from an Andean food crop to a globally marketed botanical illustrates the growing international interest in traditional plant-based wellness ingredients."
    ]
},
{
    name: "White Mistletoe Herb",
    subtitle: "(Viscum album)",
    image: "/images/Our Essence/WhiteMistletoeHerb.jpeg",
    detailImages: ["/images/Our Essence/WhiteMistletoeHerb.jpeg"],
    paragraphs: [
        "White mistletoe, Viscum album, is a distinctive semi-parasitic plant traditionally associated with European herbal medicine. Unlike many conventional herbs, mistletoe grows attached to host trees and obtains water and minerals from its host. Viscum album belongs to the Santalaceae family. It forms evergreen, branching shrubs with paired leaves and characteristic white berries.",
        "Its chemical profile includes lectins, viscotoxins, flavonoids, triterpenes and other bioactive compounds. Mistletoe has a long history of traditional use for several conditions, and modern research has particularly investigated its immunological, inflammatory and cancer-related biological effects. Extracts and isolated compounds have demonstrated pharmacological activity in laboratory and clinical research. However, evidence varies substantially by preparation, route and indication, and mistletoe should not be treated as a general-purpose treatment for serious disease.",
        "Mistletoe has considerable cultural significance throughout Europe, where it is associated with seasonal traditions and symbolism. In modern phytotherapy and complementary medicine, standardised mistletoe preparations have attracted significant scientific research, particularly in European countries."
    ]
},
{
    name: "Lemon Balm Leaves",
    subtitle: "(Melissa officinalis)",
    image: "/images/Our Essence/LemonBalmLeaves.jpeg",
    detailImages: ["/images/Our Essence/LemonBalmLeaves.jpeg"],
    paragraphs: [
        "Lemon balm, Melissa officinalis, is an aromatic perennial herb renowned for its pleasant lemon fragrance and calming herbal tradition. It has been used for centuries in European, Mediterranean and Middle Eastern herbal medicine. Lemon balm belongs to the Lamiaceae family and has soft, serrated green leaves that release a characteristic citrus-like aroma when crushed.",
        "Its phytochemical profile includes rosmarinic acid, phenolic compounds, flavonoids, triterpenoids and volatile constituents such as citral and citronellal. Traditional applications include digestive comfort, nervous tension and sleep-related concerns. Modern research has investigated antioxidant, anti-inflammatory, antispasmodic, antiviral and anxiolytic activities. Some clinical studies have reported effects on mood, anxiety and cognitive performance, although outcomes depend on the extract and formulation.",
        "Lemon balm has traditionally been consumed as a tea and culinary herb as well as used in herbal preparations. Its combination of a pleasant aroma, culinary versatility and research interest has made it a popular ingredient in modern relaxation, digestive and women's wellness products."
    ]
},
{
    name: "Valerian Root",
    subtitle: "(Valeriana officinalis)",
    image: "/images/Our Essence/ValerianRoot.jpg",
    detailImages: ["/images/Our Essence/ValerianRoot.jpg"],
    paragraphs: [
        "Valerian, most commonly Valeriana officinalis, is a perennial herb whose underground root and rhizome have been used for centuries in European herbal medicine. It is particularly associated with relaxation and sleep support. Valeriana officinalis belongs to the Caprifoliaceae family. It produces clusters of small pale flowers and develops a distinctive aromatic root containing valerenic acids, iridoids, volatile oils and other constituents.",
        "The chemical composition can vary according to species, growing conditions and extraction method. Valerian has traditionally been used to promote relaxation and support sleep. Modern research suggests that certain valerian preparations may influence neurotransmitter systems involved in nervous-system regulation. However, systematic reviews have found inconsistent evidence for objectively measured insomnia outcomes, although some people report subjective improvements in sleep quality.",
        "Valerian remains one of the most widely recognised botanical sleep-support ingredients and is used in teas, capsules, extracts and combination herbal products. Its long traditional history and continuing scientific investigation make it an important example of traditional herbal knowledge being evaluated through modern clinical research."
    ]
},
{
    name: "Chaste Tree",
    subtitle: "(Vitex agnus-castus)",
    image: "/images/Our Essence/ChasteTree.jpeg",
    detailImages: ["/images/Our Essence/ChasteTree.jpeg"],
    paragraphs: [
        "Chaste tree, Vitex agnus-castus, is a Mediterranean shrub whose fruits, often called chaste berries, have a long history of use in women's herbal medicine. It is particularly associated with menstrual and reproductive wellness. Vitex agnus-castus belongs to the Lamiaceae family and is a woody shrub with aromatic, palmately divided leaves and spikes of lilac or violet flowers.",
        "Its fruits contain flavonoids, iridoids, diterpenes and volatile constituents that contribute to its biological activity. Chaste tree has been studied particularly for premenstrual symptoms and reproductive health. Proposed mechanisms include effects on dopaminergic and neuroendocrine pathways, including prolactin regulation. Clinical trials have produced evidence supporting some uses, although results depend on extract standardisation and the condition being studied.",
        "Chaste tree has been used in European herbal medicine for generations and remains one of the most widely recognised botanical ingredients for women's hormonal wellness. Contemporary research continues to examine its role in menstrual and menopausal health and the mechanisms underlying its traditional applications."
    ]
},
{
    name: "Wild Yam",
    subtitle: "(Dioscorea villosa)",
    image: "/images/Our Essence/WildYam.avif",
    detailImages: ["/images/Our Essence/WildYam.avif"],
    paragraphs: [
        "Wild yam refers to species of the genus Dioscorea, with several species historically used in traditional medicine. Wild yams are best known for their naturally occurring steroidal sapogenins, particularly diosgenin, which has attracted considerable pharmaceutical and phytochemical interest. Dioscorea species are climbing or twining plants belonging to the Dioscoreaceae family.",
        "They develop underground tubers or rhizomes that serve as important storage organs. Different species contain varying levels of steroidal compounds, including diosgenin and related saponins. Laboratory research has investigated Dioscorea constituents for antioxidant, anti-inflammatory, metabolic and hormone-related biological activities. Diosgenin is particularly significant because of its use as a chemical starting material in the historical semi-synthesis of several steroidal pharmaceutical compounds. However, the human body does not simply convert dietary diosgenin into progesterone or other human hormones.",
        "Yams have enormous nutritional and cultural importance across Africa, Asia, the Caribbean and other tropical regions. Beyond their role as food crops, Dioscorea species have become important subjects of pharmaceutical and natural-product research because of their steroidal phytochemicals."
    ]
},
{
    name: "Hops",
    subtitle: "(Humulus lupulus)",
    image: "/images/Our Essence/Hops.jpeg",
    detailImages: ["/images/Our Essence/Hops.jpeg"],
    paragraphs: [
        "Hops, Humulus lupulus, are the female flowering cones of a climbing perennial plant best known for giving beer its characteristic bitterness and aroma. The same botanical has a long history of use in traditional herbal preparations associated with relaxation and digestive comfort. Hops belong to the Cannabaceae family and produce resin-rich female inflorescences containing bitter acids, essential oils and prenylated flavonoids.",
        "Important phytochemicals include humulones, lupulones, xanthohumol and 8-prenylnaringenin. Traditional use has focused particularly on relaxation and sleep. Research has identified antioxidant, anti-inflammatory, antimicrobial and phytoestrogenic activities among hop constituents. The prenylated flavonoid 8-prenylnaringenin is of particular scientific interest because of its estrogen-receptor activity, while other constituents have been investigated for antioxidant and cellular effects.",
        "Hops have an important cultural role in brewing and an equally interesting history in herbal medicine. Today, hop extracts are investigated in areas ranging from sleep and women's wellness to metabolic and cellular health, although clinical evidence varies according to preparation and intended use."
    ]
},
{
    name: "Black Cohosh",
    subtitle: "(Actaea racemosa)",
    image: "/images/Our Essence/BlackCohosh.jpg",
    detailImages: ["/images/Our Essence/BlackCohosh.jpg"],
    paragraphs: [
        "Black cohosh, Actaea racemosa (formerly Cimicifuga racemosa), is a perennial North American woodland plant best known for its traditional and modern association with women's menopausal wellness. Black cohosh belongs to the Ranunculaceae family and develops tall flowering stems with elongated clusters of small white flowers.",
        "Its underground rhizome and roots contain triterpene glycosides, phenolic compounds, chromones and other constituents that have been investigated for biological activity. Black cohosh has been studied primarily for menopausal symptoms such as hot flashes, sweating, sleep disturbance and mood-related complaints. Some clinical studies have reported benefits, but the evidence is not completely consistent, partly because commercially available extracts differ in composition and standardisation. Modern systematic reviews continue to emphasise the need for well-designed clinical trials.",
        "Native American traditions included black cohosh among medicinal plants used for women's health and other complaints. Over the past century, it has become one of the most extensively researched Western herbal ingredients for menopause, demonstrating how traditional botanical knowledge can influence modern women's wellness research."
    ]
},
{
    name: "Angelica",
    subtitle: "(Angelica archangelica L.)",
    image: "/images/Our Essence/Angelica.webp",
    detailImages: ["/images/Our Essence/Angelica.webp"],
    paragraphs: [
        "Angelica archangelica L., commonly known as garden angelica or European angelica, is an aromatic medicinal herb with a long history in traditional European herbal medicine. Native to northern and central Europe, the plant has traditionally been valued for its aromatic root and has been used particularly in preparations intended to support digestion, appetite and general vitality. Its distinctive fragrance and rich phytochemical profile have made angelica an enduring botanical in traditional herbal practices.",
        "Angelica archangelica belongs to the Apiaceae (carrot) family and is a large biennial or short-lived perennial herb that can grow to considerable height. It has a robust, hollow stem, large divided leaves and characteristic rounded umbels of small greenish-white flowers. The roots, fruits and other plant parts contain essential oils, coumarins, furanocoumarins, phenolic compounds and other naturally occurring constituents. Compounds such as α-pinene, β-phellandrene and other volatile terpenes contribute to its characteristic aromatic profile.",
        "Angelica has been an important traditional European herb for centuries and has also been used as a culinary flavouring and aromatic ingredient. Its roots and seeds are used in herbal preparations and flavouring applications, while modern pharmacognosy continues to investigate its essential oils and coumarin constituents. The plant's combination of traditional heritage, distinctive aroma and diverse phytochemistry gives Angelica archangelica a valued place among contemporary botanical wellness ingredients."
    ]
},
{
    name: "Ginseng",
    subtitle: "(Panax ginseng)",
    image: "/images/Our Essence/ginseng.webp",
    detailImages: ["/images/Our Essence/ginseng.webp"],
    paragraphs: [
        "Ginseng, particularly Asian or Korean ginseng (Panax ginseng C.A. Meyer), is one of the world's most extensively studied traditional medicinal plants. Its root has been valued for centuries in East Asian traditions for vitality, resilience and general well-being. Panax ginseng is a slow-growing perennial herb belonging to the Araliaceae family.",
        "Its characteristic palmate leaves surround a central flowering stem, while the fleshy root develops slowly underground. The major bioactive compounds are ginsenosides, accompanied by polysaccharides, polyacetylenes, peptides and other constituents. Scientific research has investigated ginseng for fatigue, cognitive function, immune activity, metabolic health, antioxidant effects, stress and aspects of sexual health. Ginsenosides appear to influence multiple biological pathways, which may help explain the broad pharmacological interest surrounding the plant.",
        "Ginseng has deep roots in Chinese and Korean traditional medicine and remains an important cultural and commercial botanical worldwide. Today, it is used in teas, extracts, functional foods, supplements and wellness formulations, while modern research continues to explore how its diverse ginsenosides interact with human physiology."
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
    const [modalIngredient, setModalIngredient] = useState<string | null>(null);
    const activeIngredientData = allIngredients.find(i => i.name === modalIngredient);

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
                            onClick={() => setModalIngredient(ing.name)}
                            whileHover={{ y: -4 }}
                            className="flex flex-col items-center text-center p-4 rounded-2xl border-2 border-gray-100 bg-white hover:border-pink/40 hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-solid border-[#E5097F] mb-3 flex-shrink-0">
                                <Image src={ing.image} alt={ing.name} width={200} height={200} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-[13px] sm:text-[14px] font-semibold leading-tight text-black">{ing.name}</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">{ing.subtitle}</p>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* Ingredient Products Modal */}
            <AnimatePresence>
                {modalIngredient && activeIngredientData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setModalIngredient(null)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="relative z-10 w-full max-w-[680px] max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-100 px-6 py-4">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-pink mb-0.5">Key Ingredients</p>
                                    <h3 className="font-display text-[20px] sm:text-[24px] text-dark leading-tight">
                                        Products with <span className="text-pink">{modalIngredient}</span>
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setModalIngredient(null)}
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <X size={18} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <p className="text-[13px] text-gray-500 mb-5">
                                    {activeIngredientData.products.length} product{activeIngredientData.products.length !== 1 ? "s" : ""} contain this ingredient
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {activeIngredientData.products.map((productName) => {
                                        const p = productDetails[productName];
                                        if (!p) return null;
                                        return (
                                            <motion.div
                                                key={productName}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex gap-4 items-start bg-[#fafafa] rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
                                            >
                                                <div className="w-[80px] h-[80px] flex-shrink-0 bg-white rounded-lg flex items-center justify-center p-2 border border-gray-100">
                                                    <Image src={p.image} alt={productName} width={160} height={160} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <h4 className="font-bold text-[14px] sm:text-[15px] text-black leading-tight">{productName}</h4>
                                                    <p className="text-[12px] text-gray-600 mt-1 leading-[1.5] line-clamp-3">{p.desc}</p>
                                                    <Link
                                                        href={`/enquiry?product=${encodeURIComponent(productName)}`}
                                                        className="mt-2 inline-block text-[12px] font-semibold text-pink hover:underline"
                                                    >
                                                        Enquire Now →
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Wellness is a daily ritual */}
            <WellnessIsDailyRitual />
        </div>
    );
}
