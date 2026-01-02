'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
    const [showFullPolicy, setShowFullPolicy] = React.useState(false);

    return (
        <main className="pt-32 pb-24 px-6 w-full bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12 border-b border-gray-100 pb-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-[#052e16] mb-4 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-500 font-medium">Last Updated: January 2026</p>
                </div>

                {/* Human Summary (Layer 1) */}
                <div className="space-y-12 text-gray-700 leading-relaxed font-light mb-16">
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-[#052e16] mb-4">
                            1. Data Usage
                        </h2>
                        <p className="text-lg">
                            We collect financial data (such as income, expense, and goal inputs) strictly to generate your personal guidance, calculations, and recommendations within the app. We believe in data minimization—we only ask for what is necessary to make the math work for you.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-[#052e16] mb-4">
                            2. Security Standards
                        </h2>
                        <p className="text-lg">
                            Your trust is our currency. We use industry-standard <strong>AES-256 encryption</strong> for all data storage and transmission. Our systems are designed with a "Privacy First" architecture to ensure your financial details remain confidential.
                        </p>
                    </section>
                </div>

                {/* The Divider & Toggle */}
                <div className="flex flex-col items-center justify-center py-12 border-t border-gray-200">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Legal Contract</p>
                    <button
                        onClick={() => setShowFullPolicy(!showFullPolicy)}
                        className="px-8 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold rounded-full border border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        {showFullPolicy ? "Collapse Legal Document" : "View Full Privacy Policy"}
                    </button>
                </div>

                {/* Long Form Contract (Layer 2) */}
                {showFullPolicy && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-700 space-y-8 bg-gray-50/50 p-8 md:p-12 rounded-3xl border border-gray-100 text-sm leading-7 text-slate-600 font-normal">

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">1. INFORMATION WE COLLECT</h3>
                            <p><strong>1.1 Voluntary Information.</strong> We collect information you explicitly provide, including your name, email address, age, income, monthly expenses, and financial goals.</p>
                            <p className="mt-2"><strong>1.2 Automated Information.</strong> When you use Welmora, we automatically collect data regarding your device type, operating system, unique device identifier (UDID), and IP address to ensure the security and optimization of our app.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">2. HOW WE USE YOUR DATA</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>2.1 Service Provision.</strong> To calculate your "Mathematical Milestones" and generate personalized dashboards.</li>
                                <li><strong>2.2 Algorithmic Training.</strong> To analyze aggregate user behavior to refine our "Debt Management" and "Budget Tracking" algorithms. This data is anonymized.</li>
                                <li><strong>2.3 Communication.</strong> To send you critical security alerts, account updates, or response to your support queries.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">3. DATA SECURITY PROTOCOLS</h3>
                            <p><strong>3.1 Encryption.</strong> All sensitive financial data is encrypted at rest using AES-256 standards and in transit using TLS 1.3 protocols.</p>
                            <p className="mt-2"><strong>3.2 Access Control.</strong> Internal access to user data is strictly limited to the Founders and authorized engineering staff with a specific need-to-know, protected by multi-factor authentication (MFA).</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">4. DATA RETENTION AND DELETION</h3>
                            <p>We retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. Upon your request for account deletion, we will irreversibly anonymize or permanently delete your data from our active databases within 30 days, subject to legal retention obligations.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">5. THIRD-PARTY DISCLOSURES</h3>
                            <p>We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">7. COOKIES & TRACKING TECHNOLOGIES</h3>
                            <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li><strong>Session Cookies:</strong> We use Session Cookies to operate our Service.</li>
                                <li><strong>Preference Cookies:</strong> We use Preference Cookies to remember your preferences and various settings.</li>
                                <li><strong>Security Cookies:</strong> We use Security Cookies for security purposes.</li>
                                <li><strong>Analytics:</strong> We may use third-party Service providers to monitor and analyze the use of our Service.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">8. INTERNATIONAL DATA TRANSFERS</h3>
                            <p>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction. If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">9. CHILDREN'S PRIVACY</h3>
                            <p>Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children have provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">10. YOUR RIGHTS (EXPANDED)</h3>
                            <p>Depending on your location, you may have the following rights regarding your Personal Data:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
                                <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
                                <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions ("Right to be Forgotten").</li>
                                <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
                                <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data.</li>
                                <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">11. DATA BREACH PROCEDURES</h3>
                            <p>In the event of a data breach that compromises your personal information, we will notify you and any applicable regulators within 72 hours of becoming aware of the breach, to the extent required by law. We have incident response plans in place to contain and minimize the impact of any security incidents.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">12. MARKETING COMMUNICATIONS</h3>
                            <p>You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send. Note that you may not opt out of administrative emails (e.g., about your account, transactions, or policy changes) for so long as you have an account with us.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">6. GRIEVANCE REDRESSAL</h3>
                            <p>In accordance with the Information Technology Act, 2000 and rules made thereunder, the contact details of the Grievance Officer are provided below:</p>
                            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg inline-block">
                                <p><strong>Name:</strong> Muad Rahman / Rohith CK</p>
                                <p><strong>Email:</strong> legal@welmora.com</p>
                                <p><strong>Address:</strong> Hyderabad, Telangana, India</p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </main>
    );
}
