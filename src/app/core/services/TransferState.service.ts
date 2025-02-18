import { Injectable, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';

import { isPlatformServer, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TransferStateService {
  constructor(private transferState: TransferState, @Inject(PLATFORM_ID) private platformId: Object) {}

  // Method to set data in TransferState
  set<T>(key: string, data: T): void {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(makeStateKey<T>(key), data);
    }
  }

  // Method to get data from TransferState
  get<T>(key: string, defaultValue: T): T {
    if (isPlatformBrowser(this.platformId)) {
      return this.transferState.get(makeStateKey<T>(key), defaultValue);
    }
    return defaultValue;
  }
}
