import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserMenu } from "@/components/UserMenu";
import { SidebarNav } from "@/components/SidebarNav";
import { MobileNav } from "@/components/MobileNav";
import { Separator } from "@/components/ui/separator";
import { JsonForm } from "@/components/JsonForm";
import { Code } from "bright";

async function getForm(formId) {
    const res = await fetch(`${process.env.NEXTAUTH_BACKEND_URL}/forms/${formId}/`);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    console.log({ data });

    return data;
}

Code.theme = "material-palenight";

export default async function ViewForm({ params }) {
    const formId = params.formId;
    const form = formId ? await getForm(formId) : null;

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
                <main className="flex flex-1 p-4 lg:p-6 justify-center">
                    {
                        <div className="w-full max-w-4xl">
                            {form && (
                                <div>
                                    <Tabs defaultValue="preview">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
                                            <div className="flex flex-col space-y-1.5">
                                                <h1 className="text-2xl font-semibold leading-none tracking-tight">
                                                    {form.name}
                                                </h1>
                                                <p className="text-sm text-muted-foreground max-w-xl text-balance leading-relaxed">
                                                    {form.description}
                                                </p>
                                            </div>
                                            <TabsList>
                                                <TabsTrigger value="preview">Preview</TabsTrigger>
                                                <TabsTrigger value="schema">Schema</TabsTrigger>
                                                <TabsTrigger value="uischema">UI Schema</TabsTrigger>
                                            </TabsList>
                                        </div>
                                        <TabsContent value="preview">
                                            <Card>
                                                <CardHeader className="bg-slate-50">
                                                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                                                        <div className="flex flex-col space-y-1.5">
                                                            <CardTitle>{form.name}</CardTitle>
                                                            <CardDescription className="max-w-xl text-balance leading-relaxed">
                                                                {form.description}
                                                            </CardDescription>
                                                        </div>
                                                        <Button>
                                                            <Link href={`/forms/${form.id}/edit`}>Edit</Link>
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                                <Separator className="" />
                                                <CardContent className="p-6">
                                                    {form.schema && Object.keys(form.schema).length ? (
                                                        <JsonForm schema={form.schema} uischema={form.uischema} />
                                                    ) : (
                                                        <p>Edit this form to begin adding fields.</p>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                        <TabsContent value="schema">
                                            <Code className="mt-0 text-sm" lang="json">
                                                {JSON.stringify(form.schema, null, 2)}
                                            </Code>
                                        </TabsContent>
                                        <TabsContent value="uischema">
                                            <Code className="text-sm" lang="json">
                                                {JSON.stringify(form.uischema, null, 2)}
                                            </Code>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            )}
                        </div>
                    }
                </main>
            </div>
        </div>
    );
}
