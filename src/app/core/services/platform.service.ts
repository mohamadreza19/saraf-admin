import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root', // Make it available application-wide
})
export class PlatformService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Check if the code is running in the browser.
   */
  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Check if the code is running on the server.
   */
  get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }
}
