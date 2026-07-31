"use client";

import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { DeleteFacility } from "@/api/DeleteApi";
import { useRouter } from "next/navigation";

export function DeleteFacilityButton({ facilityId }: { facilityId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        const success = await DeleteFacility(facilityId);
        if (success) {
            router.refresh();
        }
    };

    return (
        <AlertDialog>
            <Button
                variant="ghost"
                className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-lg font-semibold text-red-500 hover:bg-red-50 cursor-pointer w-full sm:w-auto"
            >
                <Trash2 size={20} />
                Delete
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete this facility?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This facility will be permanently removed from your listings.
                                This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                No, Keep it!
                            </Button>
                            <Button slot="close" variant="danger" onClick={handleDelete}>
                                <Trash2 size={20} />
                                Yes, Delete it!
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}
