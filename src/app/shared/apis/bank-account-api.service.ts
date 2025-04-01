import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Locale } from 'src/app/core/constants/locale.enum';
import { environment } from 'src/environments/environment';
import { DataWithListResponse } from '../types/list-response.interface';
import { GETApiService } from 'src/app/core/services/pagination.service';
import { ConvertControlsToAny } from '../types/convert-controls-to-any';
import { CryptoControls } from 'src/app/modules/financial/pages/bank-account/pages/crypto/pages/crypto-mutate/crypto-mutate.component';
import { GlobalControls } from 'src/app/modules/financial/pages/bank-account/components/base-mutate/base-mutate.component';
import { IRControls } from 'src/app/modules/financial/pages/bank-account/pages/ir/pages/ir-mutate/ir-mutate.component';

@Injectable({
  providedIn: 'root',
})
export class BankAccountApiService implements GETApiService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAll<BankAccount>(path: string, param: HttpParams): Observable<DataWithListResponse<BankAccount[]>> {
    return this.http.get<DataWithListResponse<BankAccount[]>>(this.baseUrl + '/accountInfo/' + path, {
      params: param,
    });
  }

  getAllByCurrencyId(currencyId: string): Observable<DataWithListResponse<BankAccount[]>> {
    return this.http.get<DataWithListResponse<BankAccount[]>>(
      this.baseUrl + '/accountInfo/' + currencyId + '?limit=999',
    );
  }
  postCrypto(values: ConvertControlsToAny<CryptoControls>) {
    return this.http.post(this.baseUrl + '/accountInfo/crypto', values);
  }
  postVisaCard(values: ConvertControlsToAny<GlobalControls>) {
    return this.http.post(this.baseUrl + '/accountInfo/visa', values);
  }
  postMasterCard(values: ConvertControlsToAny<GlobalControls>) {
    return this.http.post(this.baseUrl + '/accountInfo/master', values);
  }
  postIr(values: ConvertControlsToAny<IRControls>) {
    return this.http.post(this.baseUrl + '/accountInfo/ir', values);
  }
  patchAccount(entityId: string, values: any) {
    return this.http.patch(this.baseUrl + '/accountInfo/changeStatus/' + entityId, values);
  }

  private convertEnCurrencyTypeToFa(type: string) {
    switch (type) {
      case CurrencyType.IR:
        return FaCurrencyType.IR;
      case CurrencyType.MasterCard:
        return FaCurrencyType.MasterCard;
      case CurrencyType.VisaCard:
        return FaCurrencyType.VisaCard;
      case CurrencyType.crypto:
        return FaCurrencyType.crypto;
      default:
        return type;
    }
  }
}
export type BankAccount = MasterCardBankAccount | VisaCardBankAccount | CryptoBankAccount | IRBankAccount;

export interface MasterCardBankAccount {
  bankName: string;
  branchName: string;
  currencyName: string;
  accountNumber: string;
  memo: string;
  transferPlatform: string;
  cardNumber: string;
  irNumber: string;
  cardName: string;
  iban: string;
  country: string;
  city: string;
  currencyType: string;
  active: number; // Use `boolean` if `active` is a binary flag (e.g., 1 for true, 0 for false)
  id: string;
}

export interface VisaCardBankAccount {
  bankName: string;
  branchName: string;
  currencyName: string;
  accountNumber: string;
  memo: string;
  transferPlatform: string;
  cardNumber: string;
  irNumber: string;
  cardName: string;
  iban: string;
  country: string;
  city: string;
  currencyType: string; // Typically "VisaCard"
  active: number; // Or `boolean` if it represents a true/false value
  id: string;
}

export interface CryptoBankAccount {
  bankName: string;
  branchName: string;
  currencyName: string; // Name of the cryptocurrency
  accountNumber: string;
  memo: string; // Additional information about the transaction/account
  transferPlatform: string; // The platform or exchange being used (e.g., Binance, Coinbase)
  cardNumber: string;
  irNumber: string;
  cardName: string;
  iban: string;
  country: string;
  city: string;
  currencyType: string; // Typically "crypto"
  active: number; // Or `boolean` if it represents a true/false value
  id: string;
}

export interface IRBankAccount {
  bankName: string; // Name of the bank
  branchName: string; // Name of the branch
  currencyName: string; // Name of the currency (optional)
  accountNumber: string; // Account number
  memo: string; // Additional information (optional)
  transferPlatform: string; // Platform for transfers (optional)
  cardNumber: string; // Card number
  irNumber: string; // IR number (e.g., IBAN for Iran)
  cardName: string; // Name on the card (optional)
  iban: string; // IBAN (optional)
  country: string; // Country
  city: string; // City
  currencyType: string; // Should be "IR" for Iranian accounts
  active: number; // Active status (1 for active, 0 for inactive)
  id: string; // Unique identifier for the account
}
export enum CurrencyType {
  IR = 'IR',
  crypto = 'crypto',
  VisaCard = 'VisaCard',
  MasterCard = 'MasterCard',
}
export enum FaCurrencyType {
  IR = 'بانک های ایرانی',
  crypto = 'رمزارز',
  VisaCard = 'ویزا کارت',
  MasterCard = 'مستر کارت',
}
