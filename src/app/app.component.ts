import { Component, Inject } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT, NgClass } from '@angular/common';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { DialogModule } from '@angular/cdk/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalService } from './core/services/modal.service';
import { EmployeeComponent } from './modules/resource/pages/employee/employee.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone: true,
  // imports: [],
})
export class AppComponent {
  title = 'Angular Tailwind';

  constructor(public themeService: ThemeService, @Inject(DOCUMENT) private document: Document, modal: ModalService) {
    document.body.dir = 'rtl';
    // document.body.dir = 'ltr';
    // setInterval(() => {
    //   if (document.body.dir == 'rtl') {
    //     document.body.dir = 'ltr';
    //   } else document.body.dir = 'rtl';
    // }, 3000);
    // modal.open(EmployeeComponent);
  }
}
