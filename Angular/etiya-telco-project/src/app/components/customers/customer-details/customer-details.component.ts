import { Catalog } from './../../../models/catalog';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { ServicesService } from 'src/app/services/services.service';
import { SubscriptionsResponse } from 'src/app/models/subscriptionsResponse';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  selectedUserID!: number;
  customerType!: string;
  customerSubscriptions: SubscriptionsResponse[] = [];

  constructor(
    private route: ActivatedRoute,

    private subscriptionsService: SubscriptionsService,
    private servicesService: ServicesService,
    private catalogsService: CatalogsService
  ) {}

  ngOnInit(): void {
    //* get customer id using ActivatedRoute
    //* call getCustomersSubscriptions func with this id
    this.selectedUserID = this.route.snapshot.params['id'];
    this.customerType = history.state.customerType;
    this.getCustomerSubscriptions(this.selectedUserID);
  }

  getCustomerSubscriptions(id: number) {
    //* get customer subscriptions with id
    this.subscriptionsService
      .getSubscriptionsWithCustomerId(id)
      .subscribe((res: SubscriptionsResponse[]) => {
        this.customerSubscriptions = res;

        //* map subscriptions array
        this.customerSubscriptions.map((customerSubscription) => {
          //* for each subscription, get its relative services and catalogs
          this.servicesService
            .getService(customerSubscription.serviceId)
            .subscribe((res: Service) => {
              customerSubscription.serviceName = res.name;
            });
          this.catalogsService
            .getCatalog(customerSubscription.catalogId)
            .subscribe((res: Catalog) => {
              customerSubscription.catalogName = res.name;
              customerSubscription.catalogPrice = res.price;
            });
        });
      });
  }
}
