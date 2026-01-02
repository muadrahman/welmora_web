'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrivacyView() {
    const [showFullPolicy, setShowFullPolicy] = React.useState(false);

    return (
        <main className="pt-32 pb-24 px-6 w-full bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-trust-teal mb-4">Privacy Policy</h1>
                <p className="text-gray-500 text-sm mb-8">Last Updated: January 2025</p>

                {/* Summary (Layer 1) - Always Visible */}
                <div className="space-y-6 text-gray-700 leading-7">
                    <p className="text-lg font-semibold text-trust-teal">
                        Your privacy is not negotiable.
                    </p>
                    <p>
                        At Welmora, we understand that your financial data is deeply personal. That&apos;s why our entire architecture is designed around one rule: <strong>Your data is yours, period.</strong>
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Quick Version</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>We <strong>do not sell your data</strong>. Ever. Our business model is not advertising.</li>
                        <li>All your financial calculations run <strong>locally on your device</strong>. We don&apos;t store or see your numbers unless you explicitly save them to the cloud.</li>
                        <li>Your saved data is encrypted with <strong>AES-256</strong> (military-grade) before it reaches our servers.</li>
                        <li>We collect the absolute minimum: Email (for login), Name (to personalize your experience), and anonymous analytics (to improve the app). That&apos;s it.</li>
                        <li>You can <strong>delete your account and all data</strong> at any time. No questions asked.</li>
                    </ul>

                    <div className="mt-8 bg-emerald-50/50 border border-emerald-200 rounded-xl p-6">
                        <p className="text-sm text-gray-700">
                            <strong className="text-emerald-800">Why trust us?</strong> Because transparency is our defense. If you want the full legal version with every detail spelled out, click below. No jargon. Just clarity.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowFullPolicy(!showFullPolicy)}
                        className="mt-6 px-6 py-3 bg-trust-teal text-white rounded-full font-semibold hover:bg-trust-teal/90 transition-all shadow-md hover:shadow-lg"
                    >
                        {showFullPolicy ? '↑ Hide Full Policy' : '↓ Read Full Legal Policy'}
                    </button>
                </div>

                {/* Long Form Contract (Layer 2) */}
                <AnimatePresence>
                    {showFullPolicy && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-8 bg-gray-50/50 p-8 md:p-12 rounded-3xl border border-gray-100 text-sm leading-7 text-slate-600 font-normal">

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">1. INFORMATION WE COLLECT</h3>
                                    <p><strong>Account Information:</strong> Email address, name, and optional profile photo.</p>
                                    <p><strong>Financial Data (Local-First):</strong> By default, your calculations run on your device. We do not see your numbers unless you explicitly sync them to the cloud.</p>
                                    <p><strong>Usage Analytics:</strong> Anonymous app usage patterns (e.g., which calculators are most used). We use Firebase Analytics, which anonymizes IP addresses.</p>
                                    <p><strong>Payment Data:</strong> If you subscribe, payment details are processed by Stripe. We never see your card number.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">2. HOW WE USE YOUR DATA</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>To provide & improve the Welmora service</li>
                                        <li>To personalize your experience (e.g., display your name)</li>
                                        <li>To send transactional emails (e.g., password reset, subscription updates)</li>
                                        <li>To analyze aggregated, anonymized trends (e.g., "50% of users calculate SIP returns")</li>
                                    </ul>
                                    <p className="mt-4"><strong>We do NOT:</strong></p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Share your data with advertisers</li>
                                        <li>Sell your data to third parties</li>
                                        <li>Use your financial numbers for anything other than providing the service to you</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">3. DATA SECURITY</h3>
                                    <p><strong>Encryption:</strong> All data in transit uses TLS 1.3. Data at rest is encrypted with AES-256.</p>
                                    <p><strong>Access Control:</strong> Only authorized engineers (with logged access) can access backend systems. Zero-knowledge architecture where possible.</p>
                                    <p><strong>Third-Party Audits:</strong> We conduct annual security reviews and vulnerability assessments.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">4. DATA RETENTION</h3>
                                    <p>Your account data is retained as long as your account is active. If you delete your account:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>All personal data is deleted within 30 days</li>
                                        <li>Aggregated analytics (anonymized) may be retained for improvement</li>
                                        <li>Legal/tax records (if applicable) are retained as required by law</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">5. YOUR RIGHTS (GDPR & CCPA)</h3>
                                    <p>You have the right to:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li><strong>Access:</strong> Request a copy of your data</li>
                                        <li><strong>Correction:</strong> Update inaccurate information</li>
                                        <li><strong>Deletion:</strong> Permanently delete your account</li>
                                        <li><strong>Portability:</strong> Export your data in JSON format</li>
                                        <li><strong>Opt-Out:</strong> Disable analytics tracking (in app settings)</li>
                                    </ul>
                                    <p className="mt-4">To exercise these rights, email: <a href="mailto:privacy@welmora.com" className="text-emerald-600 underline">privacy@welmora.com</a></p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">6. THIRD-PARTY SERVICES</h3>
                                    <p>We use the following trusted partners:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li><strong>Firebase (Google):</strong> Authentication & Analytics</li>
                                        <li><strong>Stripe:</strong> Payment processing</li>
                                        <li><strong>Cloudflare:</strong> DDoS protection & CDN</li>
                                    </ul>
                                    <p className="mt-4">Each partner is bound by strict data processing agreements and complies with GDPR/CCPA.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">7. COOKIES & TRACKING</h3>
                                    <p>We use minimal cookies:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li><strong>Essential:</strong> Session tokens (for login)</li>
                                        <li><strong>Analytics:</strong> Firebase (anonymized)</li>
                                    </ul>
                                    <p className="mt-4">We do NOT use advertising cookies or cross-site trackers.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">8. CHILDREN&apos;S PRIVACY</h3>
                                    <p>Welmora is not intended for users under 18. We do not knowingly collect data from minors.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">9. CHANGES TO THIS POLICY</h3>
                                    <p>We may update this policy. Material changes will be communicated via email or in-app notification 30 days in advance.</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">10. CONTACT US</h3>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
                                        <p><strong>Email:</strong> privacy@welmora.com</p>
                                        <p><strong>Address:</strong> Welmora Technologies, Hyderabad, India</p>
                                        <p><strong>Response Time:</strong> We aim to respond within 48 hours.</p>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
