import { Injector, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { BadRequestInterceptor } from './core/interceptors/bad-request.interceptor';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormDatalizedBodyInterceptor } from './core/interceptors/form-datalized-body.interceptor';
import { NormalizedListDataInterceptor } from './core/interceptors/normalized-list-data.interceptor';

import { TransferHttpResponseInterceptor } from './core/interceptors/transfer-http-response.interceptor';
import { TestComponentComponent } from './core/test-component/test-component.component';
import { HttpInterceptorModule } from './core/interceptors/http-interceptor/http-interceptor.module';
import { AuthService } from './modules/auth/services/auth.service';
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
    TestComponentComponent,
    HttpInterceptorModule,
  ],
  providers: [
    // provideClientHydration(),
    // { provide: HTTP_INTERCEPTORS, useClass: NormalizedListDataInterceptor, multi: true },
    provideClientHydration(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(auth: AuthService, router: Router) {
    // if (auth.isAuthenticated()) router.navigateByUrl('/');
    // else router.navigateByUrl('/auth/sin-in');
  }
}
