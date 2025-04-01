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
export class DocumentTypeApiService implements GETApiService, AbstractMutateApiService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAll<DocumentTypeResponse>(
    path: string,
    param: HttpParams,
  ): Observable<DataWithListResponse<DocumentTypeResponse[]>> {
    return this.http.get<DataWithListResponse<DocumentTypeResponse[]>>(this.url + '/documentType/Paginated/' + path, {
      params: param,
    });
  }
  patch(entityId: string, values: object): Observable<unknown> {
    return this.http.patch(this.url + '/documentType/' + entityId, values);
  }
  post(values: object): Observable<unknown> {
    return this.http.post(this.url + '/documentType', values);
  }
}
export interface DocumentTypeResponse {
  _id: string;
  title: string;
  pagecount: number;
  explain: string;
  language: string;
  hasIdnumber: number;
  hasexpireDate: number;
  active: number;
  __v: number;
}
