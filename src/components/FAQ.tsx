'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "What is Goal-Based Planning?",
        answer: "It turns your financial dreams into mathematical milestones, creating a precise roadmap for your savings to ensure you hit targets like buying a home or funding education."
    },
    {
        question: "How does a SIP Solver assist me?",
        answer: "It calculates the future value of regular investments and helps you visualize the impact of 'Step-Up' contributions, showing how small increases today compound massively over time."
    },
    {
        question: "What is the purpose of the SWP Solver?",
        answer: "Designed for the retirement phase, it helps you calculate a safe, sustainable monthly withdrawal amount that keeps your corpus intact for as long as possible."
    },
    {
        question: "How does Welmora approach Debt Management?",
        answer: "We use structured repayment algorithms (like Avalanche or Snowball logic) to prioritize high-interest debt, freeing up your cash flow for future wealth building faster."
    },
    {
        question: "What does the FIRE Engine track?",
        answer: "It models your progress toward total Financial Independence and Retiring Early, showing you exactly when your passive investment income will cover your lifestyle expenses."
    },
    {
        question: "Is my financial data secure?",
        answer: "Absolutely. We use bank-grade 256-bit encryption for your peace of mind. Your data is processed locally where possible and never sold to third parties."
    },
    {
        question: "Does Welmora help with Tax Efficiency?",
        answer: "Yes, our calculators account for post-tax returns, helping you understand the real value of your investments after government deductions."
    },
    {
        question: "Can I track my family's finances?",
        answer: "Welmora provides a unified view for household wealth, allowing you to track separate portfolios or combine them for a holistic family financial health check."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 px-6 max-w-4xl mx-auto bg-white">
            <h2 className="text-4xl font-bold text-center text-trust-teal mb-4">Financial Concepts Simplified</h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
                Understanding the tools that build your sovereign wealth.
            </p>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-[#22C55E]/20 rounded-2xl overflow-hidden bg-white/40 backdrop-blur-xl transition-all duration-300 hover:border-[#22C55E]/50 hover:shadow-[0_4px_20px_rgba(34,197,94,0.05)]"
                    >
                        <button
                            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className="font-semibold text-lg text-trust-teal">{faq.question}</span>
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-growth-green" strokeWidth={2} />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" strokeWidth={2} />
                            )}
                        </button>
                        <div
                            className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <p className="text-gray-600 text-base leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
