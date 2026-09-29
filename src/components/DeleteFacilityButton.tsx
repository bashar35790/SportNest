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
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 transition-colors hover:bg-red-100 dark:hover:bg-red-500/20 sm:w-auto xl:w-full"
            >
                <Trash2 size={18} />
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
