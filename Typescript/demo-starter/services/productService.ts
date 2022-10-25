import { Product } from "../models/productModel";
export class ProductService {
  private products: Product[] = [];
  getAll(): Product[] {
    return this.products;
  }

  getById(productId: number): Product | undefined {
    return this.products.find((product) => product.productId === productId);
  }

  getProductsByCategoryId(categoryId: number): Product[] {
    return this.products.filter(
      (product) => product.productCategoryId === categoryId
    );
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter(
      (product) => product.productId !== productId
    );
    return `${productId} product deleted`;
  }

  updateProduct(productId: number, updatedData: any) {
    this.products = this.products.map((product) => {
      if (productId === product.productId) {
        return { ...product, ...updatedData };
      }
      return product;
    });
  }
}
