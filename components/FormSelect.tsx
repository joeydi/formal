"use client";

import { redirect } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FormSelect({ forms, defaultValue = null }) {
    const handleFormChange = (formId) => {
        redirect(`/entries/${formId}`);
    };

    return (
        <Select defaultValue={defaultValue ?? forms[0].id} onValueChange={handleFormChange}>
            <SelectTrigger className="w-auto">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {forms.map((form) => (
                    <SelectItem key={`form-select-${form.id}`} value={form.id}>
                        {form.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
