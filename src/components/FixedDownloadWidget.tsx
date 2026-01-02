'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const WELMORA_STORE_URL = "https://play.google.com/store/apps/details?id=com.example.welmora"; // Placeholder URL

// Brand Icons as Inline SVGs for strict control and visual accuracy
const AppleLogo = () => (
    <svg viewBox="0 0 384 512" fill="currentColor" className="w-5 h-5">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
    </svg>
);

const GooglePlayLogo = () => (
    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5">
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
);

const FixedDownloadWidget: React.FC = () => {
    // Mobile and Desktop views handled purely by CSS - no JS detection needed
    return (
        <>
            {/* MOBILE VIEW: Floating Circular Brand Buttons (shown on screens < 1024px) */}
            <div className="lg:hidden fixed bottom-6 right-6 z-[90] flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <a
                    href={WELMORA_STORE_URL}
                    className="flex items-center justify-center w-12 h-12 bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-full text-gray-800 hover:scale-110 active:scale-95 transition-all"
                    aria-label="Download on App Store"
                >
                    <AppleLogo />
                </a>
                <a
                    href={WELMORA_STORE_URL}
                    className="flex items-center justify-center w-12 h-12 bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-full text-gray-800 hover:scale-110 active:scale-95 transition-all"
                    aria-label="Get it on Google Play"
                >
                    <GooglePlayLogo />
                </a>
            </div>

            {/* DESKTOP VIEW: Interactive QR Code Widget (shown on screens >= 1024px) */}
            <section className="hidden lg:flex flex-col items-center justify-center fixed bottom-8 right-12 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-2xl border border-gray-100 gap-3 animate-float group hover:-translate-y-1 transition-transform z-[90] transform origin-bottom-right ring-1 ring-black/5">
                <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float:hover {
                    animation-play-state: paused;
                }
            `}</style>

                <div className="text-center space-y-0.5">
                    <span className="text-sm font-bold text-trust-teal tracking-wide block">
                        Get Welmora
                    </span>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider">
                        Scan to Install
                    </span>
                </div>

                <div className="bg-white p-1 rounded-xl border border-gray-100 shadow-inner">
                    <QRCodeSVG
                        value={WELMORA_STORE_URL}
                        size={160}
                        level="H"
                        fgColor="#0B2C2C" // trust-teal
                        imageSettings={{
                            src: "/welmora-brand-icon.png", // Assuming this exists, optional
                            x: undefined,
                            y: undefined,
                            height: 24,
                            width: 24,
                            excavate: true,
                        }}
                    />
                </div>
            </section>
        </>
    );
};

export default FixedDownloadWidget;
