import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "../../../lib/data";
import bcrypt from "bcryptjs"; // New import for bcrypt using ES module syntax

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // Old username credential definition
                // username: { label: "Username", type: "text" },

                email: { label: "Email", type: "text" }, // New email credential definition
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }
                // Old way of fetching user by username
                // const user = await getUserByEmail(credentials.username);

                const user = await getUserByEmail(credentials.email); // New way of fetching user by email

                if (!user || !user.rows || !user.rows[0]) {
                    return null; // Ensure user and its properties are defined
                }

                console.log(credentials.password + " VS " + user.rows[0].password_hash);

                /*
                const compare = await bcrypt.compare(credentials.password, user.rows[0].password_hash); // keep this // Old password comparison
                console.log(compare); // Debugging line

                if (user && credentials.password === user.rows[0].password_hash) { // Old way of returning user
                    return { id: user.id, name: user.name, email: user.email }; // Old way of returning user
                } else {
                    return null; 
                }
                */

                // Check if user and user.rows[0] are defined before accessing user.rows[0].password_hash
                if (user && user.rows && user.rows[0]) {
                    const passwordMatch = await bcrypt.compare(credentials.password, user.rows[0].password_hash);

                    // If the password matches, return the user object with id, name, and email
                    if (passwordMatch) {
                        return { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email };
                    }
                }

                // Return null if the user is not found or the password doesn't match
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // If user is defined, add user.id to the token
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // If token and session.user are defined, add token.id to session.user.id
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
