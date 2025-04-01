import { CustomFormGroup } from '../form-builder/form-builder.component';

export interface AbstractFormService {
  data?: any;
  mainForm: CustomFormGroup;
  generateControls(...args: any): any;
  generateForm(...args: any): any;

  submit(...args: any): void;
  init(...args: any): void;
  beforeInit(...args: any): void;

  apisCall(...args: any): void;
}
