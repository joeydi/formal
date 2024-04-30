"use server";

import axios from "axios";

export async function create(state, formData: FormData) {
    try {
        const response = await axios.post(`${process.env.NEXTAUTH_BACKEND_URL}/forms/`, formData);
        const data = response.data;

        console.log({ data });

        return data;
    } catch (error) {
        return {
            message: "There was an error saving your form.",
        };
    }
}
