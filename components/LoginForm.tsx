"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
    const router = useRouter();
    const [state, action] = useFormState(login, undefined);

    if (state?.redirect) {
        // Redirect the user to the callbackUrl param if present
        if (state.redirect.indexOf("?") !== -1) {
            const params = new URLSearchParams(state.redirect.split("?")[1]);
            const callbackUrl = params.get("callbackUrl");

            if (callbackUrl) {
                return router.push(callbackUrl);
            }
        }

        // If the user came directly to the /login pages, redirect them to the homepage
        if (state.redirect.indexOf("/login") !== -1) {
            return router.push("/");
        }

        // Otherwise redirect to the URL
        return router.push(state.redirect);
    }

    return (
        <form action={action}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" id="email" type="text" placeholder="me@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input name="password" id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <Button className="w-full">Sign in</Button>
                        {state?.message && (
                            <CardDescription className="mt-4 text-center text-red-600">{state.message}</CardDescription>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </form>
    );
}