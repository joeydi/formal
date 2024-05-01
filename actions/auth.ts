"use server";

import { signIn, signOut } from "@/auth";
import { FormState } from "@/types/forms";

export async function login(state: FormState, formData: FormData) {
    try {
        const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        return {
            redirect: result,
        };
    } catch (error) {
        return {
            error: "There was an error logging in.",
        };
    }
}

export async function logout() {
    await signOut();
}
