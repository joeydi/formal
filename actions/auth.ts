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
        const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        console.log({ result });

        return {
            redirect: result,
        };
    } catch (error) {
        return {
            message: "There was an error logging in.",
        };
    }
}

export async function logout() {
    await signOut();
}
