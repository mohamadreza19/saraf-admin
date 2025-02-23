import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import e from 'express';
import { map, Observable } from 'rxjs';
import { AbstractMutateApiService } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { GETApiService } from 'src/app/core/services/pagination.service';
import { environment } from 'src/environments/environment';
import { DataWithListResponse } from '../types/list-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PanelRevivalApiService implements AbstractMutateApiService, GETApiService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAll<PanelRevivalResponse>(
    path: string,
    param: HttpParams,
  ): Observable<DataWithListResponse<PanelRevivalResponse[]>> {
    return this.http
      .get<DataWithListResponse<PanelRevivalResponse[]>>(this.url + '/panelRevival/' + path, {
        params: param,
      })
      .pipe(
        map((value) => {
          value.data.totalItems;
          const data = value.data as any;
          const totalItems = data.panelRevival;
          const pagination = data.pagination;
          return {
            ...value,
            data: {
              totalItems,
              pagination,
            },
          };
        }),
      );
  }
  patch(entityId: string, values: object): Observable<unknown> {
    return this.http.post(this.url + '/404/' + entityId, values);
  }
  post(values: object): Observable<unknown> {
    return this.http.post(this.url + '/panelRevival', values);
  }
}

export interface PanelRevivalResponse {
  _id: string;
  language: string;
  revivalCost: number;
  sellCost: number;
  currency: Currency;
  active: number;
  __v: number;
  moduls: Moduls;
}

interface Currency {
  _id: string;
  title: string;
}
export interface Moduls extends Currency {}
