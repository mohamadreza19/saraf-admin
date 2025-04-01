import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConvertControlsToAny } from '../types/convert-controls-to-any';
import { CountryControls } from 'src/app/modules/geographical/pages/country/country-mutate/country-mutate.component';
import { GETApiService } from 'src/app/core/services/pagination.service';
import { DataWithListResponse } from '../types/list-response.interface';
import { AbstractMutateApiService } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { ErrorWithFormLabel } from 'src/app/core/utils/error-with-form-label';
import { errorNormalizedWithFormLabel } from 'src/app/core/utils/error-normalized-with-form-label';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService implements GETApiService, AbstractMutateApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {}

  getAll<CountyResponse>(path: String, param: HttpParams): Observable<DataWithListResponse<CountyResponse>> {
    return this.http.get<DataWithListResponse<CountyResponse>>(this.baseUrl + '/country/Paginated/' + path, {
      params: param,
    });
  }
  getAllByLanguageId(languageId: string) {
    return this.http.get<{ data: CountyResponse[] }>(this.baseUrl + '/country/' + languageId).pipe(map((c) => c.data));
  }
  addCounty(body: ConvertControlsToAny<CountryControls>) {
    const formData = new FormData();

    for (const key in body) {
      formData.append(key, body[key as keyof ConvertControlsToAny<CountryControls>]);
    }

    return this.http.post(this.baseUrl + '/country', formData);
  }
  post(body: ConvertControlsToAny<CountryControls>) {
    return this.http.post(this.baseUrl + '/country', body).pipe(errorNormalizedWithFormLabel('ثبت کشور'));
  }
  patch(entityId: string, values: object) {
    return this.http
      .patch(this.baseUrl + '/country/' + entityId, values)
      .pipe(errorNormalizedWithFormLabel('ویرایش کشور'));
  }
}

export interface CountyResponse {
  title: string;
  countryPreCode: string;
  nikeName: string;
  icon: string;
  active: number;
  id: string;
}
