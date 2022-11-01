import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: boolean = false;
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isLoading
  );
  constructor() {}

  startLoading() {
    this.isLoading = true;
    this.isLoadingSubject.next(true);
  }

  stopLoading() {
    this.isLoading = false;
    this.isLoadingSubject.next(false);
  }
}
