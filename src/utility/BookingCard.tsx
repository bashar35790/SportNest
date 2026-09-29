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
        <div className="flex min-w-0 flex-col items-stretch justify-between gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm transition-colors duration-300 sm:flex-row sm:items-start">

            {/* Left Content */}
            <div className="flex min-w-0 flex-1 gap-6">

                {/* Info */}
                <div className="min-w-0 flex-1 space-y-4">

                    {/* Title + Badge */}
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-sans text-xl font-semibold text-slate-900 dark:text-white">
                            {facilityName}
                        </h3>
                        <span
                            className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider
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
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm sm:text-base text-slate-500 dark:text-slate-400">

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
                            <span className="text-xl font-bold text-brand-primari">
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
