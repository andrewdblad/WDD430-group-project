-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);
-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    category_id INT REFERENCES categories(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id),
    rating INT CHECK (
        rating >= 1
        AND rating <= 5
    ),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Indexes for performance
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
-- Insert a basic user
INSERT INTO users (
        username,
        email,
        password_hash,
        profile_description
    )
VALUES (
        'basic_user',
        'basic_user@example.com',
        'hashed_password',
        'This is a basic user profile description.'
    );