'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Wallet, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        category: "Security & Privacy",
        icon: Shield,
        items: [
            {
                question: "How is my data encrypted?",
                answer: "We use bank-grade 256-bit SSL encryption for all data transmission. At rest, your sensitive information is encrypted using AES-256 standards, ensuring that even in the unlikely event of a breach, your data remains unreadable."
            },
            {
                question: "Do you sell my data?",
                answer: "Never. Your privacy is our product. We do not sell, rent, or trade your personal information to third parties. Our business model is based on providing value to you, not advertisers."
            }
        ]
    },
    {
        category: "Budgeting & Features",
        icon: Wallet,
        items: [
            {
                question: "Can I connect multiple bank accounts?",
                answer: "Yes, Welmora supports connections to over 10,000 financial institutions globally. You can aggregate all your checking, savings, investment, and credit card accounts in one dashboard."
            },
            {
                question: "Does it track cash expenses?",
                answer: "Absolutely. You can manually enter cash transactions, and our smart categorization engine will learn from your habits to speed up future entries."
            }
        ]
    },
    {
        category: "Subscription & Billing",
        icon: Lock,
        items: [
            {
                question: "Is there a free trial?",
                answer: "We offer a 14-day full-access free trial for our Premium plan. No credit card is required to start exploring the features."
            },
            {
                question: "How do I cancel?",
                answer: "You can cancel your subscription at any time directly from your account settings. There are no cancellation fees, and you'll retain access until the end of your billing period."
            }
        ]
    }
];

export default function FAQPage() {
    const [openItem, setOpenItem] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <section className="min-h-screen py-24 px-6 bg-white pt-32">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-trust-teal tracking-tight mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                        Everything you need to know about using Welmora to secure your financial future.
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 gap-12">
                    {faqs.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${sectionIndex * 150}ms`, animationFillMode: 'both' }}>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-growth-green/10 flex items-center justify-center">
                                    <section.icon className="w-5 h-5 text-growth-green" />
                                </div>
                                <h2 className="text-2xl font-bold text-trust-teal">{section.category}</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {section.items.map((item, itemIndex) => {
                                    const id = `${sectionIndex}-${itemIndex}`;
                                    const isOpen = openItem === id;

                                    return (
                                        <div
                                            key={itemIndex}
                                            className={`border rounded-xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-growth-green/30 bg-growth-green/5 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                        >
                                            <button
                                                onClick={() => toggleItem(id)}
                                                className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                                            >
                                                <span className={`font-semibold text-lg ${isOpen ? 'text-trust-teal' : 'text-gray-700'}`}>
                                                    {item.question}
                                                </span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-5 h-5 text-growth-green flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                )}
                                            </button>

                                            <div
                                                className={`px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                                            >
                                                <p className="text-gray-600 leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-20 text-center p-12 bg-gray-50 rounded-2xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-trust-teal mb-4">Still have questions?</h3>
                    <p className="text-gray-600 mb-8">Can't find the answer you're looking for? Our support team is here to help.</p>
                    <Link href="/#support">
                        <span className="inline-block bg-growth-green text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                            Contact Support
                        </span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
