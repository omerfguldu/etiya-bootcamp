import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
  //* component icerisinde yer alan propertyler bizim icin state tutar.
  categories!: Category[];
  language: string = 'tr';

  categoryIdToDelete!: number;
  categoryAddForm!: FormGroup;

  //* IoC (Inversion of Control) Container
  //* Dependency Injection
  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories();
    // this.categoriesService
    //   .add({ id: 9, name: 'Name 9', description: 'Description 9' })
    //   .subscribe();
    // this.categoriesService.delete(9).subscribe();
    this.createCategoryAddForm();
  }

  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      //* Observer Design Pattern
      this.categories = res;
    });
  }

  changeCategoryIdToDelete(event: any) {
    this.categoryIdToDelete = event.target.value;
  }

  deleteCategory() {
    this.categoriesService.delete(this.categoryIdToDelete).subscribe((res) => {
      this.categoryIdToDelete = 0;
      this.getCategories();
    });
  }

  addCategory() {
    const category: Category = {
      ...this.categoryAddForm.value,
    };
    this.categoriesService.add(category).subscribe({
      next: (res) => {
        console.info(`Category ${category.name} has added`);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.categoryAddForm.reset();
        this.getCategories();
      },
    });
  }
}
