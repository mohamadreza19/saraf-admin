import { ChangeDetectorRef, Component, ElementRef, Input, model } from '@angular/core';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { SubmitFinancialAccountModalData } from './types/add-financial-account-modal-data.interface';
import {
  CryptocurrencyAccountValues,
  InternationalAccountValues,
  IrBankAccount,
  IrBankAccountValues,
} from './components/add-financial-account-modal/controls';

import {
  CRYPTOCURRENCY_ACCOUNT_DATA,
  FINANCIAL_ACCOUNT_TYPES,
  INTERNATIONAL_ACCOUNT_DATA,
  IR_BANK_ACCOUNT_DATA,
} from './constants/finantial-account-types';
import { MobileTableComponent } from '../../../../shared/components/tables/mobile-table/mobile-table.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { getFormControlValues } from 'src/app/core/utils/get-form-control-values.util';
import { FinancialAccountService } from './financial-account.service';

@Component({
  selector: 'app-financial-account',
  standalone: true,
  imports: [ButtonComponent, MobileTableComponent, TableComponent],
  templateUrl: './financial-account.component.html',
  styleUrl: './financial-account.component.css',
})
export class FinancialAccountComponent {
  @Input()
  control!: FormControl2;

  irBankAccountList: IrBankAccountValues[] = [];
  internationalBankAccountList: InternationalAccountValues[] = [];
  cryptocurrencyBankAccountList: CryptocurrencyAccountValues[] = [];
  //
  irBankAccountTableConfig!: TableConfig;
  internationalBankAccountTableConfig!: TableConfig;
  cryptocurrencyBankAccountTableConfig!: TableConfig;

  constructor(el: ElementRef<HTMLElement>, public modal: ModalService, private service: FinancialAccountService) {
    el.nativeElement.className = 'col-span-2';
    // this.openAddModal();
    const data = [...IR_BANK_ACCOUNT_DATA, ...INTERNATIONAL_ACCOUNT_DATA, ...CRYPTOCURRENCY_ACCOUNT_DATA];

    for (let account of data) {
      switch (account.bankIdentity) {
        case FINANCIAL_ACCOUNT_TYPES.IR:
          this.handlePushIrBankAccount(account as IrBankAccountValues, this.irBankAccountList);
          break;
        case FINANCIAL_ACCOUNT_TYPES.INTERNATIONAL:
          this.handlePushInternationalBankAccount(
            account as InternationalAccountValues,
            this.internationalBankAccountList,
          );
          break;
        case FINANCIAL_ACCOUNT_TYPES.CRYPTOCURRENCY:
          this.handlePushCryptocurrencyAccount(
            account as CryptocurrencyAccountValues,
            this.cryptocurrencyBankAccountList,
          );
          break;
      }
    }

    // console.log(this.isIrBankAccountValues(this.accounts[0]));

    this.initiateIrBankAccountTable(this.irBankAccountList);
    this.initiateInternationalBankAccountTable(this.internationalBankAccountList);
    this.initiateCryptocurrencyBankAccountTable(this.cryptocurrencyBankAccountList);
  }

  async openAddModal() {
    const modal = this.modal;
    const { AddFinancialAccountModalComponent } = await import(
      './components/add-financial-account-modal/add-financial-account-modal.component'
    );

    const ref = this.modal.open(AddFinancialAccountModalComponent, {
      width: '600px',
      maxWidth: '600px',
      data: initiateData(this.irBankAccountList, this.internationalBankAccountList, this.cryptocurrencyBankAccountList),
    });

    function initiateData(
      irBankAccountList: IrBankAccountValues[],
      internationalBankAccountList: InternationalAccountValues[],
      cryptocurrencyBankAccountList: CryptocurrencyAccountValues[],
    ): SubmitFinancialAccountModalData {
      return {
        submitIrAccount: (form: CustomFormGroup) => {
          console.log(form);

          const values = getFormControlValues(form);
          irBankAccountList.push(values as IrBankAccountValues);

          modal.close(ref);
        },
        submitInternationalAccount: (form: CustomFormGroup) => {
          const values = getFormControlValues(form);
          internationalBankAccountList.push(values as InternationalAccountValues);

          modal.close(ref);
        },
        submitCryptocurrencyAccount: (form: CustomFormGroup) => {
          const values = getFormControlValues(form);
          cryptocurrencyBankAccountList.push(values as CryptocurrencyAccountValues);

          modal.close(ref);
        },
      };
    }
  }
  handlePushIrBankAccount(account: IrBankAccountValues, accountList: IrBankAccountValues[]) {
    accountList.push(account);
  }
  handlePushInternationalBankAccount(account: InternationalAccountValues, accountList: InternationalAccountValues[]) {
    accountList.push(account);
  }
  handlePushCryptocurrencyAccount(account: CryptocurrencyAccountValues, accountList: CryptocurrencyAccountValues[]) {
    accountList.push(account);
  }
  initiateIrBankAccountTable(irBankAccountList: IrBankAccountValues[]) {
    this.irBankAccountTableConfig = {
      title: 'لیست حساب‌های مربوط به بانک‌های ایرانی',
      tableHeader: [
        'هویت بانک',
        'نام بانک',
        'واحد ارزی',
        'شماره کارت',
        'شماره شبا',
        'نام کامل روی کارت',
        'نوع حساب',
        'موجودی اولیه',
        'حداقل هزینه انتقال',
        'ماکزیمم هزینه انتقال',
        'شماره حساب',
      ],
      tableBody: irBankAccountList,
    };
  }
  initiateInternationalBankAccountTable(internationalBankAccountList: InternationalAccountValues[]) {
    this.internationalBankAccountTableConfig = {
      title: 'لیست حساب‌های مربوط به بانک‌های بین المللی',
      tableHeader: [
        'هویت بانک',
        'نام بانک',
        'واحد ارزی',
        'کشور',
        'شماره کارت',
        'iban',
        'نام کامل روی کارت',
        'نوع حساب',
        'موجودی اولیه',
        'حداقل هزینه انتقال',
        'ماکزیمم هزینه انتقال',
        'swift',
        'نوع کارت',
      ],
      tableBody: internationalBankAccountList,
    };
  }
  initiateCryptocurrencyBankAccountTable(cryptocurrencyBankAccountList: CryptocurrencyAccountValues[]) {
    this.cryptocurrencyBankAccountTableConfig = {
      title: 'لیست حساب‌های مربوط به رمز ارز',
      tableHeader: [
        'هویت بانک',
        'ادرس حساب',
        'qrCode',
        'memo',
        'نوع ارز',
        'بستر انتقال',
        'موجودی اولیه',
        'حداقل هزینه انتقال',
        'ماکزیمم هزینه انتقال',
      ],
      tableBody: cryptocurrencyBankAccountList,
      assetIndexFromBody: 2,
    };
  }

  handleTable1ItemsRemove(rows: IrBankAccountValues[]) {
    const rowBankNames = new Set(rows.map((row) => row.bankName));

    this.irBankAccountList = this.irBankAccountList.filter((account) => !rowBankNames.has(account.bankName));

    this.irBankAccountTableConfig.tableBody = this.irBankAccountList;
  }
  handleTable2ItemsRemove(rows: InternationalAccountValues[]) {
    const rowBankNames = new Set(rows.map((row) => row.bankName));

    this.internationalBankAccountList = this.internationalBankAccountList.filter(
      (account) => !rowBankNames.has(account.bankName),
    );

    this.internationalBankAccountTableConfig.tableBody = this.internationalBankAccountList;
  }
  handleTable3ItemsRemove(rows: CryptocurrencyAccountValues[]) {
    const rowBankNames = new Set(rows.map((row) => row.accountNumber));

    this.cryptocurrencyBankAccountList = this.cryptocurrencyBankAccountList.filter(
      (account) => !rowBankNames.has(account.accountNumber),
    );

    this.cryptocurrencyBankAccountTableConfig.tableBody = this.internationalBankAccountList;
  }
}
