import Link from "next/link";
import { MapPin, ChevronRight, Clock, Users, Calendar } from "lucide-react";
import Image from "next/image";
import { GetFeaturedFacilities } from "@/api/GetApi";

export default async function Feature() {
  const { facilities } = await GetFeaturedFacilities();
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight text-left highlight-text">
              Featured Facilities
            </h2>
            <p className="text-brand-secoundry text-lg">
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((facility: any) => (
            <div
              key={facility._id}
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              {/* Image Box */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  height={400}
                  width={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute top-4 right-4 bg-brand-primari text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 tracking-wide ${facility.facility_type === "Cricket" ? "bg-green-500" : facility.facility_type === "Football" ? "bg-green-500" : facility.facility_type === "Badminton" ? "bg-green-500" : facility.facility_type === "Basketball" ? "bg-green-500" : facility.facility_type === "Swimming" ? "bg-brand-cyan400" : "bg-brand-secoundry"}`}>
                  {facility.facility_type}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="text-xl font-bold text-brand-secoundry leading-tight">
                    {facility.name}
                  </h3>
                  <div className="text-right whitespace-nowrap">
                    <span className="text-lg font-bold text-brand-primari">
                      $ {facility.price_per_hour}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      /hr
                    </span>
                  </div>
                </div>

                <div className=" flex flex-col gap-2">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-1.5 shrink-0 text-brand-primari" />
                    <span className="truncate">Up to {facility.capacity} people</span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1.5 shrink-0 text-brand-primari" />
                    <span className="truncate">{facility.location}</span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm mb-5">
                    <Clock className="w-4 h-4 mr-1.5 shrink-0 text-brand-primari" />
                    <span className="truncate ">
                      {facility.available_slots.length} slots available
                    </span>
                  </div>
                </div>

                <Link href={`/all-facility/${facility._id}`}>
                  <button className="w-full flex items-center justify-center gap-2 bg-brand-primari cursor-pointer hover:bg-brand-Cyan400 text-brand-secoundry font-medium py-3.5 rounded-xl transition-colors duration-200">
                    Book Now <Calendar className="h-4 w-4 ml-0.5" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
