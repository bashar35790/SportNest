import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Feature from "@/components/Feature";
import Review from "@/components/Review";

export default function Home() {
  return (
    <div className="">
      <Hero></Hero>
      <Feature />
      <HowItWorks></HowItWorks>
      <Review />
    </div>
  );
}
