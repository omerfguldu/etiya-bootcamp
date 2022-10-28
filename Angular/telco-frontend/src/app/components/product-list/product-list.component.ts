import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: string[] = [];
  productForm: FormGroup;

  constructor() {
    this.fillProducts();
  }

  createProductForm(): void {
    this.productForm = new FormGroup({
      productData: new FormGroup({
        productName: new FormControl(null, Validators.required),
      }),
    });
  }

  fillProducts(): void {
    this.products = ['Product 1', 'Product 2', 'Product 3'];
  }

  onSubmit(): void {
    const productValue: string = this.productForm.get(
      'productData.productName'
    ).value;
    this.addProduct(productValue);
    this.productForm.reset();
  }

  addProduct(value: string): void {
    this.products.push(value);
  }

  onDeleteProduct(productIndex: number): void {
    this.products = this.products.filter(
      (product, index) => index !== productIndex
    );
  }

  ngOnInit(): void {
    this.createProductForm();
  }
}
