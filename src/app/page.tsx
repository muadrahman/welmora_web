import Image from "next/image";
import QRCodeWidget from "@/components/QRCodeWidget";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import AppStoreButtons from "@/components/AppStoreButtons";
import TrustBar from "@/components/TrustBar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white relative overflow-x-hidden pt-20">
      <Header />
      <div id="home" className="flex-grow flex flex-col items-center justify-center p-4 pt-20 pb-0">
        <main className="flex flex-col items-center gap-8 text-center max-w-2xl z-10 animate-in fade-in zoom-in duration-500">

          {/* Main Heading */}
          <h1 className="text-5xl font-extrabold text-trust-teal tracking-tight">
            Plan Well, Grow More
          </h1>

          {/* Sub-heading */}
          <p className="text-xl sm:text-2xl text-gray-600 font-light">
            Your Digital Financial Consultant for Long-Term Wealth.
          </p>

          {/* App Store Buttons */}
          <AppStoreButtons />

          {/* Trust Indicator */}
          <div className="flex items-center gap-2 mt-4">
            <div className="w-8 h-8 rounded-full bg-growth-green/10 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-growth-green stroke-current stroke-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Trusted by Investors</span>
          </div>

        </main>
      </div>

      <div id="features">
        <FeatureSection />
      </div>

      <div id="support">
        <ContactForm />
      </div>

      <TrustBar />

      <Footer />

      {/* QR Code Widget */}
      <QRCodeWidget />

    </div>
  );
}
