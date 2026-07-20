"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen">
      {/* Left - Branding Side with Image */}
      <div className="relative hidden w-1/2 lg:flex flex-col justify-between overflow-hidden">
        {/* Background photo */}
        <Image
          src="/images/banner.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />

        {/* Teal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00485d]/92 via-[#00485d]/85 to-[#004b61]/78" />

        {/* Decorative rings */}
        <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -left-8 -top-8 h-52 w-52 rounded-full border border-white/[0.06]" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-12 -right-12 h-56 w-56 rounded-full border border-white/[0.06]" />

        <div className="relative z-10 flex flex-col justify-between flex-1 px-14 py-10">
          {/* Logo */}
          <div>
            <Image src="/images/logo.png" alt="Vitazan" width={180} height={50} className="brightness-0 invert h-11 w-auto" />
          </div>

          {/* Product showcase with ingredient badges */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              {/* Main product image */}
              <div className="relative h-[280px] w-[230px]">
                <Image
                  src="/images/htkof-display.png"
                  alt="Vitazan HT-KOF"
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Floating ingredient badges */}
              <div className="absolute -left-6 top-4 rounded-full bg-white/15 px-3.5 py-2 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="relative h-7 w-7 overflow-hidden rounded-full">
                    <Image src="/images/turmeric.png" alt="Turmeric" fill className="object-cover" />
                  </div>
                  <span className="text-xs font-medium text-white">Turmeric</span>
                </div>
              </div>
              <div className="absolute -left-2 bottom-12 rounded-full bg-white/15 px-3.5 py-2 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="relative h-7 w-7 overflow-hidden rounded-full">
                    <Image src="/images/tulsi.png" alt="Holy Basil" fill className="object-cover" />
                  </div>
                  <span className="text-xs font-medium text-white">Holy Basil</span>
                </div>
              </div>
              <div className="absolute -right-4 top-16 rounded-full bg-white/15 px-3.5 py-2 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="relative h-7 w-7 overflow-hidden rounded-full">
                    <Image src="/images/malabar.png" alt="Malabar Nut" fill className="object-cover" />
                  </div>
                  <span className="text-xs font-medium text-white">Malabar Nut</span>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="mt-8 text-center">
              <h1 className="font-display text-[34px] leading-tight text-white">
                Manage Your <span className="text-[#eaffad]">Health Store</span>
              </h1>
              <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-white/60">
                Access your admin dashboard to manage products, orders, customers, and grow your Ayurvedic wellness business.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "3,420+", label: "Customers" },
              { value: "1,948", label: "Orders" },
              { value: "₱48.2K", label: "Revenue" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Image src="/images/logo.png" alt="Vitazan" width={160} height={48} className="h-10 w-auto" />
          </div>

          <div className="mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaffad] px-3 py-1 text-xs font-medium text-[#00485d]">
              <Lock size={12} /> Admin Portal
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-500">Sign in to your admin account to continue</p>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vitazan.com"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-xs font-medium text-[#e5097f] hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-12 text-sm outline-none transition-colors focus:border-[#00485d] focus:bg-white focus:ring-2 focus:ring-[#00485d]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-[#00485d] focus:ring-[#00485d]" />
              <label htmlFor="remember" className="text-sm text-gray-600">Keep me signed in</label>
            </div>

            <Link href="/admin">
              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00485d] text-sm font-semibold text-white transition-all hover:bg-[#003a4d] hover:shadow-lg hover:shadow-[#00485d]/20 mt-2"
              >
                Sign In
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
          </form>

          {/* <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-xs font-medium text-gray-500 mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-gray-400">
              <p>Email: <span className="font-mono text-gray-600">admin@vitazan.com</span></p>
              <p>Password: <span className="font-mono text-gray-600">admin123</span></p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
