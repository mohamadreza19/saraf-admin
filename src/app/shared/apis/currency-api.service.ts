import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LanguageApiService } from './language-api.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private baseUrl = environment.apiUrl;

  constructor(private lanApi: LanguageApiService, private http: HttpClient) {}

  getAllCurrencyTypesByLanguageId(languageId: string): Observable<CurrencyUnit[]> {
    return this.http
      .get<{ data: CurrencyUnit[] }>(this.baseUrl + '/currencyType/' + languageId)
      .pipe(map((res) => res.data));
  }
}

export interface CurrencyUnit {
  _id: string;
  language: string;
  title: string;
}
