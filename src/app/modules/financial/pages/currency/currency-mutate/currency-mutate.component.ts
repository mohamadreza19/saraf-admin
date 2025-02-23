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
  override formSubmitLabel: string = $localize`ذخیره`;
  override entityApiService = inject(CurrencyApiService);
  override successText: string = $localize`ارز با موفقیت ذخیره شده`;
  lanApi = inject(LanguageApiService);

  constructor() {
    super();
    this.controls = {
      language: new FormControl2('', {
        type: 'select',
        label: $localize`زبان`,
        optionObjImportantKey: 'id',
        validators: [Validators.required],
      }),
      currencyType: new FormControl2('', {
        type: 'select',
        label: $localize`نوع ارز`,
        optionObjImportantKey: '_id',
        validators: [Validators.required],
      }),
      title: new FormControl2('', {
        type: 'text',
        label: $localize`نام`,
        validators: [Validators.required],
      }),
      icon: new FormControl2('', {
        label: $localize`لگو`,
        type: 'files',
        validators: [Validators.required],
      }),
      explain: new FormControl2('', {
        label: $localize`توضیحات`,
        type: 'text',
        validators: [Validators.required],
      }),
      baseCoefficient: new FormControl2('', {
        label: $localize`ضریب پایه`,
        type: 'number',
        validators: [Validators.required],
      }),
      baseCurrency: new FormControl2(false, {
        label: $localize`ارز پایه`,
        type: 'checkbox',
        validators: [Validators.required],
      }),
    };
  }
  override async handleAfterPostInitialization(controls: CurrencyControls) {
    this.formLabel = $localize`افزودن ارز`;
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

    controls.baseCurrency.valueChanges.subscribe((val) => {
      if (val) {
        controls.baseCoefficient.setValue(0);
        controls.baseCoefficient.disable();
      } else {
        controls.baseCoefficient.enable();
      }
    });
  }
  override handleAfterPatchInitialization(controls: CurrencyControls): void {
    this.formLabel = $localize`ویرایش ارز`;
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
  language: FormControl2;
  currencyType: FormControl2;
}
