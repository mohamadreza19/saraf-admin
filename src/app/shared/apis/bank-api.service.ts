import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GETApiService } from 'src/app/core/services/pagination.service';
import { environment } from 'src/environments/environment';
import { DataWithListResponse } from '../types/list-response.interface';
import { AbstractMutateApiService } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';

@Injectable({
  providedIn: 'root',
})
export class BankApiService implements GETApiService, AbstractMutateApiService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll<BankResponse>(path: string, param: HttpParams): Observable<DataWithListResponse<BankResponse[]>> {
    return this.http.get<DataWithListResponse<BankResponse[]>>(this.url + '/bank/Paginated/' + path, {
      params: param,
    });
  }
  patch(entityId: string, values: object): Observable<unknown> {
    return this.http.patch(this.url + '/bank/' + entityId, values);
  }
  post(values: object): Observable<unknown> {
    return this.http.post(this.url + '/bank', values);
  }
}
export interface BankResponse {
  title: string;
  explain: string;
  icon: string;
  active: number;
  currency: string;
  city: string;
  id: string;
}
