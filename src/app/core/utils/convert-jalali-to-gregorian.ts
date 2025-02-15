import moment from 'moment-jalaali';

/**
 * Converts a Jalali date string to a Gregorian date string.
 * @param jalaliDate - The Jalali date string (e.g., "1404/02/05").
 * @returns The Gregorian date string (e.g., "2025-04-25").
 */
export function convertJalaliToGregorian(jalaliDate: string): string {
  // Parse the Jalali date using moment
  if (jalaliDate.includes('/')) {
    const date = moment(jalaliDate, 'jYYYY/jMM/jDD');

    // Convert to Gregorian and format as YYYY-MM-DD
    return date.format('YYYY-MM-DD');
  } else return jalaliDate;
}
