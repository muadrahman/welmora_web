'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// Data grouped by category
const faqCategories = [
    {
        title: "Core Concepts",
        items: [
            {
                question: "What is Goal-Based Planning?",
                answer: "Most people save blindly. Goal-Based Planning turns your dreams (buying a home, education, retirement) into mathematical milestones. We calculate exactly how much you need to save today to hit those targets tomorrow, accounting for inflation and market performance."
            },
            {
                question: "What is the FIRE Engine?",
                answer: "FIRE stands for Financial Independence, Retire Early. Our FIRE Engine models your net worth, expenses, and passive income to predict the exact date your investments can fully support your lifestyle without active work."
            },
            {
                question: "How does Debt Management work?",
                answer: "We treat debt as a mathematical emergency. We use structured repayment algorithms (like the Avalanche or Snowball methods) to prioritize high-interest debt first. This minimizes total interest paid and frees up your cash flow for wealth building significantly faster."
            },
            {
                question: "Does Welmora help with Tax Efficiency?",
                answer: "Yes. Raw returns don't matter; money in your pocket does. Our calculators and planners account for post-tax returns, helping you understand the real value of an investment after government deductions."
            }
        ]
    },
    {
        title: "The Welmora Engine",
        items: [
            {
                question: "How does a SIP Solver assist me?",
                answer: "A SIP (Systematic Investment Plan) Solver calculates the future value of your regular investments. More importantly, it helps you visualize the impact of 'Step-Up' contributions—showing how increasing your investment by just 5-10% annually can nearly double your final corpus."
            },
            {
                question: "What is the purpose of the SWP Solver?",
                answer: "The SWP (Systematic Withdrawal Plan) Solver is designed for the retirement or income phase. It helps you calculate a safe, sustainable monthly withdrawal amount that keeps your corpus intact for as long as possible, protecting you from outliving your savings."
            },
            {
                question: "Is my financial data secure?",
                answer: "Security is our foundation. We use bank-grade 256-bit encryption for all data transmission. We do not sell your personal financial data to third parties. Your sovereignty is paramount."
            },
            {
                question: "Can I track my family's financial health?",
                answer: "Welmora provides a unified 'Household View'. You can track separate portfolios for you and your spouse, or combine them for a holistic check on your family's financial health."
            }
        ]
    }
];

export default function FAQPage() {
    // State tracks the currently open item: "categoryIndex-itemIndex" string or null
    const [openKey, setOpenKey] = useState<string | null>(null);

    const toggleFAQ = (key: string) => {
        setOpenKey(openKey === key ? null : key);
    };

    return (
        <main className="pt-32 pb-24 px-6 w-full bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 animate-in fade-in zoom-in duration-700">
                    <h1
                        className="text-4xl md:text-5xl font-bold text-[#052e16] mb-6 tracking-tight"
                        style={{ scrollMarginTop: '100px' }}
                    >
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                        Deep dives into the engineering logic of financial sovereignty.
                    </p>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-12">
                    {faqCategories.map((category, catIdx) => (
                        <div key={catIdx}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pl-2 border-l-4 border-growth-green">
                                {category.title}
                            </h2>
                            <div className="space-y-4">
                                {category.items.map((faq, itemIdx) => {
                                    const key = `${catIdx}-${itemIdx}`;
                                    const isOpen = openKey === key;

                                    return (
                                        <div
                                            key={itemIdx}
                                            className={`rounded-2xl overflow-hidden bg-white/40 backdrop-blur-xl transition-all duration-300 ${isOpen
                                                ? 'border border-[#052e16] shadow-sm shadow-[#052e16]/5'
                                                : 'border border-slate-200 hover:border-growth-green/30'
                                                }`}
                                        >
                                            <button
                                                className="w-full px-8 py-6 flex items-start sm:items-center justify-between text-left focus:outline-none bg-white/50 hover:bg-white/80 transition-colors gap-4"
                                                onClick={() => toggleFAQ(key)}
                                            >
                                                <span className={`font-semibold text-lg transition-colors duration-300 ${isOpen ? 'text-[#052e16]' : 'text-trust-teal'}`}>
                                                    {faq.question}
                                                </span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-5 h-5 text-[#052e16] flex-shrink-0 mt-1 sm:mt-0" strokeWidth={2} />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1 sm:mt-0" strokeWidth={2} />
                                                )}
                                            </button>

                                            <div
                                                className={`px-8 transition-all duration-300 ease-in-out overflow-hidden bg-white/30 ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'
                                                    }`}
                                            >
                                                <p className="text-gray-700 text-base leading-relaxed border-t border-gray-100 pt-4 font-normal">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final Support CTA */}
                <div className="mt-24 text-center">
                    <p className="text-gray-500 mb-6 font-medium">Still have questions?</p>
                    <Link
                        href="/#support"
                        className="inline-flex items-center gap-2 text-lg font-bold text-[#052e16] border-[1.5px] border-[#052e16] rounded-full px-8 py-4 hover:bg-[#052e16] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#052e16]/20 group"
                    >
                        <MessageSquare size={20} className="group-hover:animate-bounce" />
                        <span className="md:hidden">Contact Us</span>
                        <span className="hidden md:inline">Contact Support & Engineering</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
