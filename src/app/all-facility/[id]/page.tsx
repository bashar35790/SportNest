import { GetOneFacility } from "@/api/GetApi";
import { BookingForm } from "@/components/BookingForm";
import {
    ArrowLeft,
    MapPin,
    Users,
    DollarSign,
    Clock,
    Star,
    Shield,
    Wifi,
    ParkingCircle,
} from "lucide-react";

interface FacilityApiResponse {
    _id: string;
    name: string;
    facility_type: string;
    image: string;
    location: string;
    price_per_hour: number;
    capacity: number;
    available_slots: string[];
    description: string;
    owner_email: string;
    booking_count: number;
}

const amenityIcons: Record<string, React.ReactNode> = {
    "Free WiFi": <Wifi size={14} />,
    Parking: <ParkingCircle size={14} />,
    "Changing Rooms": <Shield size={14} />,
    "Equipment Rental": <Star size={14} />,
};

export default async function FacilityDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;

    const facility: FacilityApiResponse = await GetOneFacility(id);

    return (
        <div className="min-h-screen bg-gray-50 font-sans py-30">
            {/* Top Nav */}
            <div>
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <button className="flex items-center gap-2 text-sm font-semibold transition-colors group cursor-pointer text-brand-secoundry hover:text-brand-primari">
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-0.5 transition-transform"
                        />
                        Back to Facilities
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">

                    {/* Left Side */}
                    <div className="space-y-6">

                        {/* Hero Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[16/9] bg-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={facility.image}
                                alt={facility.name}
                                className="w-full h-full object-cover"
                            />

                            {/* Sport Badge */}
                            <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold tracking-widest px-3 py-1.5 rounded-full uppercase">
                                {facility.facility_type}
                            </span>
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-normal text-brand-secoundry text-left tracking-tight">
                                {facility.name}
                            </h1>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <InfoCard
                                icon={<MapPin size={15} className="text-brand-primari" />}
                                label="Location"
                                value={facility.location}
                            />

                            <InfoCard
                                icon={<Users size={15} className="text-brand-primari" />}
                                label="Capacity"
                                value={`${facility.capacity} Players`}
                            />

                            <InfoCard
                                icon={<DollarSign size={15} className="text-brand-primari" />}
                                label="Price"
                                value={`৳${facility.price_per_hour}/hour`}
                            />

                            <InfoCard
                                icon={<Clock size={15} className="text-brand-primari" />}
                                label="Slots"
                                value={`${facility.available_slots.length} available`}
                            />
                        </div>

                        {/* About */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-base font-normal text-brand-secoundry text-left mb-2">
                                About this facility
                            </h2>

                            <p className="text-sm text-brand-secoundry text-left leading-relaxed">
                                {facility.description}
                            </p>
                        </div>

                        {/* Available Slots */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-base font-normal text-brand-secoundry text-left mb-4">
                                Available Slots
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {facility.available_slots.map((slot) => (
                                    <span
                                        key={slot}
                                        className="bg-brand-primari/10 text-brand-secoundry text-sm px-3 py-2 rounded-full border border-green-100"
                                    >
                                        {slot}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-base font-normal text-brand-secoundry text-left mb-4">
                                Amenities
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {Object.keys(amenityIcons).map((a) => (
                                    <span
                                        key={a}
                                        className="inline-flex items-center gap-1.5 bg-brand-primari text-brand-secoundry text-xs font-medium px-3 py-1.5 rounded-full border border-green-100"
                                    >
                                        {amenityIcons[a]}
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <BookingForm />
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
        <div className="bg-white rounded-xl border border-gray-100 px-4 py-3.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                {icon}
                <span>{label}</span>
            </div>

            <p className="text-sm font-bold text-gray-800">
                {value}
            </p>
        </div>
    );
}
