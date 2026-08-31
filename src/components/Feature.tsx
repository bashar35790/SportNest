import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GetFeaturedFacilities } from "@/api/GetApi";
import { FacilityCard, type FacilityCardData } from "@/components/FacilityCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export default async function Feature() {
  const data = await GetFeaturedFacilities();
  const facilities = data?.facilities || [];
  return (
    <section className="py-24 bg-[#f8fafc] dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <Reveal as="div" className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight text-left highlight-text">
              Featured Facilities
            </h2>
            <p className="text-brand-secondary dark:text-slate-400 text-lg">
              Top-rated premium venues for peak performance.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/all-facility"
              className="flex items-center text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
            >
              View All <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup
          stagger={0.12}
          y={32}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {facilities.map((facility: FacilityCardData, index: number) => (
            <StaggerItem key={facility._id}>
              <FacilityCard facility={facility} priority={index < 3} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
