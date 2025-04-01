import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractMutateApiService } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnectionApiService implements AbstractMutateApiService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  patch(entityId: string, values: object) {
    return this.http.patch(this.url + '/exchange/connectionInfo/' + entityId, values);
  }
  post(values: object) {
    return this.http.post(this.url + '404', values);
  }
}
