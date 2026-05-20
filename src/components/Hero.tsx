import Image from "next/image";

function Hero() {
  return (
    <section className="relative h-screen w-full">
      <Image src="https://i.ibb.co/CKG6wb2b/Hero-Section.png" alt="hero" fill className="object-cover" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold">Hero Section</h1>
      </div>
    </section>
  );
}

export default Hero;
