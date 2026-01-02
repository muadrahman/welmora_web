
'use client';

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import CalculatorInput from './CalculatorInput';

export const TooltipLabel = ({ label, tooltip }: { label: string, tooltip: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex items-center gap-1 mb-1 relative z-10">
            <label className="text-xs font-bold uppercase tracking-wider text-trust-teal/80">{label}</label>
            <div className="relative ml-1">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                    className="flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 hover:bg-trust-teal/10 hover:text-trust-teal transition-all text-gray-400"
                >
                    <Info size={10} />
                </button>
                {isOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-900/95 backdrop-blur-sm text-white text-xs p-3 rounded-lg w-52 z-[100] shadow-xl border border-white/10">
                        {tooltip}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900/95"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const InputRow = ({ label, val, setVal, min, max, step, unit = '₹', decimalScale = 0, tooltip }: any) => (
    <div className="relative">
        <TooltipLabel label={label} tooltip={tooltip || `Set value for ${label}`} />
        <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-400 text-xs font-bold">{unit}</span>
            <CalculatorInput
                value={val}
                onChange={setVal}
                decimalScale={decimalScale}
                className="w-full text-lg font-bold bg-transparent border-b border-gray-200 focus:border-growth-green rounded-none px-0 py-1 font-mono"
            />
        </div>
        <input type="range" min={min} max={max} step={step} value={val} onChange={e => setVal(Number(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-trust-teal disabled:opacity-50" />
    </div>
);

export const CalculatorCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-slate-50/50 backdrop-blur-md border border-white/20 border-t-white/60 border-l-white/60 rounded-3xl p-6 shadow-xl flex flex-col gap-6 h-full min-h-[600px] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-visible group">
        <div>
            <h2 className="text-2xl font-bold text-trust-teal tracking-tight">{title}</h2>
            <p className="text-xs text-gray-500 mt-1 font-medium">{description}</p>
        </div>
        {children}
    </div>
);
