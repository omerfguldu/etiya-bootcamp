import { CorporateCustomer } from './../../../models/corporateCustomer';
import { IndividualCustomer } from './../../../models/individualCustomer';
import { ServicesService } from './../../../services/services.service';
import { Catalog } from './../../../models/catalog';
import {
  IconDefinition,
  faFileSignature,
  faBuilding,
  faUserPen,
  faCalendarDays,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service } from './../../../models/service';
import { CustomersService } from './../../../services/customers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Subscriptions } from 'src/app/models/subscriptions';
import { Invoices } from 'src/app/models/invoices';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/store/app.state';

@Component({
  selector: 'app-customer-overview-form',
  templateUrl: './customer-overview-form.component.html',
  styleUrls: ['./customer-overview-form.component.css'],
})
export class CustomerOverviewFormComponent implements OnInit, OnDestroy {
  nameIcon: IconDefinition = faUserPen;
  dateIcon: IconDefinition = faCalendarDays;
  idIcon: IconDefinition = faIdCard;
  companyIcon: IconDefinition = faBuilding;
  taxIcon: IconDefinition = faFileSignature;

  customerOverviewSubs: Subscription[] = [];
  newCustomerInfo$!: Observable<IndividualCustomer | CorporateCustomer | null>;
  newCustomerCatalogs$!: Observable<Catalog[] | null>;
  newCustomerServices$!: Observable<Service[] | null>;
  individualInfo!: IndividualCustomer;
  corporateInfo!: CorporateCustomer;
  services: Service[] = [];
  catalogs: Catalog[] = [];
  isIndividual: boolean = true;

  constructor(
    private servicesService: ServicesService,
    private customersService: CustomersService,
    private subscriptionsService: SubscriptionsService,
    private invoicesService: InvoicesService,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<AppStoreState>
  ) {
    this.newCustomerInfo$ = this.store.select((s) => s.newCustomer.info);
    this.newCustomerServices$ = this.store.select(
      (s) => s.newCustomer.services
    );
    this.newCustomerCatalogs$ = this.store.select(
      (s) => s.newCustomer.catalogs
    );
  }

  ngOnInit(): void {
    //* get customer values from store
    this.customerOverviewSubs.push(
      this.newCustomerInfo$.subscribe({
        next: (res: IndividualCustomer | CorporateCustomer | null) => {
          if (res) {
            //* if value has firstName, assign values to individualInfo
            if ((res as IndividualCustomer).firstName) {
              this.individualInfo = res as IndividualCustomer;
              this.isIndividual = true;
            }
            //* if value doesn't have firstName, assign values to corporateInfo
            else {
              this.corporateInfo = res as CorporateCustomer;
              this.isIndividual = false;
            }
          }
        },
        error: (err) => this.toastr.error(err.message),
      })
    );

    //* get customer catalog values from store
    //* map catalogs and get service for each catalog
    this.customerOverviewSubs.push(
      this.newCustomerCatalogs$.subscribe({
        next: (res: Catalog[] | null) => {
          if (res) this.catalogs = res;
          this.catalogs.map((catalog) => {
            this.servicesService.getService(catalog.serviceId).subscribe({
              next: (res: Service) => {
                this.services.push(res);
              },
              error: (err) => this.toastr.error(err.message),
            });
          });
        },
        error: (err) => this.toastr.error(err.message),
      })
    );
  }

  onSaveCustomer() {
    //* create a new customer
    let customer: Customer = {
      customerNumber: 0,
    };
    //* if customer is individual give its nationalIdentity as its customerNumber
    //* if customer is corporate give its taxNumber as its customerNumber
    this.isIndividual
      ? (customer.customerNumber = +this.individualInfo.nationalIdentity)
      : (customer.customerNumber = +this.corporateInfo.taxNumber);
    this.customerOverviewSubs.push(
      this.customersService.addCustomer(customer).subscribe({
        next: (res: Customer) => {
          if (this.isIndividual) {
            //* if customer equals to individual create new customer variable
            const customerToAdd = {
              ...this.individualInfo,
              customerId: res.id,
              nationalIdentity: res.customerNumber,
            };
            //* add this customer to individual customers
            this.customersService
              .addIndividualCustomer(customerToAdd as IndividualCustomer)
              .subscribe({
                next: (res: IndividualCustomer) => {
                  //* send the new customer value that comes as a response, to addServices function
                  this.addServices(res);
                },
                error: (err) => this.toastr.error(err.message),
              });
          } else {
            //* if customer equals to corporate create new customer variable
            const customerToAdd = {
              ...this.corporateInfo,
              customerId: res.id,
              taxNumber: res.customerNumber,
            };
            //* add this customer to corporate customers
            this.customersService
              .addCorporateCustomer(customerToAdd as CorporateCustomer)
              .subscribe({
                next: (res: CorporateCustomer) => {
                  //* send the new customer value that comes as a response, to addServices function
                  this.addServices(res);
                },
                error: (err) => this.toastr.error(err.message),
              });
          }
        },
        error: (err) => this.toastr.error(err.message),
      })
    );
  }

  addServices(customer: IndividualCustomer | CorporateCustomer) {
    //* map the catalogs array
    this.catalogs.map((catalog) => {
      //* create new subscription object
      const subscription: Subscriptions = {
        customerId: customer.customerId,
        serviceId: catalog.serviceId,
        catalogId: catalog.id,
        dateStarted: new Date().toISOString().split('T')[0],
      };
      //* add this subscription object to database
      this.subscriptionsService.addSubscription(subscription).subscribe({
        next: (res: Subscriptions) => {
          //* create invoices using new subscription
          let date = new Date(res.dateStarted);
          date.setDate(date.getDate() + 28);
          let dateDue = date.toISOString().split('T')[0];
          let invoice: Invoices = {
            subscriptionId: res.id,
            dateCreated: res.dateStarted,
            dateDue: dateDue,
          };
          this.invoicesService.addInvoice(invoice).subscribe();
        },
        error: () => {
          this.toastr.error('Something went wrong');
        },
        complete: () => {
          this.customersService.deleteNewCustomerStoreStates();
          this.router.navigateByUrl('/homepage/customers/list');
        },
      });
    });
  }

  onBack() {
    this.router.navigateByUrl('/homepage/newcustomer/services');
  }

  ngOnDestroy(): void {
    this.customerOverviewSubs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
