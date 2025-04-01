import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl2 } from '../components/form-builder2/form-builder2.component';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<{ data: UserProfileResponse }>(this.url + '/users/profile');
  }
}

export interface UserProfileResponse {
  name: FormControl2;
  family: FormControl2;
  mobile: FormControl2;
  email: FormControl2;
  picture: FormControl2;
}
