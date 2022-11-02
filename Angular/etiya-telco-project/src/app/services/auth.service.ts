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
  // decodedToken: Subject<Token> = new Subject<Token>();
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
    const tokenExpirationDate = this.getTokenExpirationDate(token);
    const currentDate = new Date();
    if (tokenExpirationDate) {
      return currentDate > tokenExpirationDate ? false : true;
    }
    return false;
  }
}
