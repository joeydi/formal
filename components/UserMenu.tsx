import { auth } from "../auth";
import { logout } from "@/actions/auth";
import { CircleUser } from "lucide-react";
import { LoginButton } from "@/components/LoginButton";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export async function UserMenu() {
    const session = await auth();

    if (!session) return <LoginButton />;

    return (
        <div className="flex items-center gap-3">
            <p className="text-primary text-sm font-medium">{session.user.email}</p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <form action={logout} className="w-100">
                        <button type="submit" className="w-full">
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </button>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
