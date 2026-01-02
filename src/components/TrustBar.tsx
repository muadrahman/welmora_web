import React from 'react';
import { ShieldCheck, Lock, Cloud } from 'lucide-react';

export default function TrustBar() {
    return (
        <section className="w-full bg-gray-50 py-2 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-8 gap-y-2">

                {/* Secure Data */}
                <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <ShieldCheck className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">SSL Encrypted</span>
                </div>

                {/* Privacy First */}
                <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <div className="h-4 w-[1px] bg-gray-300"></div>
                    <Lock className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Privacy Protected</span>
                </div>

                {/* Cloud Encrypted */}
                <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <div className="h-4 w-[1px] bg-gray-300"></div>
                    <Cloud className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Cloud Encrypted</span>
                </div>

            </div>
        </section>
    );
}
