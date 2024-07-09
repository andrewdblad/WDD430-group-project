
import { createProduct as createProductDB, deleteProduct as deleteProductDB, getProductById as getProductByIdDB, updateProduct as updateProductDB } from "@/app/lib/data";

// Create a product
export async function createProduct(user_id: number, category_id: number, name: string, description: string, price: number, image_url: string) {
  try {
    const product = await createProductDB(user_id, category_id, name, description, price, image_url);
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error; 
  }
}

// Get a product by ID
export async function getProductById(id: number) {
  try {
    const product = await getProductByIdDB(id);
    return product;
  } catch (error) {
    console.error('Error getting product by ID:', error);
    throw error; 
  }
}

// Update a product
export async function updateProduct(id: number, user_id: number, category_id: number, name: string, description: string, price: number, image_url: string) {
  try {
    const updatedProduct = await updateProductDB(id, user_id, category_id, name, description, price, image_url);
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error; 
  }
}

// Delete a product
export async function deleteProduct(id: number) {
  try {
    const deletedProduct = await deleteProductDB(id);
    return deletedProduct;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; 
  }
}

