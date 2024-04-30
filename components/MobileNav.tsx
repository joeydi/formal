"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/data/links";
import { Package2 } from "lucide-react";

export function MobileNav() {
    const pathname = usePathname();
    const commonStyles = "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ";
    const activeStyles = "bg-muted text-foreground";
    const inactiveStyles = "text-muted-foreground hover:text-foreground";

    return (
        <nav className="grid gap-2 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Formal</span>
            </Link>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`${commonStyles} ${pathname === link.href ? activeStyles : inactiveStyles}`}>
                    {link.icon && <link.icon className="h-5 w-5" />}
                    {link.title}
                </Link>
            ))}
        </nav>
    );
}
