import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Feature from "@/components/Feature";
import Review from "@/components/Review";
import CTASection from "@/components/Cta";
import SportsSection from "@/components/SportsSection";


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
