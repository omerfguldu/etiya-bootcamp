import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  IconDefinition,
  faPenToSquare,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  updateIcon: IconDefinition = faPenToSquare;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToDetails() {
    this.router.navigateByUrl('homepage/customers/list/1');
  }
}
