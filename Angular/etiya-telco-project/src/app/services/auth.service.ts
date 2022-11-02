import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Token } from '../models/token';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  helper = new JwtHelperService();
  decodedToken!: Token;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', user);
  }

  decodeToken(token: string) {
    const tokenValues: Token = this.helper.decodeToken(token);
    this.decodedToken = tokenValues;
    console.log(this.decodedToken);
  }

  getTokenExpirationDate(token: string) {
    return this.helper.getTokenExpirationDate(token);
  }

  isTokenValid(token: string): boolean {
    return this.helper.isTokenExpired(token) ? false : true;
  }
}
