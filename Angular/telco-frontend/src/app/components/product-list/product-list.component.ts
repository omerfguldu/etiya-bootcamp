import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productInputValue: string;
  products: string[] = [];

  constructor() {
    this.fillProducts();
  }

  fillProducts(): void {
    this.products = ['Product 1', 'Product 2', 'Product 3'];
  }

  onAddProduct(): void {
    this.products.push(this.productInputValue);
    this.productInputValue = '';
  }

  onDeleteProduct(productIndex: number): void {
    this.products = this.products.filter(
      (product, index) => index !== productIndex
    );
  }

  ngOnInit(): void {}
}
