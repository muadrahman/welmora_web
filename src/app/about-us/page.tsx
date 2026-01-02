'use client';

import React from 'react';
import { Quote, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
    return (
        <main className="pt-40 md:pt-24 pb-24 px-6 w-full bg-white min-h-screen flex flex-col items-center justify-start md:justify-center relative overflow-y-auto md:overflow-hidden">
            {/* Background Ambience - "Clean Room" */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-50/40 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>

            <div className="max-w-6xl w-full mx-auto px-6 min-h-screen md:h-screen md:max-h-screen md:overflow-hidden flex flex-col justify-start md:justify-center py-8 md:py-0">

                {/* 1. Header & Mission */}
                <div className="text-center mb-10 md:mb-8 animate-in fade-in zoom-in duration-700">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#052e16] mb-6 tracking-tight">
                        Wealth Logic, Simplified.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
                        "Most people don’t struggle with money because they’re careless. They struggle because it is explained badly. Welmora exists to slow things down, remove the noise, and make financial decisions understandable."
                    </p>
                </div>

                {/* 2. Founders Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10">

                    {/* Muad - Visionary */}
                    <div className="group relative bg-white/40 backdrop-blur-2xl border border-[#22C55E]/30 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-[#052e16]">Muad Rahman</h3>
                                <div className="text-xs font-bold text-emerald-700 tracking-wider uppercase mt-1 flex items-center gap-2">
                                    <span>IIT Kharagpur</span>
                                    <span className="w-1 h-1 bg-emerald-300 rounded-full"></span>
                                    <span>CET Trivandrum</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800">
                                <GraduationCap size={20} />
                            </div>
                        </div>

                        <div className="relative mb-6 flex-grow">
                            <Quote size={24} className="text-emerald-200 absolute -top-2 -left-2 transform -scale-x-100" />
                            <p className="text-gray-700 leading-relaxed italic relative z-10 pl-6">
                                "I believe financial concepts are simple once you remove the complexity. My work is about turning market logic into something a normal person can reason with—step by step, without fear."
                            </p>
                        </div>

                        <div className="pt-6 border-t border-emerald-50 mt-auto">
                            <p className="text-sm text-gray-500">
                                <strong className="text-emerald-800">The Role:</strong> "Muad creates the financial logic. His focus is clarity over cleverness."
                            </p>
                        </div>
                    </div>

                    {/* Rohith - Architect */}
                    <div className="group relative bg-white/40 backdrop-blur-2xl border border-[#22C55E]/30 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-[#052e16]">Rohith CK</h3>
                                <div className="text-xs font-bold text-emerald-700 tracking-wider uppercase mt-1 flex items-center gap-2">
                                    <span>IISc Bangalore</span>
                                    <span className="w-1 h-1 bg-emerald-300 rounded-full"></span>
                                    <span>CET Trivandrum</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800">
                                <GraduationCap size={20} />
                            </div>
                        </div>

                        <div className="relative mb-6 flex-grow">
                            <Quote size={24} className="text-emerald-200 absolute -top-2 -left-2 transform -scale-x-100" />
                            <p className="text-gray-700 leading-relaxed italic relative z-10 pl-6">
                                "Good technology should disappear. If you are thinking about the interface, I haven't done my job. My goal is to make your experience calm, predictable, and quietly reliable."
                            </p>
                        </div>

                        <div className="pt-6 border-t border-emerald-50 mt-auto">
                            <p className="text-sm text-gray-500">
                                <strong className="text-emerald-800">The Role:</strong> "Rohith builds the system. His focus is on making the technology feel invisible."
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Footer Trust Note */}
                <div className="text-center animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                    <p className="text-gray-400 text-sm font-medium tracking-wide">
                        Before this was an app, it was a habit. Built on <span className="text-emerald-600 font-semibold">2+ years</span> of helping friends and colleagues find financial peace.
                    </p>
                </div>

            </div>
        </main>
    );
}
