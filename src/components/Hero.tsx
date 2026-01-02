'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import AppStoreButtons from './AppStoreButtons';
import InteractiveCandlesticks from './InteractiveCandlesticks';

export default function Hero() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        let clientX, clientY;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const layoutRect = e.currentTarget.getBoundingClientRect();

        // Relative to container for the glow effect
        const relativeX = clientX - layoutRect.left;
        const relativeY = clientY - layoutRect.top;

        x.set(relativeX);
        y.set(relativeY);
    };

    // Dynamic Spotlight Radius: 150px (Mobile) / 300px (Desktop)
    const spotlightRadius = isMobile ? 150 : 300;
    const maskImage = useMotionTemplate`radial-gradient(${spotlightRadius}px ${spotlightRadius}px at ${x}px ${y}px, black, transparent)`;

    return (
        <div
            id="home"
            className="relative flex flex-col items-center justify-start p-4 pt-64 pb-32 overflow-hidden min-h-screen w-full bg-[#ffffff]"
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
        >
            {/* 1. Base Layer (Matte 48px Gray Grid - Static) */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(211, 211, 211, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(211, 211, 211, 0.1) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            {/* 2. Revealed Layer (Matte Interactive) */}
            {isMounted && (
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        maskImage: maskImage,
                        WebkitMaskImage: maskImage
                    }}
                >
                    {/* The Ignition Grid - Subtle Dark Green (No Glow) */}
                    <div
                        className="absolute inset-0 opacity-100"
                        style={{
                            backgroundImage: 'linear-gradient(to right, rgba(20, 83, 45, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 83, 45, 0.15) 1px, transparent 1px)',
                            backgroundSize: '48px 48px'
                        }}
                    />

                    {/* The Volatile Path - Deep Forest Green (#052e16) - Sharp, No Glow */}
                    <div className="absolute inset-0 pb-20 pt-10 px-10">
                        <InteractiveCandlesticks color="#052e16" volatilityMode={true} />
                    </div>
                </motion.div>
            )}

            {/* 3. Main Content - High-Impact Optical Shift (10% up) */}
            <main className="relative z-12 flex flex-col items-center gap-4 text-center w-full max-w-[1440px] px-4 animate-in fade-in zoom-in duration-500 -translate-y-[8vh] md:-translate-y-[12vh]">

                {/* Main Heading - Authority Scale: text-8xl (Desktop) */}
                <h1 className="text-5xl md:text-7xl lg:text-10xl font-bold text-[#064E3B] tracking-tighter drop-shadow-sm leading-none text-wrap break-words">
                    Plan Well, Grow More
                </h1>

                {/* Sub-heading - Closer & Contrast */}
                <p className="text-xl md:text-2xl text-slate-600 font-normal tracking-tight leading-relaxed max-w-2xl px-4 mt-0">
                    Your Digital Financial Consultant for Long-Term Wealth.
                </p>

                {/* App Store Buttons */}
                <div className="mt-2">
                    <AppStoreButtons />
                </div>

                {/* Trust Indicator - Updated Text & Minimalist Check */}
                <div className="flex items-center gap-2 mt-0">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100/50">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-4 h-4 text-growth-green stroke-[3px]"
                            stroke="currentColor"
                        >
                            <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-base font-semibold text-slate-500 tracking-tight">Trusted by Investors and Users</span>
                </div>

            </main>
        </div>
    );
}
