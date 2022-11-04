import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  IconDefinition,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  updateIcon: IconDefinition = faCircleInfo;
  customers!: Customer[];

  constructor(
    private router: Router,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customersService.getCustomers().subscribe({
      next: (response) => {
        this.customers = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToDetails(id: number) {
    this.router.navigateByUrl(`${this.router.url}/${id}`);
  }
}
