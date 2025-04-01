import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';

@Component({
  selector: 'app-search-select-add-modal',
  standalone: true,
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
  imports: [FormBuilder2Component],
})
export class AddModalComponent implements OnInit {
  form!: CustomFormGroup;
  @Input()
  get label() {
    const STR = 'افزودن';
    if (this.data && this.data.label) {
      return STR + ' ' + this.data.label;
    }
    return STR + ' ' + 'ایتم';
  }
  constructor(@Inject(DIALOG_DATA) public data: { label: string; submit: (form: CustomFormGroup) => void }) {
    const controls = {
      input: new FormControl2('', {
        label: '',
        type: 'text',
        validators: [],
      }),
    };

    this.form = new CustomFormGroup(controls, '', 'افزودن', data.submit);
  }

  ngOnInit() {}
}
