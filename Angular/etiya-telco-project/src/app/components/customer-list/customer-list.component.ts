import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  IconDefinition,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { IndividualCustomer } from 'src/app/models/individualCustomer';
import { CustomersService } from 'src/app/services/customers.service';
import { CorporateCustomer } from 'src/app/models/corporateCustomer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  updateIcon: IconDefinition = faCircleInfo;
  individualCustomers!: IndividualCustomer[];
  corporateCustomers!: CorporateCustomer[];
  showIndividualCustomers: boolean = true;
  showCorporateCustomers: boolean = false;
  customerTypeText: string = 'Individual';
  customerType: string = 'Individual Customers';

  searchName: string = '';
  searchSurName: string = '';
  searchCompanyName: string = '';
  searchId: string = '';
  searchTax: string = '';
  searchDate: Date = new Date(1970, 1, 1);
  constructor(
    private router: Router,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.getIndividualCustomers();
    this.getCorporateCustomers();
  }

  getIndividualCustomers() {
    this.customersService.getIndividualCustomers().subscribe({
      next: (response) => {
        this.individualCustomers = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCorporateCustomers() {
    this.customersService.getCorporateCustomers().subscribe({
      next: (response) => {
        this.corporateCustomers = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToDetails(id: number) {
    this.router.navigateByUrl(`${this.router.url}/${id}`);
  }

  onCustomerTypeChange(type: string) {
    if (type === 'Individual Customers') {
      this.customerTypeText = 'Individual';
      this.showIndividualCustomers = true;
      this.showCorporateCustomers = false;
    } else {
      this.customerTypeText = 'Corporate';
      this.showCorporateCustomers = true;
      this.showIndividualCustomers = false;
    }
  }
}
