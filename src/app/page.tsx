import { Search, ShoppingBasket, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Top Bar */}
      <div className="bg-teal w-full">
        <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between px-10">
          <p className="text-[13px] uppercase tracking-[0.65px] text-white">
            free shipping over ₱199 &nbsp; | &nbsp; 100% Genuine product
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-2 text-[13px] uppercase tracking-[0.65px] text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C2 3.79086 3.79086 2 6 2H10C12.2091 2 14 3.79086 14 6V14H6C3.79086 14 2 12.2091 2 10V6Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path d="M5 7H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 10H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Customer Care &nbsp; |
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-[13px] uppercase tracking-[0.65px] text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" />
                <path d="M8 4V8L10.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Track My Order
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-10 py-4">
        <div className="flex-shrink-0">
          <Image src="/images/logo.png" alt="Vitazan" width={238} height={62} priority />
        </div>
        <div className="flex items-center gap-10">
          {["Home", "Shop", "About Us", "Our Essence", "Blog", "Contact Us"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-center text-lg text-black transition-colors hover:text-pink"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex w-13 h-13 items-center justify-center rounded-full bg-[#F8FAFB] border border-solid border-[#00485D08]">
            <Search className="w-5.5 h-5.5 text-[#00485D]" />
          </button>
          <button className="flex w-13 h-13 items-center justify-center rounded-full bg-[#F8FAFB] border border-solid border-[#00485D08]">
            <ShoppingBasket className="w-5.5 h-5.5 text-[#00485D]" />
          </button>
          <button className="relative flex w-13 h-13 items-center justify-center rounded-full bg-[#F8FAFB] border border-solid border-[#00485D08]">
            <UserRound className="w-5.5 h-5.5 text-[#00485D]" />
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative mx-auto h-[78.2vh] w-full overflow-hidden">
        <Image
          src="/images/banner.jpg"
          alt="Vitazan Wellness"
          width={1920}
          height={1080}
          className="w-full h-full"
          priority
        />
      </section>

      {/* Ingredients Ticker */}
      <div className="w-full bg-pink py-5 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-0 text-[17px] uppercase tracking-[2.55px] text-white">
              {[
                "Long Pepper",
                "Bibhitaki",
                "Malabar Nut Leaves",
                "Carom Seeds",
                "Turmeric",
                "Long Pepper",
                "Holy basil",
                "Mint",
                "Bharangi",
                "Kakdasinghi",
                "Black Pepper",
              ].map((ingredient, idx) => (
                <span key={idx} className="flex items-center">
                  <span className="px-6 font-medium">{ingredient}</span>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="mx-2">
                    <circle cx="4" cy="4" r="3" fill="white" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Leaf decoration */}
      <div className="relative">
        <Image
          src="/images/leaf.png"
          alt=""
          width={112}
          height={170}
          className="absolute -top-20 left-0 z-10"
        />
      </div>

      {/* Shop by Categories */}
      <section className="mx-auto max-w-[1600px] px-[140px] pt-24 pb-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[14px] font-medium uppercase tracking-[2.1px] text-pink">
              Find your formula
            </p>
            <h2 className="font-display mt-2 text-[52px] text-black">
              Shop by <span className="relative inline-block">Categories
                <span className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-pink opacity-60" />
              </span>
            </h2>
          </div>
          <button className="rounded-full border border-pink px-8 py-3 text-[16px] tracking-[0.32px] text-black transition-colors hover:bg-pink hover:text-white">
            Discover More
          </button>
        </div>

        <div className="mt-12 grid grid-cols-4 gap-6">
          {[
            { name: "Cold and Cough Remedy", img: "/images/category-cold.png", bg: "#fff1e0" },
            { name: "Gut Health", img: "/images/category-gut.png", bg: "#e2fbff" },
            { name: "Bone Joint Muscle Care", img: "/images/category-bone.png", bg: "#f3e4fd" },
            { name: "Vitamin & Nutrition", img: "/images/category-vitamin.png", bg: "#eaecff" },
          ].map((cat) => (
            <div key={cat.name} className="group cursor-pointer text-center">
              <div
                className="relative h-[259px] overflow-hidden rounded-bl-[10px] rounded-br-[10px] rounded-tl-[150px] rounded-tr-[150px] transition-transform group-hover:scale-[1.02]"
                style={{ backgroundColor: cat.bg }}
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-contain p-6"
                />
              </div>
              <p className="mt-6 text-[20px] text-black">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Classic Top Products */}
      <section className="mx-auto max-w-[1600px] px-[140px] py-16">
        <div className="text-center">
          <p className="text-[14px] font-medium uppercase tracking-[2.1px] text-pink">
            CLASSIC TOP picks
          </p>
          <h2 className="font-display mt-2 text-[52px] text-black">
            Classic Top{" "}
            <span className="relative inline-block">Products
              <span className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-pink opacity-60" />
            </span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-5">
          {[
            {
              name: "VITAZAN™ SENAX",
              desc: "VITAZAN™ SENAX is a natural laxative supplement designed to promote healthy digestion and relieve occasional constipation.",
              bg: "/images/senax-bg.jpg",
              product: "/images/senax-product.png",
            },
            {
              name: "VITAZAN™ HT-KOF",
              desc: "VITAZAN™ HT-KOF is a natural laxative supplement designed to promote healthy digestion and relieve occasional constipation.",
              bg: "/images/htkof-bg.jpg",
              product: "/images/htkof-product.png",
            },
            {
              name: "VITAZAN™ OSTEOMAC",
              desc: "VITAZAN™ OSTEOMAC is a natural laxative supplement designed to promote healthy digestion and relieve occasional constipation.",
              bg: "/images/osteomac-bg.jpg",
              product: "/images/osteomac-product.png",
            },
            {
              name: "VITAZAN™ RELOAD",
              desc: "VITAZAN™ RELOAD is a natural laxative supplement designed to promote healthy digestion and relieve occasional constipation.",
              bg: "/images/reload-bg.jpg",
              product: "/images/reload-product.png",
            },
          ].map((product) => (
            <div
              key={product.name}
              className="group relative h-[760px] overflow-hidden rounded-[25px]"
            >
              <Image
                src={product.bg}
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
              <div className="relative z-10 p-10 pt-12">
                <h3 className="text-[40px] font-medium leading-[45px] text-[#08131e]">
                  {product.name}
                </h3>
                <p className="mt-4 max-w-[468px] text-[14px] leading-[21px] text-black">
                  {product.desc}
                </p>
                <button className="mt-6 rounded-full bg-dark-teal px-8 py-3 text-[16px] text-white transition-opacity hover:opacity-90">
                  Enquiry Now
                </button>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[55%]">
                <Image
                  src={product.product}
                  alt={product.name}
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vitazan Essence */}
      <section className="bg-[#eaffad]">
        <div className="mx-auto max-w-[1600px] px-[140px] py-20">
          <div className="text-center">
            <p className="text-[14px] font-medium uppercase tracking-[2.1px] text-pink">
              OUR ESSENCE
            </p>
            <h2 className="font-display mt-2 text-[52px] text-black">
              Vitazan Essence
            </h2>
            <p className="mx-auto mt-6 max-w-[800px] text-[16px] leading-[26px] text-black">
              Among the lesser known Treasures of Ayurveda like Bhargi Muuli. A Hindi shrub/plant about more in
              Village Traditions than in Classical Texts. Folk healers, however, always knew its Worth. They called it
              Guardian of the Lungs, a Plant that gave Strength back to the Weak.
            </p>
            <button className="mt-8 rounded-full border-2 border-pink px-8 py-3 text-[16px] font-medium text-pink transition-colors hover:bg-pink hover:text-white">
              Explore More
            </button>
          </div>

          <div className="mt-16 space-y-10">
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
                <div
                  className={`flex items-center gap-12 `}
                >
                  <div className="flex-1">
                    <h3 className="font-display text-[36px] italic text-black">{item.name}</h3>
                    <p className="mt-3 max-w-[500px] text-[15px] leading-[24px] text-gray-700">
                      {item.desc}
                    </p>
                  </div>
                  <div className="relative h-[200px] w-1/2 overflow-hidden rounded-full">
                    <Image src={item.img} alt={item.name} width={1920} height={1080} className="w-full h-[200px] object-cover" />
                  </div>
                </div>
                <hr className={`${idx === 2 ? 'hidden' : 'block'}`} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Formulated Section */}
      <section className="mx-auto max-w-[1600px] px-[140px] py-16">
        <div className="flex items-center justify-end gap-16">
          <div className="w-[90%] flex justify-center items-center gap-16 border border-solid border-[#00485D] py-15.75 rounded-3xl pl-15.75">
            <Image
              src="/images/syrup2.png"
              alt="Wellness"
              width={1920}
              height={1080}
              className="w-auto h-134.25 rounded-3xl -ml-140"
            />
            <div className="flex flex-col items-start gap-6">
              <p className="text-[14px] font-medium uppercase tracking-[2.1px] text-pink">
                BEST SELLER . BONE & JOINT
              </p>
              <h2 className="font-display text-[44px] leading-[52px] text-black">
                Wellness Formulated<br />with Intention.
              </h2>
              <p className="text-[15px] leading-[24px] text-gray-600">
                Our product line of HT-KOF is a herbal cough syrup/tonic carefully formulated<br />using time-tested Ayurvedic herbs.
              </p>
              <div className="space-y-4">
                {[
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  "Lorem ipsum dolor sit amet, consectetur...",
                  "Lorem ipsum dolor sit amet.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-pink">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-[14px] text-gray-600">{text}</p>
                  </div>
                ))}
              </div>
              <button className="rounded-full bg-pink px-8 py-3 text-[16px] text-white transition-opacity hover:opacity-90 mt-8">
                Enquiry Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Banners */}
      <section className="mx-auto max-w-[1600px] px-10 py-16">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Card */}
          <div className="relative h-[400px] overflow-hidden rounded-[35px]" style={{ backgroundImage: `url('/images/treeHome.png')`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute bottom-0 right-0 h-full w-1/2">
              <Image src="/images/reload.png" alt="Reload" fill className="object-contain" />
            </div>
            <div className="relative z-10 p-12">
              <p className="text-[19px] font-medium tracking-[0.95px] text-black">SALE UP TO</p>
              <p className="mt-2 text-[107px] font-medium leading-none tracking-[5.35px] text-black">
                20<span className="text-[60px]">%</span>
              </p>
              <p className="mt-4 text-[20px] uppercase tracking-[5.6px] text-black">
                New Collection
              </p>
              <button className="mt-8 rounded-xl border border-black px-8 py-3 text-[18px] text-black transition-colors hover:bg-black hover:text-white">
                Shop Now
              </button>
            </div>
          </div>
          {/* Right Card */}
          <div className="relative h-[400px] overflow-hidden rounded-[35px]" style={{ backgroundImage: `url('/images/syrup1.png')`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute bottom-0 right-0 h-full w-1/2">
              <Image src="/images/htkof.png" alt="HT-KOF" fill className="object-contain" />
            </div>
            <div className="relative z-10 p-12">
              <p className="text-[19px] font-medium tracking-[0.95px] text-[#e9a337]">SALE UP TO</p>
              <p className="mt-2 text-[107px] font-medium leading-none tracking-[5.35px] text-[#e9a337]">
                30<span className="text-[60px]">%</span>
              </p>
              <p className="mt-4 text-[20px] uppercase tracking-[5.6px] text-black">
                New Collection
              </p>
              <button className="mt-8 rounded-xl border border-black px-8 py-3 text-[18px] text-black transition-colors hover:bg-black hover:text-white">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness is a Daily Ritual */}
      <section className="mx-auto max-w-[1600px] px-[140px] py-20">
        <div className="text-center">
          <p className="text-[14px] font-medium uppercase tracking-[2.1px] text-pink">
            CLASSIC TOP picks
          </p>
          <h2 className="font-display mt-2 text-[52px] text-black">
            Wellness is a{" "}
            <span className="relative inline-block">daily ritual,
              <span className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-pink opacity-60" />
            </span>{" "}
            not a quick fix.
          </h2>
        </div>

        <div className="mt-16 flex items-start justify-center gap-0">
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
              <div className="flex-1 text-center">
                <div className="mx-auto mb-6 relative h-[180px] w-[180px]">
                  <Image src={item.img} alt={item.title} fill className="object-contain" />
                </div>
                <h3 className="text-[26px] font-medium leading-[34px] text-black">
                  {item.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[400px] text-[17px] leading-[26px] text-black">
                  {item.desc}
                </p>
              </div>
              {idx < 2 && (
                <div className="flex items-center pt-20">
                  <Image src="/images/arrowRight.png" alt="" width={86} height={24} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Five-minute reads */}
      <section className="relative h-[460px] w-full overflow-hidden">
        <Image src="/images/FiveMinuteReads.png" alt="" fill className="object-cover" />
        <div className="relative z-10 mx-auto max-w-[1600px] px-[190px] pt-[96px]">
          <p className="text-[20px] uppercase tracking-[3px] text-black">
            join the Vitazan
          </p>
          <h2 className="mt-4 text-[54px] font-medium leading-[60px] text-black">
            Five-minute reads{" "}
            <span className="font-display italic">for<br />a healthier you.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[30px] text-black">
            Herbal cough remedy carefully formulated using time-tested Ayurvedic herbs.
          </p>
          <div className="mt-5 flex items-center gap-0">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="h-[66px] w-[430px] rounded-full border border-white bg-white/34 px-7 text-[17px] italic text-black placeholder:text-black outline-none"
            />
            <button className="ml-[10px] h-[66px] w-[200px] rounded-full bg-pink text-[20px] font-medium text-white transition-opacity hover:opacity-90">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-[1600px] px-[140px] py-20">
        <div className="text-center">
          <p className="text-[14px] font-medium uppercase tracking-[2.1px] text-pink">
            Testimonials
          </p>
          <h2 className="font-display mt-2 text-[52px] text-black">
            What{" "}
            <span className="relative inline-block">Customer
              <span className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-pink opacity-60" />
            </span>{" "}
            are Saying
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8">
          {[
            { name: "Alison Bali", bg: "/images/greenBg.png", quoteColor: "bg-dark-teal" },
            { name: "Alison Bali", bg: "/images/PinkBg.png", quoteColor: "bg-pink" },
            { name: "Alison Bali", bg: "/images/greenBg.png", quoteColor: "bg-dark-teal" },
          ].map((person, i) => (
            <div key={i} className="relative pt-[24px]">
              <div className="relative flex items-center justify-end">
                <div className="relative h-[365px] w-full">
                  <Image src={person.bg} alt="" fill className="object-contain object-bottom-left" />
                </div>
                <div className="absolute z-10 rounded-[16px] w-[92%] mt-8 rounded-tr-[90px] bg-white p-7 h-fit shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="22" height="20" viewBox="0 0 22 20" fill="#f5a623">
                        <path d="M11 0L13.5 7.5H21L15 12L17 19.5L11 14.5L5 19.5L7 12L1 7.5H8.5L11 0Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-center text-[16px] leading-[28px] text-black">
                    &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare varius ex et suscipit. Nam vel sem in felis aliquet consequat&rdquo;.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <div className="relative h-[48px] w-[48px] flex-shrink-0 overflow-hidden rounded-full">
                      <Image src="/images/customerImage.png" alt={person.name} fill className="object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="text-[18px] text-black">{person.name}</p>
                      <p className="text-[15px] text-[#6d6d6d]">Customer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="mx-auto max-w-[1600px] px-[140px] py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[14px] font-medium uppercase tracking-[2.1px] text-pink">
              Blog post
            </p>
            <h2 className="font-display mt-2 text-[52px] text-black">
              Notes on{" "}
              <span className="relative inline-block">Living Well
                <span className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-pink opacity-60" />
              </span>
            </h2>
          </div>
          <button className="rounded-full border border-pink px-8 py-3 text-[16px] tracking-[0.32px] text-black transition-colors hover:bg-pink hover:text-white">
            Discover More
          </button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8">
          {[
            {
              img: "/images/blog1.png",
              tag: "Bone & Joint Health",
              title: "VITAZAN Osteomac – Comprehensive Bone Health Support Explained",
              desc: "Bone health requires more than just calcium. VITAZAN OSTEOMAC delivers a complete, research-backed solution for maintaining bone density...",
            },
            {
              img: "/images/blog2.png",
              tag: "Healthy Living",
              title: "Understanding Bone Health – The Key to Strength and Mobility",
              desc: "Bone health requires more than just calcium. VITAZAN OSTEOMAC delivers a complete, research-backed solution for maintaining bone density...",
            },
            {
              img: "/images/blog3.png",
              tag: "Vitality Store",
              title: "Healthy Living in the Modern Age – Small Habits That Create Big Impact",
              desc: "Bone health requires more than just calcium. VITAZAN OSTEOMAC delivers a complete, research-backed solution for maintaining bone density...",
            },
          ].map((post) => (
            <div key={post.title} className="group cursor-pointer">
              <div className="relative h-[255px] overflow-hidden rounded-2xl">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-white px-5 py-2 text-[13px] uppercase tracking-[0.26px] text-black">
                    {post.tag}
                  </span>
                </div>
              </div>
              <h3 className="mt-6 text-[20px] font-medium leading-[28px] text-black">
                {post.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[24px] text-[#252424]">
                {post.desc}
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-2 text-[17px] text-pink transition-colors hover:text-pink/80"
              >
                Read More
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <path d="M1 6H17M17 6L12 1M17 6L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-teal mt-16">
        <div className="mx-auto max-w-[1600px] px-[140px] py-16">
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-12">
            {/* Logo & Info */}
            <div>
              <Image src="/images/logoWhite.png" alt="Vitazan" width={180} height={50} />
              <p className="mt-4 text-[14px] leading-[22px] text-white">
                Bone health requires more than just calcium. VITAZAN OSTEOMAC delivers a complete, research-backed solution for maintaining bone density.
              </p>
              <div className="mt-6 flex">
                <Link href="#" className="mr-4">
                  <Image src="/images/facebook.png" alt="Social Media" width={1920} height={1080} className="w-10 h-10" />
                </Link>
                <Link href="#" className="mr-4">
                  <Image src="/images/twitter.png" alt="Social Media" width={1920} height={1080} className="w-10 h-10" />
                </Link>
                <Link href="#" className="mr-4">
                  <Image src="/images/instagram.png" alt="Social Media" width={1920} height={1080} className="w-10 h-10" />
                </Link>
                <Link href="#">
                  <Image src="/images/linkedin.png" alt="Social Media" width={1920} height={1080} className="w-10 h-10" />
                </Link>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-[18px] font-medium text-white">Shop</h4>
              <ul className="mt-4 space-y-3">
                {["All Products", "VITAZAN™ HT-Kof", "VITAZAN™ Senax", "VITAZAN™ Reload", "VITAZAN™ Osteomac"].map(
                  (item) => (
                    <li key={item}>
                      <a href="#" className="text-[15px] text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[18px] font-medium text-white">Company</h4>
              <ul className="mt-4 space-y-3">
                {[
                  "Home",
                  "Shop",
                  "About Us",
                  "Our Essence",
                  "Blog",
                  "Contact Us",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[15px] text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[18px] font-medium text-white">Contact</h4>
              <ul className="mt-4 space-y-3">
                {[
                  "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore - 560016",
                  "health@vitazan.co.uk",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[15px] text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20">
          <div className="mx-auto max-w-[1600px] px-[140px] py-4 flex items-center justify-between">
            <p className="text-center text-[13px] text-white">
              Copyright &copy; 2026 Vitazan. All rights reserved.
            </p>
            <p className="text-center text-[13px] text-white flex items-baseline gap-4">Terms  <span className="w-0.5 h-0.5 rounded-full bg-white" />  Privacy Policy  <span className="w-0.5 h-0.5 rounded-full bg-white" />  FAQ</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
