import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoices } from '../models/invoices';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private controllerUrl = `${environment.apiUrl}/invoices`;

  constructor(private httpClient: HttpClient) {}

  addInvoice(invoice: Invoices) {
    return this.httpClient.post<Invoices>(`${this.controllerUrl}`, invoice);
  }

  getInvoice(id: number) {
    return this.httpClient.get<Invoices[]>(
      `${this.controllerUrl}?subscriptionId=${id}`
    );
  }
}
