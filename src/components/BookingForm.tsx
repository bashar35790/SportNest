"use client";

import { PostBooking } from "@/api/PostApi";
import { ChevronsExpandVertical } from "@gravity-ui/icons";
import {
    Button,
    FieldError,
    Fieldset,
    Form,
    Input,
    Label,
    Surface,
    TextField,
    Calendar,
    DateField,
    DatePicker,
    Select,
    ListBox,
    NumberField,
    Description,
} from "@heroui/react";
import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { Save } from "lucide-react";
import React from "react";

const PRICE_PER_HOUR = 40;
const STOCK_AVAILABLE = 8;

export function BookingForm({ FacilityName, AvailableSlots }: { FacilityName: string, AvailableSlots: string[] }) {
    // Controlled state for fields that don't bind to FormData 
    const [bookingDate, setBookingDate] = React.useState<DateValue | null>(null);
    const [timeSlot, setTimeSlot] = React.useState<string>("");
    const [duration, setDuration] = React.useState<number | undefined>(1);

    const isOutOfStock = duration !== undefined && duration > STOCK_AVAILABLE;
    const totalPrice = (duration ?? 1) * PRICE_PER_HOUR;

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate fields that aren't covered by HTML required
        if (!bookingDate) {
            alert("Please select a booking date.");
            return;
        }
        if (!timeSlot) {
            alert("Please select a time slot.");
            return;
        }

        // Build the payload manually — merge FormData + controlled state
        const formData = new FormData(e.currentTarget);

        const data = {
            facilityName: formData.get("facilityName") as string,
            date: bookingDate.toString(),
            timeSlot,
            duration: duration ?? 1,
            totalPrice,
        };

        console.log("Booking payload ", data);
        // TODO: await fetch("/api/bookings", { method: "POST", body: JSON.stringify(data) })
        alert("Booking confirmed!\n" + JSON.stringify(data, null, 2));
        PostBooking(data);
        reset();
    };

    const reset = () => {
        setBookingDate(null);
        setTimeSlot("");
        setDuration(1);
    };



    return (
        <div className="flex items-center justify-center rounded-3xl bg-surface p-6 text-left shadow-sm">
            <Surface className="w-full min-w-[380px]">
                <Form onSubmit={onSubmit}>
                    <Fieldset className="w-full">
                        <div>
                            <h3 className="text-brand-secoundry text-3xl font-normal mb-2">
                                Book This Facility
                            </h3>
                            <p className="text-gray-600">Fill in your details to reserve this spot</p>
                        </div>

                        <Fieldset.Group>
                            {/* FACILITY NAME (read-only, still in FormData via name prop) */}
                            <TextField isRequired name="facilityName">
                                <Label>Facility Name</Label>
                                <Input
                                    value={FacilityName}
                                    variant="secondary"
                                    className="cursor-not-allowed"
                                    readOnly
                                />
                                <FieldError />
                            </TextField>

                            {/*  BOOKING DATE (controlled → captured manually)  */}
                            <DatePicker
                                className="w-full"
                                value={bookingDate}
                                onChange={setBookingDate}
                                minValue={today(getLocalTimeZone())}
                            >
                                <Label>
                                    Date
                                    <span className="text-red-500 ml-0.5">*</span>
                                </Label>
                                <DateField.Group fullWidth>
                                    <DateField.Input className="cursor-pointer">
                                        {(segment) => <DateField.Segment segment={segment} />}
                                    </DateField.Input>
                                    <DateField.Suffix>
                                        <DatePicker.Trigger>
                                            <DatePicker.TriggerIndicator />
                                        </DatePicker.Trigger>
                                    </DateField.Suffix>
                                </DateField.Group>
                                <DatePicker.Popover>
                                    <Calendar aria-label="Event date">
                                        <Calendar.Header>
                                            <Calendar.YearPickerTrigger>
                                                <Calendar.YearPickerTriggerHeading />
                                                <Calendar.YearPickerTriggerIndicator />
                                            </Calendar.YearPickerTrigger>
                                            <Calendar.NavButton slot="previous" />
                                            <Calendar.NavButton slot="next" />
                                        </Calendar.Header>
                                        <Calendar.Grid>
                                            <Calendar.GridHeader>
                                                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                            </Calendar.GridHeader>
                                            <Calendar.GridBody>
                                                {(date) => <Calendar.Cell date={date} />}
                                            </Calendar.GridBody>
                                        </Calendar.Grid>
                                        <Calendar.YearPickerGrid>
                                            <Calendar.YearPickerGridBody>
                                                {({ year }) => <Calendar.YearPickerCell year={year} />}
                                            </Calendar.YearPickerGridBody>
                                        </Calendar.YearPickerGrid>
                                    </Calendar>
                                </DatePicker.Popover>
                            </DatePicker>

                            {/* TIME SLOT (controlled → captured manually) */}
                            <Select
                                className="w-full"
                                placeholder="Select one"
                                selectedKey={timeSlot}
                                onSelectionChange={(key) => setTimeSlot(key as string)}
                            // No `name` prop — same issue as DatePicker
                            >
                                <Label>
                                    Time Slot
                                    <span className="text-red-500 ml-0.5">*</span>
                                </Label>
                                <Select.Trigger>
                                    <Select.Value />
                                    <Select.Indicator className="size-3">
                                        <ChevronsExpandVertical />
                                    </Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        {
                                            AvailableSlots?.map((slot) => (
                                                <ListBox.Item key={slot} id={slot} textValue={slot}>
                                                    {slot} <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))
                                        }
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* Duration */}
                            <NumberField
                                isRequired
                                isInvalid={isOutOfStock}
                                maxValue={STOCK_AVAILABLE}
                                minValue={1}
                                name="duration"
                                value={duration}
                                onChange={setDuration}
                            >
                                <Label>Duration (Hours)</Label>
                                <NumberField.Group>
                                    <NumberField.DecrementButton />
                                    <NumberField.Input className="w-full" />
                                    <NumberField.IncrementButton />
                                </NumberField.Group>
                                {isOutOfStock ? (
                                    <FieldError>Only {STOCK_AVAILABLE} hours left in this slot</FieldError>
                                ) : (
                                    <Description>Max {STOCK_AVAILABLE} hours available</Description>
                                )}
                            </NumberField>
                        </Fieldset.Group>

                        {/* Price Summary */}
                        <div className="bg-brand-primari/20 rounded-xl px-4 py-3.5 border border-green-100 w-full">
                            <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                                <span>
                                    ${PRICE_PER_HOUR}/hr × {duration ?? 1} hr
                                    {(duration ?? 1) > 1 ? "s" : ""}
                                </span>
                                <span className="text-gray-700">${totalPrice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-brand-secoundry">Total Price</span>
                                <span className="text-lg font-extrabold text-brand-secoundry">
                                    ${totalPrice}
                                </span>
                            </div>
                        </div>

                        <Fieldset.Actions>
                            <Button
                                type="submit"
                                className="bg-brand-primari text-brand-secoundry hover:scale-105 transition-transform"
                            >
                                <Save />
                                Confirm Booking
                            </Button>
                        </Fieldset.Actions>
                    </Fieldset>
                </Form>
            </Surface>
        </div>
    );
}
