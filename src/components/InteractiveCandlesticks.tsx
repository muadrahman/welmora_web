'use client';

import React, { useMemo, useState, useEffect } from 'react';

interface Props {
    color?: string; // Optional stroke color override
    volatilityMode?: boolean; // New prop to enable specific volatile pattern
}

export default function InteractiveCandlesticks({ color = '#cbd5e1', volatilityMode = false }: Props) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Generate Path
    const candles = useMemo(() => {
        const items = [];
        const count = 50;

        // Volatile Pattern Logic
        // "Start bottom-left, rise quickly, drop by 30%, rise, drop, climb steadily"
        // We will define a trend array/function to guide the random walk centers

        const getTargetPrice = (progress: number) => {
            if (!volatilityMode) return progress * 100; // Linear default

            // Progress 0 to 1
            if (progress < 0.2) return 20 + (progress * 5 * 60); // Rise quickly to ~80 (at 0.2)
            if (progress < 0.35) return 80 - ((progress - 0.2) / 0.15 * 30); // Drop 30% (to ~50)
            if (progress < 0.5) return 50 + ((progress - 0.35) / 0.15 * 40); // Rise again to ~90
            if (progress < 0.6) return 90 - ((progress - 0.5) / 0.1 * 20); // Drop small to ~70
            return 70 + ((progress - 0.6) / 0.4 * 30); // Steady climb to 100
        };

        let currentPrice = 20;

        for (let i = 0; i < count; i++) {
            const progress = i / count;
            const target = getTargetPrice(progress);

            // Pull towards target
            const pull = (target - currentPrice) * 0.5;
            const randomNoise = (Math.random() - 0.5) * 10;

            const open = currentPrice;
            const close = currentPrice + pull + randomNoise;

            const high = Math.max(open, close) + Math.random() * 3;
            const low = Math.min(open, close) - Math.random() * 3;

            // X Position
            const xPos = (i / count) * 100;

            // Y Position (Inverted for SVG) map 0-120 price to 100-0 Y
            const yCenter = 100 - (Math.min(Math.max(open, 0), 120) / 1.2);

            const height = Math.abs(open - close);
            const wickHeight = high - low;

            items.push({
                x: xPos,
                y: yCenter,
                height: Math.max(height / 1.2, 0.2), // Scale down slightly to fit
                wickHeight: wickHeight / 1.2,
                isUp: close > open
            });

            currentPrice = close;
        }
        return items;
    }, [volatilityMode]);

    if (!isMounted) return null;

    return (
        <svg className="w-full h-full" preserveAspectRatio="none">
            {candles.map((c, i) => (
                <g key={i}>
                    {/* Wick */}
                    <line
                        x1={`${c.x}%`}
                        y1={`${c.y - (c.wickHeight / 2)}%`}
                        x2={`${c.x}%`}
                        y2={`${c.y + (c.wickHeight / 2)}%`}
                        stroke={color}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        strokeOpacity="0.8"
                    />
                    {/* Body - Outline Only */}
                    <rect
                        x={`${c.x - 0.5}%`}
                        y={`${c.y - (c.height / 2)}%`}
                        width="1%"
                        height={`${Math.max(c.height, 0.4)}%`}
                        stroke={color}
                        strokeWidth="1.5"
                        fill="transparent"
                        rx="0.5"
                        vectorEffect="non-scaling-stroke"
                        strokeOpacity="0.8"
                    />
                </g>
            ))}
        </svg>
    );
}
