import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Forms() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center min-h-16">
                <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
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
