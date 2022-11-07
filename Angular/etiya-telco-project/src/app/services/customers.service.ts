import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndividualCustomer } from '../models/individualCustomer';
import { CorporateCustomer } from '../models/corporateCustomer';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private individualUrl = `${environment.apiUrl}/individualCustomers`;
  private corporateUrl = `${environment.apiUrl}/corporateCustomers`;

  constructor(private httpClient: HttpClient) {}

  getIndividualCustomers(): Observable<IndividualCustomer[]> {
    return this.httpClient.get<IndividualCustomer[]>(this.individualUrl);
  }

  getIndividualCustomer(id: number): Observable<IndividualCustomer[]> {
    return this.httpClient.get<IndividualCustomer[]>(
      `${this.individualUrl}?customerId=${id}`
    );
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
