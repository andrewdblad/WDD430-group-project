
import { createCategory as createCategoryDB, deleteCategory as deleteCategoryDB, getCategoryById as getCategoryByIdDB, updateCategory as updateCategoryDB } from "@/app/lib/data";

// Create a category
export async function createCategory(name: string) {
  try {
    const category = await createCategoryDB(name);
    return category;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error; 
  }
}

// Get a category by ID
export async function getCategoryById(id: number) {
  try {
    const category = await getCategoryByIdDB(id);
    return category;
  } catch (error) {
    console.error('Error getting category by ID:', error);
    throw error; 
  }
}

// Update a category
export async function updateCategory(id: number, name: string) {
  try {
    const updatedCategory = await updateCategoryDB(id, name);
    return updatedCategory;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error; 
  }
}

// Delete a category
export async function deleteCategory(id: number) {
  try {
    const deletedCategory = await deleteCategoryDB(id);
    return deletedCategory;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error; 
  }
}
