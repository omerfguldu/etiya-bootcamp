import { Customer } from 'src/app/models/customer';
import { Catalog } from './../models/catalog';
import {
  deleteNewCustomerCatalogs,
  deleteNewCustomerInfo,
  deleteNewCustomerServices,
  setNewCustomerCatalogs,
  setNewCustomerInfo,
  setNewCustomerServices,
} from './../store/newCustomer/newCustomer.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndividualCustomer } from '../models/individualCustomer';
import { CorporateCustomer } from '../models/corporateCustomer';
import { Store } from '@ngrx/store';
import { AppStoreState } from '../store/app.state';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customersUrl = `${environment.apiUrl}/customers`;
  private individualUrl = `${environment.apiUrl}/individualCustomers`;
  private corporateUrl = `${environment.apiUrl}/corporateCustomers`;

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppStoreState>
  ) {}

  //* save new customer info to store
  setNewCustomerInfoStoreState(
    newCustomerInfo: IndividualCustomer | CorporateCustomer | null
  ) {
    this.store.dispatch(setNewCustomerInfo({ newCustomerInfo }));
  }

  //* save new customer services to store
  setNewCustomerServicesStoreState(newCustomerServices: Service[]) {
    this.store.dispatch(setNewCustomerServices({ newCustomerServices }));
  }

  //* save new customer catalogs to store
  setNewCustomerCatalogsStoreState(newCustomerCatalogs: Catalog[]) {
    this.store.dispatch(setNewCustomerCatalogs({ newCustomerCatalogs }));
  }

  //* remove customer info from store
  deleteNewCustomerInfoStoreState() {
    this.store.dispatch(deleteNewCustomerInfo());
  }

  //* remove customer services from store
  deleteNewCustomerServicesStoreState() {
    this.store.dispatch(deleteNewCustomerServices());
  }

  //* remove customer catalogs from store
  deleteNewCustomerCatalogsStoreState() {
    this.store.dispatch(deleteNewCustomerCatalogs());
  }

  //* remove store values at once
  deleteNewCustomerStoreStates() {
    this.deleteNewCustomerInfoStoreState();
    this.deleteNewCustomerServicesStoreState();
    this.deleteNewCustomerCatalogsStoreState();
  }

  addCustomer(customer: Customer) {
    return this.httpClient.post<Customer>(this.customersUrl, customer);
  }

  addIndividualCustomer(customer: IndividualCustomer) {
    return this.httpClient.post<IndividualCustomer>(
      this.individualUrl,
      customer
    );
  }

  getIndividualCustomers(): Observable<IndividualCustomer[]> {
    return this.httpClient.get<IndividualCustomer[]>(this.individualUrl);
  }

  getIndividualCustomer(id: number): Observable<IndividualCustomer[]> {
    return this.httpClient.get<IndividualCustomer[]>(
      `${this.individualUrl}?customerId=${id}`
    );
  }

  addCorporateCustomer(customer: CorporateCustomer) {
    return this.httpClient.post<CorporateCustomer>(this.corporateUrl, customer);
  }

  getCorporateCustomers(): Observable<CorporateCustomer[]> {
    return this.httpClient.get<CorporateCustomer[]>(this.corporateUrl);
  }

  getCorporateCustomer(id: number): Observable<CorporateCustomer[]> {
    return this.httpClient.get<CorporateCustomer[]>(
      `${this.corporateUrl}?customerId=${id}`
    );
  }
}
