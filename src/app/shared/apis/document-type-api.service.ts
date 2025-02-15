import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GETApiService } from 'src/app/core/services/pagination.service';
import { environment } from 'src/environments/environment';
import { DataWithListResponse } from '../types/list-response.interface';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeApiService implements GETApiService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAll<DocumentTypeResponse>(
    path: string,
    param: HttpParams,
  ): Observable<DataWithListResponse<DocumentTypeResponse[]>> {
    return this.http.get<DataWithListResponse<DocumentTypeResponse[]>>(this.url + '');
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
