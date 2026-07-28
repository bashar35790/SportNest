"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { API_BASE_URL } from "@/lib/api-config";
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

    const res = await fetch(`${API_BASE_URL}/add-facility`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to add facility");
    }

    toast.success("Facility added successfully!");
    router.push("/dashboard/manage-facilities");
    router.refresh();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-left">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient tracking-wide">
          Add Facility
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 max-w-2xl leading-relaxed">
          Create and manage your sports facility with detailed information,
          pricing, availability, and booking slots.
        </p>
      </div>

      <FacilityForm
        submitLabel="Add Facility"
        submitPendingLabel="Adding Facility..."
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddFacility;
