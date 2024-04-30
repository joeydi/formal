"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/data/links";

export function SidebarNav() {
    const pathname = usePathname();
    const commonStyles = "flex items-center gap-3 rounded-lg px-3 py-2 transition-all";
    const activeStyles = "bg-muted text-primary";
    const inactiveStyles = "text-muted-foreground hover:text-primary";

    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`${commonStyles} ${pathname === link.href ? activeStyles : inactiveStyles}`}>
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {link.title}
                </Link>
            ))}
        </nav>
    );
}
