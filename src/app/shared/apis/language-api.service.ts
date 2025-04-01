import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Observer, skipWhile } from 'rxjs';
import { Locale } from 'src/app/core/constants/locale.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllLanguages() {
    return this.http.get<{ data: Language[] }>(this.baseUrl + '/language').pipe(map((response) => response.data));
  }
  getBasedLocale(): Observable<Language> {
    return this.http.get<{ data: any }>(this.baseUrl + '/language').pipe(
      map((response) =>
        response.data.find((lan: Language) => {
          // environment.locale
          switch (environment.locale) {
            case Locale.EN:
              return lan.nikename === 'EN';
            case Locale.FA:
              return lan.nikename === 'IR';
          }
        }),
      ),
    );
  }
}

export interface Language {
  title: string;
  nikename: string;
  isLeft: number;
  id: string;
  icon: string;
}
