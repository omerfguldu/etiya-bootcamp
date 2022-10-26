var CategoryService = /** @class */ (function () {
    function CategoryService() {
        this.categories = [];
    }
    CategoryService.prototype.getAll = function () {
        return this.categories;
    };
    CategoryService.prototype.getById = function (categoryId) {
        return this.categories.find(function (category) { return category.id === categoryId; });
    };
    CategoryService.prototype.addCategory = function (category) {
        this.categories.push(category);
    };
    CategoryService.prototype.deleteCategory = function (categoryId) {
        this.categories = this.categories.filter(function (category) { return category.id !== categoryId; });
        return "".concat(categoryId, " category deleted");
    };
    CategoryService.prototype.updateCategory = function (updateCategory) {
        var foundCategoryIndex = this.categories.findIndex(function (category) { return category.id === updateCategory.id; });
        this.categories[foundCategoryIndex] = updateCategory;
    };
    return CategoryService;
}());
export { CategoryService };
