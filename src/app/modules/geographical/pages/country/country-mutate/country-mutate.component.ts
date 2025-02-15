import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import {
  FormControl2,
  FormBuilder2Component,
  FormArray2,
  FormSubmitEmit,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { Lan } from '../../../constants/lan.enum';
import { HeaderButtonsComponent } from '../../../../financial/components/header-buttons/header-buttons.component';
import { Router } from '@angular/router';
import { FormBuilder3Component } from '../../../../../shared/components/form-builder3/form-builder3.component';
import { Language, LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { CountryApiService } from 'src/app/shared/apis/country-api.service';
import { lastValueFrom } from 'rxjs';
import { Validators } from '@angular/forms';
import { ConvertControlsToAny } from 'src/app/shared/types/convert-controls-to-any';
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
  override successText: string = 'کشور با موفقیت ذخیره شد';

  languageApi = inject(LanguageApiService);

  constructor() {
    super();

    this.controls = {
      language: new FormControl2('', {
        label: 'انتخاب زبان',
        type: 'select',
        validators: [Validators.required],
        options: [],
        optionObjImportantKey: 'id',
        objOptions: [],
      }),
      title: new FormControl2('', {
        label: 'نام کشور',
        type: 'text',
        validators: [Validators.required],
      }),
      icon: new FormControl2([], {
        label: 'پرچم',
        type: 'files',
        validators: [Validators.required, fileLengthValidator(1)],
      }),
      nikename: new FormControl2('', {
        label: 'مخفف',
        type: 'text',
        validators: [Validators.required],
      }),
      countryPreCode: new FormControl2('', {
        label: 'پیش شماره',
        type: 'number',
        validators: [Validators.required],
      }),
    };
  }

  async ngAfterViewInit() {
    // const languages = await lastValueFrom(this.languageApi.getAllLanguages());
    // const form = this.generateForm(languages);
    // const { language }: CountryControls = form.controls as any;
    // language.setValue(language.options[1]);
    // this.formArray.push(form);
  }

  ngOnInit(): void {
    this.onInit();
  }
  override async handleAfterPostInitialization(controls: CountryControls) {
    this.formLabel = 'ثبت کشور';
    const languages = await lastValueFrom(this.languageApi.getAllLanguages());
    const { language } = controls;

    language.options = languages.map((l) => l.title);

    language.setObjOptions(languages);
    language.setValue(language.options[0]);
  }
  override async handleAfterPatchInitialization(controls: CountryControls) {
    this.formLabel = 'ویرایش کشور';
  }
}

export interface CountryControls {
  title: FormControl2;
  nikename: FormControl2;
  countryPreCode: FormControl2;
  language: FormControl2;
  icon: FormControl2;
}
