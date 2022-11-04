import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private controllerUrl = `${environment.apiUrl}/individualCustomers`;

  constructor() {}
}
