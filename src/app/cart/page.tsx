"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBasket, ArrowRight, Truck, ShieldCheck, Tag } from "lucide-react";
import AnimatedSection from "@/components/client/AnimatedSection";

interface CartItem {
    id: number;
    name: string;
    variant: string;
    price: number;
    originalPrice: number;
    quantity: number;
    image: string;
}

const initialCartItems: CartItem[] = [
    {
        id: 1,
        name: "VITAZAN™ HT-KOF",
        variant: "200ml Pack",
        price: 299,
        originalPrice: 399,
        quantity: 2,
        image: "/images/htkof1.png",
    },
    {
        id: 2,
        name: "VITAZAN™ OSTEOMAC",
        variant: "60 Tablets",
        price: 499,
        originalPrice: 649,
        quantity: 1,
        image: "/images/osteomac-product.png",
    },
    {
        id: 3,
        name: "VITAZAN™ SENAX",
        variant: "100ml Pack",
        price: 349,
        originalPrice: 449,
        quantity: 1,
        image: "/images/senax-product.png",
    },
];

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalSavings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0);
    const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
    const shipping = subtotal >= 199 ? 0 : 49;
    const total = subtotal - discount + shipping;

    const applyCoupon = () => {
        if (couponCode.trim().toUpperCase() === "VITAZAN10") {
            setCouponApplied(true);
        }
    };

    return (
        <div className="w-full bg-[#F8FAFB]">
            {/* Header */}
            <section className="bg-white border-b border-gray-100">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-6 md:py-8">
                    <AnimatedSection animation="fadeUp">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCE7F3]">
                                <ShoppingBasket className="w-6 h-6 text-[#E5097F]" />
                            </div>
                            <div>
                                <h1 className="font-display text-[24px] sm:text-[32px] md:text-[40px] text-dark font-medium">
                                    Your Cart
                                </h1>
                                <p className="text-[13px] sm:text-[14px] text-gray-500">
                                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-8 md:py-12">
                {cartItems.length === 0 ? (
                    <AnimatedSection animation="fadeUp">
                        <div className="flex flex-col items-center justify-center py-20 gap-6">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FCE7F3]">
                                <ShoppingBasket className="w-12 h-12 text-[#E5097F]" />
                            </div>
                            <h2 className="font-display text-[24px] sm:text-[32px] text-dark">Your cart is empty</h2>
                            <p className="text-[14px] sm:text-[16px] text-gray-500 text-center max-w-md">
                                Looks like you haven&apos;t added any products yet. Explore our range of premium wellness products.
                            </p>
                            <Link
                                href="/shop"
                                className="mt-2 flex items-center gap-2 bg-[#E5097F] text-white px-8 py-3.5 rounded-full text-[15px] font-semibold hover:bg-[#c4087a] transition-colors"
                            >
                                Continue Shopping <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </AnimatedSection>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                        {/* Cart Items */}
                        <div className="w-full lg:w-[62%]">
                            <AnimatedSection animation="fadeUp">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    {/* Table Header - Desktop */}
                                    <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 bg-[#F8FAFB] border-b border-gray-100 text-[13px] font-semibold text-gray-500 uppercase tracking-wide">
                                        <span>Product</span>
                                        <span className="text-center">Price</span>
                                        <span className="text-center">Quantity</span>
                                        <span className="text-center">Total</span>
                                        <span className="w-8" />
                                    </div>

                                    <AnimatePresence>
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                exit={{ opacity: 0, x: -100, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="border-b border-gray-50 last:border-b-0"
                                            >
                                                {/* Desktop Row */}
                                                <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-5 items-center">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative w-[80px] h-[80px] rounded-xl bg-[#F8FAFB] flex items-center justify-center flex-shrink-0">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={200}
                                                                height={200}
                                                                className="w-[60px] h-[60px] object-contain"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-[15px] font-semibold text-dark">{item.name}</h3>
                                                            <p className="text-[13px] text-gray-500 mt-0.5">{item.variant}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="text-[15px] font-semibold text-dark">&#8369;{item.price}</span>
                                                        <span className="block text-[12px] text-black line-through">&#8369;{item.originalPrice}</span>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                            >
                                                                <Minus className="w-3.5 h-3.5 text-gray-600" />
                                                            </button>
                                                            <span className="w-8 text-center text-[14px] font-semibold text-dark">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                            >
                                                                <Plus className="w-3.5 h-3.5 text-gray-600" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="text-[16px] font-bold text-[#00485d]">&#8369;{item.price * item.quantity}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors group"
                                                    >
                                                        <X className="w-4 h-4 text-black group-hover:text-red-500 transition-colors" />
                                                    </button>
                                                </div>

                                                {/* Mobile Row */}
                                                <div className="sm:hidden px-4 py-4">
                                                    <div className="flex gap-3">
                                                        <div className="relative w-[70px] h-[70px] rounded-xl bg-[#F8FAFB] flex items-center justify-center flex-shrink-0">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={200}
                                                                height={200}
                                                                className="w-[50px] h-[50px] object-contain"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <h3 className="text-[14px] font-semibold text-dark">{item.name}</h3>
                                                                    <p className="text-[12px] text-gray-500">{item.variant}</p>
                                                                </div>
                                                                <button
                                                                    onClick={() => removeItem(item.id)}
                                                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50"
                                                                >
                                                                    <X className="w-3.5 h-3.5 text-black" />
                                                                </button>
                                                            </div>
                                                            <div className="flex items-center justify-between mt-3">
                                                                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                                                                    <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center">
                                                                        <Minus className="w-3 h-3 text-gray-600" />
                                                                    </button>
                                                                    <span className="w-6 text-center text-[13px] font-semibold">{item.quantity}</span>
                                                                    <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center">
                                                                        <Plus className="w-3 h-3 text-gray-600" />
                                                                    </button>
                                                                </div>
                                                                <span className="text-[15px] font-bold text-[#00485d]">&#8369;{item.price * item.quantity}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </AnimatedSection>

                            {/* Continue Shopping */}
                            <div className="mt-6 flex items-center justify-between">
                                <Link
                                    href="/shop"
                                    className="flex items-center gap-2 text-[14px] font-medium text-[#00485d] hover:text-[#E5097F] transition-colors"
                                >
                                    <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <AnimatedSection animation="fadeUp">
                                <div className="mt-8 flex flex-wrap gap-4 sm:gap-6">
                                    {[
                                        { icon: <Truck className="w-5 h-5 text-[#00485d]" />, text: "Free shipping over ₱199" },
                                        { icon: <ShieldCheck className="w-5 h-5 text-[#00485d]" />, text: "Secure checkout" },
                                        { icon: <Tag className="w-5 h-5 text-[#00485d]" />, text: "Best price guarantee" },
                                    ].map((badge, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-[13px] text-gray-600">
                                            {badge.icon}
                                            <span>{badge.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-[38%]">
                            <AnimatedSection animation="fadeUp" delay={0.1}>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-28">
                                    <h2 className="font-display text-[20px] sm:text-[24px] text-dark font-semibold">
                                        Order Summary
                                    </h2>

                                    <div className="mt-6 space-y-4">
                                        <div className="flex justify-between text-[14px]">
                                            <span className="text-gray-600">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                                            <span className="font-semibold text-dark">&#8369;{subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-[14px]">
                                            <span className="text-gray-600">Savings</span>
                                            <span className="font-semibold text-green-600">-&#8369;{totalSavings}</span>
                                        </div>
                                        {couponApplied && (
                                            <div className="flex justify-between text-[14px]">
                                                <span className="text-gray-600">Coupon (VITAZAN10)</span>
                                                <span className="font-semibold text-green-600">-&#8369;{discount}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-[14px]">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-dark"}`}>
                                                {shipping === 0 ? "Free" : `₱${shipping}`}
                                            </span>
                                        </div>
                                    </div>

                                    <hr className="my-5 border-gray-100" />

                                    {/* Coupon Code */}
                                    <div className="mb-5">
                                        <label className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Coupon Code</label>
                                        <div className="mt-2 flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Enter code"
                                                disabled={couponApplied}
                                                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-dark placeholder:text-black focus:outline-none focus:border-[#E5097F] focus:ring-1 focus:ring-[#E5097F]/20 disabled:bg-gray-50 disabled:text-black"
                                            />
                                            <button
                                                onClick={applyCoupon}
                                                disabled={couponApplied}
                                                className="px-5 py-2.5 rounded-lg bg-[#00485d] text-white text-[13px] font-semibold hover:bg-[#003a4d] transition-colors disabled:bg-gray-300"
                                            >
                                                {couponApplied ? "Applied" : "Apply"}
                                            </button>
                                        </div>
                                        {couponApplied && (
                                            <p className="mt-2 text-[12px] text-green-600 font-medium">10% discount applied successfully!</p>
                                        )}
                                    </div>

                                    <hr className="my-5 border-gray-100" />

                                    {/* Total */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-[16px] font-semibold text-dark">Total</span>
                                        <span className="text-[24px] sm:text-[28px] font-bold text-[#00485d]">&#8369;{total}</span>
                                    </div>

                                    {/* Checkout Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="mt-6 w-full flex items-center justify-center gap-2 bg-[#E5097F] text-white py-4 rounded-full text-[16px] font-semibold hover:bg-[#c4087a] transition-colors shadow-lg shadow-[#E5097F]/20"
                                    >
                                        Proceed to Checkout <ArrowRight className="w-5 h-5" />
                                    </motion.button>

                                    <p className="mt-4 text-[12px] text-center text-black">
                                        Taxes calculated at checkout
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
