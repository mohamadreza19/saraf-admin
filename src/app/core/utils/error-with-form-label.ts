import { ServerFieldsError } from 'src/app/shared/types/validator-error.interface';

export class ErrorWithFormLabel {
  constructor(public label: string, public error: ServerFieldsError) {}
}
