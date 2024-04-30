import { Home, LineChart, Archive, LayoutList, Users } from "lucide-react";

interface Link {
    href: string;
    title: string;
    icon: any;
}

export const links: Link[] = [
    {
        href: "/",
        title: "Dashboard",
        icon: Home,
    },
    {
        href: "/forms",
        title: "Forms",
        icon: LayoutList,
    },
    {
        href: "/entries",
        title: "Entries",
        icon: Archive,
    },

    {
        href: "/workflows",
        title: "Workflows",
        icon: Users,
    },
    {
        href: "/analytics",
        title: "Analytics",
        icon: LineChart,
    },
];
