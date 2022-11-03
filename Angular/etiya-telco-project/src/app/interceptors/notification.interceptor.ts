import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.method === 'GET') {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      finalize(() => {
        switch (request.method) {
          case 'POST':
            this.notificationService.showSuccess('Service succesfully added.');
            break;
          case 'DELETE':
            this.notificationService.showFail('Service deleted.');
            break;
          case 'PUT':
            this.notificationService.showSuccess('Service updated.');
            break;
          default:
            break;
        }
      })
    );
  }
}
