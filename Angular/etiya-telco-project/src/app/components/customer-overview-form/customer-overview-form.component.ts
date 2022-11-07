import { Service } from './../../models/service';
import { CustomersService } from './../../services/customers.service';
import { CustomerToRegisterModel } from './../../models/customerToRegisterModel';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-overview-form',
  templateUrl: './customer-overview-form.component.html',
  styleUrls: ['./customer-overview-form.component.css'],
})
export class CustomerOverviewFormComponent implements OnInit {
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;
  customer: any;
  services: Service[] = [];

  constructor(private customersService: CustomersService) {
    this.customerToRegisterModel$ =
      this.customersService.customerToRegisterModel$;
  }

  ngOnInit(): void {
    this.customerToRegisterModel$.subscribe((res: any) => {
      this.customer = res.customer;
      this.services = res.services;
    });
  }

  onSaveCustomer() {
    this.customersService
      .addCustomer({
        customerNumber: 123123,
      })
      .subscribe((res: any) => {
        console.log(res);
        const customerToAdd = {
          id: res.id,
          customerId: res.id,
          ...this.customer,
          nationalIdentity: +this.customer.nationalIdentity,
        };
        this.customersService
          .addIndividualCustomer(customerToAdd)
          .subscribe((res) => {
            console.log(res);
          });
      });
  }
}
