import FeatureSection from "@/components/FeatureSection";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";

export default function Home() {
  return (
    <>
      <Hero />

      <div>
        <FeatureSection />
      </div>

      <div>
        <ContactForm />
      </div>


    </>
  );
}
