import {
  afterNextRender,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ThemeService } from './core/services/theme.service';

import { LoadingService } from './core/services/loading.service';
import { PlatformService } from './core/services/platform.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { WindowService } from './core/services/window.service';
import { environment } from 'src/environments/environment';
import { CountryApiService } from './shared/apis/country-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // standalone: true,

  styleUrls: ['./app.component.scss'],
  // standalone: true,
  // imports: [NgIf],
})
export class AppComponent {
  isLoading$ = inject(LoadingService).loading$;
  title = 'ادمین';

  constructor(public themeService: ThemeService, private ps: PlatformService, private cs: CountryApiService) {
    if (this.ps.isBrowser) {
      document.title = this.title;
      if (environment.locale.toLocaleLowerCase().includes('fa')) {
        document.dir = 'rtl';
      }
    }
  }

  ngOnInit() {
    // Get data from TransferState
  }
}
