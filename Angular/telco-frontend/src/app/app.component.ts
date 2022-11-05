import { setTokenUserModel } from './store/auth/auth.actions';
import { LoadingService } from './services/loading.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'telco-frontend';
  isLoading: boolean = false;
  today: Date = new Date();
  overlayTitleText: string = '';

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscribeToLoading();
    this.handleOnLogin();
    this.setTokenUserModel();
  }

  setTokenUserModel() {
    const tokenUserModel = this.authService.tokenUserModel;
    if (tokenUserModel) {
      this.authService.setTokenUserModelStoreState(tokenUserModel);
    }
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

  handleOnLogout(text: string) {
    this.overlayTitleText = text;
  }

  handleOnLogin(): void {
    this.authService.onLogin.subscribe({
      next: (eventValue) => {
        this.overlayTitleText = eventValue;
      },
    });
  }
}
