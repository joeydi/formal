import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserMenu } from "@/components/UserMenu";
import { SidebarNav } from "@/components/SidebarNav";
import { MobileNav } from "@/components/MobileNav";

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
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="">Informal</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <SidebarNav />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <MobileNav />
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1"></div>
                    <UserMenu />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">Forms</h1>
                        <Button asChild className="ml-auto">
                            <Link href="/forms/add">Add Form</Link>
                        </Button>
                    </div>

                    {forms && forms.length ? (
                        forms.map((form) => <FormCard form={form} />)
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
