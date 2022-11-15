import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCircleInfo,
  IconDefinition,
  faFileSignature,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import { CorporateCustomer } from 'src/app/models/corporateCustomer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-corporate-list',
  templateUrl: './corporate-list.component.html',
  styleUrls: ['./corporate-list.component.css'],
})
export class CorporateListComponent implements OnInit {
  updateIcon: IconDefinition = faCircleInfo;
  companyIcon: IconDefinition = faBuilding;
  taxIcon: IconDefinition = faFileSignature;

  corporateCustomers!: CorporateCustomer[];
  searchCompanyName: string = '';
  searchId: string = '';
  searchTax: string = '';

  constructor(
    private router: Router,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.getCorporateCustomers();
  }

  getCorporateCustomers() {
    //* get all corporate customers
    this.customersService.getCorporateCustomers().subscribe({
      next: (res: CorporateCustomer[]) => {
        this.corporateCustomers = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToDetails(id: number) {
    //* get id as parameter and navigate to details page using id
    //* send customerType state to details page with router.
    this.router.navigateByUrl(`${this.router.url}/${id}`, {
      state: { customerType: 'corporate' },
    });
  }

  onReset() {
    this.searchId = '';
    this.searchCompanyName = '';
    this.searchTax = '';
  }
}
