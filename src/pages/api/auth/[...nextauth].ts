import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "../../../lib/data"; // Import your user fetching function
const bcrypt = require('bcryptjs');

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
                console.log(credentials.password + " VS " + user.rows[0].password_hash);



                const compare = await bcrypt.compare(credentials.password, user.rows[0].password_hash); //keep this
                console.log(compare);

                if (user && credentials.password === user.rows[0].password_hash) { // use compare here later when database is fixed
                    return { id: user.id, name: user.name, email: user.email };
                } else {
                    return null;
                }
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