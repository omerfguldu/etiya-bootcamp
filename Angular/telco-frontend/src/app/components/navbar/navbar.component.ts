import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenUserModel } from 'src/app/models/tokenUserModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  @Output() onLogout = new EventEmitter<void>();
  @Output() onLogoutWithValue = new EventEmitter<string>();
  tokenUserModel$: Observable<TokenUserModel | null>;
  constructor(private authService: AuthService, private router: Router) {
    this.tokenUserModel$ = this.authService.tokenUserModel$;
  }

  ngOnInit(): void {
    this.handleOnLogin();
    //* TS tarafinda subscribe olunabilir.
    // this.tokenUserModel$.subscribe((tokenUserModel) => {
    //   if(tokenUserModel) this.isLogin = true;
    // })
  }

  logout() {
    this.authService.logout();
    // this.router.navigateByUrl('/login');
    this.isLogin = this.authService.isAuthenticated;

    this.onLogout.emit();
    this.onLogoutWithValue.emit('Hoscakal...');
    this.router.navigate(['login']);
  }

  bool: boolean = false;
  handleOnLogin(): void {
    this.authService.onLogin.subscribe({
      next: () => {
        if (this.isLogin) return;
        console.log(this.authService.isAuthenticated);
        this.isLogin = this.authService.isAuthenticated;
        if (!this.bool) {
          this.bool = true;
          this.authService.emitOnLoginEvent('onLogin event triggered');
          setTimeout(() => {
            this.authService.onLogin.subscribe((val) => {
              console.log(val);
            });
          }, 3000);
          this.bool = true;
        }
      },
    });
  }
}
