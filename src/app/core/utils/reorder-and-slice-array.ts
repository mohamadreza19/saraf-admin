/**
 * Reorders and slices specific keys from an array of objects.
 * @param data Array of objects to process.
 * @param keys Array of keys to include in the output, in the desired order.
 * @returns A new array of objects with only the specified keys, in the specified order.
 */
export function reorderAndSliceArray<T extends Record<string, any>, K extends keyof T>(
  data: T[],
  keys: K[],
): Pick<T, K>[] {
  return data.map((obj) => {
    return keys.reduce((acc, key) => {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {} as Pick<T, K>);
  });
}
