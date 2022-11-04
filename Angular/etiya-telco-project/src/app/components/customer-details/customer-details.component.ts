import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { ServicesService } from 'src/app/services/services.service';
import { SubscriptionsResponse } from 'src/app/models/subscriptionsResponse';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  selectedUserID!: number;
  customerSubscriptions: SubscriptionsResponse[] = [];
  customerDetails!: Customer[];

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private http: HttpClient,
    private subscriptionsService: SubscriptionsService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.selectedUserID = this.route.snapshot.params['id'];
    this.getCustomerSubscriptions(this.selectedUserID);
    this.getCustomer(this.selectedUserID);
  }

  getCustomer(id: number) {
    this.customersService.getCustomer(id).subscribe((res) => {
      this.customerDetails = res;
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
  // getCustomerSubscriptions(id: number) {
  //   this.http
  //     .get(`http://localhost:3000/subscriptions?customerId=${id}`)
  //     .subscribe((res) => {
  //       this.customerSubscriptions = res;
  //     });
  // }
}
