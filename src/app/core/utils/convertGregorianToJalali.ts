import moment from 'moment-jalaali';

/**
 * Converts  Gregoriana  date string to a Jalali date string.
 * @param gregorianaDate - The Gregoriana date string (e.g., "2025-05-05").
 * @returns The Gregorian date string (e.g., "1404/02/05").
 */
export function convertGregorianTOJalali(gregorianaDate: string): string {
  if (gregorianaDate.includes('-')) {
    const date = moment(gregorianaDate);

    return date.format('jYYYY/jMM/jDD');
  }
  return gregorianaDate;
}
