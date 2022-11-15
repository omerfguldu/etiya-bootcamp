import { ToastrService } from 'ngx-toastr';
import { Catalog } from 'src/app/models/catalog';
import { AppStoreState } from './../../../store/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Service } from 'src/app/models/service';
import { CustomersService } from 'src/app/services/customers.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-customer-services-form',
  templateUrl: './customer-services-form.component.html',
  styleUrls: ['./customer-services-form.component.css'],
})
export class CustomerServicesFormComponent implements OnInit, OnDestroy {
  customerServicesSubs: Subscription[] = [];
  services: Service[] = [];
  servicesSelectedStatus: boolean[] = [];
  selectedServices!: Service[];
  newCustomerServices$!: Observable<Service[] | null>;
  newCustomerCatalogs$!: Observable<Catalog[] | null>;
  newCatalogs: Catalog[] = [];

  constructor(
    private servicesService: ServicesService,
    private renderer: Renderer2,
    private store: Store<AppStoreState>,
    private customersService: CustomersService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.newCustomerServices$ = this.store.select(
      (s) => s.newCustomer.services
    );
    this.newCustomerCatalogs$ = this.store.select(
      (s) => s.newCustomer.catalogs
    );
  }

  ngOnInit(): void {
    this.getServices();
    //* if there is stored services assign them to selectedServices array
    this.customerServicesSubs.push(
      this.newCustomerServices$.subscribe({
        next: (res: Service[] | null) => {
          res ? (this.selectedServices = res) : (this.selectedServices = []);
        },
      })
    );
  }

  fillServiceStatus() {
    //* initially there is no selected service
    //* create an array as length of the services and push false for each service
    this.services.forEach((service) => {
      this.servicesSelectedStatus[service.id] = false;
    });
  }

  getServices() {
    //* get services
    this.servicesService.getServices().subscribe({
      next: (res: Service[]) => {
        this.services = res;
        this.fillServiceStatus();
        //* if there is service in store assign true for them
        if (this.selectedServices.length > 0) {
          this.selectedServices.forEach((service) => {
            this.servicesSelectedStatus[service.id] = true;
          });
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  onServiceClick(service: Service, index: number, event: Event) {
    //* if selected service's status equals to false, set it to true and add 'selected' class
    if (this.servicesSelectedStatus[service.id] === false) {
      this.servicesSelectedStatus[service.id] = true;
      this.renderer.addClass(event.target, 'selected');
      this.selectedServices = [...this.selectedServices, this.services[index]];
    }
    //* if selected service's status equals to true, set it to false and remove 'selected' class
    else {
      this.servicesSelectedStatus[service.id] = false;
      this.renderer.removeClass(event.target, 'selected');
      this.selectedServices = this.selectedServices.filter(
        (srv) => srv.id !== service.id
      );
    }
  }

  onNext() {
    //* save customer services to store
    this.customersService.setNewCustomerServicesStoreState(
      this.selectedServices
    );
    //* when this page load, if there is catalogs in store, compare them
    //* if a service not selected anymore, also delete its catalog value from store
    this.customerServicesSubs.push(
      this.newCustomerCatalogs$.subscribe((res: Catalog[] | null) => {
        if (res && res.length > 0) {
          this.newCatalogs = res;
          this.newCatalogs = this.newCatalogs.filter((newctlg: any) => {
            return this.selectedServices.some((srv) => {
              if (srv.id === newctlg.serviceId) return newctlg;
            });
          });
        }
      })
    );

    this.customersService.setNewCustomerCatalogsStoreState(this.newCatalogs);
    this.router.navigateByUrl('/homepage/newcustomer/catalogs');
  }

  onBack() {
    this.customersService.setNewCustomerServicesStoreState(
      this.selectedServices
    );
    this.router.navigateByUrl('/homepage/newcustomer/info');
  }

  onReset() {
    this.selectedServices = [];
    this.fillServiceStatus();
  }

  ngOnDestroy(): void {
    this.customerServicesSubs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
