"use client";
import {
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

function AddFacility() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
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
      <form className="p-10 space-y-8 text-left" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/*  Name */}
          <div>
            <TextField name="destinationName" isRequired>
              <Label>Facility Name *</Label>
              <Input
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
                  <ListBox.Item id="Beach" textValue="Beach">
                    Football
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Mountain" textValue="Mountain">
                    Badminton
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="City" textValue="City">
                    Basketball
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Adventure" textValue="Adventure">
                    Volleyball
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Cultural" textValue="Cultural">
                    Tennis
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Luxury" textValue="Luxury">
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
              <Input placeholder="Enter the location" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Price */}
          <TextField name="price" type="number" isRequired>
            <Label>Price Per Hour ($) *</Label>
            <Input type="number" placeholder="30" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Capacity (Players) * */}
          <TextField name="capacity" type="number" isRequired>
            <Label>Capacity (Players) *</Label>
            <Input type="number" placeholder="50" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Available Time Slots  */}
          <div className="md:col-span-2">
            <TextField name="availableTimeSlots" isRequired>
              <Label>Available Time Slots </Label>
              <Input
                placeholder="e.g. 08:00 AM - 09:00 AM"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextField name="description" isRequired>
              <Label>Description</Label>
              <TextArea
                placeholder="Describe the facility..."
                className="rounded-3xl"
              />
              <FieldError />
            </TextField>
          </div>
        </div>
        {/* Auto-fill: Owner Email  */}
        <div className="hidden">
          <TextField name="OwnerEmail" isRequired>
            <Label>Owner Email *</Label>
            <Input placeholder="Enter owner's email"  className="rounded-2xl" />
            <FieldError />
          </TextField>
        </div>
        {/* Buttons */}

        <Button
          type="submit"
          variant="outline"
          className=" rounded-none w-full bg-cyan-500 text-white"
        >
          {isPending ? "Submitting..." : "Add Facility"}
        </Button>
      </form>
    </div>
  );
}

export default AddFacility;
