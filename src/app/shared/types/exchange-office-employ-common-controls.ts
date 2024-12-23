import { FormControl2 } from '../components/form-builder2/form-builder2.component';
import { FormConfig2 } from '../models/form-builder-config.interface';

export interface ExchangeOfficeEmployCommonControls {
  phoneNumber: FormControl2;
  image: FormControl2;
  firstName: FormControl2;
  lastName: FormControl2;
  nicName: FormControl2;
  gender: FormControl2;
  nationality: FormControl2;
  nationalCode: FormControl2;
  panelLanguage: FormControl2;
  fatherName: FormControl2;
  bornDate: FormControl2;
  email: FormControl2;
  country: FormControl2;
  city: FormControl2;
  address: FormControl2;
  zipCode: FormControl2;
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
