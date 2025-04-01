import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Notify the service that a request has started
    this.loadingService.show();

    return next.handle(request).pipe(
      // Finalize ensures the loading state is hidden when the request completes (successfully or with an error)
      finalize(() => {
        this.loadingService.hide();
      }),
    );
  }
}
