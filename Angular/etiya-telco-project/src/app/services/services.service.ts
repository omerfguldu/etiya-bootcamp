import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Service } from '../models/service';
import { ServiceDto } from '../models/serviceDto';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private controllerUrl = `${environment.apiUrl}/services`;

  constructor(private httpClient: HttpClient) {}

  getServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this.controllerUrl);
  }

  getService(id: number): Observable<Service> {
    return this.httpClient.get<Service>(`${this.controllerUrl}/${id}`);
  }

  addService(service: ServiceDto): Observable<Service> {
    return this.httpClient.post<Service>(this.controllerUrl, service);
  }

  updateService(service: Service): Observable<Service> {
    return this.httpClient.put<Service>(
      `${this.controllerUrl}/${service.id}`,
      service
    );
  }

  deleteService(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  }
}
