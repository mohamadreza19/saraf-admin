import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConvertControlsToAny } from '../types/convert-controls-to-any';

import { catchError, map, Observable, pipe, throwError } from 'rxjs';

import { ServerFieldsError } from '../types/validator-error.interface';

import { PersonalControls } from 'src/app/modules/resource/pages/exchange-office/exchange-office-mutate/services/personal-form.service';
import { LegalControls } from 'src/app/modules/resource/pages/exchange-office/exchange-office-mutate/services/legal-form.service';
import { DocBackEndStandardBody } from 'src/app/modules/resource/pages/exchange-office/exchange-office-mutate/services/doc-form.service';
import { ErrorWithFormLabel } from 'src/app/core/utils/error-with-form-label';
import { FormLabels } from 'src/app/modules/resource/pages/exchange-office/exchange-office-mutate/constants';
import { Pagination } from '../types/pagination.interface';
import { DataWithListResponse, ListResponse } from '../types/list-response.interface';
import { GETApiService } from 'src/app/core/services/pagination.service';

@Injectable({
  providedIn: 'root',
})
export class ExchangeApiService implements GETApiService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addExchange(body: ConvertControlsToAny<PersonalControls>) {
    return this.http
      .post<{
        data: {
          exchange: addExchangeResponse;
        };
      }>(this.url + '/exchange', body)
      .pipe(
        map(({ data }) => {
          return data.exchange._id;
        }),
        catchError((error: ServerFieldsError) => {
          return throwError(new ErrorWithFormLabel(FormLabels.Personal, error));
        }),
      );
  }
  patchExchangeById(exchangeId: string, body: ConvertControlsToAny<PersonalControls>) {
    return this.http
      .patch<{
        data: {
          exchange: addExchangeResponse;
        };
      }>(this.url + '/exchange/edit/' + exchangeId, body)
      .pipe(
        map(({ data }) => {
          return data.exchange._id;
        }),
        catchError((error: ServerFieldsError) => {
          return throwError(new ErrorWithFormLabel(FormLabels.Personal, error));
        }),
      );
  }
  patchCompanyInfoByExchangeId(exchangeId: string, body: ConvertControlsToAny<LegalControls>) {
    return this.http.patch(this.url + '/exchange/companyInfo/' + exchangeId, body).pipe(
      catchError((error: ServerFieldsError) => {
        return throwError(new ErrorWithFormLabel(FormLabels.Legal, error));
      }),
    );
  }
  patchDocumentInfoByExchangeId(exchangeId: string, body: DocBackEndStandardBody) {
    return this.http.patch(this.url + '/exchange/documentInfo/' + exchangeId, body).pipe(
      catchError((error: ServerFieldsError) => {
        return throwError(new ErrorWithFormLabel(FormLabels.Document, error));
      }),
    );
  }
  getAll<ExchangeResponse>(path: string, params: HttpParams) {
    return this.http.get<DataWithListResponse<ExchangeResponse[]>>(this.url + `/exchange`, {
      params: params,
    });
  }

  getOneById(id: string) {
    return this.http.get<{
      data: ExchangeDetailResponse;
    }>(this.url + '/exchange/' + id);
  }
}

export interface addExchangeResponse {
  mobile: string;
  mobileCode: string;
  name: string;
  family: string;
  nikename: string;
  gender: number;
  nationalcode: string;
  nationality: string;
  fathername: string;
  birthday: string;
  email: string;
  country: string;
  city: string;
  address: string;
  isExchange: number;
  language: string;
  postalcode: string;
  picture: Picture;
  nature: number;
  username: string;
  password: string;
  code: string;
  location: Location;
  active: number;
  step: number;
  isLaunched: number;
  codeLaunched: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Location {
  lat: string;
  lng: string;
}

export interface Picture {
  filename: string;
  path: string;
  _id: string;
}

export interface ExchangeResponse {
  name: string;
  family: string;
  mobile: string;
  email: string;
  nature: string;
  country: string;
  city: string;
  picture: string;
  active: number;
  step: number;
  id: string;
}

export interface ExchangeDetailResponse {
  exchangeInfo: Exchange[];
  exchangeCompany: ExchangeCompany[];
  panelInfo: PanelInfo[];
  exchangeConnection: any[];
  alldoc: Alldoc[];
}

export interface Alldoc {
  documentType: DocumentType;
  idNumber: string;
  expireDate: string;
  docFiles: string[];
}

export interface DocumentType {
  _id: string;
  pagecount: number;
}

export interface Exchange {
  location: Location;
  _id: string;
  mobile: string;
  mobileCode: string;
  name: string;
  family: string;
  nikename: string;
  gender: number;
  nationalcode: string;
  nationality: string;
  fathername: string;
  birthday: string;
  email: string;
  country: string;
  city: string;
  address: string;
  isExchange: number;
  language: string;
  postalcode: string;
  picture: string;
  nature: number;
  username: string;
  password: string;
  code: string;
  active: number;
  step: number;
  isLaunched: number;
  codeLaunched: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Location {
  lat: string;
  lng: string;
}

export interface Picture {
  filename: string;
  path: string;
  _id: string;
}

export interface ExchangeCompany {
  _id: string;
  exchangeId: string;
  title: string;
  tel: string;
  telCode: string;
  country: string;
  city: string;
  address: string;
  postalcode: string;
  location: Location;
  active: number;
  __v: number;
}

export interface PanelInfo {
  _id: string;
  exchangeId: string;
  item: Item[];
  accountNumber: string;
  isDeposit: number;
  depositStatus: number;
  receipt: null;
  active: number;
  __v: number;
}

export interface Item {
  module: string;
  extensionPriod: number;
  currency: string;
  extensionPrice: number;
  _id: string;
}
