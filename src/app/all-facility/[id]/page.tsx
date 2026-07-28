import type { Metadata } from "next";
import { GetOneFacility } from "@/api/GetApi";
import { BookingForm } from "@/components/BookingForm";
import {
    ArrowLeft,
    MapPin,
    Users,
    DollarSign,
    Clock,
} from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const facility = await GetOneFacility(id).catch(() => null);
  return {
    title: facility?.name || "Facility Details",
    description: facility
      ? `Book ${facility.name} at ${facility.location}. $${facility.price_per_hour}/hr, capacity ${facility.capacity}.`
      : "View facility details and book your slot.",
  };
}

export default async function FacilityDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const data = await GetOneFacility(id);
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 font-sans py-30 transition-colors duration-300">
            {/* Top Nav  */}
            <div className="">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <Link href="/all-facility">
                        <button className="flex items-center gap-2 text-sm font-semibol transition-colors group cursor-pointer text-brand-secondary dark:text-slate-300 hover:text-brand-primari">
                            <ArrowLeft
                                size={16}
                                className="group-hover:-translate-x-0.5 transition-transform "
                            />
                            Back to Facilities
                        </button>
                    </Link>

                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">

                    {/* left side content  */}
                    <div className="space-y-6">

                        {/* Hero Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[16/9] bg-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={data?.image}
                                alt={data?.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Sport badge */}
                            <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold tracking-widest px-3 py-1.5 rounded-full uppercase">
                                {data?.facility_type}
                            </span>
                        </div>

                        {/* Facility Title */}
                        <div>
                            <h1 className="text-3xl font-normal text-brand-secondary dark:text-white text-left tracking-tight">
                                {data?.name}
                            </h1>
                        </div>

                        {/* Info Cards Grid */}
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <InfoCard
                                icon={<MapPin size={15} className="text-brand-primari" />}
                                label="Location"
                                value={data?.location}
                            />
                            <InfoCard
                                icon={<Users size={15} className="text-brand-primari" />}
                                label="Capacity"
                                value={data?.capacity}
                            />
                            <InfoCard
                                icon={<DollarSign size={15} className="text-brand-primari" />}
                                label="Price"
                                value={`$${data?.price_per_hour}/hour`}
                            />
                            <InfoCard
                                icon={<Clock size={15} className="text-brand-primari" />}
                                label="Slots"
                                value={`${data?.available_slots?.length} available`}
                            />
                        </div>

                        {/* About */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-white/10 p-6 shadow-sm">
                            <h2 className="text-base font-normal text-brand-secondary dark:text-white text-left mb-2">
                                About this facility
                            </h2>
                            <p className="text-sm text-brand-secondary dark:text-slate-400 text-left leading-relaxed">
                                {data.description}
                            </p>
                        </div>
                    </div>

                    {/* right side content */}
                    <BookingForm FacilityName={data.name} FacilityId={data._id} AvailableSlots={data.available_slots} PricePerHour={data.price_per_hour} />
                </div>
            </div>
        </div>
    );
}

function InfoCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-white/10 px-4 py-3.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500 text-xs mb-1">
                {icon}
                <span>{label}</span>
            </div>
            <p className="text-sm font-bold text-gray-800 dark:text-slate-200">{value}</p>
        </div>
    );
}
