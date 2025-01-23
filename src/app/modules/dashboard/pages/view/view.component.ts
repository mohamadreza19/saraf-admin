import { Component, Input } from '@angular/core';
import { ViewHeaderComponent } from '../../components/view/view-header/view-header.component';
import { NftChartCardComponent } from '../../components/nft/nft-chart-card/nft-chart-card.component';
import { NftAuctionsTableComponent } from '../../components/nft/nft-auctions-table/nft-auctions-table.component';
import { ExchangeTableComponent } from '../../components/view/exchange-table/exchange-table.component';
import { exchangeOffice } from '../../models/exchange-office';
import { NgClass } from '@angular/common';
import { Employ } from '../../models/Employ';
import { Currency } from '../../models/Currency';
import { ExchangeBills } from '../../models/Exchange‌‌Bills';
import { MapComponent } from '../../components/map/map.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    ViewHeaderComponent,
    NftChartCardComponent,
    NftAuctionsTableComponent,
    ExchangeTableComponent,
    NgClass,
    MapComponent,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  titleOne = $localize`مبلغ کل درآمد فروش پنل`;
  //
  table1Keys: string[];
  table1Label = 'لیست صرافیها';
  table1Body: exchangeOffice[];
  table1ForbiddenKeysInItem: string[];
  table1IconsUrl!: string[];

  table2Keys: string[] = [];
  table2Label = 'لیست کارمندان';
  table2Body: Employ[] = [];
  table2ForbiddenKeysInItem: string[] = [];
  table2IconsUrl!: string[];

  table3Keys: string[] = [];
  table3Label = 'لیست واحدهای پولی';
  table3Body: Currency[] = [];
  table3ForbiddenKeysInItem: string[] = [];
  table3IconsUrl!: string[];

  table4Keys: string[] = [];
  table4Label = 'صورتحساب صرافی ها';
  table4Body: ExchangeBills[] = [];
  table4ForbiddenKeysInItem: string[] = [];
  table4IconsUrl!: string[];

  constructor() {
    this.table1Keys = ['اسم', 'کشور', 'وضعیت', 'تاریخ انقضاء', 'ID'];
    this.table1Body = [
      {
        name: 'نوبیتکس',
        country: 'ایران',
        iconUrl: 'assets/avatars/exchange-office1.jpg',
        status: true,
        expireDate: '1403/12/12',
        id: '123456789',
      },
      {
        name: 'ای او',
        country: 'ایران',
        iconUrl: 'assets/avatars/exchange-office2.jpg',
        status: true,
        expireDate: '1403/12/12',
        id: '123456789',
      },
    ];
    this.table1ForbiddenKeysInItem = ['iconUrl'];
    this.table1IconsUrl = this.table1Body.map((item) => item.iconUrl);
    //
    this.table2Keys = ['نام', 'شماره همراه', 'کد ملی'];
    this.table2Body = [
      {
        name: 'محمد رضا زرآینه',
        phoneNumber: '09032446913',
        code: '4242528003',
      },
      {
        name: 'علی افشار',
        phoneNumber: '09012444913',
        code: '4244523001',
      },
    ];
    //
    this.table3Keys = ['نام ارز', 'ID'];
    this.table3Body = [
      {
        name: 'ریال',
        id: '123456789',
      },
      {
        name: 'دلار',
        id: '123435459',
      },
      {
        name: 'یورو',
        id: '1232445459',
      },
    ];
    this.table4Keys = ['نام صرافی', 'شماره حساب', 'تاریخ صدور'];
    this.table4Body = [
      {
        name: 'نوبیتکس',
        accountNumber: '8395061498',
        issueDate: '1403/12/12',
      },
      {
        name: 'ای او',
        accountNumber: '1395061493',
        issueDate: '1403/12/12',
      },
    ];
  }
}
