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
    //* INDIVIDUAL VE CORPORATE CUSTOMERLARI GETIREN FONKSIYONLARI CAGIR.
    this.getIndividualCustomers();
    this.getCorporateCustomers();
  }

  getIndividualCustomers() {
    //* INDIVIDUAL CUSTOMERLARI GETIR.
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
    //* CORPORATE CUSTOMERLARI GETIR.
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
    //* SECILI MUSTERININ ID SINI AL VE DETAY SAYFASINA YONLENDIR.
    this.router.navigateByUrl(`${this.router.url}/${id}`);
  }

  onCustomerTypeChange(type: string) {
    //* SELECT INPUTU DEGISTIGINDE LIST EKRANINDA GOZUKEN TEXT'I GUNCELLE.
    //* SECILEN MUSTERI TURUNE AIT BLOGU GOSTER. DIGERINI GIZLE.
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
