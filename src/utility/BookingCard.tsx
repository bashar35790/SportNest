import Image from "next/image";
import {
    CalendarDays,
    Clock3,
    DollarSign,
    MapPin,
    Trash2,
} from "lucide-react";

interface BookingCardProps {
    facilityName: string;
    location: string;
    date: string;
    time: string;
    duration: string;
    price: number;
    status: "Pending" | "Confirmed" | "Cancelled";
}

export default function BookingCard({
    facilityName,
    location,
    date,
    time,
    duration,
    price,
    status,
}: BookingCardProps) {
    return (
        <div className="flex items-start justify-between gap-6 rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">

            {/* Left Content */}
            <div className="flex gap-10">

                {/* Info */}
                <div className="space-y-5">

                    {/* Title + Badge */}
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl text-slate-900">
                            {facilityName}
                        </h2>

                        <span
                            className={`rounded-2xl border px-5 py-2 text-lg font-bold uppercase tracking-wide
              ${status === "Pending"
                                    ? "border-yellow-200 bg-yellow-100 text-yellow-700"
                                    : status === "Confirmed"
                                        ? "border-green-200 bg-green-100 text-green-700"
                                        : "border-red-200 bg-red-100 text-red-700"
                                }`}
                        >
                            {status}
                        </span>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-4 text-[18px] text-slate-500">

                        {/* Location */}
                        <div className="flex items-center gap-2">
                            <MapPin size={20} className="text-brand-primari" />
                            <span>{location}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2">
                            <CalendarDays size={20} className="text-brand-primari" />
                            <span>{date}</span>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-2">
                            <Clock3 size={20} className="text-brand-primari" />
                            <span>
                                {time} ({duration})
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-1">
                            <DollarSign size={20} className="text-brand-primari" />
                            <span className="text-2xl font-bold text-brand-primari">
                                {price}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Button */}
            <button className="flex items-center gap-3 rounded-2xl px-5 py-3 text-red-500 transition-colors hover:bg-red-50 cursor-pointer">
                <Trash2 size={24} />
                <span className="text-2xl font-medium">Cancel</span>
            </button>
        </div>
    );
}
