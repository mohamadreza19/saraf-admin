import {
  afterNextRender,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  Inject,
  LOCALE_ID,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ThemeService } from './core/services/theme.service';

import { LoadingService } from './core/services/loading.service';
import { Title } from '@angular/platform-browser';

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

  constructor(
    @Inject(LOCALE_ID) private localeId: string,
    private titleService: Title,
    public themeService: ThemeService,
  ) {
    this.setTitleBasedOnLocale();
  }

  ngOnInit() {
    // Get data from TransferState
  }
  setTitleBasedOnLocale() {
    this.titleService.setTitle($localize`سامانه خرید و فروش ارز ، طلا و نقره پیمان`);
  }
}
