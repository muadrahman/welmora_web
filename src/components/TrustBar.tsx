import React from 'react';
import { ShieldCheck, Lock, Cloud } from 'lucide-react';

export default function TrustBar() {
    return (
        <section className="w-full bg-gray-50 py-12 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-8">

                {/* Secure Data */}
                <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <ShieldCheck className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Secure Data</span>
                </div>

                {/* Privacy First */}
                <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <Lock className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Privacy First</span>
                </div>

                {/* Cloud Encrypted */}
                <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <Cloud className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Cloud Encrypted</span>
                </div>

            </div>
        </section>
    );
}
