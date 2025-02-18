import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LanguageApiService } from './language-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { GETApiService } from 'src/app/core/services/pagination.service';
import { DataWithListResponse } from '../types/list-response.interface';
import { AbstractMutateApiService } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { errorNormalizedWithFormLabel } from 'src/app/core/utils/error-normalized-with-form-label';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService implements GETApiService, AbstractMutateApiService {
  private baseUrl = environment.apiUrl;

  constructor(private lanApi: LanguageApiService, private http: HttpClient) {}

  getAllCurrencyTypesByLanguageId(languageId: string): Observable<CurrencyUnit[]> {
    return this.http
      .get<{ data: CurrencyUnit[] }>(this.baseUrl + '/currencyType/' + languageId)
      .pipe(map((res) => res.data));
  }
  getOneById(entityId: string) {
    return this.http.get(this.baseUrl + '/currency/' + entityId);
  }
  getAll<CurrencyResponse>(path: string, param: HttpParams): Observable<DataWithListResponse<CurrencyResponse[]>> {
    return this.http.get<DataWithListResponse<CurrencyResponse[]>>(this.baseUrl + '/currency/Paginated/' + path, {
      params: param,
    });
  }

  post(values: object): Observable<unknown> {
    return this.http.post(this.baseUrl + '/currency', values).pipe(errorNormalizedWithFormLabel('افزودن ارز'));
  }
  patch(entityId: string, values: object): Observable<unknown> {
    return this.http.patch(this.baseUrl + '/currency/' + entityId, values);
  }
}

export interface CurrencyUnit {
  _id: string;
  language: string;
  title: string;
}

export interface CurrencyResponse {
  title: string;
  explain: string;
  icon: string;
  baseCoefficient: number;
  baseCurrency: number;
  active: number;
  id: string;
}
