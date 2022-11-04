import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private controllerUrl = `${environment.apiUrl}/individualCustomers`;

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.controllerUrl);
  }

  getCustomer(id: number): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(
      `${this.controllerUrl}?customerId=${id}`
    );
  }
}
