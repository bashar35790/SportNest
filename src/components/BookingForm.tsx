"use client";

import { PostBooking } from "@/api/PostApi";
import { GetFacilityAvailability } from "@/api/GetApi";
import { authClient } from "@/lib/auth-client";
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
import toast from "react-hot-toast";

const STOCK_AVAILABLE = 8;

export function BookingForm({ FacilityName, FacilityId, AvailableSlots, PricePerHour }: { FacilityName: string, FacilityId: string, AvailableSlots: string[], PricePerHour: number }) {
    const [bookingDate, setBookingDate] = React.useState<DateValue | null>(null);
    const [timeSlot, setTimeSlot] = React.useState<string>("");
    const [duration, setDuration] = React.useState<number | undefined>(1);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [slots, setSlots] = React.useState<string[]>([]);
    const [slotsDate, setSlotsDate] = React.useState<string | null>(null);
    authClient.useSession();

    const isOutOfStock = duration !== undefined && duration > STOCK_AVAILABLE;
    const totalPrice = (duration ?? 1) * PricePerHour;
    const facilityHasSlots = AvailableSlots.length > 0;
    const hasBookingDate = Boolean(bookingDate);
    const currentDateStr = bookingDate ? bookingDate.toString() : null;
    const isLoadingSlots = hasBookingDate && slotsDate !== currentDateStr;
    const availableSlotsForDate = hasBookingDate && slotsDate === currentDateStr ? slots : [];

    React.useEffect(() => {
        if (!bookingDate) return;

        const dateStr = bookingDate.toString();
        let stale = false;

        GetFacilityAvailability(FacilityId, dateStr)
            .then(({ availableSlots }) => {
                if (stale) return;
                setSlots(availableSlots);
                setSlotsDate(dateStr);
            });

        return () => {
            stale = true;
        };
    }, [bookingDate, FacilityId]);

    const handleDateChange = (value: DateValue | null) => {
        setBookingDate(value);
        setTimeSlot("");
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!bookingDate) {
            toast.error("Please select a booking date.");
            return;
        }
        if (!timeSlot) {
            toast.error("Please select a time slot.");
            return;
        }

        const idempotencyKey = crypto.randomUUID();

        const data = {
            facilityId: FacilityId,
            facilityName: FacilityName,
            date: bookingDate.toString(),
            timeSlot,
            duration: duration ?? 1,
            idempotencyKey,
        };

        setIsSubmitting(true);
        try {
            await PostBooking(data);
            toast.success("Booking confirmed!");
            reset();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Booking failed. Please try again.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setBookingDate(null);
        setTimeSlot("");
        setDuration(1);
    };

    return (
        <div className="flex items-center justify-center rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/10 p-6 text-left shadow-sm transition-colors duration-300">
            <Surface className="w-full bg-transparent dark:bg-transparent">
                <Form onSubmit={onSubmit}>
                    <Fieldset className="w-full">
                        <div>
                            <h3 className="text-brand-secondary dark:text-white text-3xl font-normal mb-2">
                                Book This Facility
                            </h3>
                            <p className="text-gray-600 dark:text-slate-400">Fill in your details to reserve this spot</p>
                        </div>

                        <Fieldset.Group>
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

                            <DatePicker
                                className="w-full"
                                value={bookingDate}
                                onChange={handleDateChange}
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

                            {!facilityHasSlots ? (
                                <div className="rounded-2xl border border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-3.5 text-left">
                                    <Label>Time Slot</Label>
                                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                                        No time slots available for this facility
                                    </p>
                                </div>
                            ) : hasBookingDate && !isLoadingSlots && availableSlotsForDate.length === 0 ? (
                                <div className="rounded-2xl border border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-3.5 text-left">
                                    <Label>Time Slot</Label>
                                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                                        No time slots available for this date
                                    </p>
                                </div>
                            ) : (
                                <Select
                                    className="w-full"
                                    placeholder={!hasBookingDate ? "Select a date first" : isLoadingSlots ? "Loading available slots..." : "Select a time slot"}
                                    isDisabled={!hasBookingDate || isLoadingSlots || availableSlotsForDate.length === 0}
                                    selectedKey={timeSlot}
                                    onSelectionChange={(key) => setTimeSlot(key as string)}
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
                                                availableSlotsForDate.map((slot) => (
                                                    <ListBox.Item key={slot} id={slot} textValue={slot}>
                                                        {slot} <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                ))
                                            }
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            )}

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

                        <div className="bg-brand-primari/10 dark:bg-brand-primari/20 rounded-xl px-4 py-3.5 border border-brand-primari/20 dark:border-brand-primari/30 w-full">
                            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-slate-400 mb-1">
                                <span>
                                    ${PricePerHour}/hr × {duration ?? 1} hr
                                    {(duration ?? 1) > 1 ? "s" : ""}
                                </span>
                                <span className="text-gray-700 dark:text-slate-300">${totalPrice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-brand-secondary dark:text-white">Total Price</span>
                                <span className="text-lg font-extrabold text-brand-secondary dark:text-brand-primari">
                                    ${totalPrice}
                                </span>
                            </div>
                        </div>

                        <Fieldset.Actions>
                            <Button
                                type="submit"
                                className="bg-brand-primari text-brand-secondary hover:scale-105 transition-transform"
                                isDisabled={isSubmitting || !facilityHasSlots || !hasBookingDate || isLoadingSlots || availableSlotsForDate.length === 0}
                            >
                                <Save />
                                {isSubmitting ? "Confirming..." : "Confirm Booking"}
                            </Button>
                        </Fieldset.Actions>
                    </Fieldset>
                </Form>
            </Surface>
        </div>
    );
}
