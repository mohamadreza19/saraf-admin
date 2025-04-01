import { PlatformService } from '../platform.service';

export interface TStorageService {
  pt?: PlatformService;
  getItem(key: string): string | null;

  setItem(key: string, value: string): void;

  removeItem(key: string): void;

  clear(): void;
}
