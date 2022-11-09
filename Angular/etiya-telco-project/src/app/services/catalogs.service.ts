import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Catalog } from '../models/catalog';

@Injectable({
  providedIn: 'root',
})
export class CatalogsService {
  private controllerUrl = `${environment.apiUrl}/catalogs`;
  constructor(private httpClient: HttpClient) {}
  getCatalogs(): Observable<Catalog[]> {
    return this.httpClient.get<Catalog[]>(this.controllerUrl);
  }
}
