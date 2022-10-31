import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from '../../models/category';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
  editIcon = faPenToSquare;
  editMode = false;
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

  createCategoryAddForm() {
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

  getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      //* Observer Design Pattern
      this.categories = res;
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

  updateFormAndFindCategory(id: number) {
    this.editMode = true;
    const foundedCategory = this.categories.filter(
      (category) => category.id === id
    );
    [this.selectedCategory] = foundedCategory;
    this.createCategoryAddForm();
  }

  cancelEditing() {
    this.editMode = false;
    this.categoryAddForm.reset();
  }

  updateCategory() {
    const category: Category = {
      id: this.selectedCategory.id,
      ...this.categoryAddForm.value,
    };
    this.categoriesService.update(category).subscribe({
      next: (res) => {
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

  deleteCategory(id: number) {
    this.categoriesService.delete(id).subscribe((res) => {
      this.getCategories();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.updateCategory();
      return;
    }
    this.addCategory();
  }
}
