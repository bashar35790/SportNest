

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Trash2,
  DollarSign,
  Plus,
} from "lucide-react";
import { GetUserAddFacilities } from "@/api/GetApi";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ModalForm } from "@/components/ModalForm";
import { DeleteFacilityButton } from "@/components/DeleteFacilityButton";

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
  const addedFacilities = await GetUserAddFacilities(userId!);
  console.log(addedFacilities);
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
          {addedFacilities.map((facility: Facility) => (
            <div
              key={facility._id}
              className="group rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                {/* Left Content */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {/* Image */}
                  <div className="relative h-[120px] w-full overflow-hidden rounded-3xl sm:w-[170px]">
                    <Image
                      src={facility?.image || "/logo.png"}
                      alt={facility.name}
                      width={150}
                      height={150}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    {/* Top */}
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl sm:text-3xl font-black text-brand-secoundry">
                        {facility.name}
                      </h2>

                      <span className="rounded-xl border border-brand-primari/20 bg-brand-primari/5 px-4 py-2 text-sm font-bold tracking-wide text-brand-primari">
                        {facility.facility_type}
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
                          ${facility.price_per_hour}/hr
                        </span>
                      </div>

                      {/* Players */}
                      <div className="flex items-center gap-2">
                        <Users
                          size={18}
                          className="text-brand-primari"
                        />

                        <span className="text-base sm:text-lg">
                          {facility.capacity} players
                        </span>
                      </div>

                      {/* Bookings */}
                      <div className="rounded-2xl border border-brand-primari/20 bg-brand-primari/5 px-4 py-2">
                        <span className="text-lg font-bold text-brand-primari">
                          {facility.booking_count} Bookings
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 xl:flex-col xl:items-start">
                  {/* Edit */}
                  <ModalForm facility={facility} />

                  {/* Delete */}
                  <DeleteFacilityButton facilityId={facility._id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
