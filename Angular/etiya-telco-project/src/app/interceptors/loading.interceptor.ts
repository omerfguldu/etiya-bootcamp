import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  //* on every httpRequest startLoading
  //* stopLoading when the request completed
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.startLoading();
    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loadingService.stopLoading();
        }, 400);
      })
    );
  }
}
