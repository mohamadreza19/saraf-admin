import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { BaseQuerySearchControls } from 'src/app/shared/types/base-query-search';

export function withLanguageControl(controls: { [key: string]: FormControl2 }): BaseQuerySearchControls {
  return {
    language: new FormControl2('', {
      label: $localize`زبان`,
      type: 'select',
      optionObjImportantKey: 'id',
      validators: [],
    }),
    ...controls,
  };
}
