"use client";

import { UpdateFacilityApi } from "@/api/UpdateFacilityApi";
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, Modal, Surface, TextField, Select, ListBox, TextArea, Form } from "@heroui/react";
import { Pencil, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export function ModalForm({ facility }: { facility: any }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [availableSlots, setAvailableSlots] = useState<string[]>(facility?.available_slots || []);
    const [slotInput, setSlotInput] = useState<string>("");
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const user = session?.user;
    console.log(user)
    // Add Time Slot
    const handleAddSlot = () => {
        if (slotInput.trim()) {
            setAvailableSlots([...availableSlots, slotInput.trim()]);
            setSlotInput("");
        }
    };

    // Remove Time Slot
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
        const updatedFacilityData = {
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
        await UpdateFacilityApi(facility?._id as string, updatedFacilityData);
        setIsOpen(false);
        setIsPending(false);
        router.refresh();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button onPress={() => setIsOpen(true)} variant="secondary" className="flex items-center justify-center gap-2 text-lg font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50 cursor-pointer bg-brand-primari/30 w-full sm:w-auto"><Pencil size={20} /> Edit</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Edit Facility</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">

                                {/* Form */}
                                <Form className="space-y-8" onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8 w-full">
                                        {/* Facility Name */}
                                        <TextField name="name" isRequired defaultValue={facility?.name}>
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
                                            defaultSelectedKey={facility?.facility_type}
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
                                        <TextField name="image" isRequired defaultValue={facility?.image}>
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
                                        <TextField name="location" isRequired defaultValue={facility?.location}>
                                            <Label>Location *</Label>
                                            <Input
                                                name="location"
                                                placeholder="Enter facility location"
                                                className="rounded-2xl border border-slate-200 focus-within:border-brand-primari transition-all duration-300"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Price Per Hour */}
                                        <TextField name="price_per_hour" type="number" isRequired defaultValue={facility?.price_per_hour?.toString()}>
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
                                        <TextField name="capacity" type="number" isRequired defaultValue={facility?.capacity?.toString()}>
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
                                            <Label className="text-sm font-medium mb-2 block text-gray-500 uppercase tracking-widest">
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
                                                            className="group flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-2 rounded-full border border-cyan-200 text-sm font-medium transition-all duration-300 hover:shadow-md"
                                                        >
                                                            {slot}

                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveSlot(index)}
                                                                className="text-cyan-700 hover:text-red-500 transition-all duration-300 cursor-pointer
                                                      "
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
                                            <TextField name="description" isRequired defaultValue={facility?.description}>
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
                                    <input type="hidden" name="owner_email" value={user?.email} />

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-cyan-500 text-white rounded-2xl h-14 text-lg"
                                    >
                                        {isPending ? "Updating Facility..." : "Update Facility"}
                                    </Button>
                                </Form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}