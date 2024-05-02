"use client";

import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import { Form, FormState } from "@/types/forms";
import { edit } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function FormSettingsForm({ initialData }: { initialData: Form }) {
    const [formState, formAction] = useFormState<FormState, FormData>(edit, {});
    const [data, setData] = useState(initialData);

    const inputHandler = (e: ChangeEvent) => {
        const target = e.currentTarget as HTMLInputElement;
        if (target) {
            setData({ ...data, [target.name]: target.value });
        }
    };

    return (
        <form action={formAction}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Form Basics</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Name</Label>
                        <Input required name="name" id="name" type="text" value={data.name} onChange={inputHandler} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="description" id="description" rows={2} value={data.description} onChange={inputHandler} />
                    </div>
                </CardContent>
                <CardFooter className="gap-4">
                    <Button className="min-w-36">Save</Button>
                    {formState?.error && <p className="text-red-600 text-sm">{formState.error}</p>}
                </CardFooter>
            </Card>
            <input type="hidden" name="id" value={initialData.id} />
        </form>
    );
}
