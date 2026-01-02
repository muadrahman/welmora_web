import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Welmora',
    default: 'Welmora | Plan Well, Grow More'
  },
  description: 'Your Digital Financial Consultant for Long-Term Wealth. Master FIRE, debt management, and goal-based planning with Welmora.',
  keywords: ['financial planning', 'FIRE', 'debt management', 'wealth management', 'India', 'financial calculator'],
  authors: [{ name: 'Welmora Team' }],
  openGraph: {
    title: 'Welmora | Plan Well, Grow More',
    description: 'Your Digital Financial Consultant for Long-Term Wealth. Master FIRE, debt management, and goal-based planning.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Welmora',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welmora | Plan Well, Grow More',
    description: 'Your Digital Financial Consultant for Long-Term Wealth',
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedDownloadWidget from "@/components/FixedDownloadWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[100px]" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen pt-20 relative overflow-x-hidden animate-in fade-in duration-500">
          {children}
        </main>
        <Footer />
        <FixedDownloadWidget />
      </body>
    </html>
  );
}
