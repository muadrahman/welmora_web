import React from 'react';

export default function AppStoreButtons() {
    return (
        <div className="flex flex-wrap justify-center gap-6 mt-8 animate-in fade-in zoom-in duration-700 delay-200">
            {/* Apple App Store Button */}
            <a
                href="#"
                className="flex items-center h-[60px] px-6 rounded-xl transition-all duration-300 group border-[1.5px] border-growth-green bg-white text-trust-teal hover:bg-growth-green hover:text-white shadow-none hover:shadow-lg hover:scale-105"
                aria-label="Download on the App Store"
            >
                <svg className="w-7 h-7 mr-3 fill-current" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
                </svg>
                <div className="flex flex-col items-start leading-none">
                    <span className="text-[11px] font-medium">Download on the</span>
                    <span className="text-xl font-semibold -mt-0.5 font-sans">App Store</span>
                </div>
            </a>

            {/* Google Play Button */}
            <a
                href="#"
                className="flex items-center h-[60px] px-6 rounded-xl transition-all duration-300 group border-[1.5px] border-growth-green bg-white text-trust-teal hover:bg-growth-green hover:text-white shadow-none hover:shadow-lg hover:scale-105"
                aria-label="Get it on Google Play"
            >
                <svg className="w-7 h-7 mr-3 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L69 519.3l35.6-20.3z" />
                </svg>
                <div className="flex flex-col items-start leading-none">
                    <span className="text-[11px] font-medium uppercase tracking-wide">Get it on</span>
                    <span className="text-xl font-semibold -mt-0.5 font-sans">Google Play</span>
                </div>
            </a>
        </div>
    );
}
