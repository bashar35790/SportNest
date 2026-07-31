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
        className="flex items-center justify-center gap-2 text-lg font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50 cursor-pointer bg-brand-primari/30 w-full sm:w-auto"
      >
        <Pencil size={20} /> Edit
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
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
