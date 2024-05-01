import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isActiveLink(href: string, pathname: string, exact = false): boolean {
    if (exact || href === "/") {
        return href === pathname;
    }

    return pathname.indexOf(href) === 0;
}
