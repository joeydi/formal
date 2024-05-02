import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserMenu } from "@/components/UserMenu";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function Forms() {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center min-h-16">
                        <h1 className="text-lg font-semibold md:text-2xl">Workflows</h1>
                        <Button asChild className="ml-auto">
                            <Link href="/forms">Add Workflow</Link>
                        </Button>
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
            </div>
        </div>
    );
}
