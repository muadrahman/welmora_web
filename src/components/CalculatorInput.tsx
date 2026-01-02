'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CalculatorInputProps {
    value: number;
    onChange: (value: number) => void;
    className?: string;
    decimalScale?: number;
}

export default function CalculatorInput({ value, onChange, className = "", decimalScale = 0 }: CalculatorInputProps) {
    // Format needs to be defined before state usage if used there, or inside useMemo
    const format = (num: number) => {
        if (isNaN(num)) return '';
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: decimalScale,
            minimumFractionDigits: 0,
        }).format(num);
    };

    const [displayValue, setDisplayValue] = useState(value !== undefined ? format(value) : '');
    const [hasError, setHasError] = useState(false);
    const lastEmittedValue = useRef(value);

    // Sync from props (External changes only)
    useEffect(() => {
        // If value changes externally (e.g. reset to default), update display
        if (value !== lastEmittedValue.current) {
            setDisplayValue(format(value));
            lastEmittedValue.current = value;
        }
    }, [value, decimalScale]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow dots if decimalScale > 0
        const rawValue = e.target.value.replace(/,/g, '');

        if (rawValue === '') {
            lastEmittedValue.current = 0;
            onChange(0);
            setDisplayValue('');
            setHasError(false);
            return;
        }

        // Validate number (Float)
        const num = parseFloat(rawValue);

        // Check for negative numbers
        if (num < 0) {
            setHasError(true);
            return;
        }

        // Additional check: Ensure it's a valid partial number format (e.g. "10." or "10.5")
        // Regex: Digits, optional single dot, optional digits
        const isValidFormat = /^\d*\.?\d*$/.test(rawValue);

        if (!isNaN(num) && isValidFormat) {
            lastEmittedValue.current = num;
            onChange(num);
            setDisplayValue(e.target.value); // Keep exactly what user typed
            setHasError(false);
        } else if (isValidFormat && rawValue === '.') {
            // Handle starting with dot
            setDisplayValue('.');
            setHasError(false);
        } else {
            setHasError(true);
        }
    };

    const handleBlur = () => {
        // On blur, strictly re-format to ensure clean view
        setDisplayValue(format(value));
    };

    return (
        <input
            type="text"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`text-right p-1 border rounded bg-white/50 text-sm font-bold focus:outline-none focus:ring-1 ${hasError
                    ? 'border-red-500 text-red-600 focus:ring-red-500'
                    : 'text-growth-green border-gray-200 focus:ring-growth-green'
                } ${className}`}
            suppressHydrationWarning
        />
    );
}
