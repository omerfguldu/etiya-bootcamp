import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { environment } from '../../environments/environment';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //* if the reqeust comes from login page do nothing
    //* if the request method is get do nothing
    if (
      request.url === `${environment.apiUrl}/auth/login` ||
      request.method === 'GET' ||
      request.url.includes(`${environment.apiUrl}/catalogs`)
    ) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      //* inform the user with toaster service when put-post-delete requests done.
      finalize(() => {
        switch (request.method) {
          case 'POST':
            this.notificationService.showSuccess('Succesfully added.');
            break;
          case 'DELETE':
            this.notificationService.showFail('Succesfully deleted.');
            break;
          case 'PUT':
            this.notificationService.showSuccess('Succesfully updated.');
            break;
          default:
            break;
        }
      })
    );
  }
}
