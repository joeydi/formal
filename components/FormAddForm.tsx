"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { FormState } from "@/types/forms";
import { create } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function FormAddForm() {
    const router = useRouter();
    const [formState, formAction] = useFormState<FormState, FormData>(create, {});

    useEffect(() => {
        if (formState?.success) {
            return router.push(`/forms/${formState.success}/edit`);
        }
    }, [formState]);

    return (
        <form action={formAction}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Add a Form</CardTitle>
                    <CardDescription>Enter your fields below to get started.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Name</Label>
                        <Input name="name" id="name" type="text" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="description" id="description" rows={2} />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <Button className="w-full">Submit</Button>
                    </div>
                </CardFooter>
            </Card>
        </form>
    );
}
