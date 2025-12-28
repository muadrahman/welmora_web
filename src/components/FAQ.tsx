'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "Is my financial data secure?",
        answer: "Absolutely. We use bank-level 256-bit SSL encryption to protect your data. Your privacy and security are our top priorities, and we never sell your personal information."
    },
    {
        question: "How much does Welmora cost?",
        answer: "Welmora offers a free tier for basic budgeting. Our Premium plan, which includes advanced forecasting and automated insights, is just $9.99/month or $99/year."
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes, you can cancel your subscription at any time with no hidden fees or penalties. You'll retain access to Premium features until the end of your billing cycle."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-trust-teal mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-growth-green/30"
                    >
                        <button
                            className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className="font-semibold text-trust-teal">{faq.question}</span>
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-growth-green" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                        </button>
                        <div
                            className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
