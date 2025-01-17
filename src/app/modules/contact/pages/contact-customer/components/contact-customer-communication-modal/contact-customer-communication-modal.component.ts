import { Component, OnInit } from '@angular/core';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';

@Component({
  selector: 'app-contact-customer-communication-modal',
  templateUrl: './contact-customer-communication-modal.component.html',
  standalone: true,
  styleUrls: ['./contact-customer-communication-modal.component.css'],
  imports: [FormBuilder2Component],
})
export class ContactCustomerCommunicationModalComponent implements OnInit {
  forms: CustomFormGroup[] = [];
  constructor() {
    this.initiateForm();
  }
  ngOnInit() {}

  initiateForm() {
    const controls = {
      message: new FormControl2('', {
        label: 'متن پیام',
        type: 'text',
        validators: [],
      }),
    };

    const form = new CustomFormGroup(controls, '', 'ارسال پیام');

    this.forms.push(form);
  }
}
