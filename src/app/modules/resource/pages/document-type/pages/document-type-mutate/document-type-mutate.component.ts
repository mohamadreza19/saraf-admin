import { Component, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractMutateApiService,
  SingleFormMutateComponent,
} from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { DocumentTypeApiService } from 'src/app/shared/apis/document-type-api.service';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { FormBuilder3Component } from '../../../../../../shared/components/form-builder3/form-builder3.component';

@Component({
  selector: 'app-document-type-mutate',
  standalone: true,
  templateUrl: './document-type-mutate.component.html',
  styleUrls: ['./document-type-mutate.component.css'],
  imports: [FormBuilder3Component],
})
export class DocumentTypeMutateComponent extends SingleFormMutateComponent<DocumentTypeControls> implements OnInit {
  override successText: string = 'با موفقیت ذخیره شد';
  override entityApiService = inject(DocumentTypeApiService);
  override formSubmitLabel: string = 'ذخیره';
  constructor() {
    super();
    this.controls = {
      title: new FormControl2('', {
        label: 'عنوان',
        type: 'text',
        validators: [Validators.required],
      }),
      explain: new FormControl2('', {
        label: 'توضیحات',
        type: 'text',
        validators: [Validators.required],
      }),
      language: new FormControl2('', {
        label: 'زبان',
        type: 'text',

        validators: [Validators.required],
      }),
      pagecount: new FormControl2('', {
        label: 'تعداد صفحه',
        type: 'number',

        validators: [Validators.required],
      }),
      hasIdnumber: new FormControl2(false, {
        label: 'شناسه',
        type: 'checkbox',

        validators: [Validators.required],
      }),
      hasexpireDate: new FormControl2(false, {
        label: 'تاریخ',
        type: 'checkbox',

        validators: [Validators.required],
      }),
    };
  }
  override handleAfterPostInitialization(controls: DocumentTypeControls): void {
    const { languageId } = this.route.snapshot.queryParams;
    this.formLabel = 'ثبت نوع سند';

    if (languageId) {
      controls.language.setValue(languageId);
      controls.language.disable();
    }
  }

  ngOnInit() {
    this.onInit();
  }
}

export interface DocumentTypeControls {
  title: FormControl2;
  explain: FormControl2;
  language: FormControl2;
  pagecount: FormControl2;
  hasIdnumber: FormControl2;
  hasexpireDate: FormControl2;
}
