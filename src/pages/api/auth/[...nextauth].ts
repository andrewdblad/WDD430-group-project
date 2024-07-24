import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "../../../lib/data";
import bcrypt from "bcryptjs";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }

                const user = await getUserByEmail(credentials.email);

                if (!user || !user.rows || !user.rows[0]) {
                    console.log('User not found');
                    return null;
                }

                console.log('User found:', user.rows[0]);

                const passwordMatch = await bcrypt.compare(credentials.password, user.rows[0].password_hash);

                console.log('Password match:', passwordMatch);

                if (passwordMatch) {
                    return { id: user.rows[0].id, name: user.rows[0].username, email: user.rows[0].email };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});
