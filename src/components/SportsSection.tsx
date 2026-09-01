"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

type Sport = {
  name: string;
  icon: string;
  count: number;
};

const SPORTS: Sport[] = [
  { name: "Football", icon: "⚽", count: 24 },
  { name: "Basketball", icon: "🏀", count: 18 },
  { name: "Tennis", icon: "🎾", count: 14 },
  { name: "Swimming", icon: "🏊", count: 9 },
  { name: "Badminton", icon: "🏸", count: 21 },
  { name: "Cricket", icon: "🏏", count: 16 },
];

export default function SportsSection() {
  // Use an external image proxy (weserv.nl) to resize massive 20MB+ images on the fly.
  const proxyImageUrl = `https://wsrv.nl/?url=${encodeURIComponent("https://i.ibb.co.com/PsQF2Bpq/sports-equipment-green-grass-top-view.jpg")}&w=800&q=80&output=webp`;

  return (
    <section className="relative isolate overflow-hidden mx-auto py-20 bg-brand-secondary">
      <div className="overlay z-0"></div>

      {/* Background Image */}
      <Image
        src={proxyImageUrl}
        alt="Sports Facility"
        fill
        unoptimized
        sizes="100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110 z-0 opacity-80"
      />
      {/* Section Header */}
      <div className="mb-14 z-10 max-w-7xl mx-auto px-4 lg:px-8 relative text-center">
        <Reveal delay={0.05}>
          <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-300">
            Browse by Sport
          </span>
        </Reveal>

        <Reveal as="h2" delay={0.15} className="mt-5 text-4xl font-light tracking-tight text-white sm:text-5xl">
          Choose Your <span className="text-gradient">Arena</span>
        </Reveal>

        <Reveal as="p" delay={0.25} className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          From football turfs to swimming lanes — every sport has a premium home
          on SportNest.
        </Reveal>
      </div>

      {/* Sports Grid */}
      <StaggerGroup
        stagger={0.1}
        y={22}
        className="grid grid-cols-2 max-w-7xl mx-auto px-4 lg:px-8 gap-4 sm:grid-cols-3 lg:grid-cols-6 z-10 relative"
      >
        {SPORTS.map((sport, index) => (
          <StaggerItem key={sport.name}>
            <button
              className="group h-full w-full rounded-2xl border border-white/10 bg-slate-900/20 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900"
            >
              {/* Icon */}
              <div
                className="mb-3 text-4xl animate-bounce"
                style={{
                  animationDuration: "3s",
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {sport.icon}
              </div>

              {/* Name */}
              <h3 className="text-sm font-light lowercase text-white sm:text-base">
                {sport.name}
              </h3>

              {/* Count */}
              <p className="mt-1 text-xs text-slate-400">{sport.count} venues</p>
            </button>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
