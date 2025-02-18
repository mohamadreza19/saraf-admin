import { inject, Inject, Injectable } from '@angular/core';
import { TStorageService } from './types';
import { REQUEST_TOKEN, RESPONSE_TOKEN } from '../../tokens';
import { PlatformService } from '../platform.service';
import { CookieService as ClientCookieService } from 'ngx-cookie-service';
import { CookieOptions, Request, Response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class CookieService implements TStorageService {
  pt = inject(PlatformService);
  private clientCookie = this.pt.isBrowser ? inject(ClientCookieService) : (null as any);
  //
  private request: Request = this.pt.isServer ? inject(REQUEST_TOKEN) : (null as any);
  private response: Response = this.pt.isServer ? inject(RESPONSE_TOKEN) : (null as any);

  constructor() {}
  getItem(key: string): string | null {
    if (this.pt.isBrowser) return this.clientCookie.get(key);
    else if (this.pt.isServer) return this.request.cookies[key];
    else return null;
  }
  setItem(key: string, value: string, options: CookieOptions = {}): void {
    if (this.pt.isBrowser) this.clientCookie.set(key, value, options as any);
    else if (this.pt.isServer) this.response.cookie(key, value, options);
  }
  removeItem(key: string): void {
    if (!key) throw new Error('not Key Found');
    if (this.pt.isBrowser) this.clientCookie.delete(key);
    else if (this.pt.isServer) this.response.clearCookie(key);
  }
  clear(): void {
    if (this.pt.isBrowser) this.clientCookie.deleteAll();
    else if (this.pt.isServer) {
      for (let cookie in this.request.cookies) {
        this.response.clearCookie(cookie);
      }
    }
  }
}
