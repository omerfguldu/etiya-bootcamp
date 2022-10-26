// Product - Category
// Servisler - Tipleri
// CRUD operasyonlari Create Read Update Delete
// getAll, getById, Add, Delete, Update
// Butun servisleri ve butun aksiyonlari main.ts'de test et.
import { CategoryService } from "./services/categoryService.js";
import { ProductService } from "./services/productService.js";
var categoryService = new CategoryService();
var productService = new ProductService();
categoryService.addCategory({ id: 1, name: "Pantolon" });
categoryService.addCategory({ id: 2, name: "Kazak" });
categoryService.addCategory({ id: 3, name: "Kadin Giyim" });
categoryService.addCategory({ id: 4, name: "Erkek Giyim" });
console.log("-------------------- getAllCategories Log --------------------");
console.log(categoryService.getAll());
console.log("-------------------- getCategoryById Log --------------------");
var categoryFound = categoryService.getById(2);
console.log(categoryFound ? categoryFound : "Kategori bulunamadi");
console.log("-------------------- deleteCategory Log --------------------");
categoryService.deleteCategory(3);
console.log(categoryService.getAll());
console.log("-------------------- updateCategory Log --------------------");
categoryService.updateCategory({ id: 4, name: "Gomlek" });
console.log(categoryService.getAll());
console.log("-------------------- getAllProducts Log --------------------");
productService.addProduct({
    id: 1,
    name: "Deri Ayakkabi",
    price: 500,
    category: "Ayakkabi",
    seller: "Dockers",
    categoryId: 5
});
productService.addProduct({
    id: 2,
    name: "Kareli Gomlek",
    price: 200,
    category: "Gomlek",
    seller: "Pull&Bear",
    categoryId: 4
});
productService.addProduct({
    id: 3,
    name: "Kot Pantolon",
    price: 300,
    category: "Pantolon",
    seller: "Mavi",
    categoryId: 1
});
productService.addProduct({
    id: 4,
    name: "Kumas Pantolon",
    price: 200,
    category: "Pantolon",
    seller: "LCW",
    categoryId: 1
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
