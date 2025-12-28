'use client';

import React from 'react';
import { TrendingUp, Target, Zap, Wallet } from 'lucide-react';

const features = [
    {
        title: "Smart Debt Management",
        description: "Eliminate high-interest debt with algorithmic precision.",
        icon: TrendingUp,
    },
    {
        title: "Goal-Based Planning",
        description: "Turn your dreams into mathematical milestones.",
        icon: Target,
    },
    {
        title: "The FIRE Engine",
        description: "Track your progress toward total financial freedom.",
        icon: Zap,
    },
    {
        title: "Intelligent Budget Tracking",
        description: "Master your daily cash flow with automated insights and real-time spending alerts.",
        icon: Wallet,
    },
];

export default function FeatureSection() {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                        style={{
                            animationDelay: `${index * 150}ms`,
                            animationFillMode: 'both'
                        }}
                    >
                        <div className="w-12 h-12 bg-growth-green/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 hover:brightness-110">
                            <feature.icon className="w-6 h-6 text-growth-green" strokeWidth={1.5} />
                        </div>

                        <h3 className="text-xl font-bold text-trust-teal mb-3">
                            {feature.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
