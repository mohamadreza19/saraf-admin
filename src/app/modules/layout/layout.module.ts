import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { LayoutRoutingModule } from './layout-routing.module';

export function getLocale(): string {
  const lang = window.location.pathname.split('/')[1]; // Get the first part of the URL (e.g., 'fa' or 'en')
  return lang;
}
@NgModule({
  imports: [LayoutRoutingModule, AngularSvgIconModule.forRoot()],
  providers: [provideHttpClient(withInterceptorsFromDi()), { provide: LOCALE_ID, useFactory: getLocale }],
})
export class LayoutModule {}
