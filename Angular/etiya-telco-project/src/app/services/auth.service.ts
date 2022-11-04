import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../models/loginDto';
import { Token } from '../models/token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { LoginResponseModel } from '../models/loginResonseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private controllerUrl = `${environment.apiUrl}/auth`;
  decodedToken!: Token;

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService,
    private router: Router,
    private helper: JwtHelperService
  ) {}

  login(user: LoginDto): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(
      `${this.controllerUrl}/login`,
      user
    );
  }

  logout() {
    this.localstorageService.deleteItem('token');
    this.router.navigateByUrl('login');
  }

  decodeToken(token: string) {
    const tokenValues: Token = this.helper.decodeToken(token);
    this.decodedToken = tokenValues;
  }

  get isAuthenticated(): boolean {
    const token = this.localstorageService.getItem('token');
    if (!token) return false;
    if (this.helper.isTokenExpired()) return false;
    return true;
  }

  get jwtToken(): string | null {
    return this.localstorageService.getItem('token');
  }
}
