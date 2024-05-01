"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { FormState } from "@/types/forms";
import { destroy } from "@/actions/forms";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Submit({ id }) {
    const { pending } = useFormStatus();

    return (
        <Button variant="destructive" name="id" value={id} disabled={pending}>
            Delete
        </Button>
    );
}

export function DeleteForm({ id }) {
    const router = useRouter();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formState, formAction] = useFormState<FormState, FormData>(destroy, {});

    useEffect(() => {
        if (formState?.success) {
            return router.push(`/forms`);
        }
    }, [formState]);

    return (
        <>
            <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the form and all related submissions.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form action={formAction}>
                            <Submit id={id} />
                        </form>
                    </AlertDialogFooter>
                    {formState?.error && <p className="text-red-600 text-sm">{formState.error}</p>}
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
