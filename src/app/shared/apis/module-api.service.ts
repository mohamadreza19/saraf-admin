import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConvertControlsToAny } from '../types/convert-controls-to-any';
import { ModulesControls } from 'src/app/modules/resource/pages/exchange-office/exchange-office-mutate/services/module-form.service';

@Injectable({
  providedIn: 'root',
})
export class ModuleApiService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllByLanguageId(languageId: string): Observable<Module[]> {
    return this.http.get<{ data: Module[] }>(this.baseUrl + '/module/' + languageId).pipe(map((res) => res.data));
  }
  patchByExchangeId(exchangeId: string, body: ConvertControlsToAny<ModulesControls>) {
    return this.http.patch(this.baseUrl + '/exchange/panelInfo/' + exchangeId, body);
  }
}

export interface Module {
  _id: string;
  title: string;
  language: string;
}
