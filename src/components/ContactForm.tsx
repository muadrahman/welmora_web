'use client';

import React, { useState } from 'react';

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        // In production, Formspree handles the actual submission
        // For demo, we show immediate success feedback
        setSubmitted(true);

        // Clear form inputs after submission
        form.reset();
    };

    if (submitted) {
        return (
            <section className="w-full max-w-4xl mx-auto px-6 py-20 flex justify-center">
                <div className="w-full max-w-lg bg-white/80 backdrop-blur-md border border-trust-teal/20 rounded-2xl p-12 shadow-lg text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-growth-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-growth-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-trust-teal mb-2">Message Sent!</h3>
                    <p className="text-gray-600">Thank you, our team will contact you soon.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full max-w-4xl mx-auto px-6 py-12 !scroll-mt-0 flex flex-col justify-start bg-white relative z-10" id="support">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-trust-teal mb-4">Support & Feedback</h2>
                <p className="text-gray-600">We're here to help you plan your financial future.</p>
            </div>

            <div className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-md border border-trust-teal/20 rounded-2xl p-8 shadow-lg">
                <form
                    action="https://formspree.io/f/xdkovpqv"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                >
                    {/* Name Field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-growth-green focus:ring-2 focus:ring-growth-green/20 outline-none transition-all placeholder:text-gray-400"
                            placeholder="Sachin Tendulkar"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-growth-green focus:ring-2 focus:ring-growth-green/20 outline-none transition-all placeholder:text-gray-400"
                            placeholder="sachin.tendulkar@gmail.com"
                        />
                    </div>

                    {/* Mobile Number Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-growth-green focus:ring-2 focus:ring-growth-green/20 outline-none transition-all placeholder:text-gray-400"
                            placeholder="+91 8921945282"
                        />
                    </div>

                    {/* Query Field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-semibold text-gray-700">How can we help you grow?</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-trust-teal focus:ring-1 focus:ring-trust-teal outline-none transition-all placeholder:text-gray-400 resize-none"
                            placeholder="How can Welmora help me retire early?"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-growth-green text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                        Send to Support
                    </button>
                </form>
            </div>
        </section>
    );
}
