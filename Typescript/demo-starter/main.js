// Product - Category
// Servisler - Tipleri
// CRUD operasyonlari Create Read Update Delete
// getAll, getById, Add, Delete, Update
// Butun servisleri ve butun aksiyonlari main.ts'de test et.
import { CategoryService } from "./services/categoryService.js";
import { ProductService } from "./services/productService.js";
var categoryService = new CategoryService();
var productService = new ProductService();
categoryService.addCategory({ categoryId: 1, categoryName: "Pantolon" });
categoryService.addCategory({ categoryId: 2, categoryName: "Kazak" });
categoryService.addCategory({ categoryId: 3, categoryName: "Kadin Giyim" });
categoryService.addCategory({ categoryId: 4, categoryName: "Erkek Giyim" });
console.log("-------------------- getAllCategories Log --------------------");
console.log(categoryService.getAll());
console.log("-------------------- getCategoryById Log --------------------");
var categoryFound = categoryService.getById(2);
console.log(categoryFound ? categoryFound : "Kategori bulunamadi");
console.log("-------------------- deleteCategory Log --------------------");
categoryService.deleteCategory(3);
console.log(categoryService.getAll());
console.log("-------------------- updateCategory Log --------------------");
categoryService.updateCategory({ categoryId: 4, categoryName: "Gomlek" });
console.log(categoryService.getAll());
console.log("-------------------- getAllProducts Log --------------------");
productService.addProduct({
    productId: 1,
    productName: "Deri Ayakkabi",
    productPrice: 500,
    productCategory: "Ayakkabi",
    productSeller: "Dockers",
    productCategoryId: 5
});
productService.addProduct({
    productId: 2,
    productName: "Kareli Gomlek",
    productPrice: 200,
    productCategory: "Gomlek",
    productSeller: "Pull&Bear",
    productCategoryId: 4
});
productService.addProduct({
    productId: 3,
    productName: "Kot Pantolon",
    productPrice: 300,
    productCategory: "Pantolon",
    productSeller: "Mavi",
    productCategoryId: 1
});
productService.addProduct({
    productId: 4,
    productName: "Kumas Pantolon",
    productPrice: 200,
    productCategory: "Pantolon",
    productSeller: "LCW",
    productCategoryId: 1
});
console.log(productService.getAll());
console.log("-------------------- getProductById Log --------------------");
var productFound = productService.getById(5);
console.log(productFound ? productFound : "Urun bulunamadi");
productFound = productService.getById(3);
console.log(productFound ? productFound : "Urun bulunamadi");
console.log("-------------------- deleteProduct Log --------------------");
productService.deleteProduct(1);
console.log(productService.getAll());
console.log("-------------------- updateProduct Log --------------------");
productService.updateProduct(2, { productPrice: 400 });
console.log(productService.getAll());
console.log("-------------------- getProductsByCategoryId Log --------------------");
console.log(productService.getProductsByCategoryId(1));
