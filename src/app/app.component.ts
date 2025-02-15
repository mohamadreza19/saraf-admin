import { AfterViewInit, Component, inject, Inject, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone: true,
  // imports: [],
})
export class AppComponent implements AfterViewInit {
  isLoading$ = inject(LoadingService).loading$;
  title = 'Angular Tailwind';

  constructor(public themeService: ThemeService) {
    document.body.dir = 'rtl';
    // document.body.dir = 'ltr';
    // setInterval(() => {
    //   if (document.body.dir == 'rtl') {
    //     document.body.dir = 'ltr';
    //   } else document.body.dir = 'rtl';
    // }, 3000);
    // modal.open(EmployeeComponent);
  }

  ngAfterViewInit(): void {}
}
