'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll active state and adaptive header
    useEffect(() => {
        const handleScroll = () => {
            // Only tracking sections on the homepage for active highlighting
            const sections = ['features', 'support'];
            const scrollPosition = window.scrollY + 100;

            setIsScrolled(window.scrollY > 50);

            // Check if we are on the homepage before trying to find elements
            if (window.location.pathname === '/') {
                if (window.scrollY < 100) {
                    setActiveSection('home');
                    return;
                }

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
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
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
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-300 ${isScrolled
                    ? 'py-4 bg-white/70 backdrop-blur-md border-b border-trust-teal/10 shadow-sm'
                    : 'py-6 bg-transparent border-transparent'
                }`}
        >
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
                    <Link href="/" className={getLinkClass('home')}>
                        Home
                    </Link>
                    <Link href="/#features" className={getLinkClass('features')}>
                        Features
                    </Link>
                    <Link href="/#support" className={`text-sm font-semibold text-trust-teal border-[1.5px] border-growth-green rounded-full px-4 py-2 hover:bg-growth-green hover:text-white transition-all duration-300 ml-2 animate-pulse hover:animate-none ${activeSection === 'support' ? 'bg-growth-green text-white animate-none' : ''}`}>
                        Contact Us
                    </Link>
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
                        <Link
                            href="/"
                            className={`text-lg font-semibold ${activeSection === 'home' ? 'text-growth-green' : 'text-trust-teal'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/#features"
                            className={`text-lg font-semibold ${activeSection === 'features' ? 'text-growth-green' : 'text-trust-teal'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="/#support"
                            className="text-lg font-semibold text-growth-green"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact Us
                        </Link>
                    </div>
                )}

            </div>
        </header>
    );
}
