import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Catalog } from 'src/app/models/catalog';
import { Service } from 'src/app/models/service';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { CustomersService } from 'src/app/services/customers.service';
import { AppStoreState } from 'src/app/store/app.state';

@Component({
  selector: 'app-customer-catalog-form',
  templateUrl: './customer-catalog-form.component.html',
  styleUrls: ['./customer-catalog-form.component.css'],
})
export class CustomerCatalogFormComponent implements OnInit, OnDestroy {
  customerCatalogsSubs: Subscription[] = [];
  catalogs: Catalog[] = [];
  newCustomerCatalogs$!: Observable<Catalog[] | null>;
  newCustomerServices$!: Observable<Service[] | null>;
  selectedCatalogs: Catalog[] = [];
  selectedServices: Service[] = [];

  constructor(
    private customersService: CustomersService,
    private catalogsService: CatalogsService,
    private store: Store<AppStoreState>,
    private router: Router
  ) {
    this.newCustomerCatalogs$ = this.store.select(
      (s) => s.newCustomer.catalogs
    );
    this.newCustomerServices$ = this.store.select(
      (s) => s.newCustomer.services
    );
  }

  ngOnInit(): void {
    //* get catalogs and services value from store
    this.customerCatalogsSubs.push(
      this.newCustomerCatalogs$.subscribe((res: Catalog[] | null) => {
        if (res) this.selectedCatalogs = res;
      })
    );
    this.customerCatalogsSubs.push(
      this.newCustomerServices$.subscribe((res: Service[] | null) => {
        if (res) this.selectedServices = res;
      })
    );
    this.getCatalogs(this.selectedServices);
  }

  getCatalogs(services: Service[]) {
    //* get catalogs by service id
    services.forEach((service) => {
      this.catalogsService
        .getCatalogsByServiceId(service.id)
        .subscribe((res: Catalog[]) => {
          this.catalogs = this.catalogs.concat(res);
        });
    });
  }

  onCatalogClick(catalog: Catalog) {
    let removeSelectedCatalog = this.selectedCatalogs.some(
      (selectedCatalog) => {
        return selectedCatalog.id === catalog.id;
      }
    );
    //* check if the selected catalog already exists if it exists remove it with filter method and return
    if (removeSelectedCatalog) {
      this.selectedCatalogs = this.selectedCatalogs.filter(
        (selectedCatalog) => {
          return selectedCatalog.id !== catalog.id;
        }
      );
      return;
    }
    this.selectedCatalogs = this.selectedCatalogs.filter((selectedCatalog) => {
      return selectedCatalog.serviceId !== catalog.serviceId;
    });
    this.selectedCatalogs = [...this.selectedCatalogs, catalog];
  }

  toggleCatalogCss(catalog: Catalog) {
    //* if catalog id equals to selected catalog id return true
    //* control css class with ngclass
    return this.selectedCatalogs.some((selectedCatalog) => {
      return selectedCatalog.id === catalog.id;
    });
  }

  onNext() {
    this.customersService.setNewCustomerCatalogsStoreState(
      this.selectedCatalogs
    );
    this.router.navigateByUrl('/homepage/newcustomer/overview');
  }

  onBack() {
    this.customersService.setNewCustomerCatalogsStoreState(
      this.selectedCatalogs
    );
    this.router.navigateByUrl('/homepage/newcustomer/services');
  }

  onReset() {
    this.selectedCatalogs = [];
  }

  ngOnDestroy(): void {
    this.customerCatalogsSubs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
