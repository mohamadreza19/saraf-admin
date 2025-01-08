import { TemplateRef } from '@angular/core';
import { ButtonProps } from '../components/button/button.component';
import { CustomFormControl, CustomFormGroup } from '../form-builder/form-builder.component';

export interface TableConfig {
  title?: string;
  form?: CustomFormGroup;
  tableHeader: string[];
  tableBody: object[];
  customStylePerColumnVal?: { [key: string]: string };
  actions?: (ActionConfig | TemplateActionConfig)[];
  assetIndexFromBody?: number;
}
export interface ActionConfig {
  label: string; // Button text
  callback: (row: any) => void; // Function to call on click
  condition?: (row: any) => boolean; // Optional condition for visibility
  styleProps?: {
    disabled?: boolean;
    impact?: ButtonProps['impact'];
    size?: ButtonProps['size'];
    shape?: ButtonProps['shape'];
    tone?: ButtonProps['tone'];
    shadow?: ButtonProps['shadow'];
  };
}

export interface TemplateActionConfig {
  templateRef: TemplateRef<any>;
}
