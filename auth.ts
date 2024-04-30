import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const response = await axios.post(`${process.env.NEXTAUTH_BACKEND_URL}/auth/login/`, credentials);
                    const data = response.data;

                    if (data?.user) {
                        return data.user;
                    }
                } catch (error) {
                    console.error(error);
                }

                return null;
            },
        }),
    ],
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl;

            const restrictedPaths = ["/", "/forms", "/entries", "/workflows", "/analytics"];

            if (restrictedPaths.includes(pathname)) {
                return !!auth;
            }

            return true;
        },
    },
    pages: {
        signIn: "/login",
    },
});
