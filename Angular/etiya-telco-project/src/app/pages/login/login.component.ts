import { Router } from '@angular/router';
import { LocalstorageService } from './../../services/localstorage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  isUserValid: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.subscribeToLoading();
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isUserValid = true;
        this.localstorageService.setItem('token', res['access_token']);
        this.authService.decodeToken(res['access_token']);
        this.clearFormFields();
      },
      error: (err) => {
        this.isUserValid = false;
        console.error(err.error.message);
        // this.clearFormFields();
      },
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  subscribeToLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
      if (!this.isLoading && this.isUserValid) {
        this.router.navigateByUrl('homepage');
      }
    });
  }

  clearFormFields() {
    this.loginForm.reset();
  }
}
