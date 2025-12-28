'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CalculatorInputProps {
    value: number;
    onChange: (value: number) => void;
    className?: string;
}

export default function CalculatorInput({ value, onChange, className = "" }: CalculatorInputProps) {
    const [displayValue, setDisplayValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Format number to Indian Currency system style (e.g., 1,50,000)
    // We use standard NumberFormat but strip the currency symbol if we just want numbers
    const format = (num: number) => {
        if (isNaN(num)) return '';
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(num);
    };

    // Update display value when prop changes (external update)
    useEffect(() => {
        setDisplayValue(format(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove commas to get raw number
        const rawValue = e.target.value.replace(/,/g, '');

        // Allow empty input
        if (rawValue === '') {
            onChange(0);
            setDisplayValue('');
            return;
        }

        // Validate number
        const num = Number(rawValue);
        if (!isNaN(num)) {
            onChange(num);
            // We intentionally don't setDisplayValue here to avoid cursor jumping issues
            // relying on the useEffect to format it back might be safer for "onBlur"
            // but for real-time typing, let's try a hybrid approach or just raw typing
            // For now, let's update display value immediately to show commas as they type
            // Note: This causes cursor jump if we aren't careful.
            // Simplified approach: value updates parent -> parent updates prop -> useEffect updates display
            // BUT, to keep cursor stable we might need more complex logic.
            // Let's stick to the requirements: "display commas in real-time".

            /* Improved cursor handling logic could go here, but starting simple */
            setDisplayValue(format(num));
        }
    };

    return (
        <input
            type="text"
            ref={inputRef}
            value={displayValue}
            onChange={handleChange}
            className={`text-right p-1 border rounded bg-white/50 text-sm font-bold text-growth-green focus:outline-none focus:ring-1 focus:ring-growth-green ${className}`}
        />
    );
}
