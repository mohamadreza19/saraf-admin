export type MapToAny<T, Type> = {
  [K in keyof T]: Type; // Map all keys of T to `any`
};
