export type ConvertControlsToAny<T> = {
  [K in keyof T]: any;
};
