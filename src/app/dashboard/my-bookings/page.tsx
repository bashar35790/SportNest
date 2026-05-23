
import { GetMyBookings } from "@/api/GetApi";
import { auth } from "@/lib/auth";
import BookingCard from "@/utility/BookingCard";
import { BookOpen } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

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
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const bookings = await GetMyBookings(userId!);

  //   {
  //     "_id": "6a109fc91c6bdd5f14f6bc39",
  //     "userId": "6a0d605a62540be3f9c3cb45",
  //     "facilityName": "Smash Arena Badminton Court",
  //     "date": "2026-05-27",
  //     "timeSlot": "05:00 PM - 07:00 PM",
  //     "duration": 3,
  //     "totalPrice": 120
  // }
  return (

    <section className=" px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-start mb-12">
          <h2 className="text-4xl font-bold text-brand-secoundry">
            My <span className="text-gradient">Bookings</span>
          </h2>
          <p className="text-brand-secoundry text-lg mb-2">
            Track, manage, and cancel your upcoming sports sessions.
          </p>
        </div>

        {/* Display Bookings */}
        {bookings && bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking: Booking) => (
              <BookingCard
                key={booking._id}
                bookingId={booking._id}
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
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="mb-6 text-gray-400">
              <BookOpen size={64} />
            </div>

            <h3 className="text-2xl font-bold text-brand-secoundry mb-2">
              No Bookings Found
            </h3>

            <p className="text-gray-500 mb-6">
              You haven&apos;t booked any facilities yet. Start exploring now!
            </p>

            <Link
              href="/all-facility"
              className="px-8 py-3 bg-brand-primari text-white font-bold rounded-xl hover:bg-brand-primari/90 transition-colors"
            >
              Explore Facilities
            </Link>
          </div>)}

      </div>
    </section>
  )
}

export default MyBookingPage;