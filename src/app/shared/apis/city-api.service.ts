import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GETApiService } from 'src/app/core/services/pagination.service';
import { environment } from 'src/environments/environment';
import { DataWithListResponse } from '../types/list-response.interface';
import { AbstractMutateApiService } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { errorNormalizedWithFormLabel } from 'src/app/core/utils/error-normalized-with-form-label';

@Injectable({
  providedIn: 'root',
})
export class CityApiService implements GETApiService, AbstractMutateApiService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAll<CityResponse>(path: string, param: HttpParams): Observable<DataWithListResponse<CityResponse[]>> {
    return this.http.get<DataWithListResponse<CityResponse[]>>(this.baseUrl + '/city/Paginated/' + path, {
      params: param,
    });
  }

  getAllByCountyId(countyId: string) {
    return this.http.get<{ data: CityResponse[] }>(this.baseUrl + '/city/' + countyId).pipe(map((c) => c.data));
  }
  post(values: object) {
    return this.http.post(this.baseUrl + '/city', values).pipe(errorNormalizedWithFormLabel('ثبت شهر'));
  }
  patch(entityId: string, values: object) {
    return this.http.patch(this.baseUrl + '/city' + entityId, values);
  }
}
export interface CityResponse {
  _id: string;
  title: string;
  country: string;
  language: string;
  active: number;
  __v: number;
}
