'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TermsView() {
    const [showFullTerms, setShowFullTerms] = React.useState(false);

    return (
        <main className="pt-32 pb-24 px-6 w-full bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-trust-teal mb-4">Terms of Service & Risk Disclosure</h1>
                <p className="text-gray-500 text-sm mb-8">Last Updated: January 2025</p>

                {/* Summary (Layer 1) - Always Visible */}
                <div className="space-y-6 text-gray-700 leading-7">
                    <p className="text-lg font-semibold text-trust-teal">
                        Our promise: Transparency over legal jargon.
                    </p>
                    <p>
                        Welmora is an educational financial planning tool. We provide calculators, projections, and insights to help you understand your money better. But we are NOT a financial advisor, broker, or wealth management firm.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Key Points</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li><strong>Educational Tool:</strong> Welmora is a calculator, not a licensed financial advisor. All outputs are for learning purposes only.</li>
                        <li><strong>No Investment Advice:</strong> We do not recommend specific stocks, funds, or portfolios. Our role is to show you the math, not tell you what to buy.</li>
                        <li><strong>Market Risk:</strong> Investments carry risk. Past performance ≠ future results. You could lose money. Always consult a certified financial planner before making decisions.</li>
                        <li><strong>Accuracy Disclaimer:</strong> We strive for accuracy, but calculations may contain errors. Verify assumptions with a professional.</li>
                        <li><strong>Your Responsibility:</strong> You are solely responsible for your financial decisions. We provide the tools, you make the calls.</li>
                    </ul>

                    <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
                        <p className="text-sm text-gray-700">
                            <strong className="text-red-700">Legal Requirement:</strong> By using Welmora, you acknowledge that all content is for educational purposes and does not constitute financial advice. You accept full responsibility for any actions taken based on our tools.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowFullTerms(!showFullTerms)}
                        className="mt-6 px-6 py-3 bg-trust-teal text-white rounded-full font-semibold hover:bg-trust-teal/90 transition-all shadow-md hover:shadow-lg"
                    >
                        {showFullTerms ? '↑ Hide Full Terms' : '↓ Read Full Legal Terms'}
                    </button>
                </div>

                {/* Long Form Contract (Layer 2) */}
                <AnimatePresence>
                    {showFullTerms && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-8 bg-gray-50/50 p-8 md:p-12 rounded-3xl border border-gray-100 text-sm leading-7 text-slate-600 font-normal">

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">1. PREAMBLE</h3>
                                    <p>These Terms of Service ("Terms") govern your access to and use of the Welmora mobile application and website (collectively, the "Platform"). By accessing or using the Platform, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Platform.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">2. EDUCATIONAL PURPOSE ONLY</h3>
                                    <p>Welmora is designed as an educational and informational tool to assist you in understanding personal finance concepts, including but not limited to:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Compound interest calculations</li>
                                        <li>Systematic Investment Plans (SIP)</li>
                                        <li>Debt repayment strategies</li>
                                        <li>Goal-based financial planning</li>
                                        <li>FIRE (Financial Independence, Retire Early) modeling</li>
                                    </ul>
                                    <p className="mt-4"><strong>Important:</strong> The Platform does not provide personalized investment advice, tax advice, or legal advice. All content, projections, and calculations are generic and should not be construed as recommendations tailored to your specific situation.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">3. NOT A LICENSED ADVISOR</h3>
                                    <p>Welmora and its operators are not registered investment advisors, broker-dealers, tax advisors, or financial planners. We do not hold any licenses from SEBI (Securities and Exchange Board of India), AMFI (Association of Mutual Funds in India), or any other regulatory body. You acknowledge that:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>We cannot and do not provide personalized financial advice</li>
                                        <li>Our tools are self-service calculators based on mathematical formulas</li>
                                        <li>You should consult a certified financial planner (CFP) or licensed advisor before making investment decisions</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">4. RISK DISCLOSURE</h3>
                                    <p><strong>Market Risk:</strong> Investments in securities, mutual funds, stocks, bonds, and other financial instruments involve market risk, including the possible loss of principal. Past performance is not indicative of future results.</p>
                                    <p><strong>Assumption-Based Projections:</strong> All calculations rely on assumptions (e.g., expected return rates, inflation, time horizons). Actual results may vary significantly due to market volatility, regulatory changes, economic conditions, and other unforeseen factors.</p>
                                    <p><strong>No Guarantee:</strong> Welmora does not guarantee the accuracy, completeness, or reliability of any calculations, projections, or content. You use the Platform at your own risk.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">5. USER RESPONSIBILITIES</h3>
                                    <p>By using the Platform, you agree to:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Verify all calculations independently before making financial decisions</li>
                                        <li>Consult with a licensed professional for personalized advice</li>
                                        <li>Not rely solely on Welmora&apos;s tools for investment decisions</li>
                                        <li>Understand that you are solely responsible for any actions taken based on the Platform&apos;s content</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">6. LIMITATION OF LIABILITY</h3>
                                    <p>To the fullest extent permitted by law, Welmora and its officers, directors, employees, and affiliates shall not be liable for:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Any financial losses, damages, or missed opportunities arising from use of the Platform</li>
                                        <li>Errors, omissions, or inaccuracies in calculations or content</li>
                                        <li>Third-party content or links provided on the Platform</li>
                                        <li>Downtime, technical failures, or data loss</li>
                                    </ul>
                                    <p className="mt-4">Our total liability, if any, shall not exceed the amount you paid for the Platform in the 12 months preceding the claim.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">7. ACCEPTABLE USE POLICY</h3>
                                    <p>You agree NOT to:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Use the Platform for illegal purposes or in violation of any laws</li>
                                        <li>Reverse-engineer, decompile, or attempt to extract source code</li>
                                        <li>Share your account credentials with others</li>
                                        <li>Scrape, data-mine, or automate access to the Platform</li>
                                        <li>Misrepresent Welmora as a licensed financial advisor</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">8. SUBSCRIPTION & PAYMENT</h3>
                                    <p>Some features may require a paid subscription. By subscribing, you agree to:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Pay all applicable fees as stated at the time of purchase</li>
                                        <li>Automatic renewal unless you cancel before the renewal date</li>
                                        <li>No refunds for partial subscription periods (except as required by law)</li>
                                    </ul>
                                    <p className="mt-4">We reserve the right to change pricing with 30 days&apos; notice.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">9. INTELLECTUAL PROPERTY</h3>
                                    <p>All content, trademarks, logos, and intellectual property on the Platform are owned by Welmora or its licensors. You may not copy, modify, distribute, or create derivative works without our written permission.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">10. TERMINATION</h3>
                                    <p>We reserve the right to suspend or terminate your account at our discretion if you violate these Terms. Upon termination:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Your access to the Platform will be revoked</li>
                                        <li>You may request deletion of your data (see Privacy Policy)</li>
                                        <li>No refunds will be issued for active subscriptions (except as required by law)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">11. GOVERNING LAW</h3>
                                    <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">12. CHANGES TO TERMS</h3>
                                    <p>We may update these Terms from time to time. Material changes will be communicated via email or in-app notification at least 30 days in advance. Continued use of the Platform after changes constitutes acceptance.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">13. CONTACT & SUPPORT</h3>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
                                        <p><strong>Email:</strong> support@welmora.com</p>
                                        <p><strong>Legal Inquiries:</strong> legal@welmora.com</p>
                                        <p><strong>Address:</strong> Welmora Technologies, Hyderabad, India</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">14. ENTIRE AGREEMENT</h3>
                                    <p>The Terms of Service and our Privacy Policy constitute the sole and entire agreement between you and Welmora regarding the Platform and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Platform.</p>
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
