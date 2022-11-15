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
    this.customerOverviewSubs.push(
      this.newCustomerInfo$.subscribe({
        next: (res: IndividualCustomer | CorporateCustomer | null) => {
          if (res) {
            if ((res as IndividualCustomer).firstName) {
              this.individualInfo = res as IndividualCustomer;
              this.isIndividual = true;
            } else {
              this.corporateInfo = res as CorporateCustomer;
              this.isIndividual = false;
            }
          }
        },
        error: (err) => this.toastr.error(err.message),
      })
    );

    //* OVERVIEW COMPONENT YUKLENDIGINDE STOREDAKI KAYITLI
    //* MUSTERININ BILGILERINI AL VE TURUNU(CORPORATE-INDIVIDUAL) TESPIT ET.
    //* STORE'DA KAYITLI SERVISLERI AL.

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
    //* SAVE BUTONUNA BASILDIGINDA YENI BIR CUSTOMER OLUSTUR
    //* CORPORATE TURUNDE ISE CUSTOMER NUMBER = TAXNUMBER OLSUN.
    //* INDIVIDUAL TURUNDE ISE CUSTOMER NUMBER = NATIONAL IDENTITY OLSUN.
    let customer: Customer = {
      customerNumber: 0,
    };
    this.isIndividual
      ? (customer.customerNumber = +this.individualInfo.nationalIdentity)
      : (customer.customerNumber = +this.corporateInfo.taxNumber);
    this.customerOverviewSubs.push(
      this.customersService.addCustomer(customer).subscribe({
        next: (res: any) => {
          console.log(res);
          if (this.isIndividual) {
            //* INDIVIDUAL CUSTOMER TURUNDE ISE CALIS VE INDIVIDUAL CUSTOMER'A KAYIT EKLE.
            const customerToAdd = {
              ...this.individualInfo,
              customerId: res.id,
              nationalIdentity: res.customerNumber,
            };
            this.customersService
              .addIndividualCustomer(customerToAdd as IndividualCustomer)
              .subscribe({
                next: (res: IndividualCustomer) => {
                  //* ADD SERVICES FONKSIYONUNA PARAMETRE OLARAK RESPONSE GONDER.
                  this.addServices(res);
                },
                error: (err) => this.toastr.error(err.message),
              });
          } else {
            //* CORPORATE CUSTOMER TURUNDE ISE CALIS VE CORPORATE CUSTOMER'A KAYIT EKLE.
            const customerToAdd = {
              ...this.corporateInfo,
              customerId: res.id,
              taxNumber: res.customerNumber,
            };
            this.customersService
              .addCorporateCustomer(customerToAdd as CorporateCustomer)
              .subscribe({
                next: (res: CorporateCustomer) => {
                  //* ADD SERVICES FONKSIYONUNA PARAMETRE OLARAK RESPONSE GONDER.
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
    //* MUSTERI ICIN SECILEN SERVISLERI MAP ILE GEZ.
    //* HER SERVIS ICIN SUBSCRIPTION OLUSTUR VE DB'YE EKLE.
    this.catalogs.map((catalog) => {
      const subscription: Subscriptions = {
        customerId: customer.customerId,
        serviceId: catalog.serviceId,
        catalogId: catalog.id,
        dateStarted: new Date().toISOString().split('T')[0],
      };
      this.subscriptionsService.addSubscription(subscription).subscribe({
        //* SUBSCRIPTION EKLENDIKTEN SONRA ILGILI SUBSCRIPTIONA AIT INVOICE OLUSTUR
        //* OLUSAN INVOICE OBJESINI INVOICES SERVISI ILE DB'YE EKLE.
        next: (res: Subscriptions) => {
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
          this.customersService.deleteNewCustomerCatalogsStoreState();
          this.customersService.deleteNewCustomerInfoStoreState();
          this.customersService.deleteNewCustomerServicesStoreState();
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
