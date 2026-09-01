"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

export default function CTASection() {
  // Use an external image proxy (weserv.nl) to resize massive 20MB+ images on the fly.
  const proxyImageUrl = `https://wsrv.nl/?url=${encodeURIComponent("https://i.ibb.co.com/gLMq8BLF/sports-equipment-green-grass.jpg")}&w=800&q=80&output=webp`;

  return (
    <section className="relative isolate overflow-hidden w-full py-20">
      {/* Background Image */}
       <div className="overlay2 z-0"></div>
      <Image
        src={proxyImageUrl}
        alt="Sports Facility"
        fill
        unoptimized
        sizes="100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 z-0 bg-slate-950/75"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div>
        <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-6 text-center sm:px-10 overflow-visible">
          {/* Badge */}
          <Reveal delay={0.05}>
            <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-300 backdrop-blur-md">
              Premium Sports Booking Platform
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal as="h2" delay={0.15} className="max-w-4xl text-4xl font-light leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl overflow-visible">
            Ready to <span className=" overflow-visible text-gradient">Level Up  </span> Your
            Game?
          </Reveal>

          {/* Description */}
          <Reveal as="p" delay={0.25} className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
            Join 12,000+ athletes who book smarter, faster, and better with
            SportNest.
          </Reveal>

          {/* Buttons */}
          <Reveal delay={0.35} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-full bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-950 transition-all duration-300 hover:scale-105 hover:bg-cyan-300 cursor-pointer">
              Book a Facility
            </button>

            <button className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 cursor-pointer">
              Explore Venues
            </button>
          </Reveal>
        </div>
      </div>
      </div>
    </section>
  );
}
