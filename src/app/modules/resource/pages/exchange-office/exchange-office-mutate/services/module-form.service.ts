import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, combineLatest, lastValueFrom, take, takeLast } from 'rxjs';
import { FormArray2, FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { PreReceiptVal } from './control.service';
import { Validators } from '@angular/forms';

import { FormLabels, PERIODS } from '../constants';

import { CurrencyUnit, CurrencyApiService } from 'src/app/shared/apis/currency-api.service';
import { TemplateWithContext } from 'src/app/shared/components/form-builder3/types/template-wth-context.interface';
import { Module, ModuleApiService } from 'src/app/shared/apis/module-api.service';
import { BankAccount, BankAccountApiService } from 'src/app/shared/apis/bank-account-api.service';
import { ConvertControlsToAny } from 'src/app/shared/types/convert-controls-to-any';
import { AbstractFormService } from 'src/app/shared/types/abstract-form-service.interface';
import { Language } from 'src/app/shared/apis/language-api.service';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { PanelInfo, Item } from 'src/app/shared/apis/exchange-api.service';

@Injectable({
  providedIn: 'root',
})
export class ModuleFormService implements AbstractFormService {
  data?: PanelInfo;
  mainForm!: CustomFormGroup;
  moduleFormArray!: FormArray2;
  modules$ = new BehaviorSubject<Module[]>([]);
  currencyUnits$ = new BehaviorSubject<CurrencyUnit[]>([]);
  bankAccounts: BankAccount[] = [];
  intervalId: any;
  //
  constructor(
    private bankAccountApi: BankAccountApiService,
    private currencyUnitApi: CurrencyApiService,
    private moduleApi: ModuleApiService,
  ) {}
  generateControls(moduleFormArray: FormArray2, preReceiptTemplate: TemplateRef<any>): ModulesControls {
    return {
      info: moduleFormArray,
      discount_: new FormControl2('', {
        label: $localize`تخفیف`, // Marked for translation
        type: 'number',
        validators: [],
      }),
      accountNumber: new FormControl2('', {
        label: $localize`به حساب`, // Marked for translation
        type: 'select',
        optionObjImportantKey: 'id',
        options: [$localize`حسابی ثبت نشده`], // Marked for translation
        validators: [Validators.required],
        selectedOptionIndex: 0,
      }),
      preReceipt_: new FormControl2(
        {
          total: '0',
          discount: '0',
          availablePrice: '0',
          currencyUnit: 'null',
        } as PreReceiptVal,
        {
          templateRef: preReceiptTemplate,
          label: '', // No translation needed (empty label)
          type: 'text',
          validators: [],
        },
      ),
      isDeposit: new FormControl2('', {
        label: $localize`واریز انجام شده`, // Marked for translation
        type: 'checkbox',
        validators: [],
      }),
      depositStatus: new FormControl2(false, {
        label: $localize`واریز بدون مدرک مورد تایید است`, // Marked for translation
        type: 'checkbox',
        show: false,
        validators: [],
      }),
      receipt: new FormControl2([], {
        label: $localize`بارگزاری رسید واریز`, // Marked for translation
        type: 'files',
        show: false,
        validators: [],
      }),
    };
  }

  generateForm(addModuleTemplate: TemplateRef<any>, preReceiptTemplate: TemplateRef<any>) {
    this.moduleFormArray = new FormArray2([]);

    this.moduleFormArray.templateRef = addModuleTemplate;
    this.moduleFormArray.templateContext = {
      moduleFormArray: this.moduleFormArray,
      add: () => this.pushModuleForm(this.modules$, this.currencyUnits$),
      remove: (index: number) => this.removeModule(index),
    };

    const controls = this.generateControls(this.moduleFormArray, preReceiptTemplate);

    const form = new CustomFormGroup(controls, FormLabels.Modules, $localize`‍ادامه`);

    // this.moduleFormArray.valueChanges.subscribe((e) => {
    //   this.timeoutId = setTimeout(() => {
    //     if (this.timeoutId) {
    //       clearTimeout(this.timeoutId);
    //     }
    //     const currencyControls = this.moduleFormArray.controls.map((group) => group.get('currency')) as FormControl2[];

    //     let firstValue = null;
    //     for (let [number, formControl2] of currencyControls.entries()) {
    //       if (number == 0) firstValue = formControl2.value;
    //       else if (formControl2.value !== firstValue) formControl2.setValue(firstValue);
    //     }
    //   }, 400);
    // });
    this.mainForm = form;

    return form;
  }

  pushModuleForm(
    modules$: BehaviorSubject<Module[]>,
    currencyUnits$: BehaviorSubject<CurrencyUnit[]>,
  ): CustomFormGroup {
    const disableCurrency = this.moduleFormArray.length ? true : false;
    const formGroup = this.generateRequestModulesForm(modules$.getValue(), currencyUnits$.getValue(), disableCurrency);
    this.moduleFormArray.push(formGroup);

    return formGroup;
  }
  removeModule(index: number) {
    this.moduleFormArray.removeAt(index);
  }
  async apisCall(language$: BehaviorSubject<Language | null>) {
    language$.subscribe(async (language) => {
      if (language) {
        this.moduleFormArray.clear();

        const currencyUnits = await lastValueFrom(this.currencyUnitApi.getAllCurrencyTypesByLanguageId(language.id));

        const modules = await lastValueFrom(this.moduleApi.getAllByLanguageId(language.id));

        this.modules$.next(modules);
        this.currencyUnits$.next(currencyUnits);
      }
    });
  }
  private generateRequestModulesForm(
    availableModules: Module[],
    currencyUnits: CurrencyUnit[],

    disableCurrency: boolean,
  ) {
    const currency = new FormControl2('', {
      label: $localize`واحد`,
      type: 'select',
      validators: [Validators.required],
      options: currencyUnits.map((currencyUnit) => currencyUnit.title),
      objOptions: currencyUnits,
      optionObjImportantKey: '_id',
    });
    if (disableCurrency) {
      currency.disable();
    }

    const moduleControls: RequestedModulesControls = {
      module: new FormControl2('', {
        label: $localize`نام ماژول`,
        type: 'select',
        objOptions: availableModules,
        options: availableModules.map((m) => m.title),
        optionObjImportantKey: '_id',

        validators: [Validators.required],
      }),
      extensionPrice: new FormControl2('40000', {
        label: $localize`مبلغ`,
        type: 'number',
        validators: [Validators.required],
      }),
      currency: currency,
      extensionPriod: new FormControl2('', {
        label: $localize`مدت`,
        type: 'select',
        validators: [Validators.required],
        options: PERIODS.map((p) => p.title),
        optionObjImportantKey: 'value',
        objOptions: PERIODS,
      }),
    };
    return new CustomFormGroup(moduleControls, '');
  }

  init(language$: BehaviorSubject<Language | null>) {
    const { accountNumber, isDeposit, depositStatus, receipt, preReceipt_, discount_ }: ModulesControls = this.mainForm
      .controls as any;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    let firstCurrencyControl: FormControl2;

    language$.subscribe(async (language) => {
      if (language) {
        this.moduleFormArray.clear();

        const currencyUnits = await lastValueFrom(this.currencyUnitApi.getAllCurrencyTypesByLanguageId(language.id));
        const modules = await lastValueFrom(this.moduleApi.getAllByLanguageId(language.id));

        this.modules$.next(modules);
        this.currencyUnits$.next(currencyUnits);

        if (this.data) {
          let selectedCurrency: string | undefined;
          this.data.item.forEach((selectedModules, index) => {
            const firstFormGroup = this.pushModuleForm(this.modules$, this.currencyUnits$);
            const { currency, module, extensionPrice, extensionPriod }: RequestedModulesControls =
              firstFormGroup.controls as any;

            const mountedCurrency = currencyUnits.find((c) => c._id == selectedModules.currency);
            const mountedModule = modules.find((m) => m._id == selectedModules.module);
            const mountedPried = PERIODS.find((p) => p.value == selectedModules.extensionPriod);
            if (mountedCurrency) {
              currency.setValue(mountedCurrency.title);
            }
            if (mountedModule) {
              module.setValue(mountedModule.title);
            }
            if (mountedPried) {
              extensionPriod.setValue(mountedPried.title);
            }

            extensionPrice.setValue(selectedModules.extensionPrice);

            // currency.setValue()
            if (index == 0) {
              firstCurrencyControl = currency;
              selectedCurrency = selectedModules.currency;
            }
          });
          if (selectedCurrency) {
            const backAccountsBasedSelectedCurrency = await lastValueFrom(
              this.bankAccountApi.getAllByCurrencyId(selectedCurrency),
            );

            const mountedBankAccount = backAccountsBasedSelectedCurrency.data.totalItems.find(
              (bbsc) => bbsc.id == this.data?.accountNumber,
            );
            if (mountedBankAccount) {
              const str = `${mountedBankAccount.accountNumber}-${mountedBankAccount.bankName}`;
              accountNumber.setValue(str);
              accountNumber.objOptions = backAccountsBasedSelectedCurrency.data.totalItems;
              accountNumber.options = backAccountsBasedSelectedCurrency.data.totalItems.map(
                (ba) => `${ba.accountNumber}-${ba.bankName}`,
              );
            }
          }
          isDeposit.setValue(this.data.isDeposit ? true : false);
          if (this.data.depositStatus) {
            depositStatus.setValue(this.data.depositStatus);
            depositStatus.show = true;
          }
        } else {
          const firstFormGroup = this.pushModuleForm(this.modules$, this.currencyUnits$);
          const { currency }: RequestedModulesControls = firstFormGroup.controls as any;
          firstCurrencyControl = currency;
        }
      }

      if (firstCurrencyControl) {
        firstCurrencyControl.valueChanges.subscribe((val) => {
          const currencyObj = firstCurrencyControl.getSelectedOptionAsObject() as CurrencyUnit;
          if (currencyObj) this.setBankAccountControlBasedCurrencyUnit(currencyObj._id, accountNumber);
        });
      }
      this.intervalId = setInterval(() => {
        if (firstCurrencyControl) {
          this.observeFirstCurrencyControl(firstCurrencyControl.value, this.moduleFormArray);
          this.observeRequestedModulesPrices(
            this.moduleFormArray,
            discount_.value,
            firstCurrencyControl.value,
            preReceipt_,
          );
        }
      }, 1300);
    });

    isDeposit.valueChanges.subscribe((v) => {
      this.observeIsDeposit(v, depositStatus);
    });
    depositStatus.valueChanges.subscribe((v) => this.observeDepositStatus(v, receipt));
  }
  beforeInit(data: PanelInfo): void {
    this.data = data;
  }
  submit(exchangeId: string, values: ConvertControlsToAny<ModulesControls>) {
    return this.moduleApi.patchByExchangeId(exchangeId, values);
  }
  private observeFirstCurrencyControl(value: string, formArray: FormArray2) {
    for (const [index, formGroup] of formArray.controls.entries()) {
      if (index !== 0 && formGroup instanceof CustomFormGroup) {
        const { currency }: RequestedModulesControls = formGroup.controls as any;
        if (value) currency.setValue(value);
      }
    }
  }
  private async setBankAccountControlBasedCurrencyUnit(currencyId: string, accountNumberControl: FormControl2) {
    const bankAccounts = await lastValueFrom(this.bankAccountApi.getAllByCurrencyId(currencyId));

    if (bankAccounts && bankAccounts.data.totalItems.length) {
      accountNumberControl.setValue('');
      accountNumberControl.objOptions = bankAccounts.data.totalItems;
      accountNumberControl.options = bankAccounts.data.totalItems.map((ba) => `${ba.accountNumber}-${ba.bankName}`);
    }
  }
  private observeRequestedModulesPrices(
    formArray: FormArray2,
    discount: string,
    firstCurrency: string,
    preReceipt_: FormControl2,
  ) {
    const prices = formArray.controls.reduce((per, cur) => {
      if (cur instanceof CustomFormGroup) {
        const { extensionPrice }: RequestedModulesControls = cur.controls as any;
        const price = Number(extensionPrice.value);
        return per + price;
      }
      return per;
    }, 0);
    const preReceiptVales: PreReceiptVal = {
      total: String(prices),
      discount: discount,
      availablePrice: String(prices - Number(discount)),
      currencyUnit: firstCurrency,
    };

    preReceipt_.setValue(preReceiptVales);
  }
  private observeIsDeposit(isDeposit: boolean, depositStatusControl: FormControl2) {
    if (isDeposit) depositStatusControl.show = true;
    else depositStatusControl.show = false;
  }
  private observeDepositStatus(depositStatus: boolean, receiptControl: FormControl2) {
    if (!depositStatus) receiptControl.show = true;
    else receiptControl.show = false;
  }
}

export interface ModulesControls {
  info: FormArray2;
  discount_: FormControl2;
  accountNumber: FormControl2;
  preReceipt_: FormControl2;
  isDeposit: FormControl2;
  depositStatus: FormControl2;
  receipt: FormControl2;
}
export interface RequestedModulesControls {
  module: FormControl2;
  extensionPriod: FormControl2;
  extensionPrice: FormControl2;
  currency: FormControl2;
}
