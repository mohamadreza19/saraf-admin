import { Injectable } from '@angular/core';
import { Jalali } from 'jalali-ts';

@Injectable({
  providedIn: 'root',
})
export class JalaliDateService {
  // Method to get the Jalali date
  getJalaliDate(): string {
    const now = new Date();
    const jDate = new Jalali(now);

    return `${jDate.getFullYear()}/${this.padZero(jDate.getMonth() + 1)}/${this.padZero(jDate.getDate())}`;
  }

  // Method to get the current time
  getTime(): string {
    const now = new Date();
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());
    const seconds = this.padZero(now.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  // Helper method to add leading zero if needed
  private padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
