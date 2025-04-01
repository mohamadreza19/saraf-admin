import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import {
  FormControl2,
  FormBuilder2Component,
  FormSubmitEmit,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import { HeaderButtonsComponent } from '../../../../financial/components/header-buttons/header-buttons.component';
import { Router } from '@angular/router';
import { FormBuilder3Component } from '../../../../../shared/components/form-builder3/form-builder3.component';
import { LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { CountryApiService } from 'src/app/shared/apis/country-api.service';
import { lastValueFrom } from 'rxjs';
import { Validators } from '@angular/forms';
import {
  AbstractMutateApiService,
  SingleFormMutateComponent,
} from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { fileLengthValidator } from 'src/app/shared/validators/file-length-validator';

@Component({
  selector: 'app-country-mutate',
  templateUrl: './country-mutate.component.html',
  styleUrls: ['./country-mutate.component.css'],
  standalone: true,
  imports: [FormBuilder2Component, HeaderButtonsComponent, FormBuilder3Component],
})
export class CountryMutateComponent extends SingleFormMutateComponent<CountryControls> implements OnInit {
  override formLabel: string = '';
  override formSubmitLabel: string = this.formLabel;
  override entityApiService = inject(CountryApiService);
  override successText: string = $localize`کشور با موفقیت ذخیره شد`;

  languageApi = inject(LanguageApiService);

  constructor() {
    super();

    this.controls = {
      language: new FormControl2('', {
        label: $localize`انتخاب زبان`,
        type: 'select',
        validators: [Validators.required],
        options: [],
        optionObjImportantKey: 'id',
        objOptions: [],
      }),
      title: new FormControl2('', {
        label: $localize`نام کشور`,
        type: 'text',
        validators: [Validators.required],
      }),
      icon: new FormControl2([], {
        label: $localize`پرچم`,
        type: 'files',
        validators: [Validators.required, fileLengthValidator(1)],
      }),
      nikename: new FormControl2('', {
        label: $localize`مخفف`,
        type: 'text',
        validators: [Validators.required],
      }),
      countryPreCode: new FormControl2('', {
        label: $localize`پیش شماره`,
        type: 'number',
        validators: [Validators.required],
      }),
    };
  }

  ngOnInit(): void {
    this.onInit();
  }

  override async handleAfterPostInitialization(controls: CountryControls) {
    this.formLabel = $localize`ثبت کشور`;
    const languages = await lastValueFrom(this.languageApi.getAllLanguages());
    const { language } = controls;

    language.options = languages.map((l) => l.title);
    language.setObjOptions(languages);
    language.setValue(language.options[0]);
  }

  override async handleAfterPatchInitialization(controls: CountryControls) {
    this.formLabel = $localize`ویرایش کشور`;
  }
}

export interface CountryControls {
  title: FormControl2;
  nikename: FormControl2;
  countryPreCode: FormControl2;
  language: FormControl2;
  icon: FormControl2;
}
