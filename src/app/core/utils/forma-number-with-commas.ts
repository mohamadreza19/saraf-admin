/**
 * Formats a number with commas as thousand separators.
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number string.
 */
export function formatNumberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
