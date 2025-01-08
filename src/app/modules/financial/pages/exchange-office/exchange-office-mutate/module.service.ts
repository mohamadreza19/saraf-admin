import { Injectable, Input } from '@angular/core';
import { ModuleControls } from './types/module.interface';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { Module, Period } from './constants';
import { Currency } from 'src/app/shared/constants/constants';

@Injectable()
export class ModuleService {
  modules: ModuleControls[] = [];

  constructor() {
    this.addModule();
  }

  addModule() {
    const availableModules = this.handleGetAvailableModules(this.modules);
    if (availableModules.length) this.modules.push(this.handleGenerateModuleControls(availableModules));
  }
  removeModule(moduleIndex: number) {
    if (this.modules.length > 1) this.modules = this.modules.filter((_, i) => i !== moduleIndex);
  }

  handleGetAvailableModules(modules: ModuleControls[]): string[] {
    const selectedModules: string[] = modules.map((moduleControl) => moduleControl.name.value);
    const set = new Set(selectedModules);

    return Object.values(Module).filter((m) => !set.has(m));
  }
  handleGenerateModuleControls(availableModules: string[]) {
    const moduleControls: ModuleControls = {
      name: new FormControl2('', {
        label: 'نام ماژول',
        type: 'select',
        options: availableModules,
        selectedOptionIndex: 0,
        validators: [],
      }),
      amount: new FormControl2('', {
        label: 'مبلغ ',
        type: 'text',
        validators: [],
      }),
      currencyUnit: new FormControl2('', {
        label: 'واحد',
        type: 'select',
        validators: [],
        options: Object.values(Currency),
      }),
      period: new FormControl2('', {
        label: 'مدت',
        type: 'select',
        validators: [],
        options: Object.values(Period),
      }),
    };
    return moduleControls;
  }
}
