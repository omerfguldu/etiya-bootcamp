import { LocalstorageService } from './services/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  userToken!: string;

  constructor(
    private router: Router,
    private localstorageService: LocalstorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userToken = this.localstorageService.getItem('token') || '';
    if (!this.authService.isAuthenticated) {
      //* if user is not authenticated navigate to login page
      this.router.navigateByUrl('login');
      return;
    }

    //* if user is authenticated navigate to homepage
    this.authService.decodeToken(this.userToken);
    this.router.navigateByUrl('homepage');
  }
}
