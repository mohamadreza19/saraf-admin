import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { PlatformService } from 'src/app/core/services/platform.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken'; // Key for storing the token in local storage
  constructor(public storage: StorageService) {}
  saveToken(token: string): void {
    this.storage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.storage.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.storage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Check if the token exists
  }
}
