import { TemplateRef } from '@angular/core';

export interface TemplateWithContext {
  ref: TemplateRef<any>;
  context: object;
}
