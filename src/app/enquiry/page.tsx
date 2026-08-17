"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "@/components/client/AnimatedSection";
import { Phone, Mail, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";

const productList = [
    "ACINIL NEO",
    "ALFAAKTIV",
    "CYSTNIL SURE",
    "DIARON-C",
    "FEMISAN A",
    "FEMISAN B",
    "FEMISAN GOLD",
    "OSTEOMAC",
    "VITAZAN HT-KOF",
];

function EnquiryForm() {
    const searchParams = useSearchParams();
    const productParam = searchParams.get("product");

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        enquiryType: "",
        productName: "",
        message: "",
    });

    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (productParam) {
            setForm((prev) => ({
                ...prev,
                enquiryType: "product",
                productName: productParam,
            }));
            setSearchQuery(productParam);
        }
    }, [productParam]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleProductSelect = (product: string) => {
        setForm((prev) => ({ ...prev, productName: product }));
        setSearchQuery(product);
        setShowDropdown(false);
    };

    const handleProductSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setForm((prev) => ({ ...prev, productName: e.target.value }));
        setShowDropdown(true);
    };

    const filteredProducts = productList.filter((p) =>
        p.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", form);
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                    <label className="block text-[14px] sm:text-[15px] font-bold text-black mb-2">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="h-[52px] sm:h-[56px] w-full rounded-full border border-gray-300 px-6 text-[14px] sm:text-[15px] text-black outline-none transition-colors focus:border-pink focus:ring-2 focus:ring-pink/10 placeholder:text-gray-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-[14px] sm:text-[15px] font-bold text-black mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="h-[52px] sm:h-[56px] w-full rounded-full border border-gray-300 px-6 text-[14px] sm:text-[15px] text-black outline-none transition-colors focus:border-pink focus:ring-2 focus:ring-pink/10 placeholder:text-gray-400"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                    <label className="block text-[14px] sm:text-[15px] font-bold text-black mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="h-[52px] sm:h-[56px] w-full rounded-full border border-gray-300 px-6 text-[14px] sm:text-[15px] text-black outline-none transition-colors focus:border-pink focus:ring-2 focus:ring-pink/10 placeholder:text-gray-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-[14px] sm:text-[15px] font-bold text-black mb-2">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="h-[52px] sm:h-[56px] w-full rounded-full border border-gray-300 px-6 text-[14px] sm:text-[15px] text-black outline-none transition-colors focus:border-pink focus:ring-2 focus:ring-pink/10 placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className={form.enquiryType === "product" ? "sm:col-span-1" : "sm:col-span-2"}>
                    <label className="block text-[14px] sm:text-[15px] font-bold text-black mb-2">Enquiry Type</label>
                    <select
                        name="enquiryType"
                        value={form.enquiryType}
                        onChange={handleChange}
                        className="h-[52px] sm:h-[56px] w-full rounded-full border border-gray-300 px-6 text-[14px] sm:text-[15px] text-black outline-none transition-colors focus:border-pink focus:ring-2 focus:ring-pink/10 bg-white"
                        required
                    >
                        <option value="" disabled>Select an option</option>
                        <option value="product">Product Information</option>
                        <option value="bulk">Bulk Order</option>
                        <option value="partnership">Partnership</option>
                        <option value="support">Customer Support</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {form.enquiryType === "product" && (
                    <div className="sm:col-span-1 relative">
                        <label className="block text-[14px] sm:text-[15px] font-bold text-black mb-2">Product Name</label>
                        <input
                            type="text"
                            name="productNameSearch"
                            value={searchQuery}
                            onChange={handleProductSearch}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                            placeholder="Search product..."
                            className="h-[52px] sm:h-[56px] w-full rounded-full border border-gray-300 px-6 text-[14px] sm:text-[15px] text-black outline-none transition-colors focus:border-pink focus:ring-2 focus:ring-pink/10 placeholder:text-gray-400"
                            required
                        />
                        {showDropdown && filteredProducts.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                                {filteredProducts.map((product) => (
                                    <li
                                        key={product}
                                        onClick={() => handleProductSelect(product)}
                                        className="px-6 py-3 text-[14px] sm:text-[15px] text-black hover:bg-pink/10 hover:text-pink cursor-pointer transition-colors"
                                    >
                                        {product}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <div>
                <label className="block text-[14px] sm:text-[15px] font-bold text-black mb-2">Your Enquiry</label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                    className="w-full rounded-2xl border border-gray-300 px-6 py-4 text-[14px] sm:text-[15px] text-black outline-none transition-colors focus:border-pink focus:ring-2 focus:ring-pink/10 placeholder:text-gray-400 resize-none"
                    required
                />
            </div>

            <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="h-[52px] sm:h-[56px] px-10 sm:px-12 rounded-full bg-pink text-white text-[15px] sm:text-[17px] font-bold uppercase tracking-wider hover:bg-dark-teal transition-colors"
            >
                Submit Enquiry
            </motion.button>
        </form>
    );
}

export default function EnquiryPage() {
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
                        src="/images/contactUs.png"
                        alt="Enquiry"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover"
                        priority
                    />
                    <div className="absolute inset-0 z-[1] mx-auto max-w-[1600px] px-4 sm:px-20 pointer-events-none h-full">
                        <div className="flex flex-col justify-center h-full gap-2 sm:gap-4 w-[55%] sm:w-1/2">
                            <h1 className="font-display text-[24px] sm:text-[40px] md:text-[52px] lg:text-[67px] leading-[1.1] text-black font-medium">
                                Enquiry
                            </h1>
                            <p className="text-[10px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[14px] sm:leading-[20px] md:leading-[24px] text-black font-medium w-full sm:w-[70%] lg:w-[50%]">
                                Have questions about our products or services? We're here to help you.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Form Section */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-16">
                <AnimatedSection animation="fadeUp">
                    <div className="text-center max-w-[700px] mx-auto">
                        <h2 className="font-display text-[32px] sm:text-[42px] md:text-[52px] text-black">
                            How Can We Help?
                        </h2>
                        <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.7] text-black">
                            Please fill out the form below with your enquiry, and our team will get back to you as soon as possible.
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeUp" delay={0.15}>
                    <div className="mt-12 md:mt-16 rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            {/* Form Side */}
                            <div className="lg:col-span-3 p-6 sm:p-10 md:p-14">
                                <h3 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold uppercase tracking-wide text-black">
                                    Submit Your Enquiry
                                </h3>
                                <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.7] text-black max-w-[550px]">
                                    Whether you're looking for product details, bulk orders, or partnership opportunities, we would love to hear from you.
                                </p>

                                <Suspense fallback={<div className="mt-8 text-center text-gray-500">Loading form...</div>}>
                                    <EnquiryForm />
                                </Suspense>
                            </div>

                            {/* Info Card Side */}
                            <div className="lg:col-span-2 bg-[#CE1076] p-6 sm:p-10 md:p-12 flex flex-col justify-center rounded-3xl m-4 lg:m-0 lg:rounded-l-3xl lg:rounded-r-none">
                                <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-white leading-[1.2]">
                                    We're eager to hear from you.
                                </h3>
                                <p className="mt-4 text-[15px] text-white/90">
                                    Reach out to our team directly if you need immediate assistance with your enquiry.
                                </p>

                                <div className="mt-8 sm:mt-10 space-y-5">
                                    <div className="flex items-center gap-4 rounded-2xl bg-white/30 backdrop-blur-sm p-4 sm:p-5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[14px] sm:text-[16px] font-bold text-white">Call Us :</p>
                                            <p className="text-[14px] sm:text-[15px] text-white mt-0.5">+91 0123 456 789</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 rounded-2xl bg-white/30 backdrop-blur-sm p-4 sm:p-5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[14px] sm:text-[16px] font-bold text-white">Email :</p>
                                            <p className="text-[14px] sm:text-[15px] text-white mt-0.5">enquiry@vitazan.co.uk</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 rounded-2xl bg-white/30 backdrop-blur-sm p-4 sm:p-5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[14px] sm:text-[16px] font-bold text-white">Headquarters :</p>
                                            <p className="text-[14px] sm:text-[15px] text-white mt-0.5 leading-[1.5]">Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore - 560016</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    );
}
