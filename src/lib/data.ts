import { createClient } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
require('dotenv').config();

const client = createClient({ connectionString: process.env.POSTGRES_URL_NON_POOLING });

client.connect();


// User CRUD operations
export async function createUser(username: string, email: string, password: string, profile_description: string) {
    try {
        const password_hash = await bcrypt.hash(password, 10);
        const result = await client.query(
            'INSERT INTO users (username, email, password_hash, profile_description) VALUES ($1, $2, $3, $4) RETURNING *;',
            [username, email, password_hash, profile_description]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

export async function getUserById(id: number) {
    try {
        const result = await client.query(
            'SELECT * FROM users WHERE id = $1;',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error getting user by ID:', error);
    }
}

export async function updateUser(id: number, username: string, email: string, password_hash: string, profile_description: string) {
    try {
        const result = await client.query(
            'UPDATE users SET username = $1, email = $2, password_hash = $3, profile_description = $4 WHERE id = $5 RETURNING *;',
            [username, email, password_hash, profile_description, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

export async function deleteUser(id: number) {
    try {
        const result = await client.query(
            'DELETE FROM users WHERE id = $1 RETURNING *;',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Category CRUD operations
export async function createCategory(name: string) {
    try {
        const result = await client.query(
            'INSERT INTO categories (name) VALUES ($1) RETURNING *;',
            [name]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating category:', error);
    }
}

export async function getCategoryById(id: number) {
    try {
        const result = await client.query(
            'SELECT * FROM categories WHERE id = $1;',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error getting category by ID:', error);
    }
}

export async function getUserByEmail(email: string) {
    try {
        const result = await client.query(
            'SELECT * FROM users WHERE email = $1;',
            [email]
        );
        return result;
    } catch (error) {
        console.error('Error getting user by email:', error);
    }
}

export async function updateCategory(id: number, name: string) {
    try {
        const result = await client.query(
            'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *;',
            [name, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating category:', error);
    }
}

export async function deleteCategory(id: number) {
    try {
        const result = await client.query(
            'DELETE FROM categories WHERE id = $1 RETURNING *;',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting category:', error);
    }
}

// Product CRUD operations
export async function createProduct(user_id: number, category_id: number, name: string, description: string, price: number, image_url: string) {
    try {
        const result = await client.query(
            'INSERT INTO products (user_id, category_id, name, description, price, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
            [user_id, category_id, name, description, price, image_url]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating product:', error);
    }
}

export async function getAllProducts() {
    try {
        const result = await client.query('SELECT * FROM products;');
        return result.rows;
    } catch (error) {
        console.error('Error getting all products:', error);
        throw error;
    }
}


export async function getProductById(id: number) {
    try {
        const result = await client.query(
            'SELECT * FROM products WHERE id = $1;',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error getting product by ID:', error);
    }
}


export async function getProductsByUserId(userId: number) {
    try {
        const result = await client.query(
            'SELECT * FROM products WHERE user_id = $1;',
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error('Error getting products by user ID:', error);
    }
}



export async function updateProduct(id: number, user_id: number, category_id: number, name: string, description: string, price: number, image_url: string) {
    try {
        const result = await client.query(
            'UPDATE products SET user_id = $1, category_id = $2, name = $3, description = $4, price = $5, image_url = $6 WHERE id = $7 RETURNING *;',
            [user_id, category_id, name, description, price, image_url, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating product:', error);
    }
}


export async function deleteProduct(id: number) {
    try {
        const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *;', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}


// Review CRUD operations
export async function createReview(user_id: number, product_id: number, rating: number, review_text: string) {
    try {
        const result = await client.query(
            'INSERT INTO reviews (user_id, product_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *;',
            [user_id, product_id, rating, review_text]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating review:', error);
    }
}

export async function getReviewById(id: number) {
    try {
        const result = await client.query(
            'SELECT * FROM reviews WHERE id = $1;',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error getting review by ID:', error);
    }
}

export async function updateReview(id: number, user_id: number, product_id: number, rating: number, review_text: string) {
    try {
        const result = await client.query(
            'UPDATE reviews SET user_id = $1, product_id = $2, rating = $3, review_text = $4 WHERE id = $5 RETURNING *;',
            [user_id, product_id, rating, review_text, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating review:', error);
    }
}

export async function deleteReview(id: number) {
    try {
        const result = await client.query(
            'DELETE FROM reviews WHERE id = $1 RETURNING *;',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting review:', error);
    }
}
