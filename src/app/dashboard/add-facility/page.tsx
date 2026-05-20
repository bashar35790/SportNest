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
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [timeSlotInput, setTimeSlotInput] = useState<string>("");

  const handleAddTimeSlot = () => {
    if (timeSlotInput.trim()) {
      setTimeSlots([...timeSlots, timeSlotInput.trim()]);
      setTimeSlotInput("");
    }
  };

  const handleRemoveTimeSlot = (indexToRemove: number) => {
    setTimeSlots(timeSlots.filter((_, index) => index !== indexToRemove));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as Record<string, any>;
    data.availableTimeSlots = timeSlots;
    console.log("Form Data:", JSON.stringify(data, null, 2));

    const res = await fetch("http://localhost:5000/add-facility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      alert("Facility added successfully!");
    } else {
      alert("Failed to add facility. Please try again.");
    }
    setIsPending(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div>
        <h1 className="">Add Facility</h1>
        <p className="text-gray-600">
          {" "}
          Fill in the details to add a new facility.
        </p>
      </div>
      <Form className="p-10 space-y-8 text-left" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/*  Name */}
          <div>
            <TextField name="destinationName" isRequired>
              <Label>Facility Name *</Label>
              <Input
                name="destinationName"
                placeholder="Enter facility name"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>

          {/* Category - Updated Select Component */}
          <div>
            <Select
              name="category"
              isRequired
              className="w-full"
              placeholder="Select category"
            >
              <Label>Sport type *</Label>
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
          </div>

          {/* Image URL - Removed preview */}
          <div>
            <TextField name="imageUrl" isRequired>
              <Label>Image URL *</Label>
              <Input
                name="imageUrl"
                type="url"
                placeholder="https://example.com/bali-paradise.jpg"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>

          {/*  Location */}
          <div>
            <TextField name="location" isRequired>
              <Label>Location *</Label>
              <Input name="location" placeholder="Enter the location" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Price */}
          <TextField name="price" type="number" isRequired>
            <Label>Price Per Hour ($) *</Label>
            <Input name="price" type="number" placeholder="30" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Capacity (Players) * */}
          <TextField name="capacity" type="number" isRequired>
            <Label>Capacity (Players) *</Label>
            <Input name="capacity" type="number" placeholder="50" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Available Time Slots  */}
          <div className="md:col-span-2">
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-500 uppercase tracking-widest">
                Available Time Slots *
              </Label>
              <div className="flex items-center gap-2">
                <TextField className="flex-1" aria-label="Available Time Slots">
                  <Input
                    value={timeSlotInput}
                    onChange={(e) => setTimeSlotInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTimeSlot();
                      }
                    }}
                    placeholder="e.g. 08:00 AM - 09:00 AM"
                    className="rounded-2xl"
                  />
                  <FieldError />
                </TextField>
                <Button
                  type="button"
                  isIconOnly
                  variant="solid"
                  className="bg-[#10a149] text-white rounded-2xl h-[56px] w-[56px] flex-shrink-0"
                  onPress={handleAddTimeSlot}
                >
                  <Plus size={24} />
                </Button>
              </div>

              {/* Chips container */}
              {timeSlots.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 text-sm font-medium"
                    >
                      {slot}
                      <button
                        type="button"
                        onClick={() => handleRemoveTimeSlot(index)}
                        className="text-green-600 hover:text-green-800 transition-colors ml-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextField name="description" isRequired>
              <Label>Description</Label>
              <TextArea
                name="description"
                placeholder="Describe the facility..."
                className="rounded-3xl"
              />
              <FieldError />
            </TextField>
          </div>
        </div>
        {/* Auto-fill: Owner Email  */}
        <div className="hidden">
          <TextField name="OwnerEmail">
            <Label>Owner Email *</Label>
            <Input name="OwnerEmail" placeholder="Enter owner's email" className="rounded-2xl" />
            <FieldError />
          </TextField>
        </div>
        {/* Buttons */}

        <Button
          type="submit"
          variant="outline"
          className=" rounded-none w-full bg-cyan-500 text-white"
        >
          {isPending ? "Adding..." : "Add Facility"}
        </Button>
      </Form>
    </div>
  );
}

export default AddFacility; 
