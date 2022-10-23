export default class CategoryService {
  constructor(logger) {
    this.categories = [];
    this.logger = logger;
  }

  getCategories(filterCallback) {
    return filterCallback
      ? this.categories.filter(filterCallback)
      : this.categories;
  }

  addCategory(newCategory) {
    this.categories.push(newCategory);
    this.logger.log("New category added: ", newCategory);
  }

  deleteCategory(categoryId) {
    this.categories = this.categories.filter(
      (category) => category.categoryId !== categoryId
    );
    this.logger.log("ID of the deleted category is", categoryId);
  }

  updateCategory(categoryId, updatedData) {
    this.categories = this.categories.map((category) => {
      if (category.categoryId === categoryId) {
        return { ...category, ...updatedData };
      }
      return category;
    });
  }
}
