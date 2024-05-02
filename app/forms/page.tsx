import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

async function getForms() {
    const res = await fetch(`${process.env.NEXTAUTH_BACKEND_URL}/forms/`);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data;
}

function FormCard({ form }) {
    return (
        <Link key={form.id} href={`/forms/${form.id}`}>
            <Card className="sm:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl">{form.name}</CardTitle>
                    <CardDescription className="max-w-xl text-balance leading-relaxed">{form.description}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
}

export default async function Forms() {
    const forms = await getForms();

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center min-h-16">
                        <h1 className="text-lg font-semibold md:text-2xl">Forms</h1>
                        <Button asChild className="ml-auto">
                            <Link href="/forms/add">Add Form</Link>
                        </Button>
                    </div>

                    {forms && forms.length ? (
                        forms.map((form) => <FormCard key={form.id} form={form} />)
                    ) : (
                        <div
                            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                            x-chunk="dashboard-02-chunk-1">
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h3 className="text-2xl font-bold tracking-tight">You have no forms</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    You can start entering submissions as soon as you add a form.
                                </p>
                                <Button asChild>
                                    <Link href="/forms">Add Form</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
