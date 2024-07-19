import { sql } from '@vercel/postgres';
import { bcrypt } from 'bcryptjs';
require('dotenv').config();


// User CRUD operations
export async function createUser(username: string, email: string, password: string, profile_description: string) {
  try {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await sql`
      INSERT INTO users (username, email, password_hash, profile_description) 
      VALUES (${username}, ${email}, ${password_hash}, ${profile_description})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

export async function getUserById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM users WHERE id = ${id};
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error getting user by ID:', error);
  }
}

export async function updateUser(id: number, username: string, email: string, password_hash: string, profile_description: string) {
  try {
    const result = await sql`
      UPDATE users 
      SET username = ${username}, email = ${email}, password_hash = ${password_hash}, profile_description = ${profile_description}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

export async function deleteUser(id: number) {
  try {
    const result = await sql`
      DELETE FROM users WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

// Category CRUD operations
export async function createCategory(name: string) {
  try {
    const result = await sql`
      INSERT INTO categories (name) 
      VALUES (${name})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating category:', error);
  }
}

export async function getCategoryById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM categories WHERE id = ${id};
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error getting category by ID:', error);
  }
}

export async function getUserByEmail(email: string) {
  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;
    return result;
  } catch (error) {
    console.error('Error getting user by email:', error);
  }
}


export async function updateCategory(id: number, name: string) {
  try {
    const result = await sql`
      UPDATE categories 
      SET name = ${name}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error updating category:', error);
  }
}

export async function deleteCategory(id: number) {
  try {
    const result = await sql`
      DELETE FROM categories WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting category:', error);
  }
}

// Product CRUD operations
export async function createProduct(user_id: number, category_id: number, name: string, description: string, price: number, image_url: string) {
  try {
    const result = await sql`
      INSERT INTO products (user_id, category_id, name, description, price, image_url) 
      VALUES (${user_id}, ${category_id}, ${name}, ${description}, ${price}, ${image_url})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

export async function getProductById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM products WHERE id = ${id};
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error getting product by ID:', error);
  }
}

export async function updateProduct(id: number, user_id: number, category_id: number, name: string, description: string, price: number, image_url: string) {
  try {
    const result = await sql`
      UPDATE products 
      SET user_id = ${user_id}, category_id = ${category_id}, name = ${name}, description = ${description}, price = ${price}, image_url = ${image_url}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

export async function deleteProduct(id: number) {
  try {
    const result = await sql`
      DELETE FROM products WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Review CRUD operations
export async function createReview(user_id: number, product_id: number, rating: number, review_text: string) {
  try {
    const result = await sql`
      INSERT INTO reviews (user_id, product_id, rating, review_text) 
      VALUES (${user_id}, ${product_id}, ${rating}, ${review_text})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating review:', error);
  }
}

export async function getReviewById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM reviews WHERE id = ${id};
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error getting review by ID:', error);
  }
}

export async function updateReview(id: number, user_id: number, product_id: number, rating: number, review_text: string) {
  try {
    const result = await sql`
      UPDATE reviews 
      SET user_id = ${user_id}, product_id = ${product_id}, rating = ${rating}, review_text = ${review_text}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error updating review:', error);
  }
}

export async function deleteReview(id: number) {
  try {
    const result = await sql`
      DELETE FROM reviews WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting review:', error);
  }
}