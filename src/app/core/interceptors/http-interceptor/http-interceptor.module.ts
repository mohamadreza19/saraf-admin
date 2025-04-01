import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoadingInterceptor } from '../loading.interceptor';
import { TokenInterceptor } from '../token.interceptor';
import { BadRequestInterceptor } from '../bad-request.interceptor';
import { FormDatalizedBodyInterceptor } from '../form-datalized-body.interceptor';
import { testInterceptor } from '../test.interceptor';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BadRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FormDatalizedBodyInterceptor, multi: true },
    // provideHttpClient(withFetch()),
  ],
})
export class HttpInterceptorModule {}
