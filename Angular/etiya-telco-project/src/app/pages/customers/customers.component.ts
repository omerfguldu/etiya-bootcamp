import { Component, OnInit } from '@angular/core';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  plusIcon: IconDefinition = faPlus;
  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.customersService.deleteNewCustomerCatalogsStoreState();
    this.customersService.deleteNewCustomerInfoStoreState();
    this.customersService.deleteNewCustomerServicesStoreState();
  }
}
