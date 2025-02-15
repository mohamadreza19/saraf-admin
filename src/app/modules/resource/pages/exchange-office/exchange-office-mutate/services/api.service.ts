import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(http: HttpClient) {}
}

export interface ExchangeOffice {
  mobile: string;
  name: string;
  family: string;
  nikename: string;
  gender: number;
  nationalcode: string;
  nationality: string;
  fathername: string;
  birthday: string;
  email: string;
  country: string;
  city: string;
  address: string;
  isExchange: number;
  language: string;
  postalcode: string;
  nature: number;
  location: {
    lat: string;
    lng: string;
  };
  picture: string;
}
