"use client";

import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { API_BASE_URL } from "@/lib/api-config";
import { withCsrf } from "@/lib/csrf";
import { FacilityForm } from "@/components/FacilityForm";
import type { FacilityFormData } from "@/components/FacilityForm";

function AddFacility() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (formData: FacilityFormData) => {
    const payload = {
      ...formData,
      userId: user?.id,
      owner_email: user?.email,
      booking_count: 0,
    };

    const res = await fetch(`${API_BASE_URL}/add-facility`, withCsrf({
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }));

    if (!res.ok) {
      throw new Error("Failed to add facility");
    }

    toast.success("Facility added successfully!");
    router.push("/dashboard/manage-facilities");
    router.refresh();
  };

  return (
    <div className="w-full text-left">
      <Link
        href="/dashboard/manage-facilities"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-primari dark:text-slate-400 dark:hover:text-brand-primari"
      >
        ← Back to Manage Facilities
      </Link>
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Add <span className="text-gradient">Facility</span>
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
          Create and manage your sports facility with detailed information,
          pricing, availability, and booking slots.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {["Details", "Pricing & slots", "Publish"].map((label, i) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-primari text-[11px] font-bold text-white">
              {i + 1}
            </span>
            {label}
          </span>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm">
      <FacilityForm
        submitLabel="Add Facility"
        submitPendingLabel="Adding Facility..."
        onSubmit={handleSubmit}
      />
      </div>
    </div>
  );
}

export default AddFacility;
