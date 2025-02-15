import { ServerFieldsError } from './validator-error.interface';

export interface ErrorWithFormStep {
  step: number;
  error: ServerFieldsError;
}
