import { Component, OnInit } from '@angular/core';
import { CustomFormControl, CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { HeaderButtonsComponent } from '../../components/header-buttons/header-buttons.component';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { CurrencyApiService } from 'src/app/shared/apis/currency-api.service';
import { lastValueFrom } from 'rxjs';
import { FaCurrencyType, EnCurrencyType } from './constants';
import { BankAccountRouterLinkQuery } from './types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [HeaderButtonsComponent, TableComponent, RouterLink, NgIf],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.css',
})
export class BankAccountComponent implements OnInit {
  tableConfig!: TableConfig;
  languageId = '';

  irCurTypeId = '';
  cryptoCurTypeId = '';
  visaCurTypeId = '';
  materCurTypeId = '';

  constructor(
    private router: Router,
    private languageApi: LanguageApiService,

    private currencyApi: CurrencyApiService,
  ) {}

  async ngOnInit() {
    const language = await lastValueFrom(this.languageApi.getBasedLocale());
    this.languageId = language.id;
    const currencyTypes = await lastValueFrom(this.currencyApi.getAllCurrencyTypesByLanguageId(language.id));

    for (const currencyType of currencyTypes) {
      const title = currencyType.title.toLocaleLowerCase();

      if (title.includes(EnCurrencyType.Ir) || title.includes(FaCurrencyType.Ir)) {
        this.irCurTypeId = currencyType._id;
      } else if (title.includes(EnCurrencyType.Crypto) || title.includes(FaCurrencyType.Crypto)) {
        this.cryptoCurTypeId = currencyType._id;
      } else if (title.includes(EnCurrencyType.Master) || title.includes(FaCurrencyType.Master)) {
        this.materCurTypeId = currencyType._id;
      } else if (title.includes(EnCurrencyType.VisaCard) || title.includes(FaCurrencyType.VisaCard)) {
        this.visaCurTypeId = currencyType._id;
      }
    }
  }
  generateParam(currencyTypeId: string, languageId: string): BankAccountRouterLinkQuery {
    return {
      currencyTypeId,
      languageId,
    };
  }
}
