'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Youtube, Instagram, Twitter, Linkedin, Lock, ShieldCheck, Cloud } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-white text-gray-900 border-t border-gray-100 font-sans">
            {/* Trust Strip - Top Divider */}
            <div className="w-full border-b border-gray-100 py-3 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6 flex justify-center gap-6 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    <span className="flex items-center gap-1"><Lock size={10} /> SSL Encrypted</span>
                    <span className="flex items-center gap-1"><ShieldCheck size={10} /> Privacy Protected</span>
                    <span className="flex items-center gap-1"><Cloud size={10} /> Cloud Secure</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-8">

                    {/* BRAND & CONTACT (Left Side - Spans 5 cols on desktop, Full on mobile) */}
                    <div className="col-span-2 md:col-span-5 lg:col-span-5 flex flex-col items-start gap-4">
                        <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/welmora-brand-icon.png"
                                    alt="Welmora"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900">Welmora</span>
                        </div>

                        <p className="text-sm font-medium text-emerald-700">
                            Wealth. Wellness. Wisdom.
                        </p>

                        <div className="flex flex-col gap-1 text-sm text-gray-500 mt-2">
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-gray-400" />
                                <span>Hyderabad, India</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-gray-400" />
                                <a href="mailto:support@welmora.com" className="hover:text-emerald-600 transition-colors">support@welmora.com</a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE GRID (Spans 7 cols on desktop) */}
                    <div className="col-span-2 md:col-span-7 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">

                        {/* Column 1: Company */}
                        <div className="flex flex-col gap-3">
                            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Company</h4>
                            <div className="flex flex-col gap-2 text-sm text-gray-600">
                                <Link href="/about-us" className="hover:text-emerald-600 transition-colors">About Us</Link>
                                <Link href="/faq" className="hover:text-emerald-600 transition-colors">FAQ</Link>
                                <Link href="/#support" className="hover:text-emerald-600 transition-colors">Contact Support</Link>
                            </div>
                        </div>

                        {/* Column 2: Legal */}
                        <div className="flex flex-col gap-3">
                            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Legal</h4>
                            <div className="flex flex-col gap-2 text-sm text-gray-600">
                                <Link href="/privacy-policy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
                                <Link href="/terms-of-service" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
                            </div>
                        </div>

                        {/* Column 3: Social */}
                        <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
                            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Social</h4>
                            <div className="flex items-center gap-2">
                                <a href="https://x.com/welmoraapp" target="_blank" className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all"><Twitter size={16} /></a>
                                <a href="https://linkedin.com" target="_blank" className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all"><Linkedin size={16} /></a>
                                <a href="https://instagram.com" target="_blank" className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all"><Instagram size={16} /></a>
                                <a href="https://youtube.com" target="_blank" className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all"><Youtube size={16} /></a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Copyright Line */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col items-center justify-center gap-4 text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Welmora. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
