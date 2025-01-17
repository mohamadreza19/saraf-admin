import { AfterViewInit, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FINANCIAL_ACCOUNT_TYPES } from '../../constants/finantial-account-types';
import { NgFor, NgIf } from '@angular/common';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { CryptocurrencyAccount, CryptocurrencyAccountValues, InternationalAccount, IrBankAccount } from './controls';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { BANK_ACCOUNT_TYPES, BANK_ORIGIN } from './constants';
import { InputComponent } from '../../../../../../shared/components/input/input.component';
import { FormsModule } from '@angular/forms';
import { SubmitFinancialAccountModalData } from '../../types/add-financial-account-modal-data.interface';
import { AddFinancialAccountModalService } from './services/add-financial-account-modal.service';

@Component({
  selector: 'app-add-financial-account-modal',
  standalone: true,
  imports: [NgFor, NgIf, FormBuilder2Component, InputComponent, FormsModule],
  templateUrl: './add-financial-account-modal.component.html',
})
export class AddFinancialAccountModalComponent implements AfterViewInit {
  form!: CustomFormGroup | undefined;
  private _step!: string;

  @Input()
  set step(value: string) {
    this._step = value;
    this.form = this.service.handleChangeFormBasedStepChange(value);
  }

  get step(): string {
    return this._step;
  }

  accountTypes = FINANCIAL_ACCOUNT_TYPES;

  steps = Object.values(FINANCIAL_ACCOUNT_TYPES);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: SubmitFinancialAccountModalData,
    private service: AddFinancialAccountModalService,
  ) {}
  ngAfterViewInit(): void {
    this.form = this.service.initiateForms(this.data);
    this.step = this.service.initiateStep(this.data.step);
  }
}
