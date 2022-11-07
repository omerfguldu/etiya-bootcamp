import { Service } from './../../models/service';
import { CustomersService } from './../../services/customers.service';
import { CustomerToRegisterModel } from './../../models/customerToRegisterModel';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { IndividualCustomer } from 'src/app/models/individualCustomer';
import { CorporateCustomer } from 'src/app/models/corporateCustomer';
import { ServicesService } from 'src/app/services/services.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Subscriptions } from 'src/app/models/subscriptions';
import { Invoices } from 'src/app/models/invoices';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-customer-overview-form',
  templateUrl: './customer-overview-form.component.html',
  styleUrls: ['./customer-overview-form.component.css'],
})
export class CustomerOverviewFormComponent implements OnInit {
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;
  customer: any;
  services: Service[] = [];
  customerType: boolean = true;
  //true ise individual customer
  //false ise corporate customer

  constructor(
    private customersService: CustomersService,
    private subscriptionsService: SubscriptionsService,
    private invoicesService: InvoicesService
  ) {
    this.customerToRegisterModel$ =
      this.customersService.customerToRegisterModel$;
  }

  ngOnInit(): void {
    this.customerToRegisterModel$.subscribe((res: any) => {
      console.log(res);

      this.customer = res.customer;
      this.customer.nationalIdentity
        ? (this.customerType = true)
        : (this.customerType = false);

      this.services = res.services;
    });
  }

  onSaveCustomer() {
    let customer: Customer = {
      customerNumber: 0,
    };
    this.customerType
      ? (customer.customerNumber = +this.customer.nationalIdentity)
      : (customer.customerNumber = +this.customer.taxNumber);
    console.log(customer);
    this.customersService.addCustomer(customer).subscribe((res: any) => {
      console.log(res);
      if (this.customerType) {
        //indivudial customer add
        const customerToAdd = {
          customerId: res.id,
          ...this.customer,
          nationalIdentity: res.customerNumber,
        };
        this.customersService
          .addIndividualCustomer(customerToAdd)
          .subscribe((res) => {
            this.addServices(res);
            console.log(res);
          });
      } else {
        const customerToAdd = {
          customerId: res.id,
          ...this.customer,
          taxNumber: res.customerNumber,
        };
        this.customersService
          .addCorporateCustomer(customerToAdd)
          .subscribe((res) => {
            this.addServices(res);
            console.log(res);
          });
      }
    });
  }
  addServices(customer: any) {
    this.services.map((service) => {
      console.log(this.customer);

      const subscription: Subscriptions = {
        customerId: customer.customerId,
        serviceId: service.id,
        dateStarted: new Date().toISOString().split('T')[0],
      };
      this.subscriptionsService
        .addSubscription(subscription)
        .subscribe((response) => {
          let date = new Date(response.dateStarted);
          date.setDate(date.getDate() + 28);
          let dateDue = date.toISOString().split('T')[0];
          let invoice: Invoices = {
            subscriptionId: response.id,
            dateCreated: response.dateStarted,
            dateDue: dateDue,
          };
          this.invoicesService.addInvoice(invoice).subscribe((response) => {
            console.log(response);
          });
        });
    });
  }
}
