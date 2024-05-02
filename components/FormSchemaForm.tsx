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

export function FormSchemaForm({ initialData }: { initialData: Form }) {
    const [formState, formAction] = useFormState<FormState, FormData>(edit, {});

    initialData.schema = JSON.stringify(initialData.schema);
    initialData.uischema = JSON.stringify(initialData.uischema);
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
                <CardContent className="grid xl:grid-cols-2 items-start gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Name</Label>
                        <Textarea name="schema" id="schema" rows={12} value={data.schema} onChange={inputHandler} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="uischema" id="uischema" rows={12} value={data.uischema} onChange={inputHandler} />
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
