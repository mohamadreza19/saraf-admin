import { Component, inject, OnInit } from '@angular/core';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from 'src/app/shared/form-builder/form-builder.component';
import {
  FormBuilder2Component,
  FormControl2,
} from '../../../../../shared/components/form-builder2/form-builder2.component';
import {
  AbstractMutateApiService,
  SingleFormMutateComponent,
} from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { Validators } from '@angular/forms';
import { FormBuilder3Component } from '../../../../../shared/components/form-builder3/form-builder3.component';
import { CurrencyApiService } from 'src/app/shared/apis/currency-api.service';
import { Language, LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-currency-mutate',
  standalone: true,
  imports: [FormBuilderComponent, FormBuilder2Component, FormBuilder3Component],
  templateUrl: './currency-mutate.component.html',
})
export class CurrencyMutateComponent extends SingleFormMutateComponent<CurrencyControls> implements OnInit {
  override formSubmitLabel: string = 'ذخیره';
  override entityApiService = inject(CurrencyApiService);
  override successText: string = 'ارز با موفقیت ذخیره شده';
  lanApi = inject(LanguageApiService);

  constructor() {
    super();
    this.controls = {
      title: new FormControl2('', {
        type: 'text',
        label: 'نام',

        validators: [Validators.required],
      }),
      language: new FormControl2('', {
        type: 'select',
        label: 'زبان',
        optionObjImportantKey: 'id',
        validators: [Validators.required],
      }),
      currencyType: new FormControl2('', {
        type: 'select',
        label: 'نوع ارز',
        optionObjImportantKey: '_id',
        validators: [Validators.required],
      }),

      icon: new FormControl2('', {
        label: 'لگو',
        type: 'files',
        validators: [Validators.required],
      }),

      explain: new FormControl2('', {
        label: 'توضیحات',
        type: 'text',
        validators: [Validators.required],
      }),
      baseCoefficient: new FormControl2('', {
        label: 'ضریب پایه',
        type: 'number',
        validators: [Validators.required],
      }),
      baseCurrency: new FormControl2(true, {
        label: 'ارز پایه',
        type: 'checkbox',
        validators: [Validators.required],
      }),
      active: new FormControl2(true, {
        label: 'فعال',
        type: 'checkbox',
        validators: [Validators.required],
      }),
    };
  }
  override async handleAfterPostInitialization(controls: CurrencyControls) {
    this.formLabel = 'افزودن ارز';
    const languages = await lastValueFrom(this.lanApi.getAllLanguages());

    controls.language.setObjOptions(languages);
    controls.language.options = languages.map((l) => l.title);
    setTimeout(() => {
      controls.language.setValue(controls.language.options[0]);
    }, 300);

    controls.language.valueChanges.subscribe(async () => {
      const lan = controls.language.getSelectedOptionAsObject() as Language;

      const curTypes = await lastValueFrom(this.entityApiService.getAllCurrencyTypesByLanguageId(lan.id));

      controls.currencyType.setObjOptions(curTypes);
      controls.currencyType.options = curTypes.map((l) => l.title);
      controls.currencyType.setValue(controls.currencyType.options[0]);
    });
  }
  override handleAfterPatchInitialization(controls: CurrencyControls): void {
    this.formLabel = ' ویرایش ارز';
  }
  ngOnInit(): void {
    this.onInit();
  }
}

export interface CurrencyControls {
  title: FormControl2;
  explain: FormControl2;
  icon: FormControl2;
  baseCoefficient: FormControl2;
  baseCurrency: FormControl2;
  active: FormControl2;
  language: FormControl2;
  currencyType: FormControl2;
}
