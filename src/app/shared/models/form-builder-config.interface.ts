import { TemplateRef } from '@angular/core';
import { CardControl_ } from '../components/cards/card/models/cardControl';
import { FormControl2 } from '../components/form-builder2/form-builder2.component';
import { CustomFormControl } from '../form-builder/form-builder.component';

type InputKey = string;
type ReferencedOptionVal = string;
export type FileType = 'png' | 'jpg' | 'jpeg' | 'pdf';

export type InputType =
  | 'text'
  | 'number'
  | 'financial-rate'
  | 'phone-number'
  | 'amount'
  | 'search-select'
  | 'search'
  | 'password'
  | 'email'
  | 'date'
  | 'file'
  | 'files'
  | 'readonly-img'
  | 'select'
  | 'select-add'
  | 'multi-select'
  | 'map'
  | 'radio'
  | 'radio-checkbox'
  | 'checkbox';

export interface Input {
  type: InputType;
  groupedBy?: string;
  filesLength?: number;
  selectOptionsLength?: number;
  label: string;
  placeholder?: string;
  options?: string[]; // For select, radio, and checkbox inputs

  selectedOptionIndex?: number;
  optionObjImportantKey?: string;
  objOptions?: object[];
  validators: any[];
  disabled?: boolean;
  show?: boolean;
  allowedFileTypes?: FileType[];
  templateRef?: TemplateRef<any>;
  onChange?: (value: any) => void;
}

export interface FormConfig {
  inputs: {
    [key: string]: FormControl2 | CardControl_; // Each key (e.g., 'name', 'username') maps to an `Input`
  };
  allNames: string[]; // This is a separate property for the list of input names
  rootLabel: string;
  submitText: string;
}
export type FormBuilderConfig = FormConfig[];
