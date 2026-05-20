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

function AddFacility() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotInput, setSlotInput] = useState<string>("");

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
      name: data.name,
      facility_type: data.facility_type,
      image: data.image,
      location: data.location,
      price_per_hour: Number(data.price_per_hour),
      capacity: Number(data.capacity),
      available_slots: availableSlots,
      description: data.description,
      owner_email: data.owner_email,
      booking_count: 0,
      created_at: new Date(),
    };

    console.log(facilityData);

    try {
      const res = await fetch("http://localhost:5000/add-facility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facilityData),
      });

      if (res.ok) {
        alert("Facility added successfully!");
      } else {
        alert("Failed to add facility!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Add Facility</h1>
        <p className="text-gray-600 mt-2">
          Fill in the details to add a new sports facility.
        </p>
      </div>

      {/* Form */}
      <Form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Facility Name */}
          <TextField name="name" isRequired>
            <Label>Facility Name *</Label>
            <Input
              name="name"
              placeholder="Enter facility name"
              className="rounded-2xl"
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

            <Select.Trigger className="rounded-2xl">
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
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Location */}
          <TextField name="location" isRequired>
            <Label>Location *</Label>
            <Input
              name="location"
              placeholder="Enter facility location"
              className="rounded-2xl"
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
              className="rounded-2xl"
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
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Available Slots */}
          <div className="md:col-span-2">
            <Label className="text-sm font-medium mb-2 block text-gray-500 uppercase tracking-widest">
              Available Time Slots *
            </Label>

            <div className="flex items-center gap-2">
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
                  className="rounded-2xl"
                />
              </TextField>

              <Button
                type="button"
                isIconOnly
                className="bg-green-600 text-white rounded-2xl h-[56px] w-[56px]"
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
                    className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 text-sm font-medium"
                  >
                    {slot}

                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(index)}
                      className="ml-1 text-green-700 hover:text-red-500 transition"
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
              <Label>Description *</Label>

              <TextArea
                name="description"
                placeholder="Describe the facility..."
                className="rounded-3xl"
              />

              <FieldError />
            </TextField>
          </div>
        </div>

        {/* Hidden Owner Email */}
        <input type="hidden" name="owner_email" value="owner@sportnest.com" />

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
