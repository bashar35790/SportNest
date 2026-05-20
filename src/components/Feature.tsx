import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";

const FEATURED_FACILITIES = [
  {
    id: 1,
    name: "Ace Center Arena",
    price: 45,
    location: "Downtown District",
    image:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800",
    badge: "Indoor",
    tags: ["Tennis", "4 Courts"],
  },
  {
    id: 2,
    name: "Elite Football Turf",
    price: 60,
    location: "North Park Area",
    image:
      "https://images.unsplash.com/photo-1459865264687-1590b5a1caeb?auto=format&fit=crop&q=80&w=800",
    badge: "24/7",
    tags: ["Football", "Floodlights"],
  },
  {
    id: 3,
    name: "SkyHigh Hoops",
    price: 35,
    location: "East Side Plaza",
    image:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800",
    badge: "Premium",
    tags: ["Basketball", "Locker Rooms"],
  },
  {
    id: 4,
    name: "Shuttle Masters",
    price: 20,
    location: "South Sports Hub",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800",
    badge: "Hurry!",
    tags: ["Badminton", "6 Courts"],
  },
  {
    id: 5,
    name: "Aqua Pulse Center",
    price: 50,
    location: "Marina Waterfront",
    image:
      "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&q=80&w=800",
    badge: "Heated",
    tags: ["Swimming", "Olympic Size"],
  },
  {
    id: 6,
    name: "Padel Point Elite",
    price: 40,
    location: "City West Complex",
    image:
      "https://images.unsplash.com/photo-1622227432807-91eb590c37ad?auto=format&fit=crop&q=80&w=800",
    badge: "New",
    tags: ["Padel", "Panoramic"],
  },
];

export default function Feature() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight text-left highlight-text">
              Featured Facilities
            </h2>
            <p className="text-brand-secoundry text-lg">
              Top-rated premium venues for peak performance.
            </p>
          </div>
          <Link
            href="/all-facility"
            className="flex items-center text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
          >
            View All <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              {/* Image Box */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-brand-primari text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 tracking-wide">
                  {facility.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="text-xl font-bold text-brand-secoundry leading-tight">
                    {facility.name}
                  </h3>
                  <div className="text-right whitespace-nowrap">
                    <span className="text-lg font-bold text-brand-primari">
                      $ {facility.price}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      /hr
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-5">
                  <MapPin className="w-4 h-4 mr-1.5 text-gray-400 shrink-0" />
                  <span className="truncate">{facility.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {facility.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-brand-primari cursor-pointer hover:bg-brand-Cyan400 text-white font-medium py-3.5 rounded-xl transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
