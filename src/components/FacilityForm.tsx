"use client";

import {
  Form,
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { SPORT_TYPES } from "@/lib/constants";

export interface FacilityFormData {
  name: string;
  facility_type: string;
  image: string;
  location: string;
  price_per_hour: number;
  capacity: number;
  available_slots: string[];
  description: string;
}

interface FacilityFormProps {
  initialData?: Partial<FacilityFormData>;
  submitLabel?: string;
  submitPendingLabel?: string;
  onSubmit: (data: FacilityFormData) => Promise<void>;
}

export function FacilityForm({
  initialData,
  submitLabel = "Submit",
  submitPendingLabel = "Submitting...",
  onSubmit,
}: FacilityFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>(
    initialData?.available_slots || []
  );
  const [slotInput, setSlotInput] = useState("");

  const handleAddSlot = () => {
    if (slotInput.trim()) {
      setAvailableSlots([...availableSlots, slotInput.trim()]);
      setSlotInput("");
    }
  };

  const handleRemoveSlot = (indexToRemove: number) => {
    setAvailableSlots(
      availableSlots.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries()) as Record<string, string>;

    const data: FacilityFormData = {
      name: raw.name,
      facility_type: raw.facility_type,
      image: raw.image,
      location: raw.location,
      price_per_hour: Number(raw.price_per_hour),
      capacity: Number(raw.capacity),
      available_slots: availableSlots,
      description: raw.description,
    };

    try {
      await onSubmit(data);
    } finally {
      setIsPending(false);
    }
  };

  const fieldClass =
    "rounded-2xl border border-slate-200 focus-within:border-brand-primari transition-all duration-300";

  return (
    <Form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 w-full">
        <TextField name="name" isRequired defaultValue={initialData?.name}>
          <Label>Facility Name *</Label>
          <Input
            name="name"
            placeholder="Enter facility name"
            className={fieldClass}
          />
          <FieldError />
        </TextField>

        <Select
          name="facility_type"
          isRequired
          className="w-full"
          placeholder="Select facility type"
          defaultSelectedKey={initialData?.facility_type}
        >
          <Label>Facility Type *</Label>
          <Select.Trigger className="rounded-2xl border border-slate-200 transition-all duration-300 focus:border-brand-primari">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {SPORT_TYPES.map((sport) => (
                <ListBox.Item key={sport} id={sport} textValue={sport}>
                  {sport}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <TextField name="image" isRequired defaultValue={initialData?.image}>
          <Label>Image URL *</Label>
          <Input
            name="image"
            type="url"
            placeholder="https://example.com/image.jpg"
            className={fieldClass}
          />
          <FieldError />
        </TextField>

        <TextField name="location" isRequired defaultValue={initialData?.location}>
          <Label>Location *</Label>
          <Input
            name="location"
            placeholder="Enter facility location"
            className={fieldClass}
          />
          <FieldError />
        </TextField>

        <TextField
          name="price_per_hour"
          type="number"
          isRequired
          defaultValue={initialData?.price_per_hour?.toString()}
        >
          <Label>Price Per Hour ($) *</Label>
          <Input
            name="price_per_hour"
            type="number"
            placeholder="2500"
            className={fieldClass}
          />
          <FieldError />
        </TextField>

        <TextField
          name="capacity"
          type="number"
          isRequired
          defaultValue={initialData?.capacity?.toString()}
        >
          <Label>Capacity *</Label>
          <Input
            name="capacity"
            type="number"
            placeholder="14"
            className={fieldClass}
          />
          <FieldError />
        </TextField>

        <div className="md:col-span-2">
          <Label className="text-sm font-medium mb-2 block text-gray-500 dark:text-slate-400 uppercase tracking-widest">
            Available Time Slots *
          </Label>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <TextField className="flex-1">
              <Input
                value={slotInput}
                onChange={(e) => setSlotInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSlot();
                  }
                }}
                placeholder="08:00 AM - 10:00 AM"
                className={fieldClass}
              />
            </TextField>

            <Button
              type="button"
              isIconOnly
              className="bg-brand-primari hover:bg-cyan-600 transition-all duration-300 text-white rounded-2xl h-[56px] min-w-[56px] shadow-lg shadow-cyan-500/20"
              onPress={handleAddSlot}
            >
              <Plus size={22} />
            </Button>
          </div>

          {availableSlots.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 px-4 py-2 rounded-full border border-cyan-200 dark:border-cyan-700/50 text-sm font-medium transition-all duration-300 hover:shadow-md"
                >
                  {slot}
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(index)}
                    className="text-cyan-700 dark:text-cyan-400 hover:text-red-500 transition-all duration-300 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <TextField
            name="description"
            isRequired
            defaultValue={initialData?.description}
          >
            <Label>Description</Label>
            <TextArea
              name="description"
              placeholder="Describe the facility..."
              className="rounded-3xl border border-slate-200 focus-within:border-brand-primari transition-all duration-300"
            />
            <FieldError />
          </TextField>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-cyan-500 text-white rounded-2xl h-14 text-lg"
        isDisabled={isPending}
      >
        {isPending ? submitPendingLabel : submitLabel}
      </Button>
    </Form>
  );
}
