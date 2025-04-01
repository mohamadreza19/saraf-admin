import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { PlatformService } from 'src/app/core/services/platform.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule, RouterOutlet],
})
export class AuthComponent {}
