import { NgModule } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@NgModule({ imports: [AuthRoutingModule, AngularSvgIconModule.forRoot()] })
export class AuthModule {}
