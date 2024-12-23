import { TemplateRef } from '@angular/core';
import { FormControl2 } from '../components/form-builder2/form-builder2.component';
import { CustomFormControl } from '../form-builder/form-builder.component';

type InputKey = string;
type ReferencedOptionVal = string;
export type FileType = 'png' | 'jpg' | 'jpeg' | 'pdf';
export interface Input {
  type:
    | 'text'
    | 'search'
    | 'password'
    | 'email'
    | 'date'
    | 'file'
    | 'files'
    | 'select'
    | 'multi-select'
    | 'radio'
    | 'checkbox';
  filesLength?: number;
  label: string;
  placeholder?: string;
  options?: string[]; // For select, radio, and checkbox inputs
  selectedOptionIndex?: number;
  validators: [];
  showIf: string[]; //[InputKey, ReferencedOptionVal];
  allowedFileTypes?: FileType[];
}

export interface FormConfig {
  inputs: {
    [key: string]: CustomFormControl; // Each key (e.g., 'name', 'username') maps to an `Input`
  };
  allNames: string[]; // This is a separate property for the list of input names
  rootLabel: string;
  submitText: string;
}
export type FormBuilderConfig = FormConfig[];

type InputKey2 = string;
type ReferencedOptionVal2 = string;
export type FileType2 = 'png' | 'jpg' | 'jpeg' | 'pdf';

export type InputType2 =
  | 'text'
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
  | 'select'
  | 'multi-select'
  | 'radio'
  | 'checkbox';

export interface Input2 {
  type: InputType2;
  groupedBy?: string;
  filesLength?: number;
  selectOptionsLength?: number;
  label: string;
  placeholder?: string;
  options?: string[]; // For select, radio, and checkbox inputs
  selectedOptionIndex?: number;
  validators: [];
  disabled?: boolean;
  show?: boolean;
  allowedFileTypes?: FileType[];
  onChange?: (value: any) => void;
  templateRef?: TemplateRef<any>;
}

export interface FormConfig2 {
  inputs: {
    [key: string]: FormControl2 | TemplateRef<any>; // Each key (e.g., 'name', 'username') maps to an `Input`
  };
  allNames: string[]; // This is a separate property for the list of input names
  rootLabel: string;
  submitText: string;
}
export type FormBuilderConfig2 = FormConfig[];
