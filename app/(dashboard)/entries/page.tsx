import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/FormSelect";

async function getForms() {
    const res = await fetch(`${process.env.NEXTAUTH_BACKEND_URL}/forms/`);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data;
}

export default async function Entries() {
    const forms = await getForms();

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between min-h-16">
                <h1 className="text-lg font-semibold md:text-2xl">Entries</h1>

                {forms && forms.length ? <FormSelect forms={forms} /> : null}
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                x-chunk="dashboard-02-chunk-1">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">You have no forms</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        You can start selling submissions as soon as you add a product.
                    </p>
                    <Button asChild>
                        <Link href="/forms">Add Form</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
