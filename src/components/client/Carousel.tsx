"use client";

import { motion, useMotionValue, useAnimation, PanInfo } from "framer-motion";
import { useRef, useState, useEffect, useCallback, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
    children: ReactNode[];
    itemClassName?: string;
    showArrows?: boolean;
    showDots?: boolean;
    gap?: number;
    itemsPerView?: { base: number; sm?: number; md?: number; lg?: number };
    className?: string
}

export default function Carousel({
    children,
    itemClassName = "",
    showArrows = true,
    showDots = true,
    gap = 24,
    itemsPerView = { base: 1, sm: 2, md: 2, lg: 3 },
    className
}: CarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const controls = useAnimation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(itemsPerView.base);
    const [itemWidth, setItemWidth] = useState(0);
    const totalItems = children.length;

    const updateDimensions = useCallback(() => {
        if (!containerRef.current) return;
        const w = window.innerWidth;
        let count = itemsPerView.base;
        if (w >= 1024 && itemsPerView.lg) count = itemsPerView.lg;
        else if (w >= 768 && itemsPerView.md) count = itemsPerView.md;
        else if (w >= 640 && itemsPerView.sm) count = itemsPerView.sm;
        setVisibleCount(count);

        const containerWidth = containerRef.current.offsetWidth;
        const iw = (containerWidth - gap * (count - 1)) / count;
        setItemWidth(iw);
    }, [gap, itemsPerView]);

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [updateDimensions]);

    const maxIndex = Math.max(0, totalItems - visibleCount);

    const goTo = useCallback(
        (index: number) => {
            const clamped = Math.max(0, Math.min(index, maxIndex));
            setCurrentIndex(clamped);
            controls.start({ x: -clamped * (itemWidth + gap), transition: { type: "spring", stiffness: 300, damping: 30 } });
        },
        [controls, itemWidth, gap, maxIndex]
    );

    const handleDragEnd = (_: never, info: PanInfo) => {
        const threshold = itemWidth / 4;
        if (info.offset.x < -threshold) goTo(currentIndex + 1);
        else if (info.offset.x > threshold) goTo(currentIndex - 1);
        else goTo(currentIndex);
    };

    if (!itemWidth) {
        return <div ref={containerRef} className="w-full min-h-[100px]" />;
    }

    const trackWidth = totalItems * itemWidth + (totalItems - 1) * gap;

    return (
        <div className="relative">
            <div ref={containerRef} className="overflow-hidden">
                <motion.div
                    className={`flex cursor-grab select-none ${className}`}
                    whileTap={{ cursor: "grabbing" }}
                    style={{ x, width: trackWidth, gap }}
                    drag="x"
                    dragConstraints={{
                        left: -(trackWidth - (visibleCount * itemWidth + (visibleCount - 1) * gap)),
                        right: 0,
                    }}
                    animate={controls}
                    onDragEnd={handleDragEnd}
                    dragElastic={0.1}
                >
                    {children.map((child, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 ${itemClassName}`}
                            style={{ width: itemWidth }}
                        >
                            {child}
                        </div>
                    ))}
                </motion.div>
            </div>

            {showArrows && maxIndex > 0 && (
                <>
                    <button
                        onClick={() => goTo(currentIndex - 1)}
                        disabled={currentIndex === 0}
                        className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-dark-teal" />
                    </button>
                    <button
                        onClick={() => goTo(currentIndex + 1)}
                        disabled={currentIndex >= maxIndex}
                        className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-dark-teal" />
                    </button>
                </>
            )}

            {showDots && maxIndex > 0 && (
                <div className="mt-6 sm:mt-8 flex justify-center gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-pink" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
