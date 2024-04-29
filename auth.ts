import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const response = await axios.post(`${process.env.NEXTAUTH_BACKEND_URL}auth/login/`, credentials);
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

            console.log({ pathname });

            if (pathname === "/") {
                return !!auth;
            }

            return true;
        },
    },
    pages: {
        signIn: "/login",
    },
});
