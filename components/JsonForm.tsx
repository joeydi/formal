"use client";

import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { vanillaCells, vanillaRenderers } from "@jsonforms/vanilla-renderers";

export function JsonForm({ initialData = null, schema, uischema }) {
    const [data, setData] = useState(initialData);

    schema = Object.keys(schema).length ? schema : undefined;
    uischema = Object.keys(uischema).length ? uischema : undefined;

    return (
        <div className="json-form">
            <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={vanillaRenderers}
                cells={vanillaCells}
                onChange={({ data, _errors }) => setData(data)}
            />
        </div>
    );
}
