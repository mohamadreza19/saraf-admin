import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Locale } from 'src/app/core/constants/locale.enum';
import { CurrencyApiService, CurrencyResponse } from 'src/app/shared/apis/currency-api.service';
import { Language, LanguageApiService } from 'src/app/shared/apis/language-api.service';

@Component({
  selector: 'app-base-currency',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './base-currency.component.html',
  styleUrl: './base-currency.component.scss',
})
export class BaseCurrencyComponent implements OnInit {
  lanApi = inject(LanguageApiService);
  currencyApi = inject(CurrencyApiService);
  imgUrl = 'https://cdn-icons-png.flaticon.com/512/1490/1490853.png';
  localeId = inject(LOCALE_ID);

  items: CurrencyResponse[] = [];

  selectedItem!: CurrencyResponse;

  showSelectBox: boolean = false;
  async ngOnInit() {
    let mountedLanguage: Language | undefined;

    const languages = await lastValueFrom(this.lanApi.getAllLanguages());

    switch (this.localeId) {
      case Locale.FA:
        mountedLanguage = languages.find((l) => l.title == 'Persian');
        break;
      case Locale.EN:
        mountedLanguage = languages.find((l) => l.title == 'English');
        break;
    }

    if (mountedLanguage) {
      const params = new HttpParams().set('page', 1).set('limit', 999);
      const response = await lastValueFrom(this.currencyApi.getAll(mountedLanguage.id, params));

      this.items = response.data.totalItems as CurrencyResponse[];

      this.items.forEach((cur) => {
        if (cur.baseCurrency) {
          this.selectedItem = cur;
        }
      });
    }
  }

  open() {
    this.showSelectBox = true;
  }

  close() {
    this.showSelectBox = false;
  }
  async handleSelect(baseCurrency: CurrencyResponse) {
    await lastValueFrom(this.currencyApi.patchBase(baseCurrency.id));
    this.selectedItem = baseCurrency;
    this.close();
  }
}
