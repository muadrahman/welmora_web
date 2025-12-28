import FeatureSection from "@/components/FeatureSection";
import ContactForm from "@/components/ContactForm";
import AppStoreButtons from "@/components/AppStoreButtons";
import TrustBar from "@/components/TrustBar";

export default function Home() {
  return (
    <>
      <div id="home" className="flex flex-col items-center justify-center p-4 py-20 min-h-[80vh]">
        <main className="flex flex-col items-center gap-8 text-center max-w-2xl z-10 animate-in fade-in zoom-in duration-500">

          {/* Main Heading */}
          <h1 className="text-5xl font-extrabold text-trust-teal tracking-tight">
            Plan Well, Grow More
          </h1>

          {/* Sub-heading */}
          <p className="text-xl sm:text-2xl text-gray-600 font-light tracking-tight leading-relaxed">
            Your Digital Financial Consultant for Long-Term Wealth.
          </p>

          {/* App Store Buttons */}
          <AppStoreButtons />

          {/* Trust Indicator */}
          <div className="flex items-center gap-2 mt-4">
            <div className="w-8 h-8 rounded-full bg-growth-green/10 flex items-center justify-center hover:brightness-110 transition-all">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-growth-green stroke-current stroke-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-tight">Trusted by Investors</span>
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
    </>
  );
}
