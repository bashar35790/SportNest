"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Pencil,
  Trash2,
  DollarSign,
  Plus,
} from "lucide-react";

const facilities = [
  {
    id: 1,
    name: "Veronica Maddox",
    type: "BADMINTON",
    image:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1200&auto=format&fit=crop",
    location: "Adipisicing et aut o",
    price: 388,
    players: 82,
    bookings: 0,
  },
];

export default function ManageFacilities() {
  return (
    <section className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-slate-900">
              Manage My Facilities
            </h1>

            <p className="mt-2 text-base sm:text-lg text-slate-500">
              Edit or remove your listed venues
            </p>
          </div>

          <Link
            href="/dashboard/add-facility"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primari px-6 py-4 text-base font-semibold text-brand-secoundry shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-brand-primari cursor-pointer"
          >
            <Plus size={20} />
            Add New
          </Link>
        </div>
        {/* Facility Cards */}
        <div className="space-y-6">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="group rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                {/* Left Content */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {/* Image */}
                  <div className="relative h-[120px] w-full overflow-hidden rounded-3xl sm:w-[170px]">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    {/* Top */}
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl sm:text-3xl font-black text-brand-primari">
                        {facility.name}
                      </h2>

                      <span className="rounded-xl border border-brand-primari/20 bg-brand-primari/5 px-4 py-2 text-sm font-bold tracking-wide text-brand-primari">
                        {facility.type}
                      </span>
                    </div>

                    {/* Bottom Info */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4 text-slate-500">
                      {/* Location */}
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={18}
                          className="text-brand-primari"
                        />

                        <span className="text-base sm:text-lg">
                          {facility.location}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <DollarSign
                          size={18}
                          className="text-brand-primari"
                        />

                        <span className="text-base sm:text-lg">
                          ${facility.price}/hr
                        </span>
                      </div>

                      {/* Players */}
                      <div className="flex items-center gap-2">
                        <Users
                          size={18}
                          className="text-brand-primari"
                        />

                        <span className="text-base sm:text-lg">
                          {facility.players} players
                        </span>
                      </div>

                      {/* Bookings */}
                      <div className="rounded-2xl border border-brand-primari/20 bg-brand-primari/5 px-4 py-2">
                        <span className="text-lg font-bold text-brand-primari">
                          {facility.bookings} Bookings
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 xl:flex-col xl:items-start">
                  {/* Edit */}
                  <button className="flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50 cursor-pointer">
                    <Pencil size={20} />
                    Edit
                  </button>

                  {/* Delete */}
                  <button className="flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-semibold text-red-500 transition-all duration-300 hover:bg-red-50 cursor-pointer">
                    <Trash2 size={20} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
