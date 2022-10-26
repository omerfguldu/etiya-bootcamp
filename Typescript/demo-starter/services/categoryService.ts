import { Category } from "../models/category";
export class CategoryService {
  private categories: Category[] = [];
  getAll(): Category[] {
    return this.categories;
  }

  getById(categoryId: number): Category | undefined {
    return this.categories.find((category) => category.id === categoryId);
  }

  addCategory(category: Category) {
    this.categories.push(category);
  }

  deleteCategory(categoryId: number) {
    this.categories = this.categories.filter(
      (category) => category.id !== categoryId
    );
    return `${categoryId} category deleted`;
  }

  updateCategory(updateCategory: Category) {
    let foundCategoryIndex = this.categories.findIndex(
      (category) => category.id === updateCategory.id
    );
    this.categories[foundCategoryIndex] = updateCategory;
  }
}
