import { Package2 } from "lucide-react";
import Link from "next/link";
import { SidebarNav } from "@/components/SidebarNav";

export function Sidebar() {
    return (
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
    );
}
