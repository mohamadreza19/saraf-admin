import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { MapToAny } from 'src/app/shared/types/map-to-any.type';

export interface ModuleControls {
  name: FormControl2;
  period: FormControl2;
  amount: FormControl2;
  currencyUnit: FormControl2;
}

export type ModuleControlStrings = MapToAny<ModuleControls, string>;
