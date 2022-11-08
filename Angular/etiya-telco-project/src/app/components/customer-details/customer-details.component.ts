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

  constructor(
    private route: ActivatedRoute,

    private subscriptionsService: SubscriptionsService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    //* ACTIVATED ROUTE ILE MUSTERI ID'YI YAKALA.
    //* BU ID'YI BASLANGICTA CALISACAK FONKSIYONLARA PARAMETRE OLARAK GEC.
    this.selectedUserID = this.route.snapshot.params['id'];

    this.customerType = history.state.customerType;
    this.getCustomerSubscriptions(this.selectedUserID);
  }

  getCustomerSubscriptions(id: number) {
    //* ILGILI ID'YE AIT SUBSCRIPTIONLARI GETIR.
    //* SUBSCRIPTIONLARI MAP ILE DON.
    //* ILGILI SUBSCRIPTION ID YI GETSERVICE METODUNA GONDER.
    //* BU METODTAN GELEN SERVISIN ADINI SUBSCRIPTION OBJESINE KAYDET.
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
