"use client";

import ClassicTopProducts from "@/components/client/ClassicTopProducts";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/client/AnimatedSection";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import boostImmu from "../../public/images/bostImmu.svg";
import enhanceStren from "../../public/images/enhanceStren.svg";
import holisticWell from "../../public/images/holisticWell.svg";
import naturalSafe from "../../public/images/naturanSafe.svg";
import strongBones from "../../public/images/strongBones.svg";
import eco from "../../public/images/eco.png";
import gmp from "../../public/images/gmp.png";
import lab from "../../public/images/lab.png";
import plant from "../../public/images/plant.png";
import leafIcon from "../../public/images/leafIcon.png"
import bannerTextLine from "../../public/images/bannerTextLine.png";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Carousel from "@/components/client/Carousel";

export default function Home() {

  const BannerData = [
    { id: 1, image: boostImmu, name: "Boost Immunity" },
    { id: 2, image: enhanceStren, name: "Enhance Strength" },
    { id: 3, image: holisticWell, name: "Holistic Wellness" },
    { id: 4, image: naturalSafe, name: `Natural & Safe` },
    { id: 5, image: strongBones, name: "Strong Bones" },
  ];

  const BannerData2 = [
    { id: 1, image: eco, name: "Eco Friendly" },
    { id: 2, image: gmp, name: "GMP Certified" },
    { id: 3, image: lab, name: "Lab Tested" },
    { id: 4, image: plant, name: "Plant Based" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vitazan",
    url: "https://vitazan.com",
    logo: "https://vitazan.com/images/logo.png",
    description: "Premium Ayurvedic health supplements crafted for wellness unleashed.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vitazan",
    url: "https://vitazan.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://vitazan.com/shop?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* Hero Banner */}
      <section className="relative mx-auto w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[580px] xl:h-[705px] relative"
        >
          <Image
            src="/images/banner.png"
            alt="Vitazan Wellness"
            width={1600}
            height={645}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 z-[1] mx-auto max-w-[1600px] px-4 sm:px-10  pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
              <div className="absolute top-[8%] sm:top-[10%] md:top-[12%] lg:top-[15%] left-0 max-w-[90%] sm:max-w-[70%] md:max-w-[55%] lg:max-w-[45%] lg:pl-12.5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <p className="font-display italic text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] text-[#003d4a] font-medium">Your Trusted</p>
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-8 md:w-14 border-b border-[#578654]" />
                    <Image src={leafIcon} alt="" width={40} height={40} className="w-5 md:w-7 h-5 md:h-7" />
                    <div className="w-8 md:w-14 border-b border-[#578654]" />
                  </div>
                </div>
                <h1 className="font-display text-[28px] sm:text-[38px] md:text-[50px] lg:text-[62px] leading-[1.1] text-[#003d4a] mt-1 font-medium">
                  Vitality Store for
                </h1>
                <div className="relative">
                  <h1 className="font-display italic text-[32px] sm:text-[42px] md:text-[56px] lg:text-[68px] leading-[1.1] text-pink font-semibold">
                    Wellness Unleashed
                  </h1>
                  <Image src={bannerTextLine} alt="" width={500} height={20} className="w-[90%] h-auto mt-[-2px] sm:mt-[-4px]" />
                </div>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[24px] md:leading-[28px] text-[#333] mt-2 sm:mt-4 font-medium">
                  Premium natural products crafted to support<br className="hidden sm:block" /> a healthier you and a better tomorrow.
                </p>
                <div className="hidden md:flex gap-2 lg:gap-4 items-center mt-3 lg:mt-6">
                  {BannerData.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover="hover"
                      className="flex items-center gap-1 lg:gap-2 cursor-pointer"
                    >
                      <motion.div
                        variants={{
                          hover: { scale: 1.15, rotate: -35, backgroundColor: "#ebdca8" }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="bg-[#f4eac7] p-2 lg:p-3 border-l-2 border-t-2 border-solid border-[#bac394] rounded-full -rotate-45"
                      >
                        <Image src={item.image} alt={item.name} width={18} height={18} className="w-3 lg:w-[18px] h-3 lg:h-[18px] rotate-45" />
                      </motion.div>
                      <motion.p
                        variants={{
                          hover: { x: 3 }
                        }}
                        className="text-[#333] text-[12px] lg:text-[14px] leading-[15px] lg:leading-[18px] font-semibold transition-colors duration-200 group-hover:text-pink"
                      >
                        {item.name.split(" ").slice(0, -1).join(" ")}<br />
                        {item.name.split(" ").slice(-1)[0]}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
                <hr className="hidden md:block border-[#40b281] mt-3 lg:mt-5 mb-2 lg:mb-4" />
                <div className="hidden md:flex gap-2 lg:gap-6 items-center justify-center">
                  {BannerData2.map((item, index) => (
                    <div key={index} className={`${index === 0 ? 'pl-0' : 'border-l border-[#ccc] pl-2 lg:pl-6'}`}>
                      <motion.div
                        whileHover={{ scale: 1.12, y: -6, filter: "drop-shadow(0px 8px 12px rgba(0,0,0,0.08))" }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="cursor-pointer bg-[#f4eac7] rounded-full p-1 shadow-md"
                      >
                        <Image src={item.image} alt={item.name} width={72} height={72} className="w-[48px] lg:w-[60px] xl:w-[72px] h-[48px] lg:h-[60px] xl:h-[72px]" />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
              <Image src="/images/bannerPart1.png" alt="" width={1920} height={180} className="absolute w-[60%] sm:w-[55%] md:w-[55rem] h-auto bottom-0 right-0" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Ingredients Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full bg-pink py-3 sm:py-5 overflow-hidden"
      >
        <div className="animate-ticker flex whitespace-nowrap">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-0 text-[14px] sm:text-[16px] md:text-[19px] uppercase tracking-[1.5px] sm:tracking-[2.55px] text-white font-semibold">
              {[
                "Long Pepper", "Bibhitaki", "Malabar Nut Leaves", "Carom Seeds",
                "Turmeric", "Long Pepper", "Holy basil", "Mint",
                "Bharangi", "Kakdasinghi", "Black Pepper",
              ].map((ingredient, idx) => (
                <span key={idx} className="flex items-center">
                  <span className="px-3 sm:px-6">{ingredient}</span>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="mx-1 sm:mx-2">
                    <circle cx="4" cy="4" r="3" fill="white" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Leaf decoration */}
      <div className="relative hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/images/leaf.png"
            alt=""
            width={112}
            height={170}
            className="absolute -top-20 left-0 z-10"
          />
        </motion.div>
      </div>

      {/* Shop by Categories */}
      <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-10 md:py-16">
        <AnimatedSection animation="fadeUp">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <p className="text-[13px] sm:text-[15px] md:text-[16px] font-bold uppercase tracking-[2.1px] text-pink">
                Find your formula
              </p>
              <h2 className="font-display mt-2 text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] text-black">
                Shop by <span className="relative inline-block text-pink">Categories</span>
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-pink hover:border-dark-teal px-6 sm:px-8 py-2.5 sm:py-3 text-[15px] sm:text-[17px] tracking-[0.32px] bg-pink text-white! font-semibold! transition-all hover:bg-dark-teal hover:shadow-md duration-300"
            >
              Discover More
            </motion.button>
          </div>
        </AnimatedSection>

        <div className="mt-8 md:mt-12">
          <Carousel itemsPerView={{ base: 2, sm: 2, md: 3, lg: 4 }} gap={20} showDots={true} showArrows={true} className="py-4">
            {[
              { name: "Cold and Cough Remedy", img: "/images/category-cold.png", bg: "#fff1e0" },
              { name: "Gut Health", img: "/images/category-gut.png", bg: "#e2fbff" },
              { name: "Bone Joint Muscle Care", img: "/images/category-bone.png", bg: "#f3e4fd" },
              { name: "Vitamin & Nutrition", img: "/images/category-vitamin.png", bg: "#eaecff" },
            ].map((cat) => (
              <motion.div
                key={cat.name}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group cursor-pointer text-center"
              >
                <div
                  className="relative h-[180px] sm:h-[220px] md:h-[259px] overflow-hidden rounded-bl-[10px] rounded-br-[10px] rounded-tl-[100px] sm:rounded-tl-[150px] rounded-tr-[100px] sm:rounded-tr-[150px] transition-all group-hover:scale-[1.02] shadow-none group-hover:shadow-xl duration-300"
                  style={{ backgroundColor: cat.bg }}
                >
                  <Image src={cat.img} alt={cat.name} fill className="object-contain p-4 sm:p-6" />
                </div>
                <p className="mt-3 sm:mt-6 text-[16px] sm:text-[20px] md:text-[22px] font-semibold text-black">{cat.name}</p>
              </motion.div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Classic Top Products */}
      <ClassicTopProducts />

      {/* Vitazan Essence */}
      <section className="bg-[#eaffad]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-12 md:py-20">
          <AnimatedSection animation="fadeUp">
            <div className="text-center">
              <p className="text-[13px] sm:text-[15px] md:text-[16px] font-bold uppercase tracking-[2.1px] text-pink">
                OUR ESSENCE
              </p>
              <h2 className="font-display mt-2 text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] text-black">
                Vitazan Essence
              </h2>
              <p className="mx-auto mt-4 md:mt-6 max-w-[800px] text-[16px] sm:text-[18px] md:text-[20px] leading-[24px] sm:leading-[28px] md:leading-[30px] text-black">
                Among the lesser known Treasures of Ayurveda like Bhargi Muuli. A Hindi shrub/plant about more in
                Village Traditions than in Classical Texts. Folk healers, however, always knew its Worth. They called it
                Guardian of the Lungs, a Plant that gave Strength back to the Weak.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 md:mt-8 rounded-full border-2 border-pink hover:border-dark-teal px-6 sm:px-8 py-2.5 sm:py-3.5 text-[15px] sm:text-[17px] font-semibold bg-pink text-white transition-colors hover:bg-dark-teal"
              >
                Explore More
              </motion.button>
            </div>
          </AnimatedSection>

          <div className="mt-10 md:mt-16 space-y-8 md:space-y-10">
            {[
              {
                name: "Turmeric",
                desc: "A golden elixir from Turmeric, also known as Haldi, is a golden spice widely used in Indian cooking and Ayurvedic medicine for its anti-inflammatory & antioxidant properties.",
                img: "/images/turmeric.png",
              },
              {
                name: "Malabar Nut Leaves",
                desc: "The tale of Adusa Pata (Vasaka - also known as Vasa or Malabar Nut), goes beyond the books' tales. It's the household cold-and-cough remedy.",
                img: "/images/malabar.png",
              },
              {
                name: "Holy Basil",
                desc: "Every Indian in Countryside and India knew Holy Basil Plant, also known as Tulsi, is worshipped for its medicinal and spiritual properties in a Healing Gardners philosophy.",
                img: "/images/tulsi.png",
              },
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 group">
                  <AnimatedSection animation="fadeLeft" delay={idx * 0.1} className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-[30px] sm:text-[36px] md:text-[48px] text-black">{item.name}</h3>
                      <Link href="#" className="border border-solid border-black w-13 h-13 rounded-full flex items-center justify-center group-hover:rotate-12 transition-all duration-300">
                        <ArrowUpRight className="w-auto h-8" strokeWidth={1} />
                      </Link>
                    </div>
                    <p className="mt-3 max-w-[500px] text-[16px] sm:text-[20px] leading-[22px] sm:leading-[26px] text-gray-700">
                      {item.desc}
                    </p>
                  </AnimatedSection>
                  <AnimatedSection animation="fadeRight" delay={idx * 0.1} className="w-full sm:w-1/2">
                    <div className="relative h-[150px] sm:h-[180px] md:h-[200px] overflow-hidden rounded-full">
                      <Image src={item.img} alt={item.name} width={1920} height={1080} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </AnimatedSection>
                </div>
                <hr className={`${idx === 2 ? 'hidden' : 'block'}`} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Formulated Section */}
      <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-10 md:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-end gap-8 lg:gap-16">
          <div className="w-full lg:w-[80%] flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 border border-solid border-[#00485D] p-6 sm:p-8 lg:py-15.75 rounded-3xl lg:pl-15.75">
            <Image
              src="/images/syrup2.png"
              alt="Wellness"
              width={1920}
              height={1080}
              className="w-full sm:w-[60%] lg:w-auto h-auto lg:h-134.25 rounded-3xl lg:-ml-140 hover:scale-105 transition-all duration-700"
            />
            <AnimatedSection animation="fadeRight" delay={0.2} className="lg:mr-[-28rem]">
              <div className="flex flex-col items-start gap-4 sm:gap-6">
                <p className="text-[13px] sm:text-[15px] md:text-[16px] font-bold uppercase tracking-[2.1px] text-pink">
                  BEST SELLER . BONE & JOINT
                </p>
                <h2 className="font-display text-[30px] sm:text-[40px] md:text-[50px] leading-[1.15] text-black">
                  Wellness <span className="relative inline-block text-pink">Formulated</span><br />with Intention.
                </h2>
                <p className="text-[15px] sm:text-[17px] leading-[22px] sm:leading-[26px] text-black w-[50%]">
                  Our product line of HT-KOF is a herbal cough syrup/tonic carefully formulated using time-tested Ayurvedic herbs.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Lorem ipsum dolor sit amet, consectetur...",
                    "Lorem ipsum dolor sit amet.",
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-pink">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-[14px] sm:text-[16px] text-black">{text}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-pink hover:bg-dark-teal px-6 sm:px-8 py-2.5 sm:py-3.5 text-[15px] sm:text-[17px] font-semibold text-white transition-opacity hover:opacity-90 mt-4 sm:mt-8"
                >
                  Enquiry Now
                </motion.button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Sale Banners */}
      <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-10 py-10 md:py-16">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" staggerDelay={0.2}>
          {/* Left Card */}
          <StaggerItem animation="fadeLeft">
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="relative h-[280px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-[20px] sm:rounded-[35px]"
              style={{ backgroundImage: `url('/images/treeHome.png')`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute bottom-0 right-0 h-full w-1/2">
                <Image src="/images/reload.png" alt="Reload" fill className="object-contain" />
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-12">
                <p className="text-[16px] sm:text-[20px] md:text-[22px] font-bold tracking-[0.95px] text-white">SALE UP TO</p>
                <p className="mt-1 sm:mt-2 text-[68px] sm:text-[90px] md:text-[120px] font-bold leading-none tracking-[3px] sm:tracking-[5.35px] text-white">
                  20<span className="text-[40px] sm:text-[54px] md:text-[70px]">%</span>
                </p>
                <p className="mt-2 sm:mt-4 text-[16px] sm:text-[20px] md:text-[22px] uppercase tracking-[3px] sm:tracking-[5.6px] text-white font-semibold">
                  New Collection
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 sm:mt-8 rounded-full border border-white px-6 sm:px-8 py-2.5 sm:py-3 text-[15px] sm:text-[18px] font-semibold bg-white text-black"
                >
                  Shop Now
                </motion.button>
              </div>
            </motion.div>
          </StaggerItem>
          {/* Right Card */}
          <StaggerItem animation="fadeRight">
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="relative h-[280px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-[20px] sm:rounded-[35px]"
              style={{ backgroundImage: `url('/images/syrup1.png')`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute bottom-0 right-0 h-full w-1/2">
                <Image src="/images/htkof.png" alt="HT-KOF" fill className="object-contain" />
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-12">
                <p className="text-[16px] sm:text-[20px] md:text-[22px] font-bold tracking-[0.95px] text-[#e9a337]">SALE UP TO</p>
                <p className="mt-1 sm:mt-2 text-[68px] sm:text-[90px] md:text-[120px] font-bold leading-none tracking-[3px] sm:tracking-[5.35px] text-[#e9a337]">
                  30<span className="text-[40px] sm:text-[54px] md:text-[70px]">%</span>
                </p>
                <p className="mt-2 sm:mt-4 text-[16px] sm:text-[20px] md:text-[22px] uppercase tracking-[3px] sm:tracking-[5.6px] text-black font-semibold">
                  New Collection
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 sm:mt-8 rounded-full border border-black px-6 sm:px-8 py-2.5 sm:py-3 text-[15px] sm:text-[18px] font-semibold transition-colors bg-black text-white"
                >
                  Shop Now
                </motion.button>
              </div>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Wellness is a Daily Ritual */}
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

      {/* Five-minute reads */}
      <AnimatedSection animation="fadeUp">
        <section className="relative h-[360px] sm:h-[400px] md:h-[460px] w-full overflow-hidden">
          <Image src="/images/FiveMinuteReads.png" alt="" fill className="object-cover" />
          <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[140px] xl:px-[190px] pt-[40px] sm:pt-[60px] md:pt-[96px]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[16px] sm:text-[20px] md:text-[22px] uppercase tracking-[2px] sm:tracking-[3px] text-black font-bold"
            >
              join the Vitazan
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-2 sm:mt-4 text-[32px] sm:text-[46px] md:text-[60px] font-bold leading-[1.1] text-black"
            >
              Five-minute reads{" "}
              <span className="font-display italic">for<br />a healthier you.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-3 sm:mt-5 text-[15px] sm:text-[17px] md:text-[19px] leading-[22px] sm:leading-[30px] text-black font-medium"
            >
              Herbal cough remedy carefully formulated using time-tested Ayurvedic herbs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0"
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                className="h-[50px] sm:h-[60px] md:h-[66px] w-full sm:w-[350px] md:w-[430px] rounded-full border border-white bg-white/34 px-5 sm:px-7 text-[15px] sm:text-[17px] italic text-black placeholder:text-black outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="sm:ml-[10px] h-[50px] sm:h-[60px] md:h-[66px] w-full sm:w-[180px] md:w-[200px] rounded-full bg-pink hover:bg-dark-teal text-[17px] sm:text-[19px] md:text-[21px] font-bold text-white transition-opacity hover:opacity-90"
              >
                Subscribe Now
              </motion.button>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials */}
      <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-12 md:py-20">
        <AnimatedSection animation="fadeUp">
          <div className="text-center">
            <p className="text-[13px] sm:text-[15px] md:text-[16px] font-bold uppercase tracking-[2.1px] text-pink">
              Testimonials
            </p>
            <h2 className="font-display mt-2 text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] text-black">
              What{" "}
              <span className="relative inline-block text-pink">Customer
              </span>{" "}
              are Saying
            </h2>
          </div>
        </AnimatedSection>

        <div className="mt-10 md:mt-16">
          <Carousel itemsPerView={{ base: 1, sm: 2, md: 2, lg: 3 }} gap={24} showDots={true} showArrows={true}>
            {[
              { name: "Alison Bali", bg: "/images/greenBg.png", quoteColor: "bg-dark-teal" },
              { name: "Alison Bali", bg: "/images/PinkBg.png", quoteColor: "bg-pink" },
              { name: "Alison Bali", bg: "/images/greenBg.png", quoteColor: "bg-dark-teal" },
            ].map((person, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative pt-[24px]"
              >
                <div className="relative flex items-center justify-end">
                  <div className="relative h-[300px] sm:h-[340px] md:h-[365px] w-full">
                    <Image src={person.bg} alt="" fill className="object-contain object-bottom-left" />
                  </div>
                  <div className="absolute z-10 rounded-[16px] w-[92%] mt-8 rounded-tr-[60px] sm:rounded-tr-[90px] bg-white p-5 sm:p-7 h-fit shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} width="22" height="20" viewBox="0 0 22 20" fill="#f5a623">
                          <path d="M11 0L13.5 7.5H21L15 12L17 19.5L11 14.5L5 19.5L7 12L1 7.5H8.5L11 0Z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-3 sm:mt-4 text-center text-[15px] sm:text-[17px] leading-[24px] sm:leading-[28px] text-black">
                      &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare varius ex et suscipit. Nam vel sem in felis aliquet consequat&rdquo;.
                    </p>
                    <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4">
                      <div className="relative h-[40px] w-[40px] sm:h-[48px] sm:w-[48px] flex-shrink-0 overflow-hidden rounded-full">
                        <Image src="/images/customerImage.png" alt={person.name} fill className="object-cover" />
                      </div>
                      <div className="text-left">
                        <p className="text-[17px] sm:text-[19px] font-semibold text-black">{person.name}</p>
                        <p className="text-[14px] sm:text-[16px] text-[#6d6d6d]">Customer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-10 md:py-16">
        <AnimatedSection animation="fadeUp">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <p className="text-[13px] sm:text-[15px] md:text-[16px] font-bold uppercase tracking-[2.1px] text-pink">
                Blog post
              </p>
              <h2 className="font-display mt-2 text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] text-black">
                Notes on{" "}
                <span className="relative inline-block text-pink">Living Well</span>
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-pink hover:border-dark-teal px-6 sm:px-8 py-2.5 sm:py-3 text-[15px] sm:text-[17px] tracking-[0.32px] transition-colors bg-pink hover:bg-dark-teal text-white! font-semibold!"
            >
              Discover More
            </motion.button>
          </div>
        </AnimatedSection>

        <div className="mt-8 md:mt-12 py-4">
          <Carousel itemsPerView={{ base: 1, sm: 2, md: 2, lg: 3 }} gap={24} showDots={true} showArrows={true} className="py-4">
            {[
              {
                img: "/images/blog1.png",
                tag: "Bone & Joint Health",
                title: "VITAZAN Osteomac - Comprehensive Bone Health Support Explained",
                desc: "Bone health requires more than just calcium. VITAZAN OSTEOMAC delivers a complete, research-backed solution for maintaining bone density...",
              },
              {
                img: "/images/blog2.png",
                tag: "Healthy Living",
                title: "Understanding Bone Health - The Key to Strength and Mobility",
                desc: "Bone health requires more than just calcium. VITAZAN OSTEOMAC delivers a complete, research-backed solution for maintaining bone density...",
              },
              {
                img: "/images/blog3.png",
                tag: "Vitality Store",
                title: "Healthy Living in the Modern Age - Small Habits That Create Big Impact",
                desc: "Bone health requires more than just calcium. VITAZAN OSTEOMAC delivers a complete, research-backed solution for maintaining bone density...",
              },
            ].map((post) => (
              <motion.div
                key={post.title}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="flex flex-col justify-between h-full cursor-pointer shadow-md rounded-2xl"
              >
                <div className="relative h-[200px] sm:h-[230px] md:h-[255px] overflow-hidden rounded-t-2xl">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-white px-4 sm:px-5 py-2 text-[12px] sm:text-[14px] uppercase tracking-[0.26px] text-black font-semibold">
                      {post.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold leading-[26px] sm:leading-[30px] text-black">
                    {post.title}
                  </p>
                  <a
                    href="#"
                    className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-[16px] sm:text-[18px] font-semibold text-pink transition-colors hover:text-pink/80"
                  >
                    Read More
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                      <path d="M1 6H17M17 6L12 1M17 6L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}
