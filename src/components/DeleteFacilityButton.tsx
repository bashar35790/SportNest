"use client";

import { Trash2 } from "lucide-react";
import { DeleteFacility } from "@/api/DeleteApi";
import { useRouter } from "next/navigation";

export function DeleteFacilityButton({ facilityId }: { facilityId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this facility?");
        if (!confirm) return;

        const success = await DeleteFacility(facilityId);
        if (success) {
            router.refresh();
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-semibold text-red-500 transition-all duration-300 hover:bg-red-50 cursor-pointer"
        >
            <Trash2 size={20} />
            Delete
        </button>
    );
}
