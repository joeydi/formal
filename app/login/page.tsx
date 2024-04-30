import { auth } from "@/auth";
import { LoginForm } from "@/components/LoginForm";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();

    if (session && session.user) {
        redirect("/");
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center p-4">
            <LoginForm />
        </main>
    );
}
