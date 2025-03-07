import { Injector, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogModule } from '@angular/cdk/dialog';
import { NgClass } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';






import { HttpInterceptorModule } from './core/interceptors/http-interceptor/http-interceptor.module';
import { TestComponentComponent } from './core/test-component/test-component.component';
import { AuthService } from './modules/auth/services/auth.service';
import { TestFormComponent } from './shared/components/test-form/test-form.component';
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
    TestFormComponent,

  ],
  providers: [
    // provideClientHydration(),
    // { provide: HTTP_INTERCEPTORS, useClass: NormalizedListDataInterceptor, multi: true },
    provideClientHydration(),
    // { provide: LOCALE_ID, useFactory: getLocale },
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
// Function to determine the current language from the browser URL
// export function getLocale(): string {
//   const lang = window.location.pathname.split('/')[1]; // Get the first part of the URL (e.g., 'fa' or 'en')

//   console.log(lang);
//   return lang;
// }
