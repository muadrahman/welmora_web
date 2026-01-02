'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch by only rendering theme-dependent parts after mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Consolidated scroll and pathname effect - no race conditions
    useEffect(() => {
        // Handle calculators page
        if (pathname?.includes('/calculators')) {
            setActiveSection('calculators');
            return;
        }

        // Only run on homepage
        if (pathname !== '/') return;

        // Handle initial hash-based navigation
        const initialHash = window.location.hash;
        if (initialHash === '#features') {
            setActiveSection('features');
        } else if (initialHash === '#support') {
            setActiveSection('support');
        } else if (window.scrollY < 100) {
            setActiveSection('home');
        }

        // Set up Intersection Observer for section detection
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0.2, 0.5, 0.8]
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ['home', 'features', 'support'];

        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        // Scroll handler for adaptive header and top-of-page detection
        const handleScroll = () => {
            if (window.scrollY < 100) setActiveSection('home');
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    const handleLinkClick = (id: string, e?: React.MouseEvent) => {
        // Immediate feedback
        setActiveSection(id);

        // If on homepage, smooth scroll
        if (pathname === '/') {
            // Let Link scroll behavior work or handle manually if needed. 
            // With next/link to hash, it should auto-scroll. 
            // But we want to ensure the state sticks.
            // The Observer might flip it back if we scroll fast, but threshold 0.6 helps.
        }
    };

    // Helper to get link class
    const getLinkClass = (section: string) => {
        const baseClass = "text-lg font-semibold px-4 py-2 rounded-full transition-all duration-300";
        let isActive = activeSection === section;

        if (isActive) {
            return `${baseClass} bg-growth-green/10 text-growth-green`;
        }
        return `${baseClass} text-trust-teal hover:bg-growth-green/10 hover:text-growth-green`;
    };

    if (!isMounted) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 py-6 bg-transparent border-transparent flex items-center justify-center">
                <div className="w-full max-w-6xl px-8 flex items-center justify-between">
                    <span className="text-3xl font-bold text-trust-teal tracking-tight ml-3">Welmora</span>
                </div>
            </header>
        );
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo Section */}
                <Link
                    href="/"
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={(e) => {
                        if (pathname === '/') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        handleLinkClick('home');
                    }}
                >
                    <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                        <Image
                            src="/welmora-brand-icon.png"
                            alt="Welmora Logic"
                            fill
                            sizes="(max-width: 768px) 40px, 48px"
                            className="object-contain"
                        />
                    </div>
                    <span className="text-3xl md:text-3xl font-bold text-[#064E3B] tracking-tight">
                        Welmora
                    </span>
                </Link>

                {/* Desktop Navigation - Simplified & Scaled */}
                <nav className="hidden md:flex items-center gap-4">
                    {['Home', 'Calculators', 'Features'].map((item) => {
                        const linkPath = item === 'Home' ? '/' :
                            item === 'Calculators' ? '/calculators' :
                                item === 'Features' ? '/#features' :
                                    `/#${item.toLowerCase().replace(' ', '-')}`;

                        const linkId = item.toLowerCase().replace(' ', '-');

                        // Fix: Rely strictly on activeSection to avoid multi-active bug
                        const isActive = activeSection === linkId;

                        // Link Style: Text-LG, Medium Weight, Tactile Hover (Scale 1.05 + Emerald-50)
                        const linkStyle = `text-lg font-medium px-5 py-2 rounded-full transition-all duration-300 ${isActive
                            ? 'text-[#064E3B] bg-growth-green/10 font-bold'
                            : 'text-gray-600 hover:text-[#064E3B] hover:bg-emerald-50 hover:scale-105 transform origin-center'
                            }`;

                        return (
                            <Link
                                key={item}
                                href={linkPath}
                                className={linkStyle}
                                onClick={() => handleLinkClick(linkId)}
                            >
                                {item}
                            </Link>
                        );
                    })}
                    {/* CTA: Scaled & Authoritative */}
                    <Link
                        href="/#support"
                        className={`text-xl font-bold text-trust-teal border-2 border-growth-green rounded-full px-8 py-3 hover:bg-growth-green hover:text-white transition-all duration-300 ml-4 shadow-sm hover:shadow-lg hover:shadow-growth-green/20 ${activeSection === 'support' ? 'bg-growth-green text-white shadow-lg shadow-growth-green/20' : ''}`}
                    >
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
                    <div className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-white/20 p-6 flex flex-col gap-4 shadow-xl md:hidden animate-in slide-in-from-top-4">
                        <Link
                            href="/"
                            className={`text-lg font-semibold ${activeSection === 'home' ? 'text-growth-green' : 'text-trust-teal'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/calculators"
                            className={`text-lg font-semibold ${activeSection === 'calculators' ? 'text-growth-green' : 'text-trust-teal'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Calculators
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
