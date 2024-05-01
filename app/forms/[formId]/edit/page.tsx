import axios from "axios";
import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserMenu } from "@/components/UserMenu";
import { SidebarNav } from "@/components/SidebarNav";
import { MobileNav } from "@/components/MobileNav";
import { FormEditForm } from "@/components/FormEditForm";
import { DeleteForm } from "@/components/DeleteForm";
import { Code } from "bright";

async function getForm(formId) {
    try {
        const response = await axios.get(`${process.env.NEXTAUTH_BACKEND_URL}/forms/${formId}/`);
        return response.data;
    } catch (error: any) {
        return null;
    }
}

export default async function EditForm({ params }) {
    const formId = params.formId;
    const form = await getForm(formId);

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
                <main className="flex p-4 lg:p-6 items-center justify-center">
                    <div className="container mx-auto">
                        <Tabs defaultValue="settings">
                            <div className="flex justify-between">
                                <TabsList className="mb-8">
                                    <TabsTrigger value="settings">Settings</TabsTrigger>
                                    <TabsTrigger value="confirmations">Confirmations</TabsTrigger>
                                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                </TabsList>
                                <DeleteForm id={formId} />
                            </div>
                            <TabsContent value="settings">
                                <FormEditForm initialData={form} />
                            </TabsContent>
                            <TabsContent value="confirmations">
                                <Code className="mt-0 text-sm" lang="json">
                                    {JSON.stringify(form.schema, null, 2)}
                                </Code>
                            </TabsContent>
                            <TabsContent value="notifications">
                                <Code className="text-sm" lang="json">
                                    {JSON.stringify(form.uischema, null, 2)}
                                </Code>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    );
}
