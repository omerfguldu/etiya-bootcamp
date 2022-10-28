import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
  categories: string[] = [];
  language: string = 'tr';

  constructor() {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories = ['Gi', 'Ayakkabi', 'Parfum', 'Yemek'];
  }
}
