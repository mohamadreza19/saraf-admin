import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';
import { AppRoutingModule } from './app-routing.module';

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
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
