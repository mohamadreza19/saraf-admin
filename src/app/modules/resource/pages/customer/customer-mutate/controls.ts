import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';

interface Controls1 {
  phoneNumber: FormControl2;
  file: FormControl2;
  name: FormControl2;
  username: FormControl2;
  nicName: FormControl2;
  gender: FormControl2;
  nationality: FormControl2;
  nationalCode: FormControl2;
  fatherName: FormControl2;
  bornDate: FormControl2;
  email: FormControl2;
  isExchangeOffice: FormControl2;
  country: FormControl2;
  city: FormControl2;
  address: FormControl2;
  zipCode: FormControl2;
}

export interface LegalControl {
  isLegal: FormControl2;
}

export interface LegalControls {
  companyOrStoreName: FormControl2;
  companyPhoneNumber: FormControl2;
  companyEmail: FormControl2;
  companyCountry: FormControl2;
  companyAddress: FormControl2;
  companyZipCode: FormControl2;
}
export interface DynamicControls1 extends Controls1, LegalControl, LegalControls {}

//

interface Controls2 {
  accountStatus: FormControl2;
}
