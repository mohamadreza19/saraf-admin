import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';

export interface DocCombinedControls {
  docs: FormControl2;
  documentType: FormControl2;
  idNumber?: FormControl2;
  expireDate?: FormControl2;
}
