"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, Phone, Leaf } from "lucide-react";

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/dashboard");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="absolute inset-0 z-0 opacity-70" style={{ backgroundImage: "url(/images/loginD2.png)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }}></div>
            {/* Right - Login Form */}
            <div className="mb-8 w-full flex items-center justify-center z-10">
                <Link href="/">
                    <Image src="/images/logo.png" alt="Vitazan" width={1920} height={1080} className="h-18 w-auto" />
                </Link>
            </div>
            <div className="flex w-fit flex-col items-center justify-center p-6 sm:p-8 shadow-xl shadow-[#00485d20] border border-solid border-[#00485d20] rounded-2xl bg-white z-10">
                <div className="w-[30rem]">

                    <div className="mb-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-3 py-1 text-xs font-medium text-[#00485d]">
                            <Leaf size={12} /> {isSignUp ? "Join the Community" : "Member Portal"}
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-black">
                        {isSignUp ? "Create Account" : "Welcome back"}
                    </h2>
                    <p className="mt-2 text-gray-500">
                        {isSignUp
                            ? "Join Vitazan and start your wellness journey"
                            : "Sign in to your account to continue"}
                    </p>

                    {/* Toggle */}
                    <div className="mt-6 flex items-center gap-1 rounded-full bg-gray-100 p-1 w-fit">
                        <button
                            onClick={() => setIsSignUp(false)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!isSignUp ? "bg-[#00485d] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsSignUp(true)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isSignUp ? "bg-[#00485d] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {isSignUp && (
                                <motion.div
                                    key="name"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10"
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {isSignUp && (
                                <motion.div
                                    key="phone"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+63 XXX XXX XXXX"
                                            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                {!isSignUp && (
                                    <button type="button" className="text-xs font-medium text-[#e5097f] hover:underline">Forgot password?</button>
                                )}
                            </div>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-12 text-sm outline-none transition-colors focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {!isSignUp && (
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-[#00485d] focus:ring-[#00485d]" />
                                <label htmlFor="remember" className="text-sm text-gray-600">Keep me signed in</label>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#E5097F] text-sm font-semibold text-white transition-all hover:bg-[#c4087a] hover:shadow-lg hover:shadow-[#E5097F]/20"
                        >
                            {isSignUp ? "Create Account" : "Sign In"}
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="font-semibold text-[#E5097F] hover:underline"
                        >
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </button>
                    </p>
                </div>
            </div>
        </div >
    );
}
