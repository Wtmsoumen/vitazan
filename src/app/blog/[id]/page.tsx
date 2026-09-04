"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";
import AnimatedSection from "@/components/client/AnimatedSection";

const blogPosts = [
    {
        id: 1,
        img: "/images/blog1.png",
        tag: "Bone & Joint Health",
        title: "VITAZAN Osteomac - Comprehensive Bone Health Support Explained",
        desc: "Bone health requires more than just calcium. VITAZAN OSTEOMAC delivers a complete, research-backed solution for maintaining bone density and joint flexibility throughout life.",
        date: "Jul 20, 2026",
        readTime: "5 min read",
        author: "Vitazan Health Team",
        content: [
            {
                type: "intro",
                text: "Bone health is one of the most overlooked aspects of long-term wellness. While most people associate strong bones with calcium supplementation, modern research reveals a far more complex picture. VITAZAN OSTEOMAC was formulated with this complexity in mind — delivering a synergistic blend of nutrients that work together to maintain bone density, support joint flexibility, and promote overall skeletal health.",
            },
            {
                type: "heading",
                text: "Why Calcium Alone Isn't Enough",
            },
            {
                type: "paragraph",
                text: "Calcium is undeniably important for bone health, but without the right co-factors, much of the calcium you consume may never reach your bones. Vitamin D3 acts as a gatekeeper, enhancing calcium absorption in the intestine and regulating how much calcium is retained by the kidneys. Without adequate Vitamin D3, even high-dose calcium supplementation may be largely ineffective.",
            },
            {
                type: "paragraph",
                text: "Magnesium plays an equally critical role — it activates Vitamin D and is required for the proper functioning of over 300 enzymatic reactions in the body, many of which are directly related to bone metabolism. Zinc, meanwhile, supports the production of collagen, the structural protein that gives bones their flexibility and resistance to fracture.",
            },
            {
                type: "heading",
                text: "The OSTEOMAC Formulation",
            },
            {
                type: "paragraph",
                text: "VITAZAN OSTEOMAC combines Calcium Citrate Maleate — a highly bioavailable form of calcium that is absorbed efficiently even without food — with Vitamin D3, Magnesium, and Zinc in proportions that reflect current nutritional science. Calcium Citrate Maleate has been shown in clinical studies to be superior to conventional calcium carbonate, particularly for individuals with lower stomach acid levels.",
            },
            {
                type: "callout",
                text: "Research suggests that Calcium Citrate Maleate can increase bone density by up to 8% more effectively than calcium carbonate over a 12-month period.",
            },
            {
                type: "heading",
                text: "Who Benefits Most from OSTEOMAC?",
            },
            {
                type: "paragraph",
                text: "OSTEOMAC is designed for adults of all ages who are concerned about their bone health. Women approaching menopause experience a significant acceleration in bone loss due to declining oestrogen levels, making supplementation particularly important during this phase. Older adults, athletes, and individuals with limited dairy intake or sun exposure also stand to benefit considerably.",
            },
            {
                type: "paragraph",
                text: "For younger adults, OSTEOMAC supports the continued development of peak bone mass, which is typically reached in the late twenties. Building strong bones early creates a valuable reserve against the natural bone loss that begins in the mid-thirties.",
            },
            {
                type: "heading",
                text: "Incorporating OSTEOMAC into Your Daily Routine",
            },
            {
                type: "paragraph",
                text: "For best results, take OSTEOMAC as part of a comprehensive wellness routine that includes weight-bearing exercise, adequate hydration, and a balanced diet rich in leafy greens, nuts, and seeds. Avoiding excessive caffeine and alcohol can also help maximise the effectiveness of the supplement.",
            },
        ],
        relatedIds: [2, 7],
    },
    {
        id: 2,
        img: "/images/blog2.png",
        tag: "Healthy Living",
        title: "Understanding Bone Health - The Key to Strength and Mobility",
        desc: "Strong bones are the foundation of an active lifestyle. Learn how proper nutrition, exercise, and supplementation work together to support your skeletal system.",
        date: "Jul 18, 2026",
        readTime: "4 min read",
        author: "Vitazan Health Team",
        content: [
            {
                type: "intro",
                text: "Your skeletal system is far more than a structural framework. Bones are living tissues — constantly being broken down and rebuilt in a dynamic process called bone remodelling. Understanding this process is the first step toward making informed decisions about your bone health.",
            },
            {
                type: "heading",
                text: "Bone Remodelling: A Continuous Process",
            },
            {
                type: "paragraph",
                text: "Throughout your life, specialised cells called osteoclasts break down old bone tissue, while osteoblasts build new bone to replace it. In youth, bone formation outpaces bone resorption, allowing bone density to increase. After the age of around 35, the balance gradually shifts, and bone loss begins to exceed gain — making proactive bone health strategies increasingly important.",
            },
            {
                type: "heading",
                text: "The Role of Exercise",
            },
            {
                type: "paragraph",
                text: "Weight-bearing exercise is one of the most powerful tools for maintaining bone health. Activities such as walking, jogging, dancing, and resistance training stimulate osteoblast activity, encouraging the body to build denser, stronger bone. Even moderate exercise performed consistently can meaningfully reduce the risk of osteoporosis over time.",
            },
            {
                type: "callout",
                text: "Studies show that individuals who perform 30 minutes of weight-bearing exercise at least four times per week have significantly higher bone density than those who are sedentary.",
            },
            {
                type: "heading",
                text: "Nutrition for Bone Strength",
            },
            {
                type: "paragraph",
                text: "A bone-supportive diet goes beyond dairy products. Dark leafy greens such as kale and spinach, almonds, sesame seeds, and fortified plant milks are all excellent sources of calcium. Vitamin K2, found in fermented foods and some cheeses, plays a crucial role in directing calcium into bones rather than soft tissues. Adequate protein intake also supports the collagen matrix that gives bones their tensile strength.",
            },
        ],
        relatedIds: [1, 7],
    },
    {
        id: 3,
        img: "/images/blog3.png",
        tag: "Vitality Store",
        title: "Healthy Living in the Modern Age - Small Habits That Create Big Impact",
        desc: "In today's fast-paced world, maintaining wellness can feel overwhelming. Discover simple, evidence-based habits that make a real difference in your daily health.",
        date: "Jul 15, 2026",
        readTime: "6 min read",
        author: "Vitazan Health Team",
        content: [
            {
                type: "intro",
                text: "Wellness doesn't require dramatic lifestyle overhauls. Research consistently shows that small, sustainable habits — practised daily — produce more lasting results than intensive short-term interventions. The key is consistency, not perfection.",
            },
            {
                type: "heading",
                text: "Start with Sleep",
            },
            {
                type: "paragraph",
                text: "Sleep is the foundation of every other wellness habit. During deep sleep, the body repairs tissues, consolidates memories, regulates hormones, and clears metabolic waste from the brain. Adults who consistently sleep seven to nine hours per night have significantly lower risks of obesity, heart disease, and mental health challenges compared to those who are chronically sleep-deprived.",
            },
            {
                type: "heading",
                text: "Hydration: The Overlooked Essential",
            },
            {
                type: "paragraph",
                text: "Even mild dehydration — as little as 1–2% of body weight — can impair cognitive function, reduce physical performance, and affect mood. Starting the day with a glass of water before coffee or tea sets a positive tone for hydration throughout the day. Aiming for pale yellow urine is a practical and reliable hydration target.",
            },
            {
                type: "callout",
                text: "A simple rule: drink a glass of water before every meal. This single habit can significantly improve daily hydration levels without requiring constant monitoring.",
            },
            {
                type: "heading",
                text: "Movement Throughout the Day",
            },
            {
                type: "paragraph",
                text: "Prolonged sitting has been described as a significant health risk, even for individuals who exercise regularly. Breaking up sedentary time with brief movement — a two-minute walk every hour, standing while on calls, or simple stretching — can meaningfully reduce this risk. These micro-movements add up to significant physical activity over the course of a week.",
            },
        ],
        relatedIds: [4, 6],
    },
    {
        id: 4,
        img: "/images/blog1.png",
        tag: "Immunity",
        title: "Boosting Your Immune System Naturally - A Complete Guide",
        desc: "Your immune system is your body's first line of defense. Explore natural ways to strengthen immunity through diet, lifestyle choices, and targeted supplementation.",
        date: "Jul 12, 2026",
        readTime: "7 min read",
        author: "Vitazan Health Team",
        content: [
            {
                type: "intro",
                text: "The immune system is a sophisticated network of cells, tissues, and organs that work in concert to defend the body against pathogens, abnormal cells, and foreign substances. Supporting this system naturally — through evidence-based lifestyle and nutritional strategies — is one of the most valuable investments in long-term health.",
            },
            {
                type: "heading",
                text: "The Gut-Immunity Connection",
            },
            {
                type: "paragraph",
                text: "Approximately 70–80% of the immune system resides in the gut. The trillions of microorganisms that make up the gut microbiome — collectively known as the gut microbiota — play a central role in immune education, regulation, and response. A diverse, fibre-rich diet supports the microbiome and, by extension, immune function.",
            },
            {
                type: "heading",
                text: "Key Nutrients for Immune Support",
            },
            {
                type: "paragraph",
                text: "Vitamin C is perhaps the best-known immune nutrient, supporting the production and function of white blood cells. Vitamin D, beyond its role in bone health, is a potent immune modulator — deficiency is associated with increased susceptibility to infections. Zinc supports the development of immune cells and has antiviral properties. Elderberry extract has demonstrated meaningful reductions in the duration and severity of upper respiratory infections in several clinical trials.",
            },
            {
                type: "callout",
                text: "Vitamin D deficiency is estimated to affect over a billion people worldwide, many of whom are unaware of its significant impact on immune resilience.",
            },
        ],
        relatedIds: [3, 9],
    },
    {
        id: 5,
        img: "/images/blog2.png",
        tag: "Nutrition",
        title: "The Role of Micronutrients in Daily Wellness",
        desc: "Vitamins and minerals play crucial roles in every bodily function. Understanding micronutrient needs can help you make better choices for long-term health.",
        date: "Jul 10, 2026",
        readTime: "5 min read",
        author: "Vitazan Health Team",
        content: [
            {
                type: "intro",
                text: "Micronutrients — the vitamins and minerals required by the body in relatively small amounts — are essential to virtually every physiological process. Unlike macronutrients, which provide energy, micronutrients act as co-factors, regulators, and structural components in thousands of biochemical reactions.",
            },
            {
                type: "heading",
                text: "The Most Common Deficiencies",
            },
            {
                type: "paragraph",
                text: "Despite living in an era of food abundance, micronutrient deficiencies remain widespread. Iron deficiency anaemia affects approximately 1.6 billion people globally. Vitamin D insufficiency is prevalent even in sunny climates due to indoor lifestyles. Iodine, magnesium, and B12 deficiencies are also common, particularly among those following plant-based diets.",
            },
            {
                type: "heading",
                text: "Food First, Supplement When Needed",
            },
            {
                type: "paragraph",
                text: "Whole foods remain the optimal source of micronutrients because they deliver nutrients in forms that are naturally well-absorbed and accompanied by beneficial co-factors. However, modern agricultural practices, food processing, and individual health conditions can create gaps that are difficult to fill through diet alone. Targeted supplementation, guided by blood testing where possible, can be an effective strategy for addressing specific deficiencies.",
            },
        ],
        relatedIds: [4, 8],
    },
    {
        id: 6,
        img: "/images/blog3.png",
        tag: "Healthy Living",
        title: "Ayurvedic Wisdom for Modern Wellness Challenges",
        desc: "Ancient Ayurvedic principles offer timeless solutions for today's health concerns. Learn how traditional knowledge meets modern science in holistic wellness.",
        date: "Jul 8, 2026",
        readTime: "6 min read",
        author: "Vitazan Health Team",
        content: [
            {
                type: "intro",
                text: "Ayurveda, the ancient Indian system of medicine, offers a profoundly holistic approach to health that views the body, mind, and spirit as interconnected. Dating back more than five thousand years, its principles have withstood the test of time — and modern science is increasingly validating many of its core insights.",
            },
            {
                type: "heading",
                text: "The Three Doshas",
            },
            {
                type: "paragraph",
                text: "Central to Ayurvedic philosophy are the three doshas — Vata, Pitta, and Kapha — which represent different combinations of the five elements and govern different physiological and psychological functions. Understanding your dominant dosha can provide useful guidance for personalising diet, exercise, sleep, and lifestyle choices in ways that promote balance and wellbeing.",
            },
            {
                type: "heading",
                text: "Adaptogens: Where Ayurveda Meets Modern Science",
            },
            {
                type: "paragraph",
                text: "Adaptogenic herbs — plants that help the body adapt to stress and restore physiological balance — are a cornerstone of Ayurvedic medicine. Ashwagandha, Tulsi (Holy Basil), and Shatavari have all been the subject of rigorous scientific research, with studies demonstrating their effects on cortisol regulation, cognitive function, and hormonal balance. These ancient remedies are finding new relevance in modern wellness.",
            },
            {
                type: "callout",
                text: "Ashwagandha has been shown in multiple randomised controlled trials to significantly reduce cortisol levels and self-reported stress scores in healthy adults.",
            },
        ],
        relatedIds: [3, 5],
    },
    {
        id: 7,
        img: "/images/blog1.png",
        tag: "Bone & Joint Health",
        title: "Why Calcium Alone Isn't Enough for Strong Bones",
        desc: "Many people rely solely on calcium for bone health, but research shows that a combination of nutrients is essential for optimal bone density and strength.",
        date: "Jul 5, 2026",
        readTime: "4 min read",
        author: "Vitazan Health Team",
        content: [
            {
                type: "intro",
                text: "The popular narrative around bone health has long centred on calcium — drink your milk, take your calcium supplements. While calcium is undeniably important, this narrow focus has obscured the reality that bone health is a multi-nutrient, multi-lifestyle phenomenon.",
            },
            {
                type: "heading",
                text: "The Calcium Paradox",
            },
            {
                type: "paragraph",
                text: "Some of the countries with the highest calcium intakes in the world also have the highest rates of osteoporosis. This apparent paradox suggests that calcium consumption alone does not determine bone health outcomes. The bioavailability of calcium — how much is actually absorbed and used — depends on a range of co-factors including Vitamin D, magnesium, and Vitamin K2.",
            },
            {
                type: "heading",
                text: "The Synergistic Approach",
            },
            {
                type: "paragraph",
                text: "Vitamin K2 is particularly important because it activates a protein called osteocalcin, which anchors calcium within bone tissue. Without adequate K2, calcium absorbed from food or supplements may deposit in arteries and soft tissues rather than bones — potentially contributing to cardiovascular risk while failing to strengthen the skeleton.",
            },
            {
                type: "callout",
                text: "Populations with high dietary K2 intake from fermented foods have consistently demonstrated better bone density and lower fracture rates in epidemiological studies.",
            },
        ],
        relatedIds: [1, 2],
    },
    {
        id: 8,
        img: "/images/blog2.png",
        tag: "Vitality Store",
        title: "From Fatigue to Vitality - Reclaiming Your Energy Naturally",
        desc: "Chronic fatigue affects millions worldwide. Discover how targeted nutrition, sleep optimization, and herbal supplements can restore your natural energy levels.",
        date: "Jul 2, 2026",
        readTime: "5 min read",
        author: "Vitazan Health Team",
        content: [
            {
                type: "intro",
                text: "Fatigue is one of the most common complaints in primary care, yet it remains one of the most complex to address. Unlike tiredness — which resolves with rest — persistent fatigue often signals an underlying imbalance in nutrition, sleep, stress management, or metabolic function.",
            },
            {
                type: "heading",
                text: "Identifying the Root Causes",
            },
            {
                type: "paragraph",
                text: "Before reaching for stimulants, it is worth investigating the root causes of fatigue. Iron-deficiency anaemia, hypothyroidism, Vitamin D deficiency, and B12 insufficiency are all common and treatable causes of persistent low energy. A comprehensive blood panel can identify these issues and guide targeted intervention.",
            },
            {
                type: "heading",
                text: "Nutritional Strategies for Energy",
            },
            {
                type: "paragraph",
                text: "Blood sugar stability is central to sustained energy. Diets high in refined carbohydrates and sugar create cycles of spikes and crashes that leave many people feeling exhausted by mid-afternoon. Prioritising protein, healthy fats, and fibre at each meal helps maintain steady blood glucose levels and supports consistent energy throughout the day.",
            },
            {
                type: "callout",
                text: "Even mild iron deficiency — without full anaemia — can cause measurable reductions in cognitive performance and physical endurance.",
            },
        ],
        relatedIds: [5, 3],
    },
    {
        id: 9,
        img: "/images/blog3.png",
        tag: "Immunity",
        title: "Seasonal Wellness - Preparing Your Body for Every Change",
        desc: "Each season brings unique health challenges. Learn proactive strategies to keep your immune system strong and your body resilient throughout the year.",
        date: "Jun 28, 2026",
        readTime: "4 min read",
        author: "Vitazan Health Team",
        content: [
            {
                type: "intro",
                text: "The changing of seasons is more than a meteorological event — it represents a significant environmental shift that the body must adapt to. Proactive seasonal wellness strategies can help maintain immunity, energy, and vitality through every transition.",
            },
            {
                type: "heading",
                text: "Autumn and Winter: Immune Preparation",
            },
            {
                type: "paragraph",
                text: "As temperatures drop and time spent outdoors decreases, Vitamin D synthesis from sunlight falls sharply. Supplementing Vitamin D through the autumn and winter months is one of the most evidence-based strategies for maintaining immune resilience during the cold and flu season. Zinc and Vitamin C are also worth prioritising during this period.",
            },
            {
                type: "heading",
                text: "Spring and Summer: Detoxification and Energy",
            },
            {
                type: "paragraph",
                text: "Warmer months bring longer days and greater opportunity for outdoor activity. This is an ideal time to focus on liver support — through bitter greens, dandelion root, and adequate hydration — and to reset sleep patterns by aligning with natural light cycles. Seasonal eating, favouring fresh produce that is locally and currently available, provides naturally higher nutrient density.",
            },
            {
                type: "callout",
                text: "Ayurvedic tradition recommends seasonal cleansing practices — Ritucharya — that align diet and lifestyle with the natural rhythms of each season to maintain doshic balance.",
            },
        ],
        relatedIds: [4, 6],
    },
];

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const post = blogPosts.find((p) => p.id === Number(id));

    if (!post) notFound();

    const related = blogPosts.filter((p) => post.relatedIds.includes(p.id));
    const currentIdx = blogPosts.findIndex((p) => p.id === post.id);
    const prevPost = blogPosts[currentIdx - 1] ?? null;
    const nextPost = blogPosts[currentIdx + 1] ?? null;

    return (
        <div className="w-full bg-white">
            {/* Hero */}
            <section className="relative w-full overflow-hidden h-[40vh] sm:h-[50vh] md:h-[60vh]">
                <Image src={post.img} alt={post.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />
                <div className="absolute inset-0 z-10 mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] flex flex-col justify-end pb-10 sm:pb-14 md:pb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-fit rounded-full bg-pink px-4 py-1.5 text-[12px] uppercase tracking-[1px] text-white font-semibold mb-4"
                    >
                        {post.tag}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-display text-[28px] sm:text-[40px] md:text-[52px] leading-[1.15] text-white max-w-[800px]"
                    >
                        {post.title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-4 flex flex-wrap items-center gap-4 text-white/70 text-[13px] sm:text-[14px]"
                    >
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
                        <span className="flex items-center gap-1.5"><Tag size={14} /> {post.author}</span>
                    </motion.div>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-4 sm:py-6">
                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                    <Link href="/" className="hover:text-pink transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-pink transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-black line-clamp-1">{post.title}</span>
                </div>
            </div>

            {/* Content */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] pb-12 md:pb-20">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

                    {/* Main content */}
                    <article className="flex-1 max-w-[800px]">
                        <AnimatedSection animation="fadeUp">
                            <div className="space-y-6">
                                {post.content.map((block, idx) => {
                                    if (block.type === "intro") return (
                                        <p key={idx} className="text-[17px] sm:text-[19px] leading-[1.8] text-gray-700 font-medium border-l-4 border-pink pl-5 py-1">
                                            {block.text}
                                        </p>
                                    );
                                    if (block.type === "heading") return (
                                        <h2 key={idx} className="font-display text-[22px] sm:text-[28px] md:text-[32px] text-black pt-4">
                                            {block.text}
                                        </h2>
                                    );
                                    if (block.type === "callout") return (
                                        <div key={idx} className="rounded-2xl bg-[#eaffad] px-6 sm:px-8 py-5 sm:py-6 border-l-4 border-[#578654]">
                                            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#003d4a] font-semibold italic">
                                                &ldquo;{block.text}&rdquo;
                                            </p>
                                        </div>
                                    );
                                    return (
                                        <p key={idx} className="text-[15px] sm:text-[17px] leading-[1.8] text-gray-700">
                                            {block.text}
                                        </p>
                                    );
                                })}
                            </div>
                        </AnimatedSection>

                        {/* Tags */}
                        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                            <span className="text-[13px] font-semibold text-gray-500 mr-1">Category:</span>
                            <span className="px-4 py-1.5 rounded-full bg-pink/10 text-pink text-[13px] font-semibold">
                                {post.tag}
                            </span>
                        </div>

                        {/* Prev / Next navigation */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {prevPost ? (
                                <Link href={`/blog/${prevPost.id}`} className="group flex items-center gap-3 rounded-xl border border-gray-100 p-4 hover:border-pink/40 hover:shadow-md transition-all">
                                    <ArrowLeft className="w-5 h-5 text-pink flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                                    <div className="min-w-0">
                                        <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold">Previous</p>
                                        <p className="text-[14px] font-semibold text-black leading-tight mt-0.5 line-clamp-2">{prevPost.title}</p>
                                    </div>
                                </Link>
                            ) : <div />}
                            {nextPost ? (
                                <Link href={`/blog/${nextPost.id}`} className="group flex items-center gap-3 rounded-xl border border-gray-100 p-4 hover:border-pink/40 hover:shadow-md transition-all text-right sm:flex-row-reverse">
                                    <ArrowRight className="w-5 h-5 text-pink flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                    <div className="min-w-0">
                                        <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold">Next</p>
                                        <p className="text-[14px] font-semibold text-black leading-tight mt-0.5 line-clamp-2">{nextPost.title}</p>
                                    </div>
                                </Link>
                            ) : <div />}
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0">
                        <div className="sticky top-28 space-y-8">
                            {/* About the article */}
                            <div className="rounded-2xl bg-[#f9f9f9] p-6">
                                <h3 className="font-display text-[18px] sm:text-[20px] text-black mb-4">About This Article</h3>
                                <div className="space-y-3 text-[14px] text-gray-600">
                                    <div className="flex items-center gap-2.5">
                                        <Calendar size={15} className="text-pink flex-shrink-0" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Clock size={15} className="text-pink flex-shrink-0" />
                                        <span>{post.readTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Tag size={15} className="text-pink flex-shrink-0" />
                                        <span>{post.tag}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Related posts */}
                            {related.length > 0 && (
                                <div>
                                    <h3 className="font-display text-[18px] sm:text-[20px] text-black mb-4">Related Articles</h3>
                                    <div className="space-y-4">
                                        {related.map((rp) => (
                                            <Link key={rp.id} href={`/blog/${rp.id}`} className="group flex gap-3 items-start">
                                                <div className="relative w-[80px] h-[60px] flex-shrink-0 rounded-xl overflow-hidden">
                                                    <Image src={rp.img} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[13px] font-semibold text-black leading-tight line-clamp-2 group-hover:text-pink transition-colors">
                                                        {rp.title}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400 mt-1">{rp.date}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="rounded-2xl bg-pink p-6 text-white">
                                <h3 className="font-display text-[20px] sm:text-[22px] mb-2">Explore Our Products</h3>
                                <p className="text-[13px] leading-[1.6] text-white/80 mb-4">
                                    Discover Vitazan's range of natural supplements crafted to support your wellness journey.
                                </p>
                                <Link href="/shop">
                                    <motion.div
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="rounded-full bg-white text-pink text-[14px] font-bold text-center py-2.5 px-5 cursor-pointer"
                                    >
                                        Shop Now
                                    </motion.div>
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
