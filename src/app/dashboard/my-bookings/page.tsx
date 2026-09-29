import type { Metadata } from "next";
import BookingCard from "@/utility/BookingCard";
import { BookOpen } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/api-config";

export const metadata: Metadata = {
  title: "My Bookings",
  description: "View and manage your facility bookings. Track confirmed, pending, and past bookings.",
};

interface Booking {
  _id: string;
  userId: string;
  facilityName: string;
  date: string;
  timeSlot: string;
  duration: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "expired";
}

async function MyBookingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  let bookings: Booking[] = [];

  if (userId) {
    try {
      const { token } = await auth.api.getToken({ headers: await headers() });
      const response = await fetch(
        `${API_BASE_URL}/my-bookings/${userId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          cache: "no-store",
        }
      );
      const result = await response.json() as { data?: Booking[] };
      bookings = result?.data ?? [];
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  }

  return (
    <section className="min-h-screen text-left">
      {/* Page Header */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          My <span className="text-gradient">Bookings</span>
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
          Track, manage, and cancel your upcoming sports sessions.
        </p>
      </div>

      {/* Display Bookings */}
      {bookings && bookings.length > 0 ? (
        <div aria-live="polite" className="space-y-4 sm:space-y-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {bookings.length} upcoming session{bookings.length === 1 ? "" : "s"}
          </p>
          {bookings.map((booking: Booking) => {
            const statusMap: Record<string, "Pending" | "Confirmed" | "Cancelled"> = {
              pending: "Pending",
              confirmed: "Confirmed",
              cancelled: "Cancelled",
              expired: "Cancelled",
            };
            const displayStatus = statusMap[booking.status] ?? "Pending";
            return (
              <BookingCard
                key={booking._id.toString()}
                bookingId={booking._id.toString()}
                facilityName={booking.facilityName}
                location="—"
                date={booking.date}
                time={booking.timeSlot}
                duration={`${booking.duration} hr`}
                price={booking.totalPrice}
                status={displayStatus}
              />
            );
          })}
        </div>
      ) : (
        /* No Bookings State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 px-6 py-16 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-500 dark:text-cyan-300">
            <BookOpen size={32} />
          </div>

          <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900 dark:text-white">
            No Bookings Found
          </h3>

          <p className="mb-6 max-w-md text-base text-slate-500 dark:text-slate-400">
            You haven&apos;t booked any facilities yet. Start exploring now!
          </p>

          <Link
            href="/all-facility"
            className="inline-flex items-center justify-center rounded-xl bg-brand-primari px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-600"
          >
            Explore Facilities
          </Link>
        </div>
      )}

    </section>
  )
}

export default MyBookingPage;
