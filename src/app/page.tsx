import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Feature from "@/components/Feature";
import CTASection from "@/components/Cta";
import SportsSection from "@/components/SportsSection";
import Faq from "@/components/Faq";

const Review = dynamic(() => import("@/components/Review"), {
  loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl mx-4" />,
});

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
      <Faq />
      <CTASection></CTASection>
    </div>
  );
}
