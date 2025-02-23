import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

import { PlatformService } from '../services/platform.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    // Clone the request and add the token to the headers
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Pass the request to the next handler
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === HttpStatusCode.Unauthorized) {
          // If the response status is 401, redirect to login page

          if ('error' in e.error && (e.error.error as string).toLocaleLowerCase().includes('selected')) {
            return throwError(e);
          }
          if (this.auth.getToken()) {
            this.auth.removeToken();
          }

          this.router.navigateByUrl('/auth/sign-in');

          // console.log('router', this.router);
        }
        // Return the error to the caller
        return throwError(e);
      }),
    );
  }
}
