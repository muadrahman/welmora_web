'use client';

import React from 'react';
import { GraduationCap, Award, TrendingUp } from 'lucide-react';

export default function AboutUs() {
    return (
        <section id="about" className="py-24 px-6 w-full bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#064E3B] mb-4 tracking-tight">
                        The Architecture of Freedom
                    </h2>
                    <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                        Engineering your path to sovereign wealth with mathematical precision.
                    </p>
                </div>

                {/* Section A: The Company (3-Column Bento) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Card 1: The Hub */}
                    <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-growth-green/10 rounded-full flex items-center justify-center mb-6 text-growth-green">
                            <TrendingUp strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-trust-teal mb-3">The Engineering Hub</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Welmora is India's first financial engineering hub designed to turn wealth accumulation into a mathematical certainty.
                        </p>
                    </div>

                    {/* Card 2: The Mission */}
                    <div className="bg-growth-green/5 border border-growth-green/10 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 md:scale-105 z-10">
                        <div className="w-12 h-12 bg-growth-green rounded-full flex items-center justify-center mb-6 text-white shadow-lg shadow-growth-green/30">
                            <Award strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-[#064E3B] mb-3">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed font-medium">
                            To bridge the financial awareness gap in India through industrial-grade logic and unbiased tools.
                        </p>
                    </div>

                    {/* Card 3: The Logic */}
                    <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-growth-green/10 rounded-full flex items-center justify-center mb-6 text-growth-green">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m0 0h18" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-trust-teal mb-3">Sovereign Logic</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We replace guesswork with algorithms, ensuring every rupee works towards your specific life goals efficiently.
                        </p>
                    </div>
                </div>

                {/* Section B: The Founders (Wide Emerald Glass Card) */}
                <div className="relative overflow-hidden rounded-3xl border border-[#22C55E]/20 bg-[#064E3B]/5 backdrop-blur-xl p-8 md:p-12">
                    {/* Decorative background glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-growth-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Icon/Avatar Placeholder */}
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/80 rounded-2xl flex items-center justify-center shadow-sm border border-[#22C55E]/20 transform rotate-3">
                                <GraduationCap size={40} className="text-[#064E3B]" strokeWidth={1.5} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-[#064E3B] mb-2">Engineering Trust</h3>
                            <p className="text-lg font-medium text-gray-800 mb-4">
                                Founded by Muad Rahman (M.Tech, IIT Kharagpur) and Rohith CK (M.Tech, IISc Bangalore).
                            </p>
                            <div className="space-y-2 text-gray-600">
                                <p>
                                    Proud <span className="font-semibold text-trust-teal">CETians</span> from the College of Engineering Trivandrum.
                                </p>
                                <p className="text-sm md:text-base italic opacity-90">
                                    "Our strategy is battle-tested; refined for over 2+ years with a successful track record among our colleagues and friends."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
