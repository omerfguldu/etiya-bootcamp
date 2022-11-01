import { LoadingService } from './services/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'telco-frontend';
  isLoading: boolean = false;
  today: Date = new Date();

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.subscribeToLoading();
  }

  sumOfNumbers(a: number, b: number): number {
    return a + b;
  }

  btnClick() {
    alert('Butona tiklandi.');
  }

  subscribeToLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  startLoading() {
    this.loadingService.startLoading();
  }

  stopLoading() {
    this.loadingService.stopLoading();
  }
}
