export default class CategoryService {
  constructor(logger) {
    this.categories = [];
    this.logger = logger;
  }

  getCategories() {
    return this.categories;
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
}
