"use client";

import { UpdateFacilityApi } from "@/api/UpdateFacilityApi";
import { Button, Modal } from "@heroui/react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FacilityForm } from "@/components/FacilityForm";
import type { FacilityFormData } from "@/components/FacilityForm";

interface FacilityShape {
  _id: string;
  name: string;
  facility_type: string;
  image: string;
  location: string;
  price_per_hour: number;
  capacity: number;
  available_slots: string[];
  description: string;
}

export function ModalForm({ facility }: { facility: FacilityShape }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: FacilityFormData) => {
    const data = await UpdateFacilityApi(facility._id, formData);
    if (data.success) {
      toast.success("Facility updated successfully");
      setIsOpen(false);
      router.refresh();
    } else {
      toast.error(data.message || "Failed to update facility");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        onPress={() => setIsOpen(true)}
        variant="secondary"
        aria-label={`Edit ${facility.name}`}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors hover:border-brand-primari/40 hover:text-brand-primari sm:w-auto"
      >
        <Pencil size={18} /> Edit
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-2xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Facility</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <FacilityForm
                initialData={facility}
                submitLabel="Update Facility"
                submitPendingLabel="Updating Facility..."
                onSubmit={handleSubmit}
              />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
