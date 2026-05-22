import { BookOpen } from "lucide-react";
import Link from "next/link";

function MyBookingPage() {
  return (

    <section className="py-16 px-6 bg-white min-h-screen">
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

        {/* No Bookings State */}
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
        </div>

      </div>
    </section>
  )
}

export default MyBookingPage;