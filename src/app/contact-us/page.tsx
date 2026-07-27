"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "@/components/client/AnimatedSection";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactUsPage() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="w-full bg-white">
            {/* Hero Banner */}
            <section className="relative mx-auto w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full"
                >
                    <Image
                        src="/images/contactUs.png"
                        alt="Contact Us"
                        width={1920}
                        height={1080}
                        className="w-full h-auto"
                        priority
                    />
                    <div className="absolute inset-0 z-[1] mx-auto max-w-[1600px] px-4 sm:px-20 pointer-events-none h-full">
                        <div className="flex flex-col justify-center h-full gap-2 sm:gap-4 w-[55%] sm:w-1/2">
                            <h1 className="font-display text-[24px] sm:text-[40px] md:text-[52px] lg:text-[67px] leading-[1.1] text-black font-medium">
                                Contact Us
                            </h1>
                            <p className="text-[10px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[14px] sm:leading-[20px] md:leading-[24px] text-black font-medium w-full sm:w-[70%] lg:w-[50%]">
                                Premium natural products crafted to support a healthier you and a better tomorrow.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Contact Info Section */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-10">
                <AnimatedSection animation="fadeUp">
                    <div className="text-center max-w-[700px] mx-auto">
                        <h2 className="font-display text-[32px] sm:text-[42px] md:text-[52px] text-black">
                            Contact Info
                        </h2>
                        <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.7] text-black">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget enim vitae ex scelerisque hendrerit. Praesent pulvinar quam sapien, eget faucibus velit malesuada ac.
                        </p>
                    </div>
                </AnimatedSection>

                {/* Form + Info Card */}
                <AnimatedSection animation="fadeUp" delay={0.15}>
                    <div className="mt-12 md:mt-16 rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            {/* Form Side */}
                            <div className="lg:col-span-3 p-6 sm:p-10 md:p-14">
                                <h3 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold uppercase tracking-wide text-black">
                                    Send Us A Message
                                </h3>
                                <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.7] text-black max-w-[550px]">
                                    Nullam ut nunc pellentesque, ultrices odio non, dapibus eros. Proin auctor ultricies augue eget lobortis. Duis eu risus odio. In vel metus in dolor.
                                </p>

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
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[14px] sm:text-[15px] font-bold text-black mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleChange}
                                                placeholder="Enter your first name"
                                                className="h-[52px] sm:h-[56px] w-full rounded-full border border-gray-300 px-6 text-[14px] sm:text-[15px] text-black outline-none transition-colors focus:border-pink focus:ring-2 focus:ring-pink/10 placeholder:text-gray-400"
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
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[14px] sm:text-[15px] font-bold text-black mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="Enter phone no"
                                                className="h-[52px] sm:h-[56px] w-full rounded-full border border-gray-300 px-6 text-[14px] sm:text-[15px] text-black outline-none transition-colors focus:border-pink focus:ring-2 focus:ring-pink/10 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[14px] sm:text-[15px] font-bold text-black mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            rows={5}
                                            className="w-full rounded-2xl border border-gray-300 px-6 py-4 text-[14px] sm:text-[15px] text-black outline-none transition-colors focus:border-pink focus:ring-2 focus:ring-pink/10 placeholder:text-gray-400 resize-none"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="h-[52px] sm:h-[56px] px-10 sm:px-12 rounded-full bg-pink text-white text-[15px] sm:text-[17px] font-bold uppercase tracking-wider hover:bg-dark-teal transition-colors"
                                    >
                                        Send A Message
                                    </motion.button>
                                </form>
                            </div>

                            {/* Info Card Side */}
                            <div className="lg:col-span-2 bg-[#CE1076] p-6 sm:p-10 md:p-12 flex flex-col justify-center rounded-3xl m-4 lg:m-0 lg:rounded-l-3xl lg:rounded-r-none">
                                <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-white leading-[1.2]">
                                    Hi, We are always here to help you.
                                </h3>

                                <div className="mt-8 sm:mt-10 space-y-5">
                                    <div className="flex items-center gap-4 rounded-2xl bg-white/30 backdrop-blur-sm p-4 sm:p-5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[14px] sm:text-[16px] font-bold text-white">Hotline :</p>
                                            <p className="text-[14px] sm:text-[15px] text-white mt-0.5">+91 0123 456 789</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 rounded-2xl bg-white/30 backdrop-blur-sm p-4 sm:p-5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[14px] sm:text-[16px] font-bold text-white">Email :</p>
                                            <p className="text-[14px] sm:text-[15px] text-white mt-0.5">health@vitazan.co.uk</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 rounded-2xl bg-white/30 backdrop-blur-sm p-4 sm:p-5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[14px] sm:text-[16px] font-bold text-white">Address :</p>
                                            <p className="text-[14px] sm:text-[15px] text-white mt-0.5 leading-[1.5]">Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore - 560016</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 sm:mt-10 pt-6 border-t border-white/20">
                                    <p className="text-[15px] sm:text-[17px] font-bold text-white">Connect with Us :</p>
                                    <div className="mt-4 flex items-center gap-3">
                                        {[
                                            {
                                                label: "Facebook",
                                                path: "M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z",
                                            },
                                            {
                                                label: "X",
                                                path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                                            },
                                            {
                                                label: "Instagram",
                                                path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                                            },
                                            {
                                                label: "LinkedIn",
                                                path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                                            },
                                        ].map((social) => (
                                            <a
                                                key={social.label}
                                                href="#"
                                                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/20 transition-colors"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                                    <path d={social.path} />
                                                </svg>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            {/* map */}
            <section className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-10">
                <iframe
                    className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.187392329399!2d77.6807386112917!3d13.023735687243494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae10e140888885%3A0xcaaa9429a2dbd9f1!2s1st%20Cross%20Rd%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1785152669980!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin">
                </iframe>
            </section>
        </div>
    );
}
