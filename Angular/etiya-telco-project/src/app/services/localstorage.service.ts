import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  getItem() {
    return localStorage.getItem('token');
  }

  setItem(item: any) {
    localStorage.setItem('token', item);
  }

  deleteItem() {
    localStorage.removeItem('token');
  }
}
