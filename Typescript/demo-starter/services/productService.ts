import { Product } from "../models/product";
export class ProductService {
  private products: Product[] = [];
  getAll(): Product[] {
    return this.products;
  }

  getById(productId: number): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }

  getProductsByCategoryId(categoryId: number): Product[] {
    return this.products.filter((product) => product.categoryId === categoryId);
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter((product) => product.id !== productId);
    return `${productId} product deleted`;
  }

  updateProduct(productId: number, updatedData: any) {
    this.products = this.products.map((product) => {
      if (productId === product.id) {
        return { ...product, ...updatedData };
      }
      return product;
    });
  }
}
