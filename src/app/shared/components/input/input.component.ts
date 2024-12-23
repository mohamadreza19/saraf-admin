import {
  CommonModule,
  NgClass,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet,
} from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { ButtonComponent } from '../button/button.component';
import { CustomFormControl } from '../../form-builder/form-builder.component';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';
import { FilesInputComponent } from './files-input/files-input.component';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { IconsModule } from '../icons/icons.module';
import { PhoneNumberInputComponent } from './phone-number-input/phone-number-input.component';
import { FormControl2 } from '../form-builder2/form-builder2.component';
import { AmountInputComponent } from './amount-input/amount-input.component';
import { SearchSelectInputComponent } from './search-select-input/search-select-input.component';
import { FinancialRateComponent } from '../../../modules/project/components/financial-rate/financial-rate.component';
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgPersianDatepickerModule,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgTemplateOutlet,
    IconsModule,
    NgClass,
    ButtonComponent,
    NgClickOutsideDirective,
    NgxFileDropModule,
    FilesInputComponent,
    PhoneNumberInputComponent,
    AmountInputComponent,
    SearchSelectInputComponent,
    CommonModule,
    FinancialRateComponent,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  constructor(private el: ElementRef<HTMLElement>) {
    el.nativeElement.className = 'flex items-center ';
  }
  _iconUrl = '/assets/icons/material-icons/solid/download.svg';
  _iconUrlImage = '/assets/icons/material-icons/solid/image.svg';

  // @Input() control!: FormControl2; // Pass the actual FormControl
  @Input()
  control!: FormControl2;

  @Input() className?: string; // Allow dynamic styling

  isCustomBoxOpen = false;

  ngOnInit(): void {
    // Set the default value (select the first option by default)
    // console.log(this.formGroupDirective);
    // console.log(this.control);

    this.control.show$.subscribe((val) => {
      this.onShowChange(val);
    });

    if (typeof this.control.selectedOptionIndex === 'number' && this.control.options) {
      if (!this.control.value) this.control.setValue(this.control.options[0]);
    }
  }

  onShowChange(show: boolean) {
    // Handle logic for changes in `show`
    if (show) {
      this.el.nativeElement.classList.remove('hidden');
    } else {
      this.el.nativeElement.classList.add('hidden');
    }
  }

  openCustomBox() {
    this.isCustomBoxOpen = true;
  }
  closeCustomBox() {
    this.isCustomBoxOpen = false;
  }
  _handleSetMultiSelectItem(val: string) {
    const formControlArrValue = this.control.value;

    if (Array.isArray(formControlArrValue)) {
      if (!formControlArrValue.includes(val)) this.control.setValue([...formControlArrValue, val]);
    } else {
      this.control.setValue([val]);
    }
  }
  _handleRemoveMultiSelectItem(val: string) {
    const formControlArrValue = this.control.value;

    if (Array.isArray(formControlArrValue)) {
      const filteredArray = formControlArrValue.filter((item) => item !== val);

      this.control.setValue(filteredArray);
    }
    // console.log(this.control);
  }
  _getMultiSelectSelectedItemAsArray(val: any): string[] {
    return val as string[];
  }
}
