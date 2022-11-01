import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from '../../models/category';
import {
  faPenToSquare,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
  editIcon: IconDefinition = faPenToSquare;
  editMode: boolean = false;
  //* component icerisinde yer alan propertyler bizim icin state tutar.
  categories!: Category[];
  selectedCategory!: Category;
  categoryAddForm!: FormGroup;

  //* IoC (Inversion of Control) Container
  //* Dependency Injection
  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryAddForm();
  }

  createCategoryAddForm(): void {
    this.categoryAddForm = this.formBuilder.group({
      name: [
        this.editMode ? this.selectedCategory.name : null,
        Validators.required,
      ],
      description: [
        this.editMode ? this.selectedCategory.description : null,
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        //* Observer Design Pattern
        this.categories = res;
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }

  addCategory(): void {
    const category: Category = {
      ...this.categoryAddForm.value,
    };
    this.categoriesService.add(category).subscribe({
      next: () => {
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

  updateFormAndFindCategory(id: number): void {
    this.editMode = true;
    const foundedCategory: Category[] = this.categories.filter(
      (category: Category) => category.id === id
    );
    [this.selectedCategory] = foundedCategory;
    this.createCategoryAddForm();
  }

  cancelEditing(): void {
    this.editMode = false;
    this.categoryAddForm.reset();
  }

  updateCategory(): void {
    const category: Category = {
      id: this.selectedCategory.id,
      ...this.categoryAddForm.value,
    };
    this.categoriesService.update(category).subscribe({
      next: () => {
        console.info(`Category ${category.id} has updated`);
      },
      error: (err) => {
        console.log(category);
        console.error(err);
      },
      complete: () => {
        this.editMode = false;
        this.categoryAddForm.reset();
        this.getCategories();
      },
    });
  }

  deleteCategory(id: number): void {
    this.categoriesService.delete(id).subscribe({
      next: () => {
        console.info(`Category ${id} has deleted`);
      },
      error: (err) => {
        console.error(err.message);
      },
      complete: () => {
        this.getCategories();
      },
    });
  }

  onSubmit(): void {
    if (this.editMode) {
      this.updateCategory();
      return;
    }
    this.addCategory();
  }
}
