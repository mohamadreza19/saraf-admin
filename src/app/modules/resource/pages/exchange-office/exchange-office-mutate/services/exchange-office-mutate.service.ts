import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, lastValueFrom, tap } from 'rxjs';

import { Language, LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { Module } from 'src/app/shared/apis/module-api.service';

import { DocApiService, DocumentModel } from 'src/app/shared/apis/doc-api.service';

import {
  FormArray2,
  FormControl2,
  FormSubmitEmit,
} from 'src/app/shared/components/form-builder2/form-builder2.component';

import { ConvertControlsToAny } from 'src/app/shared/types/convert-controls-to-any';

import { LoadingSnackbarService } from 'src/app/core/services/loading-snackbar.service';

import { ScrollService } from 'src/app/core/services/scroll.service';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';

import { PersonalFormService } from './personal-form.service';
import { ModuleFormService, ModulesControls } from './module-form.service';
import { FormLabels } from '../constants';
import { LegalFormService } from './legal-form.service';
import { DocFormService } from './doc-form.service';
import { ErrorWithFormLabel } from 'src/app/core/utils/error-with-form-label';

import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { BackwardModalComponent } from 'src/app/modules/resource/pages/exchange-office/components/backward-modal/backward-modal.component';
import { BackWardModalData } from '../types/backward-modal-data.interface';
import { BackWard } from 'src/app/shared/components/form-builder3/form-builder3.component';
import { FormSubmitService } from 'src/app/core/services/form-submit.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ExchangeOfficeMutateService {
  language$ = new BehaviorSubject<Language | null>(null);

  //

  formArray = new FormArray2([]);
  formStep$ = new BehaviorSubject(0);

  _exchangeId!: string;
  status$ = new BehaviorSubject<'checking-route' | 'route-checked'>('checking-route');

  intervalId: any;
  constructor(
    //

    private personalForm: PersonalFormService,
    private legalForm: LegalFormService,
    public moduleForm: ModuleFormService,
    private docForm: DocFormService,
    //

    private loadingSnackbar: LoadingSnackbarService,
    private formSubmit: FormSubmitService,
    private scroll: ScrollService,
    private router: Router,
    private modal: ModalService,
    private location: Location,
  ) {}
  beforeInit(params: any) {
    if ('exchangeId' in params) {
      this._exchangeId = params['exchangeId'];
      if (this._exchangeId) {
        lastValueFrom(this.personalForm.exchangeApi.getOneById(this._exchangeId))
          .then(({ data }) => {
            this.personalForm.beforeInit(data.exchangeInfo[0], this.formStep$);
            this.legalForm.beforeInit(data.exchangeCompany[0]);
            this.moduleForm.beforeInit(data.panelInfo[0]);

            this.docForm.beforeInit(data.alldoc);
          })
          .finally(() => this.status$.next('route-checked'));
      }
    } else this.status$.next('route-checked');
  }
  async initiate(
    addModuleTemplate: TemplateRef<any>,
    addDocTemplate: TemplateRef<any>,
    preReceiptTemplate: TemplateRef<any>,
  ) {
    this.status$.subscribe((status) => {
      // console.log(status);

      if (status == 'route-checked') {
        const personal = this.personalForm.generateForm();
        const legalForm = this.legalForm.generateForm();
        const moduleForm = this.moduleForm.generateForm(addModuleTemplate, preReceiptTemplate);
        const docForm = this.docForm.generateForm(addDocTemplate);

        this.personalForm.init(this.formArray, legalForm, this.language$);
        this.legalForm.init(this.language$);
        this.moduleForm.init(this.language$);
        this.docForm.init(this.language$);

        this.formArray.push(personal);
        // this.formArray.push(legalForm);
        this.formArray.push(moduleForm);
        this.formArray.push(docForm);
      }
    });
  }
  async apisCall() {
    this.personalForm.apisCall(this.language$);
    this.moduleForm.apisCall(this.language$);
    this.docForm.apisCall(this.language$);
  }

  async formFocus({ focusedForm, trigger, currentIndex, setStep }: FormSubmitEmit) {}

  async submit({ setStep, focusedForm }: FormSubmitEmit) {
    let forms: CustomFormGroup[] = [];
    let personalForm: CustomFormGroup;

    forms = this.formArray.controls as CustomFormGroup[];
    personalForm = forms[0];
    // temporary

    try {
      for (let [number, form] of forms.entries()) {
        if (form.valid) {
          this.formSubmit.onSend(form.rootLabel as string);
          switch (form.rootLabel) {
            case FormLabels.Personal:
              this._exchangeId = await lastValueFrom(this.personalForm.submit(this._exchangeId, form.getValues()));
              break;
            case FormLabels.Legal:
              await lastValueFrom(this.legalForm.submit(this._exchangeId, form.getValues()));
              break;

            case FormLabels.Modules:
              await lastValueFrom(
                this.moduleForm.submit(this._exchangeId, form.getValues() as ConvertControlsToAny<ModulesControls>),
              );

              break;
            case FormLabels.Document:
              await lastValueFrom(this.docForm.submit(this._exchangeId, form.getValues()));

              break;
          }
        }
        this.formSubmit.onfulfilled(form.rootLabel as string);
      }
      this.successNavigate(this._exchangeId);
    } catch (e) {
      this.formSubmit.onError(e, this.formArray, (fIndex) => setStep(fIndex));
    }
  }
  backNavigate(backward: BackWard) {
    let validFormLabels: string[] = [];
    const step = this.formStep$.getValue();

    if (step == this.formArray.controls.length - 1) {
      this.location.back();
      return;
    }
    for (const [_, form] of (this.formArray.controls as CustomFormGroup[]).entries()) {
      form.getValues();
      if (form.valid) {
        if (form.rootLabel) validFormLabels.push(form.rootLabel);
      }
    }
    const ref = this.modal.open(BackwardModalComponent, {
      width: '600px',
      maxHeight: 'auto',
      data: {
        onExist: () => {
          this.modal.close(ref);
          this.router.navigateByUrl('/resource/exchange-office');
        },
        onSaveAndExist: () => {
          this.modal.close(ref);
          this.submit(backward as FormSubmitEmit);
        },
        onStay: () => {
          this.modal.close(ref);
        },
        validFormLabels: validFormLabels,
      } as BackWardModalData,
    });
  }

  successNavigate(id: string) {
    this.router.navigateByUrl('/resource/exchange-office');
    this.scroll.scrollMainContentToTop();
    setTimeout(() => {
      this.loadingSnackbar.openSuccessTop(`صراف با id ${id} با موفقیت ذخیره شد`);
    }, 5000);
  }
  clear() {
    this.language$ = new BehaviorSubject<Language | null>(null);
    this.status$ = new BehaviorSubject<'checking-route' | 'route-checked'>('checking-route');
    this.intervalId = null;
    this._exchangeId = undefined as any;
    this.formArray = new FormArray2([]);
    this.formStep$ = new BehaviorSubject(0);

    this.personalForm.data = undefined as any;
    this.legalForm.data = undefined as any;
    this.moduleForm.data = undefined as any;
    this.docForm.data = undefined as any;
  }
}
