"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/client/AnimatedSection";
import { notFound } from "next/navigation";
import { fetchProductDetails, Product as ApiProduct } from "@/utils/public";

const trustBadges = [
    { image: "/images/FreeShipping.svg", title: "Free Shipping", desc: "Over ₱199.00 USD" },
    { image: "/images/30daysGuarantee.svg", title: "Secure Payments", desc: "With credit and debit card" },
    { image: "/images/SecurePayments.svg", title: "30-Day Guarantee", desc: "No question asked" },
    { image: "/images/SustainableMaterials.svg", title: "Sustainable Materials", desc: "100% eco-friendly" },
];

type Product = {
    name: string;
    tagline: string;
    synopsis: string;
    description: string;
    benefits: string[];
    servingSize: string;
    servingsPerContainer: string;
    bestResults: string;
    suitableFor: string;
    ingredientsDesc: string;
    howToUse: string;
    caution: string;
    storage: string;
    faqs: { q: string; a: string }[];
    image: string;
    bannerImage: string;
    enquiryName: string;
    gender: string;
    therapeuticAreas: string[];
    ageGroups: string[];
    ourEssenceIngredients?: string[];
};

const products: Record<string, Product> = {
    "acinil-neo": {
        name: "ACINIL NEO™",
        tagline: "Fast Relief from Acidity & Heartburn, with a Protective Barrier",
        synopsis: "ACINIL NEO™ is a fast-acting liquid digestive relief formula designed to help neutralise excess stomach acid and provide soothing relief from acidity, heartburn and acid-related discomfort. Its refreshing peppermint and menthol provide a cool, comfortable after-meal experience, while its alginate-based formula helps form a protective barrier that can help reduce the upward movement of stomach contents. Available in convenient 10 ml sachets and 100 ml & 200 ml bottles, ACINIL NEO™ is easy to take whenever digestive discomfort strikes.",
        description: "Acidity, heartburn and that uncomfortable burning sensation after meals can interfere with your everyday life. Heavy meals, irregular eating habits and other everyday triggers can leave you feeling uncomfortable, bloated or unsettled. ACINIL NEO is designed to provide convenient relief from acid-related digestive discomfort in an easy-to-consume liquid format. The formula combines sodium alginate, sodium bicarbonate and calcium carbonate to provide a multi-action approach to acidity relief. The acid-neutralising ingredients work to counter excess stomach acid, while sodium alginate helps create a protective alginic barrier. This barrier can help reduce the contact of acidic stomach contents with the oesophageal area, helping to soothe the discomfort associated with acid reflux and heartburn. The addition of peppermint oil and menthol gives ACINIL NEO™ a refreshing taste and cooling sensation, making it pleasant and convenient to consume. ACINIL NEO is suitable for children, adults, and the elderly alike.",
        benefits: [
            "Fast-acting acid relief — helps neutralize excess stomach acid",
            "Protective alginic barrier to reduce upward movement of stomach contents",
            "Convenient liquid format — easy to consume after meals or at bedtime",
            "Refreshing peppermint & menthol cooling sensation",
            "Non-systemic digestive support — works locally in the digestive tract",
            "Suitable for everyday digestive comfort",
        ],
        servingSize: "5–10 ml per serving",
        servingsPerContainer: "10 ml sachet: 1 serving · 100 ml bottle: up to 20 servings · 200 ml bottle: up to 40 servings",
        bestResults: "For best results, take the recommended dose consistently, particularly after meals when acidity or heartburn symptoms are more likely to occur.",
        suitableFor: "Children, adults, and the elderly.",
        ingredientsDesc: "ACINIL NEO™ features a thoughtfully crafted blend of active and supporting ingredients. Sodium Alginate acts to form a soothing, physical barrier over stomach contents. Sodium Bicarbonate and Calcium Carbonate work together as fast-acting neutralizers, effectively lowering stomach acidity. Peppermint Oil and Menthol provide a refreshing, cooling sensation that soothes the throat and stomach. The formula is stabilized with Carbomer for ideal liquid consistency, Sodium Saccharin for a touch of sweetness without added sugar, and safe preservatives including methyl and propyl paraben sodium.",
        howToUse: "Adults: Consume 5–10 ml after meals and at bedtime, or as directed by a healthcare professional.",
        caution: "For oral use only. Do not exceed the recommended daily intake unless advised by a healthcare professional. Keep out of reach of children. If symptoms persist, worsen, or occur frequently, consult a healthcare professional.",
        storage: "Store in a cool, dry place away from direct sunlight. Keep the container tightly closed after use.",
        faqs: [
            { q: "What is ACINIL NEO™ used for?", a: "ACINIL NEO™ is designed to provide relief from acidity, heartburn and acid-related digestive discomfort." },
            { q: "How does ACINIL NEO™ work?", a: "It uses a combination of sodium bicarbonate and calcium carbonate to help neutralize excess stomach acid, while sodium alginate helps form a protective barrier over stomach contents." },
            { q: "When should I take ACINIL NEO™?", a: "Take 5–10 ml after meals and at bedtime, or as directed by a healthcare professional." },
            { q: "Can I take ACINIL NEO™ after a heavy meal?", a: "Yes. The product is designed for use after meals and can help relieve acid-related discomfort such as heartburn and acidity." },
            { q: "Is ACINIL NEO™ a tablet?", a: "No. It is a liquid formulation, making it convenient to consume without swallowing tablets." },
            { q: "Does ACINIL NEO™ contain peppermint?", a: "Yes. It contains peppermint oil and menthol, which provide a refreshing and cooling sensation." },
            { q: "What is the benefit of sodium alginate?", a: "Sodium alginate helps create a protective alginic barrier, which can help reduce the upward movement of acidic stomach contents and support relief from reflux-related discomfort." },
            { q: "Can I use ACINIL NEO™ regularly?", a: "ACINIL NEO™ should be used according to the recommended dosage. For frequent or persistent acidity symptoms, consult a healthcare professional rather than relying on continued self-treatment." },
            { q: "Can I take ACINIL NEO™ with other medicines?", a: "Some medicines may interact with antacid products or may need to be taken separately. If you take prescription or regular medicines, consult your healthcare professional before use." },
            { q: "What pack sizes are available?", a: "ACINIL NEO™ is available in 10 ml sachets, 100 ml bottles and 200 ml bottles." },
        ],
        image: "/images/ACINIL_NEO.png",
        bannerImage: "/images/shopDetailsBanner.png",
        enquiryName: "ACINIL NEO",
        gender: "General Wellness",
        therapeuticAreas: ["Gut Health"],
        ageGroups: ["Adolescent (13–17)", "Young Adults (18–25)", "Adults (26–40)", "Middle-Aged (41–60)", "Seniors (60+)"],
        ourEssenceIngredients: ["Peppermint"],
    },
    "alfaaktiv-pro": {
        name: "ALFAAKTIV PRO",
        tagline: "Advanced Male Fertility & Hormonal Wellness Support",
        synopsis: "ALFAAKTIV PRO is a premium nutraceutical formulation designed to support male reproductive health, hormonal balance, and sexual wellness. It features a scientifically curated blend of botanical extracts, antioxidants, amino acids, and essential minerals that help support reproductive health, vitality, and overall male well-being. Each ALFAAKTIV PRO pack is designed to provide a 30-day supply when consumed as recommended.",
        description: "Male reproductive health and hormonal balance play a vital role in overall vitality, confidence, and long-term wellness. Modern lifestyle factors such as stress, poor diet, environmental exposure, and ageing can impact testosterone levels, fertility potential, and sexual health over time. ALFAAKTIV PRO is formulated to provide comprehensive nutritional support for men by addressing multiple aspects of male wellness. The formulation combines traditionally used herbal extracts with modern nutritional actives to help support healthy testosterone levels, support reproductive function, and promote urinary tract health. Damiana and Saw Palmetto have a long history of traditional use in supporting male vitality and sexual wellness. Nettle root and Zinc contribute to hormonal balance and reproductive health, while Acetyl-L-Carnitine plays an important role in energy metabolism and sperm health. Trans-Resveratrol, Quercetin, and Pomegranate extract provide antioxidant support, helping protect cells from oxidative stress that can affect overall vitality.",
        benefits: [
            "Support male reproductive health and fertility potential",
            "Help maintain normal testosterone levels",
            "Support sexual health and vitality",
            "Maintain normal urinary tract function",
            "Provide antioxidant protection for overall wellness",
        ],
        servingSize: "2 Capsules",
        servingsPerContainer: "30 (60 capsules per jar — 30-day supply)",
        bestResults: "Consume regularly as part of your daily wellness routine.",
        suitableFor: "Young adults, adults, and middle-aged men who wish to proactively support their reproductive and hormonal health as part of a balanced lifestyle.",
        ingredientsDesc: "ALFAAKTIV PRO is powered by a carefully balanced blend of plant extracts and essential nutrients. Damiana Leaf Extract and Saw Palmetto Extract help support male vitality and urinary health. Nettle Root Extract and Zinc contribute to maintaining normal hormonal balance and reproductive function. Acetyl-L-Carnitine supports energy production and sperm health, while Trans-Resveratrol, Quercetin Dihydrate, and Pomegranate Extract provide strong antioxidant support for cellular health.",
        howToUse: "Take two (2) capsules once daily after meals with water, or as directed by a healthcare professional.",
        caution: "Not recommended for children. If you are under medical supervision, taking medication, or have a medical condition, consult a healthcare professional before use. Do not exceed the recommended dosage. This product is not intended to diagnose, treat, cure, or prevent any disease(s).",
        storage: "Store in a cool, dry place away from direct sunlight and moisture. Keep the container tightly closed and out of reach of children.",
        faqs: [
            { q: "What is ALFAAKTIV PRO used for?", a: "ALFAAKTIV PRO is designed to support male fertility, hormonal balance, sexual wellness, and overall vitality." },
            { q: "How many capsules should I take daily?", a: "It is recommended to take two (2) capsules daily after meals or as directed by a healthcare professional." },
            { q: "Is ALFAAKTIV PRO safe for long-term use?", a: "Yes, when used as recommended, ALFAAKTIV PRO is suitable for daily and long-term wellness support." },
            { q: "Are there any side effects?", a: "ALFAAKTIV PRO is generally well tolerated when consumed as directed. Consult a healthcare professional if you experience any adverse effects." },
            { q: "Who can use ALFAAKTIV PRO?", a: "ALFAAKTIV PRO is suitable for adult men looking to support reproductive health, hormonal balance, and overall vitality." },
            { q: "How does ALFAAKTIV PRO™ support men's wellness?", a: "It combines botanical extracts, antioxidants, Acetyl-L-carnitine and Zinc to provide complementary support for reproductive, hormonal and urinary wellness." },
            { q: "Does ALFAAKTIV PRO™ support testosterone levels?", a: "Yes. ALFAAKTIV PRO™ contains Zinc, which contributes to the maintenance of normal testosterone levels in the body." },
            { q: "Does ALFAAKTIV PRO™ support male fertility?", a: "The formula is designed to provide nutritional and botanical support for male reproductive wellness. It should not be considered a treatment or guaranteed solution for infertility." },
            { q: "What is the recommended dosage?", a: "Consume two (2) capsules once daily after a meal, or as directed by a healthcare professional." },
            { q: "How long will one jar last?", a: "Each jar contains 60 capsules. At the recommended dosage of two capsules per day, one jar provides approximately 30 days of use." },
        ],
        image: "/images/ALFAAKTIV.png",
        bannerImage: "/images/shopDetailsBanner.png",
        enquiryName: "ALFAAKTIV PRO",
        gender: "Male Vitality",
        therapeuticAreas: ["Fertility", "Hormonal Balance", "Sexual Health"],
        ageGroups: ["Young Adults (18–25)", "Adults (26–40)", "Middle-Aged (41–60)"],
        ourEssenceIngredients: ["Damiana Leaf Extract", "Saw Palmetto Extract", "Nettle Root Extract", "Pomegranate Extract"],
    },
    "cystnil": {
        name: "VITAZAN™ CYSTNIL TABLETS",
        tagline: "Nutritional Support for Hormonal & Metabolic Balance in Women",
        synopsis: "VITAZAN™ CYSTNIL Tablets is a nutraceutical formulation developed to support female hormonal balance, metabolic wellness, and reproductive health. It combines Myo-Inositol, essential micronutrients, and supportive nutrients to provide daily nutritional support for women with increased metabolic and hormonal needs. Each VITAZAN™ CYSTNIL pack is designed to provide a 60-day supply when consumed as recommended.",
        description: "Hormonal balance and metabolic function play an important role in menstrual regularity, reproductive wellness, and overall female vitality. Nutritional gaps, lifestyle factors, and metabolic challenges may influence insulin response, hormonal activity, and ovarian function over time. VITAZAN™ CYSTNIL Tablets is formulated to provide targeted nutritional support through a combination of Myo-Inositol, vitamins, minerals, and amino acids. Myo-Inositol is widely used as a nutritional support ingredient for insulin metabolism and hormonal balance. Chromium and Selenium contribute to normal metabolic function and antioxidant protection, while Vitamin D3 supports overall wellness. L-Carnitine plays a role in energy metabolism, and Folic Acid contributes to normal reproductive health. Together, these nutrients work synergistically to support key aspects of women's wellness.",
        benefits: [
            "Support hormonal balance and metabolic health",
            "Support insulin sensitivity and normal glucose metabolism",
            "Support ovarian and reproductive wellness",
            "Promote healthy menstrual regularity",
            "Support overall energy and vitality",
        ],
        servingSize: "1 Tablet",
        servingsPerContainer: "30 (60-day supply when taken as recommended)",
        bestResults: "Consume regularly as part of a balanced diet and healthy lifestyle.",
        suitableFor: "Adolescent girls, young adults, adults, and middle-aged women who wish to support hormonal and metabolic balance as part of a healthy lifestyle.",
        ingredientsDesc: "VITAZAN™ CYSTNIL Tablets contains a carefully selected blend of nutrients known for their supportive roles in women's metabolic and hormonal wellness. Myo-Inositol supports insulin metabolism and hormonal balance. Chromium Picolinate contributes to normal glucose metabolism, while Selenium provides antioxidant support. Vitamin D3 supports overall health, L-Carnitine contributes to energy metabolism, and Folic Acid supports reproductive wellness.",
        howToUse: "Take one (1) tablet daily after meals with water, or as directed by a healthcare professional.",
        caution: "Not recommended for children below 13 years. If you are pregnant, breastfeeding, under medical supervision, taking medication, or have any medical condition, consult a healthcare professional before use. Do not exceed the recommended dosage. This product is a food supplement and is not intended to diagnose, treat, cure, or prevent any disease(s).",
        storage: "Store in a cool, dry place away from direct sunlight and moisture. Keep the container tightly closed and out of reach of children.",
        faqs: [
            { q: "What is VITAZAN™ CYSTNIL Tablets used for?", a: "CYSTNIL Tablets is designed to support hormonal balance, metabolic wellness, and reproductive health in women." },
            { q: "How should CYSTNIL be taken?", a: "It is recommended to take one (1) tablet daily after meals or as advised by a healthcare professional." },
            { q: "Is CYSTNIL suitable for long-term use?", a: "Yes, when used as recommended, CYSTNIL can be used as part of a long-term wellness routine." },
            { q: "Are there any side effects?", a: "CYSTNIL is generally well tolerated when consumed as directed. Consult a healthcare professional if you experience any adverse effects." },
            { q: "Who can use CYSTNIL Tablets?", a: "CYSTNIL Tablets is suitable for adolescent girls and adult women seeking nutritional support for hormonal and metabolic balance." },
            { q: "How does Chromium support women's health?", a: "Chromium contributes to normal macronutrient metabolism and maintenance of normal blood glucose levels, providing nutritional support for metabolic wellness." },
            { q: "Why does CYSTNIL™ contain Vitamin D3?", a: "Vitamin D3 provides essential nutritional support and contributes to normal calcium metabolism and overall health." },
            { q: "What is the role of Selenium?", a: "Selenium is an essential trace mineral that contributes to the body's protection against oxidative stress and supports normal thyroid function." },
            { q: "Why is L-Carnitine included?", a: "L-Carnitine is involved in normal energy metabolism and helps the body utilize fatty acids as an energy source." },
            { q: "Why does CYSTNIL™ contain Folic Acid?", a: "Folic acid contributes to normal cell division and blood formation and is an important nutrient during the reproductive years." },
        ],
        image: "/images/CYSTNIL SURE.png",
        bannerImage: "/images/shopDetailsBanner.png",
        enquiryName: "CYSTNIL TABLETS",
        gender: "Female Vitality",
        therapeuticAreas: ["PCOS/PCOD", "Fertility", "Menstruation", "Sexual Health"],
        ageGroups: ["Adolescent (13–17)", "Young Adults (18–25)", "Adults (26–40)", "Middle-Aged (41–60)"],
    },
    "diaron-c": {
        name: "DIARON-C CAPSULES",
        tagline: "Gentle Daily Iron & Micronutrient Support for Nutritional Wellness",
        synopsis: "DIARON-C Capsules is a nutraceutical formulation developed to support daily iron intake, red blood cell nutrition, and overall micronutrient balance. It features Carbonyl Iron along with essential vitamins and minerals to provide gentle, well-tolerated nutritional support as part of a balanced diet. Each DIARON-C pack is designed to provide a 30-day supply when consumed as recommended.",
        description: "Adequate intake of iron and supportive micronutrients plays an important role in daily vitality, oxygen transport, and overall nutritional wellness. Dietary gaps, increased nutritional needs, and lifestyle factors may sometimes affect optimal intake of iron and key vitamins. DIARON-C capsules are formulated using Carbonyl Iron, a form of iron known for its gentle absorption profile and improved gastrointestinal tolerability when compared with some traditional iron salts. The formulation is complemented with Zinc, Folic Acid, Vitamin B12, and Vitamin C (Ascorbic Acid) to support nutrient absorption and overall nutritional balance. Vitamin C helps enhance iron absorption, while Folic Acid and Vitamin B12 contribute to normal red blood cell formation. Zinc supports overall metabolic and immune function. Together, these nutrients provide comprehensive nutritional support in a convenient, once-daily capsule.",
        benefits: [
            "Support daily iron intake and nutritional balance",
            "Contribute to normal red blood cell formation",
            "Support energy and overall vitality",
            "Enhance iron absorption with added Vitamin C",
            "Provide gentle, well-tolerated micronutrient support",
        ],
        servingSize: "1 Capsule",
        servingsPerContainer: "30 (30-day supply)",
        bestResults: "Consume regularly as part of a balanced diet and healthy lifestyle.",
        suitableFor: "Adolescents, adults, seniors, and individuals with increased nutritional iron requirements when used as part of a healthy lifestyle.",
        ingredientsDesc: "DIARON-C capsules contain a balanced blend of iron and essential micronutrients selected for their supportive nutritional roles. Carbonyl Iron provides a gentle source of iron. Vitamin C enhances iron absorption, while Folic Acid and Vitamin B12 contribute to normal red blood cell formation. Zinc supports overall metabolic and nutritional health.",
        howToUse: "Take one (1) capsule daily with water after meals, or as directed by a healthcare professional.",
        caution: "Not recommended for children below 13 years. If you are pregnant, breastfeeding, under medical supervision, taking medication, or have any medical condition, consult a healthcare professional before use. Do not exceed the recommended dosage. This product is a food supplement and is not intended to diagnose, treat, cure, or prevent any disease(s).",
        storage: "Store in a cool, dry place away from direct sunlight and moisture. Keep the blister pack protected and out of reach of children.",
        faqs: [
            { q: "What is DIARON-C Capsules used for?", a: "DIARON-C capsules is designed to support daily iron intake, red blood cell nutrition, and overall micronutrient balance." },
            { q: "How should DIARON-C be taken?", a: "Take one (1) capsule daily after meals or as advised by a healthcare professional." },
            { q: "Is DIARON-C gentle on the stomach?", a: "DIARON-C uses carbonyl iron, which is generally well tolerated when used as recommended." },
            { q: "Can DIARON-C be used long-term?", a: "Yes, when used as directed, DIARON-C is suitable for daily and long-term nutritional support." },
            { q: "Who can use DIARON-C capsules?", a: "DIARON-C capsules is suitable for adolescents, adults, and seniors looking to support iron and micronutrient intake as part of a balanced diet." },
            { q: "Does DIARON-C™ have a metallic taste?", a: "DIARON-C™ is supplied as a capsule, so it avoids the direct metallic taste commonly experienced with some liquid iron preparations." },
            { q: "Can I take DIARON-C™ with another iron supplement?", a: "It is recommended to consult your healthcare professional before combining DIARON-C™ with another iron-containing supplement. Taking multiple products containing iron may result in unnecessary additional iron intake." },
            { q: "How long does one pack last?", a: "Each pack contains 30 capsules. At the recommended dosage of one capsule per day, one pack provides approximately 30 days of supplementation." },
            { q: "Is DIARON-C™ a multivitamin?", a: "DIARON-C™ is more specifically positioned as an iron, vitamin and mineral nutritional supplement, combining iron with folic acid, vitamin B12, zinc and vitamin C." },
        ],
        image: "/images/DIARON-C.png",
        bannerImage: "/images/shopDetailsBanner.png",
        enquiryName: "DIARON-C",
        gender: "General Wellness",
        therapeuticAreas: ["Iron Supplement", "Vitamins & Nutrition"],
        ageGroups: ["Adolescent (13–17)", "Young Adults (18–25)", "Adults (26–40)", "Middle-Aged (41–60)", "Seniors (60+)"],
    },
    "femisan-a": {
        name: "FEMISAN A CAPSULES",
        tagline: "Natural Hormonal & Menstrual Wellness Support for Women",
        synopsis: "FEMISAN A Capsules is a premium nutraceutical formulation developed to support female reproductive health, hormonal balance, and menstrual wellness. It combines traditionally used herbal extracts with essential nutrients to provide gentle, daily nutritional support for women across different life stages. Each FEMISAN A pack is designed to provide a 30-day supply when consumed as recommended.",
        description: "Hormonal balance and menstrual wellness play an important role in a woman's overall health, comfort, and quality of life. Factors such as lifestyle stress, nutritional gaps, and natural hormonal fluctuations may influence menstrual regularity and reproductive well-being over time. FEMISAN A Capsules is thoughtfully formulated to provide comprehensive nutritional support for women by addressing key aspects of female wellness. The formulation features a blend of botanicals traditionally used to support menstrual comfort, hormonal balance, and reproductive health, along with Zinc, an essential mineral that contributes to normal fertility and reproductive function. Lady's Mantle, Yarrow, and Shepherd's Purse have a long history of traditional use in supporting healthy menstrual function. Marigold Flower and Herb Robert provide antioxidant and botanical support, while Golden Maca is traditionally used to support vitality and hormonal balance.",
        benefits: [
            "Support female reproductive health and fertility potential",
            "Help support hormonal balance naturally",
            "Promote healthy menstrual function and comfort",
            "Provide gentle daily nutritional support for women",
            "Support overall vitality and well-being",
        ],
        servingSize: "2 Capsules",
        servingsPerContainer: "30 (60 capsules per jar — 30-day supply)",
        bestResults: "Consume regularly as part of a balanced diet and healthy lifestyle.",
        suitableFor: "Adolescent girls, young adults, adults, and middle-aged women who wish to proactively support their reproductive and hormonal wellness as part of a healthy lifestyle.",
        ingredientsDesc: "FEMISAN A Capsules is powered by a carefully selected blend of herbal extracts and essential nutrients. Lady's Mantle, Yarrow Herb, Shepherd's Purse, and Marigold Flower are traditionally used to support menstrual wellness and female reproductive health. Herb Robert and Golden Maca provide botanical and vitality support, while Zinc contributes to normal fertility and reproductive function.",
        howToUse: "Adult females: Take two (2) capsules daily after meals with water, or as directed by a healthcare professional.",
        caution: "Not recommended for children below 13 years. If you are pregnant, breastfeeding, under medical supervision, taking medication, or have a medical condition, consult a healthcare professional before use. Do not exceed the recommended dosage. This product is not intended to diagnose, treat, cure, or prevent any disease(s).",
        storage: "Store in a cool, dry place away from direct sunlight and moisture. Keep the container tightly closed and out of reach of children.",
        faqs: [
            { q: "What is FEMISAN A CAPSULES used for?", a: "FEMISAN A CAPSULES is designed to support female fertility, hormonal balance, healthy menstrual function, and overall reproductive wellness." },
            { q: "How many capsules should I take daily?", a: "Adult females are recommended to take two (2) capsules daily after meals or as advised by a healthcare professional." },
            { q: "Is FEMISAN A suitable for long-term use?", a: "Yes, when used as recommended, FEMISAN A is suitable for daily and long-term nutritional support." },
            { q: "Are there any side effects?", a: "FEMISAN A is generally well tolerated when consumed as directed. Consult a healthcare professional if you experience any adverse effects." },
            { q: "Who can use FEMISAN A Capsules?", a: "FEMISAN A Capsules is suitable for adolescent girls and adult women looking to support hormonal balance and menstrual wellness naturally." },
            { q: "What are the main ingredients in FEMISAN A CAPSULES?", a: "The formulation contains Lady's Mantle, Yarrow Herb, Marigold Flower, Herb Robert, Golden Maca, Shepherd's Purse, and Zinc." },
            { q: "Does FEMISAN A CAPSULES support hormonal balance?", a: "Yes. FEMISAN A CAPSULES is formulated to provide natural botanical and nutritional support for hormonal balance." },
            { q: "Does FEMISAN A CAPSULES support menstrual wellness?", a: "Yes. The formulation is designed to promote healthy menstrual function as part of overall female wellness." },
            { q: "Does FEMISAN A CAPSULES support female fertility?", a: "Yes. FEMISAN A CAPSULES provides botanical and nutritional support for female fertility and reproductive health." },
            { q: "What makes FEMISAN A CAPSULES different?", a: "It combines seven botanical and nutritional ingredients in one formulation to provide daily support for female fertility, hormonal balance, menstrual function, and reproductive wellness." },
            { q: "How long will one jar last?", a: "Each jar contains 60 capsules. At the recommended dosage of two capsules per day, one jar provides approximately 30 days of use." },
        ],
        image: "/images/FEMISAN_A.png",
        bannerImage: "/images/shopDetailsBanner.png",
        enquiryName: "FEMISAN A",
        gender: "Female Vitality",
        therapeuticAreas: ["Fertility", "Menstruation", "Hormonal Balance", "PCOS/PCOD", "Sexual Health", "Vitamins & Nutrition"],
        ageGroups: ["Adolescent (13–17)", "Young Adults (18–25)", "Adults (26–40)", "Middle-Aged (41–60)"],
        ourEssenceIngredients: ["Lady's Mantle", "Yarrow Herb", "Shepherd's Purse", "Marigold Flower", "Herb Robert", "Golden Maca"],
    },
    "femisan-b": {
        name: "FEMISAN B",
        tagline: "Natural Menopause, Menstrual & Hormonal Wellness Support",
        synopsis: "FEMISAN B is a natural herbal liquid formulation designed to provide support during menopause and promote female hormonal and menstrual wellness. It features a carefully selected combination of White Mistletoe Herb, Lemon Balm Leaves, Yarrow Herb, Marigold Flower, and Valerian Root. FEMISAN B is presented in a convenient 30 ml glass bottle and provides a natural herbal approach to supporting women during the menopausal stage of life.",
        description: "Menopause is a natural stage of life that brings changes in a woman's hormonal and overall well-being. During this period, women may seek gentle and holistic approaches to support their daily wellness and manage the changes associated with menopause. FEMISAN B is formulated specifically for women in the middle-aged and senior age groups, combining a selection of natural herbal ingredients in a convenient liquid form. The formulation is designed to provide gentle and holistic support for women's wellness during menopause. White Mistletoe Herb, Lemon Balm Leaves, Yarrow Herb, Marigold Flower, and Valerian Root form the core of this herbal formulation. Together, these carefully selected ingredients provide a natural botanical approach to menopausal wellness and support women looking for gentle daily care during this stage of life.",
        benefits: [
            "Natural herbal support during menopause",
            "Gentle support for menopausal symptoms",
            "Holistic care for women's menopausal wellness",
            "Natural botanical support as part of a daily wellness routine",
        ],
        servingSize: "30 drops in a glass of water",
        servingsPerContainer: "30 ml glass bottle — multiple servings",
        bestResults: "Add 30 drops to a glass of water and drink 1–4 times daily before meals for consistent support.",
        suitableFor: "Middle-aged women aged 41–60 years and senior women aged 60 years and above who wish to support their menopausal and hormonal wellness as part of a balanced lifestyle.",
        ingredientsDesc: "FEMISAN B is powered by a carefully selected blend of natural herbal extracts. White Mistletoe Herb, Lemon Balm Leaves, Yarrow Herb, Marigold Flower, and Valerian Root are combined in an aqueous-ethanolic herbal formulation. White Mistletoe Herb and Yarrow Herb complement women's wellness support, while Lemon Balm Leaves and Valerian Root provide soothing botanical support. Marigold Flower further complements the herbal blend.",
        howToUse: "Add 30 drops to a glass of water and drink 1–4 times daily before meals.",
        caution: "Do not exceed the recommended daily use. Keep out of reach of children. Use the product according to the instructions provided on the product packaging.",
        storage: "Store in a cool, dry place away from direct sunlight and moisture. Keep the bottle tightly closed and out of reach of children.",
        faqs: [
            { q: "What is FEMISAN B used for?", a: "FEMISAN B is a natural herbal formulation designed to support women's menopausal, hormonal, and menstrual wellness." },
            { q: "What is the recommended dosage of FEMISAN B?", a: "Add 30 drops to a glass of water and drink 1–4 times daily before meals." },
            { q: "Who can use FEMISAN B?", a: "FEMISAN B is intended for women in the 41–60-year middle-aged group and women aged 60 years and above." },
            { q: "What are the main ingredients in FEMISAN B?", a: "FEMISAN B contains White Mistletoe Herb, Lemon Balm Leaves, Yarrow Herb, Marigold Flower, and Valerian Root." },
            { q: "Is FEMISAN B a natural product?", a: "Yes. FEMISAN B is formulated with 100% natural herbal ingredients." },
            { q: "What makes FEMISAN B suitable for menopause?", a: "FEMISAN B combines five selected herbal extracts in a liquid formulation specifically intended to provide natural and holistic support during menopause." },
            { q: "Does FEMISAN B provide support for menopausal symptoms?", a: "FEMISAN B is formulated to provide gentle herbal support for menopausal symptoms as part of a holistic menopause-care routine." },
            { q: "How should FEMISAN B be consumed?", a: "The recommended method is to drop 30 drops into a glass of water and drink before meals, 1–4 times daily." },
            { q: "What is the pack size of FEMISAN B?", a: "FEMISAN B comes in a 30 ml glass bottle." },
        ],
        image: "/images/FEMISAN_B.png",
        bannerImage: "/images/shopDetailsBanner.png",
        enquiryName: "FEMISAN B",
        gender: "Female Vitality",
        therapeuticAreas: ["Fertility", "Menstruation", "Hormonal Balance", "PCOS/PCOD", "Sexual Health", "Vitamins & Nutrition"],
        ageGroups: ["Middle-Aged (41–60)", "Seniors (60+)"],
        ourEssenceIngredients: ["White Mistletoe Herb", "Lemon Balm Leaves", "Yarrow Herb", "Marigold Flower", "Valerian Root"],
    },
    "femisan-gold": {
        name: "FEMISAN GOLD CAPSULES",
        tagline: "Natural Menopause, Hormonal Balance & Women's Wellness Support",
        synopsis: "FEMISAN GOLD CAPSULES is a herbal supplement formulated with extracts of Chaste Tree, Wild Yam, Hops, Black Cohosh, Angelica, and Ginseng. It is intended for women during perimenopause and menopause and contributes to hormonal balance and the alleviation of menopausal symptoms. Each FEMISAN GOLD CAPSULES pack contains 60 capsules and provides a 30-day supply when consumed at the recommended dosage.",
        description: "Perimenopause and menopause are natural stages in a woman's life that are characterised by significant hormonal changes. During this transition, women may experience a range of physiological and psychological changes, including hot flashes, perspiration, sleep disturbances, mood changes, nervous tension, irritability, and difficulties with concentration and memory. FEMISAN GOLD CAPSULES is formulated to provide natural herbal support during perimenopause and menopause. It combines six carefully selected plant extracts whose individual and synergistic effects are intended to contribute to hormonal balance and help alleviate common menopausal symptoms. Chaste Tree, Wild Yam, Hops, and Black Cohosh contribute to the alleviation of menopause symptoms such as hot flashes, perspiration, and tension. The formulation also contains Angelica and Ginseng, providing complementary herbal support for women during this important stage of life. During the reproductive phase, FEMISAN GOLD CAPSULES also contributes to a normal menstrual cycle and helps reduce symptoms associated with premenstrual syndrome.",
        benefits: [
            "Alleviate hot flashes",
            "Improve sleep",
            "Reduce tension and anxiety",
            "Improve resilience to stress",
            "Contribute to hormonal balance during perimenopause and menopause",
        ],
        servingSize: "2 Capsules",
        servingsPerContainer: "30 (60 capsules per pack — 30-day supply)",
        bestResults: "Consume regularly as part of your daily wellness routine.",
        suitableFor: "Women during perimenopause and menopause. The formulation also provides support during the reproductive phase, contributing to a normal menstrual cycle and helping reduce symptoms of premenstrual syndrome.",
        ingredientsDesc: "FEMISAN GOLD CAPSULES is powered by a carefully selected blend of herbal extracts that work synergistically to support women's menopausal wellness. Chaste Tree, Wild Yam, Hops, and Black Cohosh contribute to the alleviation of menopause symptoms such as hot flashes, perspiration, and tension. Angelica provides complementary herbal support during menopause, while Ginseng contributes supportive botanical care for women dealing with stress and the challenges associated with the menopausal transition.",
        howToUse: "Take two (2) capsules once daily before meals.",
        caution: "Follow the recommended dosage. Keep out of reach of children. Consult a healthcare professional before use if you are under medical supervision or taking medication.",
        storage: "Store in a cool, dry place away from direct sunlight and moisture. Keep the container tightly closed and out of reach of children.",
        faqs: [
            { q: "What is FEMISAN GOLD CAPSULES used for?", a: "FEMISAN GOLD CAPSULES is a herbal supplement designed to support women during perimenopause and menopause, contributing to hormonal balance and the alleviation of menopausal symptoms." },
            { q: "What symptoms does FEMISAN GOLD CAPSULES help with?", a: "It is intended to help alleviate hot flashes, improve sleep, reduce tension and anxiety, and improve resilience to stress." },
            { q: "What are the main ingredients in FEMISAN GOLD CAPSULES?", a: "The formulation contains extracts of Chaste Tree, Wild Yam, Hops, Black Cohosh, Angelica, and Ginseng." },
            { q: "Does FEMISAN GOLD CAPSULES support hormonal balance?", a: "Yes. FEMISAN GOLD CAPSULES is intended for women during perimenopause and menopause and contributes to hormonal balance." },
            { q: "Does FEMISAN GOLD CAPSULES help with hot flashes?", a: "Yes. Chaste Tree, Wild Yam, Hops, and Black Cohosh contribute to the alleviation of menopause symptoms such as hot flashes, perspiration, and tension." },
            { q: "Can FEMISAN GOLD CAPSULES be used during the reproductive phase?", a: "Yes. During the reproductive phase, FEMISAN GOLD CAPSULES contributes to a normal menstrual cycle and helps reduce symptoms of premenstrual syndrome." },
            { q: "How should FEMISAN GOLD CAPSULES be taken?", a: "Take two (2) capsules once daily before meals." },
            { q: "Who can use FEMISAN GOLD CAPSULES?", a: "FEMISAN GOLD CAPSULES is intended primarily for women during perimenopause and menopause. The formulation also provides support during the reproductive phase." },
            { q: "How many capsules should I take daily?", a: "The recommended use is two (2) capsules once daily before meals." },
            { q: "How long will one pack last?", a: "Each pack contains 60 capsules. At the recommended dosage of two capsules per day, one pack provides approximately 30 days of use." },
            { q: "How does FEMISAN GOLD CAPSULES support women during menopause?", a: "It combines six herbal extracts—Chaste Tree, Wild Yam, Hops, Black Cohosh, Angelica, and Ginseng—to provide complementary botanical support for hormonal balance, menopausal symptoms, sleep, stress, and overall women's wellness." },
        ],
        image: "/images/FEMISAN_GOLD.png",
        bannerImage: "/images/shopDetailsBanner.png",
        enquiryName: "FEMISAN GOLD",
        gender: "Female Vitality",
        therapeuticAreas: ["Fertility", "Menstruation", "Hormonal Balance", "PCOS/PCOD", "Sexual Health", "Vitamins & Nutrition"],
        ageGroups: ["Middle-Aged (41–60)", "Seniors (60+)"],
        ourEssenceIngredients: ["Chaste Tree", "Wild Yam", "Hops", "Black Cohosh", "Angelica", "Ginseng"],
    },
    "osteomac": {
        name: "VITAZAN™ OSTEOMAC TABLETS",
        tagline: "Comprehensive Daily Support for Bone, Joint & Muscle Health",
        synopsis: "VITAZAN™ OSTEOMAC Tablets is a premium calcium-based nutraceutical formulation designed to support bone strength, joint health, and muscle function. It combines highly absorbable Calcium Citrate Maleate with Vitamin D3, Magnesium, and Zinc to provide complete nutritional support for skeletal wellness across all adult age groups. Each VITAZAN™ OSTEOMAC pack is designed to provide a 30-day supply when consumed as recommended.",
        description: "Strong bones, healthy joints, and proper muscle function are essential for mobility, balance, and overall quality of life. Ageing, lifestyle factors, and inadequate intake of key minerals may contribute to gradual loss of bone mass and musculoskeletal strength over time. VITAZAN™ OSTEOMAC Tablets is formulated to provide comprehensive nutritional support for skeletal health. Calcium Citrate Maleate is a highly bioavailable form of calcium that supports bone mineralisation and strength. Vitamin D3 plays an important role in calcium absorption and utilisation, helping ensure calcium is effectively delivered to the bones. Magnesium contributes to normal muscle function and supports bone structure, while Zinc plays a role in normal cell growth and tissue maintenance. Together, these nutrients work synergistically to support bone density, joint comfort, and overall musculoskeletal wellness.",
        benefits: [
            "Support bone density and skeletal strength",
            "Aid calcium absorption and utilisation",
            "Support joint and muscle function",
            "Help maintain overall mobility and stability",
            "Provide daily nutritional support for bone health",
        ],
        servingSize: "1 Tablet",
        servingsPerContainer: "30 (30-day supply)",
        bestResults: "Consume regularly as part of a balanced diet and healthy lifestyle.",
        suitableFor: "Young adults, adults, middle-aged individuals, and seniors looking to support bone and musculoskeletal health as part of an active and healthy lifestyle.",
        ingredientsDesc: "VITAZAN™ OSTEOMAC Tablets contains a scientifically balanced blend of essential minerals and vitamins. Calcium Citrate Maleate provides a highly absorbable source of calcium. Vitamin D3 enhances calcium absorption, Magnesium supports muscle and bone function, and Zinc contributes to normal tissue maintenance.",
        howToUse: "Take one (1) tablet once daily with water after meals, or as directed by a healthcare professional.",
        caution: "Not recommended for children below 12 years unless advised by a healthcare professional. If you are pregnant, breastfeeding, under medical supervision, taking medication, or have any medical condition, consult a healthcare professional before use. Do not exceed the recommended dosage. This product is a food supplement and is not intended to diagnose, treat, cure, or prevent any disease(s).",
        storage: "Store in a cool, dry place away from direct sunlight and moisture. Keep the blister pack protected and out of reach of children.",
        faqs: [
            { q: "What is VITAZAN™ OSTEOMAC Tablets used for?", a: "OSTEOMAC Tablets is designed to support bone strength, joint health, and overall skeletal wellness." },
            { q: "How should OSTEOMAC be taken?", a: "It is recommended to take one (1) tablet daily after meals or as advised by a healthcare professional." },
            { q: "Is OSTEOMAC suitable for seniors?", a: "Yes, OSTEOMAC is suitable for adults of all ages, including seniors, to support bone and musculoskeletal health." },
            { q: "Can OSTEOMAC be used long-term?", a: "Yes, when used as recommended, OSTEOMAC is suitable for daily and long-term nutritional support." },
            { q: "Are there any side effects?", a: "OSTEOMAC is generally well tolerated when consumed as directed. Consult a healthcare professional if you experience any adverse effects." },
            { q: "What makes OSTEOMAC™ different from regular calcium supplements?", a: "OSTEOMAC™ provides more than calcium alone. It combines calcium with vitamin D3, magnesium and zinc, offering comprehensive nutritional support for bone and mineral health in one tablet." },
            { q: "What is the role of Vitamin D3 in OSTEOMAC™?", a: "Vitamin D3 supports the body's ability to absorb and utilize calcium and contributes to maintaining healthy bones." },
            { q: "Why are magnesium and zinc included?", a: "Magnesium and zinc are essential minerals that provide additional nutritional support alongside calcium and vitamin D3, contributing to overall mineral and skeletal health." },
            { q: "How many tablets should I take?", a: "The recommended dosage is one tablet once a day, or as directed by your healthcare professional." },
            { q: "Who can take OSTEOMAC™?", a: "OSTEOMAC™ is intended for adults and seniors seeking nutritional support for bone health. Individuals with specific health conditions or those taking regular medication should consult a healthcare professional before use." },
            { q: "Can seniors take OSTEOMAC™?", a: "OSTEOMAC™ can provide useful nutritional support for adults and seniors as part of a healthy lifestyle. Seniors should consult their healthcare professional if they have specific nutritional requirements or take regular medication." },
        ],
        image: "/images/osteomac-product.png",
        bannerImage: "/images/shopDetailsBanner.png",
        enquiryName: "OSTEOMAC",
        gender: "General Wellness",
        therapeuticAreas: ["Bone, Joint & Muscle Care", "Vitamins & Nutrition"],
        ageGroups: ["Young Adults (18–25)", "Adults (26–40)", "Middle-Aged (41–60)", "Seniors (60+)"],
    },
};

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border-b border-gray-100">
            <button
                onClick={onToggle}
                className="flex w-full items-start justify-between py-4 text-left"
            >
                <span className="pr-4 text-[14px] sm:text-[16px] font-semibold text-dark">{q}</span>
                <ChevronDown
                    size={20}
                    className={`mt-0.5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            {isOpen && (
                <div className="pb-4 text-[13px] sm:text-[15px] leading-[1.6] text-gray-600">
                    {a}
                </div>
            )}
        </div>
    );
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [apiProduct, setApiProduct] = useState<ApiProduct | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadDetails = async () => {
            setIsLoading(true);
            const data = await fetchProductDetails(slug);
            if (data) {
                setApiProduct(data);
            }
            setIsLoading(false);
        };
        loadDetails();
    }, [slug]);

    const fallbackProduct = products[slug];

    if (!fallbackProduct && !apiProduct && !isLoading) {
        notFound();
    }

    const product = { ...(fallbackProduct || products["acinil-neo"]) };
    if (apiProduct) {
        product.name = apiProduct.title || product.name;
        product.synopsis = apiProduct.body || product.synopsis;
        product.image = apiProduct.image_url || product.image;
    }

    const [openFaq, setOpenFaq] = useState<number>(0);

    if (isLoading) {
        return (
            <div className="w-full bg-white flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-pink border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white">
            {/* Hero Banner */}
            {/* <section className="relative mx-auto w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full"
                >
                    <Image
                        src={product.bannerImage}
                        alt={product.name}
                        width={1920}
                        height={1080}
                        className="w-full h-auto"
                        priority
                    />
                    <div className="absolute inset-0 z-[1] mx-auto max-w-[1600px] px-4 sm:px-10 pointer-events-none">
                        <div className="flex flex-col justify-center h-[60%] gap-2 sm:gap-4 w-[55%] sm:w-1/2">
                            <h1 className="font-display text-[18px] sm:text-[30px] md:text-[52px] lg:text-[67px] leading-[1.1] text-black mt-1 font-medium">
                                {product.name}
                            </h1>
                            <p className="text-[9px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[14px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] text-black font-medium w-full sm:w-[70%] lg:w-[50%]">
                                {product.tagline}
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-[24%] left-[64%] -translate-x-[10%] z-[2] w-[22%] sm:w-[20%] md:w-[18%]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </div>
                </motion.div>
            </section> */}

            {/* Product Info Section */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-10 md:py-16">
                <AnimatedSection animation="fadeUp">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        {/* Product Image */}
                        <div className="relative flex items-center justify-center">
                            <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[500px] aspect-square mx-auto">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            <h1 className="font-display text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-semibold text-dark leading-tight">
                                {product.name}
                            </h1>
                            <p className="mt-2 text-[14px] sm:text-[16px] font-medium text-pink">{product.tagline}</p>

                            {/* Category Badges */}
                            <div className="mt-4 flex flex-col gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${product.gender === "Female Vitality" ? "bg-pink/10 text-pink" : product.gender === "Male Vitality" ? "bg-blue-50 text-blue-700" : "bg-teal/10 text-teal"}`}>
                                        {product.gender === "Female Vitality" ? "♀" : product.gender === "Male Vitality" ? "♂" : "✦"} {product.gender}
                                    </span>
                                    {product.therapeuticAreas.map((area) => (
                                        <span key={area} className="inline-flex items-center rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-[12px] font-medium text-teal-700">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {product.ageGroups.map((age) => (
                                        <span key={age} className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[11px] font-medium text-purple-700">
                                            {age}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <p className="mt-4 text-[14px] sm:text-[15px] leading-[1.7] text-black">
                                {product.synopsis}
                            </p>

                            {/* Serving Info */}
                            <div className="mt-6 space-y-3">
                                {[
                                    { label: "Serving Size", value: product.servingSize },
                                    { label: "Servings Per Container", value: product.servingsPerContainer },
                                    { label: "For Best Results", value: product.bestResults },
                                    { label: "Suitable For", value: product.suitableFor },
                                ].map((info, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal">
                                            <Check size={12} className="text-white" />
                                        </div>
                                        <div>
                                            <span className="text-[14px] sm:text-[15px] font-semibold text-dark">{info.label}</span>
                                            <p className="text-[13px] sm:text-[14px] text-gray-600">{info.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Enquiry Button */}
                            <Link href={`/enquiry?product=${encodeURIComponent(product.enquiryName)}`}>
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="mt-8 w-fit rounded-full bg-pink px-8 sm:px-10 py-3 sm:py-3.5 text-[14px] sm:text-[16px] font-semibold text-white shadow-lg shadow-pink/25 transition-colors hover:bg-pink-light"
                                >
                                    Enquiry Now
                                </motion.div>
                            </Link>
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
                                    <p className="text-[10px] sm:text-[11px] md:text-[13px] text-black">{badge.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </AnimatedSection>

            {/* Detailed Description */}
            <AnimatedSection animation="fadeUp">
                <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] pb-10 md:pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* Description */}
                        <div>
                            <h2 className="font-display text-[24px] sm:text-[30px] md:text-[36px] text-dark mb-4">About This Product</h2>
                            <p className="text-[14px] sm:text-[15px] leading-[1.8] text-gray-700">{product.description}</p>

                            {/* Benefits */}
                            <h3 className="mt-8 text-[18px] sm:text-[20px] font-bold text-dark mb-4">Key Benefits</h3>
                            <ul className="space-y-3">
                                {product.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-pink">
                                            <Check size={12} className="text-white" />
                                        </div>
                                        <span className="text-[14px] sm:text-[15px] text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Ingredients + How to Use */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-[18px] sm:text-[20px] font-bold text-dark mb-3">Ingredients</h3>
                                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-gray-700">{product.ingredientsDesc}</p>
                            </div>
                            <div>
                                <h3 className="text-[18px] sm:text-[20px] font-bold text-dark mb-3">How to Use</h3>
                                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-gray-700">{product.howToUse}</p>
                                <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4">
                                    <p className="text-[13px] sm:text-[14px] text-amber-800 font-medium">Caution</p>
                                    <p className="mt-1 text-[13px] sm:text-[14px] text-amber-700">{product.caution}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[18px] sm:text-[20px] font-bold text-dark mb-3">Storage</h3>
                                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-gray-700">{product.storage}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Our Essence Section */}
            {product.ourEssenceIngredients && product.ourEssenceIngredients.length > 0 && (
                <AnimatedSection animation="fadeUp">
                    <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] pb-12 md:pb-16">
                        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-8 sm:p-10">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="font-display text-[22px] sm:text-[28px] text-dark">Our Essence</h2>
                                    <p className="mt-1 text-[13px] sm:text-[14px] text-gray-600">Key botanical ingredients sourced from nature&apos;s finest herbs</p>
                                </div>
                                <Link href="/our-essence" className="shrink-0 text-[13px] sm:text-[14px] font-semibold text-emerald-700 hover:text-emerald-600 underline underline-offset-2 transition-colors">
                                    Explore Our Essence →
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {product.ourEssenceIngredients.map((ing) => (
                                    <Link key={ing} href="/our-essence" className="group flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all">
                                        <span className="text-emerald-600 text-[16px]">🌿</span>
                                        <span className="text-[13px] sm:text-[14px] font-medium text-gray-800 group-hover:text-emerald-700 transition-colors">{ing}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
            )}

            {/* FAQ Section */}
            <AnimatedSection animation="fadeUp">
                <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] pb-16 md:pb-24">
                    <h2 className="font-display text-[24px] sm:text-[30px] md:text-[36px] text-dark mb-8">Frequently Asked Questions</h2>
                    <div className="w-full">
                        {product.faqs.map((faq, idx) => (
                            <FaqItem
                                key={idx}
                                q={faq.q}
                                a={faq.a}
                                isOpen={openFaq === idx}
                                onToggle={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                            />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 rounded-2xl bg-gradient-to-br from-pink/10 to-teal/10 p-8 sm:p-10 text-center">
                        <h3 className="font-display text-[22px] sm:text-[28px] text-dark">Interested in {product.name}?</h3>
                        <p className="mt-2 text-[14px] sm:text-[16px] text-gray-600">Get in touch with us for more information or to place an enquiry.</p>
                        <Link href={`/enquiry?product=${encodeURIComponent(product.enquiryName)}`}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="mt-6 inline-block rounded-full bg-pink px-10 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-pink/25 hover:bg-pink-light transition-colors"
                            >
                                Enquiry Now
                            </motion.div>
                        </Link>
                    </div>
                </section>
            </AnimatedSection>
        </div>
    );
}
