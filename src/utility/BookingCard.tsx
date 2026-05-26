import {
    CalendarDays,
    Clock3,
    DollarSign,
    MapPin,
} from "lucide-react";
import { DeleteButton } from "./DeleteButton";

interface BookingCardProps {
    bookingId: string;
    facilityName: string;
    location: string;
    date: string;
    time: string;
    duration: string;
    price: number;
    status: "Pending" | "Confirmed" | "Cancelled";
}

export default function BookingCard({
    bookingId,
    facilityName,
    location,
    date,
    time,
    duration,
    price,
    status,
}: BookingCardProps) {

    return (
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 rounded-[32px] border border-gray-100 dark:border-white/10 bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm transition-colors duration-300">

            {/* Left Content */}
            <div className="flex gap-10">

                {/* Info */}
                <div className="space-y-5">

                    {/* Title + Badge */}
                    <div className="flex flex-wrap items-center gap-4">
                        <h2 className="text-2xl text-slate-900 dark:text-white">
                            {facilityName}
                        </h2>

                        <span
                            className={`rounded-2xl border px-5 py-2 text-md font-bold uppercase tracking-wide
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
                    <div className="flex flex-wrap items-center gap-4 text-[18px] text-slate-500 dark:text-slate-400">

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
            <DeleteButton bookingId={bookingId} />
        </div>
    );
}
