// Controllers

import { createUser, getUserByEmail } from "@/app/lib/data";
import bcrypt from "bcryptjs";

// Actions

export async function loginUser(email: string, password: string) {
    try {
        const result = await getUserByEmail(email);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password_hash)) {
            console.log('success'); // Log success message
            return user;
        } else {
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
    }
}

export async function registerUser(username: string, email: string, password: string, profile_description: string) {
    try {
        const result = await createUser(username, email, password, profile_description);
        return result.rows[0];
    } catch (error) {
        console.error('Error registering user:', error);
    }
}