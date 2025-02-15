import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { BadRequestInterceptor } from './core/interceptors/bad-request.interceptor';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormDatalizedBodyInterceptor } from './core/interceptors/form-datalized-body.interceptor';
import { NormalizedListDataInterceptor } from './core/interceptors/normalized-list-data.interceptor';
export let AppInjector: Injector;
// import {MatSnackBarModule MatSelectModule, MatCheckboxModule, MatInputModule, } from '@angular/material';
@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgClass,
    RouterOutlet,
    ResponsiveHelperComponent,
    NgxSonnerToaster,
    MatSnackBarModule,
    DialogModule,
    MatProgressBarModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BadRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FormDatalizedBodyInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: NormalizedListDataInterceptor, multi: true },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector = injector; // Store the global injector reference
  }
}
