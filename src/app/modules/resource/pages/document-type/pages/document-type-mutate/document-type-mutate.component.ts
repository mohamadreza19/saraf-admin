import { Component, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import {
  AbstractMutateApiService,
  SingleFormMutateComponent,
} from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { DocumentTypeApiService } from 'src/app/shared/apis/document-type-api.service';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { FormBuilder3Component } from '../../../../../../shared/components/form-builder3/form-builder3.component';
import { LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-document-type-mutate',
  standalone: true,
  templateUrl: './document-type-mutate.component.html',
  styleUrls: ['./document-type-mutate.component.css'],
  imports: [FormBuilder3Component],
})
export class DocumentTypeMutateComponent extends SingleFormMutateComponent<DocumentTypeControls> implements OnInit {
  override successText: string = $localize`با موفقیت ذخیره شد`;
  override entityApiService = inject(DocumentTypeApiService);
  override formSubmitLabel: string = $localize`ذخیره`;
  lanApi = inject(LanguageApiService);

  constructor() {
    super();
    this.controls = {
      language: new FormControl2('', {
        label: $localize`زبان`,
        type: 'select',
        validators: [Validators.required],
      }),
      title: new FormControl2('', {
        label: $localize`عنوان`,
        type: 'text',
        validators: [Validators.required],
      }),
      explain: new FormControl2('', {
        label: $localize`توضیحات`,
        type: 'text',
        validators: [Validators.required],
      }),
      pagecount: new FormControl2('', {
        label: $localize`تعداد صفحه`,
        type: 'number',
        validators: [Validators.required],
      }),
      hasIdnumber: new FormControl2(false, {
        label: $localize`شناسه`,
        type: 'checkbox',
        validators: [Validators.required],
      }),
      hasexpireDate: new FormControl2(false, {
        label: $localize`تاریخ`,
        type: 'checkbox',
        validators: [Validators.required],
      }),
    };
  }

  override async handleAfterPostInitialization(controls: DocumentTypeControls) {
    this.formLabel = $localize`ثبت نوع سند`;
    const languages = await lastValueFrom(this.lanApi.getAllLanguages());

    if (languages.length) {
      const options = languages.map((l) => l.title);
      controls.language.setValue(options[0]);
      controls.language.setObjOptions(languages);
      controls.language.options = options;
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
