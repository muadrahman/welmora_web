'use client';

import React from 'react';
import { TrendingUp, Target, Zap, Wallet, Bot, UserCheck } from 'lucide-react';

const features = [
    {
        title: "The FIRE Engine",
        description: "Track your progress toward Financial Independence Retire Early. Calculate exactly how much you need to stop working and live life entirely on your own terms.",
        icon: Zap,
        status: "pending"
    },
    {
        title: "Smart Debt Management",
        description: "Eliminate high-interest debt with algorithmic precision. Strategically prioritize your repayments to minimize interest leakage and accelerate your path to freedom.",
        icon: TrendingUp,
        status: "pending"
    },
    {
        title: "Goal-Based Planning",
        description: "Turn your dreams into mathematical milestones. Build a personalized roadmap that dynamically adjusts to your life's changing financial priorities.",
        icon: Target,
        status: "active"
    },
    {
        title: "Intelligent Budget Tracking",
        description: "Master your daily cash flow with automated insights. Real-time spending alerts and smart categorization keep your wealth-building goals on track.",
        icon: Wallet,
        status: "pending"
    },
    {
        title: "AI Finance Partner",
        description: "Get 24/7 personalized insights on your spending and goals. Engage with a digital consultant that learns your habits to provide tailored wealth-growth suggestions.",
        icon: Bot,
        status: "pending"
    },
    {
        title: "Expert Human Access",
        description: "Direct access to qualified experts for complex financial strategies. Bridge the gap between technology and human wisdom for high-touch wealth management.",
        icon: UserCheck,
        status: "pending"
    },
];

export default function FeatureSection() {
    return (
        <section className="py-6 pt-2 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto min-h-[60vh] scroll-mt-20" id="features">
            <div className="text-center mb-0 space-y-3">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                    Advanced Tools for Your Financial Freedom
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-xl leading-relaxed">
                    A complete ecosystem designed to optimize every aspect of your wealth.
                </p>
            </div>

            {/* 3x2 Sovereign Glass Bento Grid - One Page Fit */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group relative flex flex-col p-8 h-full bg-white/40 backdrop-blur-2xl border border-[#22C55E]/20 ring-1 ring-white/60 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:border-[#22C55E]/40 hover:shadow-[0_20px_50px_rgba(34,197,94,0.05)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                    >

                        <div className="w-12 h-12 bg-white/60 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-growth-green/10 transition-colors duration-500 shadow-sm border border-white/50">
                            <feature.icon className="w-6 h-6 text-trust-teal group-hover:text-growth-green transition-colors duration-500" strokeWidth={1.5} />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-trust-teal transition-colors">
                            {feature.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed text-base relative z-10 font-light">
                            {feature.description}
                        </p>

                        {/* Minimalist Watermark Badge - 10% Opacity */}
                        {feature.status === 'pending' && (
                            <div className="absolute bottom-4 right-6 text-[10px] font-bold text-slate-900 opacity-20 tracking-[0.2em] uppercase pointer-events-none select-none">
                                Coming Soon
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
