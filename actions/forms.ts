"use server";

import axios from "axios";
import { FormState } from "@/types/forms";

export async function create(currentState: FormState, formData: FormData) {
    let data = {};

    try {
        const response = await axios.post(`${process.env.NEXTAUTH_BACKEND_URL}/forms/`, formData);

        data = {
            success: response.data.id,
        };
    } catch (error: any) {
        if (error?.response?.statusText) {
            data = {
                error: `There was an error saving your form: ${error?.response?.statusText}`,
            };
        } else {
            data = {
                error: "There was an error saving your form.",
            };
        }
    }

    return data;
}

export async function edit(currentState: FormState, formData: FormData) {
    let data = {};

    try {
        await axios.put(`${process.env.NEXTAUTH_BACKEND_URL}/forms/${formData.get("id")}/`, formData);
        data = {
            success: true,
        };
    } catch (error: any) {
        if (error?.response?.statusText) {
            data = {
                error: `There was an error saving your form: ${error?.response?.statusText}`,
            };
        } else {
            data = {
                error: "There was an error saving your form.",
            };
        }
    }

    return data;
}

export async function destroy(currentState: FormState, formData: FormData) {
    let data = {};

    try {
        await axios.delete(`${process.env.NEXTAUTH_BACKEND_URL}/forms/${formData.get("id")}/`);

        data = {
            success: true,
        };
    } catch (error: any) {
        if (error?.response?.statusText) {
            data = {
                error: `There was an error deleting your form: ${error?.response?.statusText}`,
            };
        } else {
            data = {
                error: "There was an error saving your form.",
            };
        }
    }

    return data;
}
