'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Handle scroll active state
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'features', 'support'];
            const scrollPosition = window.scrollY + 100; // Offset for sticky header

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to get link class
    const getLinkClass = (section: string) => {
        const baseClass = "text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300";
        if (activeSection === section) {
            return `${baseClass} bg-growth-green/10 text-growth-green`;
        }
        return `${baseClass} text-trust-teal hover:bg-growth-green/10 hover:text-growth-green`;
    };

    return (
        <header className="fixed top-0 left-0 right-0 py-6 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center justify-center">
            <div className="w-full max-w-6xl px-8 flex items-center justify-between">

                {/* Brand Container */}
                <div className="flex items-center gap-3">
                    {/* Logo Mark (Pulsing) */}
                    <div className="relative h-12 w-12 animate-quiet-pulse">
                        <Image
                            src="/welmora-brand-icon.png"
                            alt="Welmora Icon"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Brand Name (Text) */}
                    <span className="text-3xl font-bold text-trust-teal tracking-tight ml-3">
                        Welmora
                    </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    <a href="#home" className={getLinkClass('home')}>
                        Home
                    </a>
                    <a href="#features" className={getLinkClass('features')}>
                        Features
                    </a>
                    <a href="#home" className={getLinkClass('app')}>
                        App
                    </a>
                    <a href="#support" className={`text-sm font-semibold text-trust-teal border-[1.5px] border-growth-green rounded-full px-4 py-2 hover:bg-growth-green hover:text-white transition-all duration-300 ml-2 animate-pulse hover:animate-none ${activeSection === 'support' ? 'bg-growth-green text-white animate-none' : ''}`}>
                        Contact Support
                    </a>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-trust-teal hover:text-growth-green transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Navigation Overlay */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl md:hidden animate-in slide-in-from-top-4">
                        <a
                            href="#home"
                            className={`text-lg font-semibold ${activeSection === 'home' ? 'text-growth-green' : 'text-trust-teal'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </a>
                        <a
                            href="#features"
                            className={`text-lg font-semibold ${activeSection === 'features' ? 'text-growth-green' : 'text-trust-teal'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#support"
                            className="text-lg font-semibold text-growth-green"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact Support
                        </a>
                    </div>
                )}

            </div>
        </header>
    );
}
