import React from 'react';
import Image from 'next/image';
import { Youtube, Instagram, Linkedin, Twitter } from 'lucide-react';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-[#F9FAFB] border-t border-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand Column */}
                <div className="col-span-1 flex flex-col gap-4">
                    <div className="flex items-center gap-2 opacity-80">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/logo.png"
                                alt="Welmora Logic"
                                fill
                                className="object-contain grayscale"
                            />
                        </div>
                        <span className="font-semibold text-gray-700">Welmora</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                        Plan Well, Grow More.
                    </p>
                </div>

                {/* Links Column 1: Company */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Company</h4>
                    <a href="#" className="text-gray-500 hover:text-trust-teal transition-colors text-sm">About Us</a>
                    <Link href="/faq" className="text-gray-500 hover:text-trust-teal transition-colors text-sm">FAQ</Link>
                    <a href="#" className="text-gray-500 hover:text-trust-teal transition-colors text-sm">Contact</a>
                </div>

                {/* Links Column 2: Legal */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Legal</h4>
                    <a href="#" className="text-gray-500 hover:text-trust-teal transition-colors text-sm">Privacy Policy</a>
                    <a href="#" className="text-gray-500 hover:text-trust-teal transition-colors text-sm">Terms of Service</a>
                </div>

                {/* Links Column 3: Social */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Social</h4>
                    <div className="flex items-center gap-4">
                        {[
                            { Icon: Youtube, label: "YouTube" },
                            { Icon: Instagram, label: "Instagram" },
                            { Icon: Linkedin, label: "LinkedIn" },
                            { Icon: Twitter, label: "Twitter" }
                        ].map(({ Icon, label }) => (
                            <a
                                key={label}
                                href="#"
                                className="group relative text-trust-teal hover:text-growth-green transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                aria-label={`Welmora ${label}`}
                            >
                                <Icon size={20} strokeWidth={1.5} />

                                {/* Tooltip */}
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-trust-teal rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                    {label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

            </div>

            <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-gray-200">
                <p className="text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Welmora. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
