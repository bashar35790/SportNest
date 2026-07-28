import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GetFeaturedFacilities } from "@/api/GetApi";
import { FacilityCard, type FacilityCardData } from "@/components/FacilityCard";

export default async function Feature() {
  const data = await GetFeaturedFacilities();
  const facilities = data?.facilities || [];
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight text-left highlight-text">
              Featured Facilities
            </h2>
            <p className="text-brand-secondary text-lg">
              Top-rated premium venues for peak performance.
            </p>
          </div>
          <Link
            href="/all-facility"
            className="flex items-center text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
          >
            View All <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((facility: FacilityCardData, index: number) => (
            <FacilityCard key={facility._id} facility={facility} priority={index < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
