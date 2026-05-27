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
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function AddFacility() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotInput, setSlotInput] = useState<string>("");
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;

  // Add Time Slot
  const handleAddSlot = () => {
    if (slotInput.trim()) {
      setAvailableSlots([...availableSlots, slotInput.trim()]);
      setSlotInput("");
    }
  };

  // Remove Time Slot
  const handleRemoveSlot = (indexToRemove: number) => {
    setAvailableSlots(
      availableSlots.filter((_, index) => index !== indexToRemove),
    );
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, any>;

    // Final Facility Object
    const facilityData = {
      userId: user?.id,
      name: data.name,
      facility_type: data.facility_type,
      image: data.image,
      location: data.location,
      price_per_hour: Number(data.price_per_hour),
      capacity: Number(data.capacity),
      available_slots: availableSlots,
      description: data.description,
      owner_email: user?.email,
      booking_count: 0,
      created_at: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/add-facility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facilityData),
      });

      if (res.ok) {
        toast.success("Facility added successfully!");
        router.push("/dashboard/manage-facilities")
        router.refresh();
      } else {
        toast.error("Failed to add facility!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-left">
      {/* Heading */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient tracking-wide">
          Add Facility
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 max-w-2xl leading-relaxed">
          Create and manage your sports facility with detailed information,
          pricing, availability, and booking slots.
        </p>
      </div>

      {/* Form */}
      <Form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 w-full">
          {/* Facility Name */}
          <TextField name="name" isRequired>
            <Label>Facility Name *</Label>
            <Input
              name="name"
              placeholder="Enter facility name"
              className="rounded-2xl border border-slate-200 focus-within:border-brand-primari transition-all duration-300"
            />
            <FieldError />
          </TextField>

          {/* Facility Type */}
          <Select
            name="facility_type"
            isRequired
            className="w-full"
            placeholder="Select facility type"
          >
            <Label>Facility Type *</Label>

            <Select.Trigger className="rounded-2xl border border-slate-200 transition-all duration-300 focus:border-brand-primari">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="Football" textValue="Football">
                  Football
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Badminton" textValue="Badminton">
                  Badminton
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Basketball" textValue="Basketball">
                  Basketball
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Volleyball" textValue="Volleyball">
                  Volleyball
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Tennis" textValue="Tennis">
                  Tennis
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Swimming" textValue="Swimming">
                  Swimming
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Image URL */}
          <TextField name="image" isRequired>
            <Label>Image URL *</Label>
            <Input
              name="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="rounded-2xl border border-slate-200 focus-within:border-brand-primari transition-all duration-300"
            />
            <FieldError />
          </TextField>

          {/* Location */}
          <TextField name="location" isRequired>
            <Label>Location *</Label>
            <Input
              name="location"
              placeholder="Enter facility location"
              className="rounded-2xl border border-slate-200 focus-within:border-brand-primari transition-all duration-300"
            />
            <FieldError />
          </TextField>

          {/* Price Per Hour */}
          <TextField name="price_per_hour" type="number" isRequired>
            <Label>Price Per Hour ($) *</Label>
            <Input
              name="price_per_hour"
              type="number"
              placeholder="2500"
              className="rounded-2xl border border-slate-200 focus-within:border-brand-primari transition-all duration-300"
            />
            <FieldError />
          </TextField>

          {/* Capacity */}
          <TextField name="capacity" type="number" isRequired>
            <Label>Capacity *</Label>
            <Input
              name="capacity"
              type="number"
              placeholder="14"
              className="rounded-2xl border border-slate-200 focus-within:border-brand-primari transition-all duration-300"
            />
            <FieldError />
          </TextField>

          {/* Available Slots */}
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
                  className="rounded-2xl border border-slate-200 focus-within:border-brand-primari transition-all duration-300"
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

            {/* Slots */}
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

          {/* Description */}
          <div className="md:col-span-2">
            <TextField name="description" isRequired>
              <Label>Description </Label>

              <TextArea
                name="description"
                placeholder="Describe the facility..."
                className="rounded-3xl border border-slate-200 focus-within:border-brand-primari transition-all duration-300"
              />

              <FieldError />
            </TextField>
          </div>
        </div>

        {/* Hidden Owner Email */}
        <input type="hidden" name="owner_email" value={user?.email || ""} />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-cyan-500 text-white rounded-2xl h-14 text-lg"
        >
          {isPending ? "Adding Facility..." : "Add Facility"}
        </Button>
      </Form>
    </div>
  );
}

export default AddFacility;
