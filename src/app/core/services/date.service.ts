import { Injectable } from '@angular/core';
import { Jalali, Utils } from 'jalali-ts';

export class DateService {
  static convertPersianToIso86_without_T(persianDate: string) {
    // Example: "1403/09/19" (Persian date format)
    const [year, month, day] = persianDate.split('/').map(Number); // Split the date into year, month, and day

    return Utils.toDate(year, month, day).toISOString().split('T')[0];
  }
}
