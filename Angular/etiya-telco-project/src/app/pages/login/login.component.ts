import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalstorageService } from './../../services/localstorage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  isUserValid: boolean = true;
  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private loadingService: LoadingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //* LOGIN FORMUNU OLUSTURMA FONKSIYONUNU CAGIR VE LOADING GOZLEMLE.
    this.createLoginForm();
    this.subscribeToLoading();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    //* LOGIN FORMDAN GELEN VERILERI SERVISE YOLLA.
    //* RESPONSE OLUMLU ISE LOCALSTOREGE DA TOKEN OLUSTUR VE TOKEN KEYI EKLE.
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isUserValid = true;
        this.localstorageService.setItem('token', res['access_token']);
        this.authService.decodeToken(res['access_token']);
        this.clearFormFields();
      },
      error: () => {
        this.isUserValid = false;
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
    //* LOADING SERVICE GOZLEMLE EGER LOADING TAMAMLANMIS VE USER VALID ISE
    //* HOMEPAGE'E YONLENDIR.
    //* LOADING TAMAMLANMIS AMA USER INVALID ISE TOASTR ILE HATA GOSTER.
    this.subscription = this.loadingService.isLoadingSubject.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
        if (!this.isLoading && this.isUserValid) {
          this.router.navigateByUrl('homepage');
        } else if (!this.isLoading && !this.isUserValid) {
          this.toastr.error('Login failed.');
        }
      }
    );
  }

  clearFormFields() {
    this.loginForm.reset();
  }
}
