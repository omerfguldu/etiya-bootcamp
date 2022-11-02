import { LocalstorageService } from './../services/localstorage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalstorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.localStorageService.getItem()) {
      const tokenVal = this.localStorageService.getItem();
      const modifiedRequest = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${tokenVal}`),
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
