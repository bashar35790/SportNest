import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Feature from "@/components/Feature";
import Review from "@/components/Review";
import CTASection from "@/components/Cta";
import SportsSection from "@/components/SportsSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Book premium sports facilities instantly. Football turfs, basketball courts, swimming pools, and more.",
};


export default function Home() {
  return (
    <div className="">
      <Hero></Hero>
      <SportsSection/>
      <Feature />
      <HowItWorks></HowItWorks>
      <Review />
      <CTASection></CTASection>
    </div>
  );
}
