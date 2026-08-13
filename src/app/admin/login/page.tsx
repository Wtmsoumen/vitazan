"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Branding Side */}
      <div className="relative hidden w-1/2 lg:flex flex-col justify-between overflow-hidden bg-[#00485d]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/20" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10" />
          <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-[#e5097f]/20" />
        </div>

        <div className="relative z-10 flex flex-col justify-center flex-1 px-16">
          <div className="mb-12">
            <Image src="/images/logo.png" alt="Vitazan" width={200} height={60} className="brightness-0 invert h-12 w-auto" />
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white">
            Manage Your<br />
            <span className="text-[#eaffad]">Health Store</span><br />
            With Ease
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/70">
            Access your admin dashboard to manage products, orders, customers, and grow your Ayurvedic wellness business.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { value: "3,420+", label: "Customers" },
              { value: "1,948", label: "Orders" },
              { value: "₱48.2K", label: "Revenue" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 px-16 pb-8">
          <p className="text-sm text-white/40">&copy; 2026 Vitazan. All rights reserved.</p>
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

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              disabled={submitting}
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00485d] text-sm font-semibold text-white transition-all hover:bg-[#003a4d] hover:shadow-lg hover:shadow-[#00485d]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
