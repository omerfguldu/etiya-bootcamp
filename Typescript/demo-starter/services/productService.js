var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ProductService = /** @class */ (function () {
    function ProductService() {
        this.products = [];
    }
    ProductService.prototype.getAll = function () {
        return this.products;
    };
    ProductService.prototype.getById = function (productId) {
        return this.products.find(function (product) { return product.productId === productId; });
    };
    ProductService.prototype.getProductsByCategoryId = function (categoryId) {
        return this.products.filter(function (product) { return product.productCategoryId === categoryId; });
    };
    ProductService.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    ProductService.prototype.deleteProduct = function (productId) {
        this.products = this.products.filter(function (product) { return product.productId !== productId; });
        return "".concat(productId, " product deleted");
    };
    ProductService.prototype.updateProduct = function (productId, updatedData) {
        this.products = this.products.map(function (product) {
            if (productId === product.productId) {
                return __assign(__assign({}, product), updatedData);
            }
            return product;
        });
    };
    return ProductService;
}());
export { ProductService };
