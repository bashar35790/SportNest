import { MapPin, Clock, Users, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface FacilityCardData {
  _id: string;
  name: string;
  image: string;
  facility_type: string;
  price_per_hour: number;
  capacity: number;
  location: string;
  available_slots: string[];
}

const badgeColors: Record<string, string> = {
  Cricket: "bg-green-500",
  Football: "bg-green-500",
  Badminton: "bg-green-500",
  Basketball: "bg-green-500",
  Swimming: "bg-brand-Cyan400",
};

function badgeBg(type: string): string {
  return badgeColors[type] || "bg-brand-secondary";
}

export function FacilityCard({
  facility,
  viewMode = "grid",
  priority = false,
}: {
  facility: FacilityCardData;
  viewMode?: "grid" | "list";
  priority?: boolean;
}) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 dark:border-white/10 flex group hover:-translate-y-1 hover:shadow-[0_8px_25px_-8px_rgba(0,0,0,0.15)] hover:ring-1 hover:ring-brand-primari/20 ${viewMode === "grid" ? "flex-col" : "flex-col md:flex-row"}`}
    >
      <div
        className={`relative overflow-hidden ${viewMode === "grid" ? "h-64 w-full" : "w-full md:w-2/5 min-h-[220px]"}`}
      >
        <Image
          src={facility.image}
          alt={facility.name}
          height={400}
          width={400}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute top-4 right-4 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 tracking-wide ${badgeBg(facility.facility_type)}`}
        >
          {facility.facility_type}
        </div>
      </div>

      <div className={`p-6 flex flex-col grow ${viewMode === "list" ? "justify-center" : ""}`}>
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="text-xl font-light tracking-wider text-brand-secondary dark:text-white leading-tight text-left">
            {facility.name}
          </h3>
          <div className="text-right whitespace-nowrap">
            <span className="text-lg font-bold text-brand-primari">
              $ {facility.price_per_hour}
            </span>
            <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
              /hr
            </span>
          </div>
        </div>

        <div className={`flex flex-col gap-2 ${viewMode === "list" ? "my-4" : "mb-5"}`}>
          <div className="flex items-center text-gray-500 dark:text-slate-400 text-sm">
            <Users className="w-4 h-4 mr-1.5 shrink-0 text-brand-primari" />
            <span className="truncate">Up to {facility.capacity} people</span>
          </div>

          <div className="flex items-center text-gray-500 dark:text-slate-400 text-sm">
            <MapPin className="w-4 h-4 mr-1.5 shrink-0 text-brand-primari" />
            <span className="truncate">{facility.location}</span>
          </div>

          <div className="flex items-center text-gray-500 dark:text-slate-400 text-sm">
            <Clock className="w-4 h-4 mr-1.5 shrink-0 text-brand-primari" />
            <span className="truncate">
              {facility.available_slots ? facility.available_slots.length : 0} slots available
            </span>
          </div>
        </div>

        <div className={`mt-auto ${viewMode === "list" ? "max-w-[200px]" : ""}`}>
          <Link href={`/all-facility/${facility._id}`}>
            <button className="w-full flex items-center justify-center gap-2 bg-brand-primari cursor-pointer hover:bg-brand-Cyan400 text-brand-secondary font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
              Book Now <Calendar className="h-4 w-4 ml-0.5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
