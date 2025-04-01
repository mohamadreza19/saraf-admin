export interface FieldsError {
  [key: string]: boolean;
}

export interface ServerFieldsError {
  [key: string]: FieldsError;
}
