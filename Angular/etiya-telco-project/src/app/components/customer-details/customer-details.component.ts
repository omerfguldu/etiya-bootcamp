import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IndividualCustomer } from '../../models/individualCustomer';
import { CustomersService } from 'src/app/services/customers.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { ServicesService } from 'src/app/services/services.service';
import { SubscriptionsResponse } from 'src/app/models/subscriptionsResponse';
import { CorporateCustomer } from 'src/app/models/corporateCustomer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  selectedUserID!: number;
  customerType!: string;
  customerSubscriptions: SubscriptionsResponse[] = [];
  individualCustomerDetails!: IndividualCustomer[];
  corporateCustomerDetails!: CorporateCustomer[];

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private subscriptionsService: SubscriptionsService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.selectedUserID = this.route.snapshot.params['id'];
    this.getCustomerSubscriptions(this.selectedUserID);
    this.getIndividualCustomer(this.selectedUserID);
    this.getCorporateCustomer(this.selectedUserID);
  }

  getIndividualCustomer(id: number) {
    this.customersService.getIndividualCustomer(id).subscribe((res) => {
      this.individualCustomerDetails = res;
      if (this.individualCustomerDetails.length > 0) {
        this.customerType = 'individual';
      }
    });
  }

  getCorporateCustomer(id: number) {
    this.customersService.getCorporateCustomer(id).subscribe((res) => {
      this.corporateCustomerDetails = res;
      if (this.corporateCustomerDetails.length > 0) {
        this.customerType = 'corporate';
      }
    });
  }

  getCustomerSubscriptions(id: number) {
    this.subscriptionsService
      .getSubscriptionsWithCustomerId(id)
      .subscribe((response) => {
        this.customerSubscriptions = response;
        this.customerSubscriptions.map((customerSubscription) => {
          this.servicesService
            .getService(customerSubscription.serviceId)
            .subscribe((response) => {
              customerSubscription.serviceName = response.name;
            });
        });
      });
  }
}
