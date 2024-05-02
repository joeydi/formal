"use client";

import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { Form, FormState } from "@/types/forms";
import { edit } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function FormSchemaForm({ initialData }: { initialData: Form }) {
    const [formState, formAction] = useFormState<FormState, FormData>(edit, {});
    const [data, setData] = useState(initialData);

    const onChangeSchema = (schema) => {
        setData({ ...data, schema: JSON.parse(schema) });
    };

    const onChangeUISchema = (uischema) => {
        setData({ ...data, uischema: JSON.parse(uischema) });
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
                        <CodeMirror
                            value={JSON.stringify(initialData.schema, null, 2)}
                            width="100%"
                            height="600px"
                            theme={tokyoNightStorm}
                            extensions={[json()]}
                            onChange={onChangeSchema}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <CodeMirror
                            value={JSON.stringify(initialData.uischema, null, 2)}
                            width="100%"
                            height="600px"
                            theme={tokyoNightStorm}
                            extensions={[json()]}
                            onChange={onChangeUISchema}
                        />
                    </div>
                </CardContent>
                <CardFooter className="gap-4">
                    <Button className="min-w-36">Save</Button>
                    {formState?.error && <p className="text-red-600 text-sm">{formState.error}</p>}
                </CardFooter>
            </Card>
            <input type="hidden" name="schema" value={JSON.stringify(data.schema)} />
            <input type="hidden" name="uischema" value={JSON.stringify(data.uischema)} />
            <input type="hidden" name="id" value={initialData.id} />
        </form>
    );
}
