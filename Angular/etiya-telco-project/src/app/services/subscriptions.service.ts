import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubscriptionsResponse } from '../models/subscriptionsResponse';
@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private controllerUrl = `${environment.apiUrl}/subscriptions`;
  private sub: SubscriptionsResponse[] = [];
  constructor(private httpClient: HttpClient) {}

  // getSubscriptions(): Observable<SubscriptionsResponse[]> {
  //   return this.httpClient.get<SubscriptionsResponse[]>(this.controllerUrl);
  // }
  getSubscription(id: number): Observable<SubscriptionsResponse> {
    return this.httpClient.get<SubscriptionsResponse>(
      `${this.controllerUrl}/${id}`
    );
  }
  getSubscriptionsWithCustomerId(
    customerId: number
  ): Observable<SubscriptionsResponse[]> {
    return this.httpClient.get<SubscriptionsResponse[]>(
      `${this.controllerUrl}?customerId=${customerId}`
    );
  }
}
