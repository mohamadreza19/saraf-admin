import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { TStorageService } from './storage-services/types';
import { CookieService } from './storage-services/cookie.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements TStorageService {
  constructor(private storage: CookieService) {}

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  removeItem(key: string): void {
    if (!key) throw Error("key doesn't found");
    if (key) this.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
