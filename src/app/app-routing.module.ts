import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { I18NEXT_SERVICE, I18NextModule, I18NextPipe } from 'angular-i18next';

import { TranslationService } from './shared/services/translation.service';
import { TestComponentComponent } from './core/test-component/test-component.component';
import { AuthModule } from './modules/auth/auth.module';
import { PlatformService } from './core/services/platform.service';

const routes: Routes = [
  {
    path: 'test',
    component: TestComponentComponent,
  },
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    // redirectTo: '',
  },

  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    // component: AuthModule,
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking', // Critical for SSR
      scrollPositionRestoration: 'enabled', // Restore scroll on navigation
      anchorScrolling: 'enabled', // Enable scrolling to anchor links
    }),
  ],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
