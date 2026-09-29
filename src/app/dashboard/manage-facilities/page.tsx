import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  DollarSign,
  Plus,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ModalForm } from "@/components/ModalForm";
import { DeleteFacilityButton } from "@/components/DeleteFacilityButton";
import { API_BASE_URL } from "@/lib/api-config";

export const metadata: Metadata = {
  title: "Manage Facilities",
  description: "View and manage your sports facilities. Add, edit, or remove facilities from your dashboard.",
};

type Facility = {
  _id: string;
  userId: string;
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
  created_at: string;
};


export default async function ManageFacilities() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  let addedFacilities: Facility[] = [];

  if (userId) {
    try {
      const cookieHeader = (await headers()).get("cookie") || "";
      const response = await fetch(
        `${API_BASE_URL}/facilities/user/${userId}`,
        { headers: { cookie: cookieHeader }, cache: "no-store" }
      );
      const data = await response.json();
      addedFacilities = (data?.facilities || []) as Facility[];
    } catch (err) {
      console.error("Failed to fetch user facilities:", err);
    }
  }

  return (
    <section className="min-h-screen">
        {/* Header */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Manage My <span className="text-gradient">Facilities</span>
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
              Edit or remove your listed venues
            </p>
          </div>

          <Link
            href="/dashboard/add-facility"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-primari px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-600 cursor-pointer"
          >
            <Plus size={18} />
            Add New
          </Link>
        </div>
        {/* Facility Cards */}
        <div className="space-y-4 sm:space-y-6">
          {addedFacilities.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 px-6 py-16 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-500 dark:text-cyan-300">
                <Plus size={32} />
              </div>
              <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900 dark:text-white">
                No facilities yet
              </h3>
              <p className="mb-6 max-w-md text-base text-slate-500 dark:text-slate-400">
                You haven&apos;t listed any venues. Add your first facility to start receiving bookings.
              </p>
              <Link
                href="/dashboard/add-facility"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primari px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-600"
              >
                <Plus size={18} />
                Add your first facility
              </Link>
            </div>
          ) : (
          <>
          {addedFacilities.map((facility: Facility) => (
            <div
              key={facility._id}
              className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm transition-colors duration-300"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                {/* Left Content */}
                <div className="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:items-center">
                  {/* Image */}
                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-40">
                    <Image
                      src={facility?.image || "/logo.png"}
                      alt={facility.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    {/* Top */}
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-sans text-xl font-semibold text-slate-900 dark:text-white">
                        {facility.name}
                      </h2>

                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                        {facility.facility_type}
                      </span>
                    </div>

                    {/* Bottom Info */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                      {/* Location */}
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={18}
                          className="text-brand-primari"
                        />

                        <span>
                          {facility.location}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <DollarSign
                          size={18}
                          className="text-brand-primari"
                        />

                        <span>
                          ${facility.price_per_hour}/hr
                        </span>
                      </div>

                      {/* Players */}
                      <div className="flex items-center gap-2">
                        <Users
                          size={18}
                          className="text-brand-primari"
                        />

                        <span>
                          {facility.capacity} players
                        </span>
                      </div>

                      {/* Bookings */}
                      <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1">
                        <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                          {facility.booking_count} Bookings
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row xl:w-44 xl:flex-col items-stretch">
                  {/* Edit */}
                  <ModalForm facility={facility} />

                  {/* Delete */}
                  <DeleteFacilityButton facilityId={facility._id} />
                </div>
              </div>
            </div>
          ))}
          </>
          )}
        </div>
    </section>
  );
}
