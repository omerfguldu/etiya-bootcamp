import { faEye, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalstorageService } from './../../services/localstorage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  loginForm!: FormGroup;
  isLoading: boolean = false;
  isUserValid: boolean = true;
  validUserName: string = '';
  subscription!: Subscription;
  passwordIcon: IconDefinition = faEye;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    //* call create login form and observe the loading state
    this.createLoginForm();
    this.subscribeToLoading();
    this.customersService.deleteNewCustomerStoreStates();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    //* send the values which comes from the loginform to authService login function.
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        //* if response is valid create a token key on local storage and assign token key as its value.
        this.isUserValid = true;
        this.localstorageService.setItem('token', res['access_token']);
        this.authService.decodeToken(res['access_token']);
        this.validUserName = this.loginForm.get('userName')?.value;
        this.clearFormFields();
      },
      error: () => {
        this.isUserValid = false;
      },
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
    });
  }

  subscribeToLoading() {
    //* LOADING SERVICE GOZLEMLE EGER LOADING TAMAMLANMIS VE USER VALID ISE
    //* HOMEPAGE'E YONLENDIR.
    //* LOADING TAMAMLANMIS AMA USER INVALID ISE TOASTR ILE HATA GOSTER.
    this.subscription = this.loadingService.isLoadingSubject.subscribe(
      (res: boolean) => {
        this.isLoading = res;
        //* if user valid and loading completed then navigate user to homepage
        if (!this.isLoading && this.isUserValid) {
          this.toastr.success(`Welcome ${this.validUserName}`);
          this.router.navigateByUrl('homepage');
        }
        //* if user invalid and loading completed inform user with toaster error.
        else if (!this.isLoading && !this.isUserValid) {
          this.toastr.error('Login failed.');
        }
      }
    );
  }

  clearFormFields() {
    this.loginForm.reset();
  }

  onEye() {
    //* password input show and hide functionality
    if (this.passwordInput.nativeElement.type === 'password') {
      this.passwordInput.nativeElement.type = 'text';
    } else {
      this.passwordInput.nativeElement.type = 'password';
    }
  }
}
