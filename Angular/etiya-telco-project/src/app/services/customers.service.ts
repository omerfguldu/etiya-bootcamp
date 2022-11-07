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

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customersUrl = `${environment.apiUrl}/customers`;
  private individualUrl = `${environment.apiUrl}/individualCustomers`;
  private corporateUrl = `${environment.apiUrl}/corporateCustomers`;
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppStoreState>
  ) {
    this.customerToRegisterModel$ = this.store.select(
      (state) => state.customerToRegister.customerToRegisterModel
    );
  }

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

  addCustomer(customer: any) {
    return this.httpClient.post(this.customersUrl, customer);
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
