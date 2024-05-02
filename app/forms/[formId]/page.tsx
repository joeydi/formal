import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserMenu } from "@/components/UserMenu";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
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
            <Sidebar />
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 p-4 lg:p-6 justify-center">
                    {
                        <div className="w-full max-w-4xl">
                            {form && (
                                <div>
                                    <Tabs defaultValue="preview">
                                        <TabsList>
                                            <TabsTrigger value="preview">Preview</TabsTrigger>
                                            <TabsTrigger value="schema">Schema</TabsTrigger>
                                            <TabsTrigger value="uischema">UI Schema</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="preview">
                                            <Card className="overflow-hidden">
                                                <CardHeader className="bg-slate-50">
                                                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                                                        <div className="flex flex-col space-y-1.5">
                                                            <CardTitle>{form.name}</CardTitle>
                                                            <CardDescription className="max-w-xl text-balance leading-relaxed">
                                                                {form.description}
                                                            </CardDescription>
                                                        </div>
                                                        <Button asChild>
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
