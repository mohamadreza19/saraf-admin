import { Component, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { SingleFormMutateComponent } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { CurrencyApiService } from 'src/app/shared/apis/currency-api.service';
import { Language, LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { ModuleApiService } from 'src/app/shared/apis/module-api.service';
import { PanelRevivalApiService } from 'src/app/shared/apis/panel-revival-api.service';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { FormBuilder3Component } from '../../../../../../shared/components/form-builder3/form-builder3.component';

@Component({
  selector: 'app-panel-revival-mutate',
  templateUrl: './panel-revival-mutate.component.html',
  styleUrls: ['./panel-revival-mutate.component.css'],
  standalone: true,
  providers: [],
  imports: [FormBuilder3Component],
})
export class PanelRevivalMutateComponent extends SingleFormMutateComponent<PanelRevivalControls> implements OnInit {
  override entityApiService = inject(PanelRevivalApiService);
  override formLabel: string = $localize`افزودن احیای پنل`;

  lanApi = inject(LanguageApiService);
  currencyApi = inject(CurrencyApiService);
  moduleApi = inject(ModuleApiService);
  constructor() {
    super();
    this.controls = {
      language: new FormControl2('', {
        type: 'select',
        label: $localize`زبان`,
        validators: [Validators.required],
        optionObjImportantKey: 'id',
      }),
      module: new FormControl2('', {
        type: 'select',
        label: $localize`ماژول`,
        validators: [Validators.required],
        optionObjImportantKey: '_id',
      }),
      currency: new FormControl2('', {
        type: 'select',
        label: $localize`واحد پول`,
        validators: [Validators.required],
        optionObjImportantKey: 'id',
      }),

      revivalCost: new FormControl2('', {
        type: 'number',
        label: $localize`هزینه احیا`,
        validators: [Validators.required, Validators.min(0)],
      }),
      sellCost: new FormControl2('', {
        type: 'number',
        label: $localize`هزینه فروش`,
        validators: [Validators.required, Validators.min(0)],
      }),
    };
  }
  override async handleAfterPostInitialization(controls: PanelRevivalControls) {
    const languages = await lastValueFrom(this.lanApi.getAllLanguages());

    const { language, module, currency } = controls;

    const lanOptions = languages.map((l) => l.title);

    language.options = lanOptions;
    language.setObjOptions(languages);

    setTimeout(() => {
      language.setValue(lanOptions[0]);
    }, 300);

    language.valueChanges.subscribe(async () => {
      const mountedLanguage = language.getSelectedOptionAsObject() as Language;

      //

      const modules = await lastValueFrom(this.moduleApi.getAllByLanguageId(mountedLanguage.id));
      const moduleOptions = modules.map((l) => l.title);
      module.options = moduleOptions;
      module.setObjOptions(modules);
      //
      const currencies = await lastValueFrom(this.currencyApi.getAllByLanguageId(mountedLanguage.id));
      const currencyOptions = currencies.map((l) => l.title);
      currency.options = currencyOptions;
      currency.setObjOptions(currencies);
    });
  }
  ngOnInit() {
    this.onInit();
  }
}

export interface PanelRevivalControls {
  module: FormControl2;
  currency: FormControl2;
  language: FormControl2;
  revivalCost: FormControl2;
  sellCost: FormControl2;
}
