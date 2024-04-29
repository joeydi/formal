"use server";

import { signIn, signOut } from "@/auth";

type FormState =
    | {
          errors?: {
              email?: string[];
              password?: string[];
          };
          message?: string;
          redirect?: string;
      }
    | undefined;

export async function login(state: FormState, formData: FormData) {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/",
            redirect: false,
        });
        return {
            redirect: "/",
        };
    } catch (error) {
        console.log({ error });

        return {
            message: "There was an error logging in.",
        };
    }
}

export async function logout() {
    await signOut();
}
