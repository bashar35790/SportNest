"use client";

import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { DeleteBooking } from "@/api/DeleteApi";
import { useRouter } from "next/navigation";

export function DeleteButton({ bookingId }: { bookingId: string }) {
    const router = useRouter();
    const handleCancel = async () => {
        await DeleteBooking(bookingId);
        router.refresh();
    };

    return (
        <AlertDialog>
            <Button variant="outline" className="flex items-center gap-2 text-orange-700"> <Trash2 size={24} /> Cancel Booking</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Cancel this booking?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                Your booking will be cancelled and the slot will be freed for others.
                                This action can be undone by rebooking.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                No, Don&apos;t cancel!
                            </Button>
                            <Button slot="close" variant="danger" onClick={handleCancel}>
                                <Trash2 size={24} />
                                Yes, Cancel it!
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}
