import { AfterViewInit, Component } from '@angular/core';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from '../../../../../shared/form-builder/form-builder.component';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { Controls } from './controls';

@Component({
  selector: 'app-contact-customer-mutate',
  standalone: true,
  imports: [FormBuilderComponent, FormBuilder2Component],
  templateUrl: './contact-customer-mutate.component.html',
  styleUrl: './contact-customer-mutate.component.scss',
})
export class ContactCustomerMutateComponent implements AfterViewInit {
  form!: CustomFormGroup;

  ngAfterViewInit(): void {
    const controls = this.initiateControls();

    const form1 = new CustomFormGroup(controls, 'ثبت تماس با مشتری', 'ثبت');
    this.form = form1;
    this.handleFormControlsValuesChange(this.form);
  }

  initiateControls(): Controls {
    return {
      userType: new FormControl2('', {
        label: 'انتخاب مخاطب',
        type: 'select',
        options: ['همه کارمندان', ' همه صرافی ها', 'انتخاب کارمند', 'انتخاب صراف'],
        selectedOptionIndex: 0,

        validators: [],
      }),
      files: new FormControl2([], {
        label: 'بارگزاری فایل',
        type: 'files',
        filesLength: 1,
        allowedFileTypes: ['jpeg', 'jpg', 'png'],

        validators: [],
      }),
      employee: new FormControl2('', {
        label: 'انتخاب کارمند',
        type: 'search-select',
        show: false,
        options: ['علی رضایی', 'رضا مرادی'],
        // showIf: ['userType', 'انتخاب کارمند'],
        validators: [],
      }),
      exchangeOffice: new FormControl2('', {
        label: 'انتخاب صراف',
        type: 'search-select',
        options: ['نوا ', 'تبدیل'],
        show: false,
        // showIf: ['userType', 'انتخاب صراف'],
        validators: [],
      }),

      subject: new FormControl2('', {
        label: 'موضوع',
        type: 'text',
        options: [],

        validators: [],
      }),
      priority: new FormControl2('', {
        label: 'درجه اهمیت',
        type: 'select',
        options: ['بالا', 'متوسط', 'کم'],

        validators: [],
      }),
      shouldSendEmail: new FormControl2(false, {
        label: 'به ایمیل',
        type: 'checkbox',

        validators: [],
      }),
    };
  }
  handleFormControlsValuesChange(form: CustomFormGroup) {
    const controls: Controls = form.controls as any;

    controls.userType.valueChanges.subscribe((val) => {
      switch (val) {
        case 'انتخاب کارمند':
          controls.employee.show = true;
          break;
        case 'انتخاب صراف':
          controls.exchangeOffice.show = true;
          break;

        default:
          break;
      }
    });
  }
}
