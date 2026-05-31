import BookingCard from "@/utility/BookingCard";
import { BookOpen } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { MongoClient } from "mongodb";

interface Booking {
  _id: string;
  userId: string;
  facilityName: string;
  date: string;
  timeSlot: string;
  duration: number;
  totalPrice: number;
}

async function MyBookingPage() {
  // Get the session server-side using the incoming request headers (includes the cookie)
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  let bookings: Booking[] = [];

  if (userId) {
    // Query MongoDB directly from the server — avoids the cookie-on-server-fetch problem
    // (browser cookies cannot be forwarded in server-to-server Express calls)
    const client = new MongoClient(
      process.env.MONGODB_URI_DIRECT || process.env.MONGODB_URI!
    );
    try {
      await client.connect();
      const db = client.db("sportnest");
      bookings = (await db
        .collection("Bookings")
        .find({ userId })
        .toArray()).map(doc => ({
        ...doc,
        _id: doc._id.toString(),
      })) as unknown as Booking[];
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      await client.close();
    }
  }

  return (
    <section className="px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-start mb-12">
          <h2 className="text-4xl font-bold text-brand-secoundry dark:text-white">
            My <span className="text-gradient">Bookings</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-2">
            Track, manage, and cancel your upcoming sports sessions.
          </p>
        </div>

        {/* Display Bookings */}
        {bookings && bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking: Booking) => (
              <BookingCard
                key={booking._id.toString()}
                bookingId={booking._id.toString()}
                facilityName={booking.facilityName}
                location="Dhaka, Bangladesh"
                date={booking.date}
                time={booking.timeSlot}
                duration={`${booking.duration} hr`}
                price={booking.totalPrice}
                status="Pending"
              />
            ))}
          </div>
        ) : (
          /* No Bookings State */
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-white/10">
            <div className="mb-6 text-gray-400 dark:text-slate-500">
              <BookOpen size={64} />
            </div>

            <h3 className="text-2xl font-bold text-brand-secoundry dark:text-white mb-2">
              No Bookings Found
            </h3>

            <p className="text-gray-500 dark:text-slate-400 mb-6">
              You haven&apos;t booked any facilities yet. Start exploring now!
            </p>

            <Link
              href="/all-facility"
              className="px-8 py-3 bg-brand-primari text-white font-bold rounded-xl hover:bg-brand-primari/90 transition-colors"
            >
              Explore Facilities
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}

export default MyBookingPage;