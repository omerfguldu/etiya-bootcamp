import Category from "./model/CategoryModel.js";
import CategoryService from "./services/CategoryService.js";
import { CategoryLogger } from "./services/LoggerService.js";

const categoryProgramming = new Category(1, "Programming");
const categoryEnglish = new Category(2, "English");

const categoryLogger = new CategoryLogger();
const categoryService = new CategoryService(categoryLogger);

categoryService.addCategory(categoryProgramming);
categoryService.addCategory(categoryEnglish);

console.log(categoryService.getCategories());
categoryService.deleteCategory(categoryEnglish.categoryId);
console.log(categoryService.getCategories());
