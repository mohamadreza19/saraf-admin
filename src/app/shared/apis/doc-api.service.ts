import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocApiService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllDocumentTypesByLanguageId(languageId: string) {
    return this.http
      .get<{ data: DocumentModel[] }>(this.baseUrl + '/documentType/' + languageId)
      .pipe(map((d) => d.data));
  }
}

export interface DocumentModel {
  _id: string; // Unique identifier for the document
  title: string; // Title of the document
  pagecount: number; // Number of pages in the document
  explain: string; // Notes or explanation about the document
  language: string; // Language ID associated with the document
  hasIdnumber: boolean; // Whether the document includes an ID number (0 = false, 1 = true)
  hasexpireDate: boolean; // Whether the document has an expiration date (0 = false, 1 = true)
  active: boolean; // Status of the document (0 = inactive, 1 = active)
  __v: number; // Version key for Mongoose (optional)
}
