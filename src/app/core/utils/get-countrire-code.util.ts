import { countries } from 'countries-list';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';

export interface CountyPreCode {
  code: string;
  name: string;
  dialCode: string;
}

export function getCountriesCode(): CountyPreCode[] {
  return Object.entries(countries).map(([code, info]) => ({
    code,
    name: info.name,
    dialCode: String(info.phone[0]),
  }));
}

export function getPreCountryCode() {
  const countries = getCountriesCode();
  const mobileCode = new FormControl2('', {
    label: 'qwe',
    type: 'select',
    show: false,
    validators: [],
    options: countries.map((c) => `${c.code} (+${c.dialCode})`),
    selectedOptionIndex: 0,
  });
  mobileCode.setObjOptions(countries);

  return mobileCode;
}
