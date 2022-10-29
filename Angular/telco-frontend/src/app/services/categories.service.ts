import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
}) //* Attribute
export class CategoriesService {
  controllerUrl = `${environment.apiUrl}/categories`;

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.controllerUrl);
  }

  add(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.controllerUrl, category);
  }

  update(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(
      `${this.controllerUrl}/${category.id}`,
      category
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  }
}
