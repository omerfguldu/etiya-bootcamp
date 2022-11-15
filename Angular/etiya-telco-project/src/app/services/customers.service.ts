import { NewCustomerStoreState } from './../store/newCustomer/newCustomer.state';
import { Catalog } from './../models/catalog';
import {
  deleteNewCustomerCatalogs,
  deleteNewCustomerInfo,
  deleteNewCustomerServices,
  setNewCustomerCatalogs,
  setNewCustomerInfo,
  setNewCustomerServices,
} from './../store/newCustomer/newCustomer.actions';
import {
  deleteCustomerToRegisterModel,
  setCustomerToRegisterModel,
} from './../store/customerToRegister/customerToRegister.actions';
import { CustomerToRegisterModel } from 'src/app/models/customerToRegisterModel';
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
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;
  newCustomer$: Observable<NewCustomerStoreState | null>;

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppStoreState>
  ) {
    this.customerToRegisterModel$ = this.store.select(
      (state) => state.customerToRegister.customerToRegisterModel
    );
    this.newCustomer$ = this.store.select((state) => state.newCustomer);
  }

  //* NEW CUSTOMER STORE CODES STARTS
  setNewCustomerInfoStoreState(
    newCustomerInfo: IndividualCustomer | CorporateCustomer | null
  ) {
    this.store.dispatch(setNewCustomerInfo({ newCustomerInfo }));
  }

  setNewCustomerServicesStoreState(newCustomerServices: Service[]) {
    this.store.dispatch(setNewCustomerServices({ newCustomerServices }));
  }

  setNewCustomerCatalogsStoreState(newCustomerCatalogs: Catalog[]) {
    this.store.dispatch(setNewCustomerCatalogs({ newCustomerCatalogs }));
  }

  deleteNewCustomerInfoStoreState() {
    this.store.dispatch(deleteNewCustomerInfo());
  }

  deleteNewCustomerServicesStoreState() {
    this.store.dispatch(deleteNewCustomerServices());
  }

  deleteNewCustomerCatalogsStoreState() {
    this.store.dispatch(deleteNewCustomerCatalogs());
  }

  //* NEW CUSTOMER STORE CODES ENDS

  //* CUSTOMER EKLEME FORMLARINDAN GELEN VERIYI DISPATCH ILE STORE'A EKLE.
  setCustomerToRegisterModelStoreState(
    customerToRegisterModel: CustomerToRegisterModel
  ) {
    this.store.dispatch(
      setCustomerToRegisterModel({ customerToRegisterModel })
    );
  }

  deleteCustomerToRegisterModelStoreState() {
    this.store.dispatch(deleteCustomerToRegisterModel());
  }

  //* /customers ADRESINE KAYIT OLUSTUR.
  addCustomer(customer: any) {
    return this.httpClient.post(this.customersUrl, customer);
  }

  //* /individualCustomers ADRESINE KAYIT OLUSTUR.
  addIndividualCustomer(customer: IndividualCustomer) {
    return this.httpClient.post<IndividualCustomer>(
      this.individualUrl,
      customer
    );
  }

  //* INDIVIDUAL CUSTOMERLARI GETIR.
  getIndividualCustomers(): Observable<IndividualCustomer[]> {
    return this.httpClient.get<IndividualCustomer[]>(this.individualUrl);
  }

  //* ID YE GORE INDIVIDUAL CUSTOMER GETIR
  getIndividualCustomer(id: number): Observable<IndividualCustomer[]> {
    return this.httpClient.get<IndividualCustomer[]>(
      `${this.individualUrl}?customerId=${id}`
    );
  }

  //* /corporateCustomers ADRESINE KAYIT OLUSTUR.
  addCorporateCustomer(customer: CorporateCustomer) {
    return this.httpClient.post<CorporateCustomer>(this.corporateUrl, customer);
  }

  //* CORPORATE CUSTOMERLARI GETIR.
  getCorporateCustomers(): Observable<CorporateCustomer[]> {
    return this.httpClient.get<CorporateCustomer[]>(this.corporateUrl);
  }

  //* ID YE GORE CORPORATE CUSTOMER GETIR.
  getCorporateCustomer(id: number): Observable<CorporateCustomer[]> {
    return this.httpClient.get<CorporateCustomer[]>(
      `${this.corporateUrl}?customerId=${id}`
    );
  }
}
