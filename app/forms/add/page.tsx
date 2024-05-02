import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserMenu } from "@/components/UserMenu";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { FormAddForm } from "@/components/FormAddForm";

export default async function AddForm() {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 p-4 lg:p-6 items-center justify-center">
                    <div className="w-1/2">
                        <FormAddForm />
                    </div>
                </main>
            </div>
        </div>
    );
}
