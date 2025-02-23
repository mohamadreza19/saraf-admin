import { TemplateRef } from '@angular/core';
import { SwitchChange } from '../components/swtichs/switch/switch.component';
import { AbstractMutateApiService } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Router } from '@angular/router';

export interface BaseList {
  statusTem?: TemplateRef<any>;
  entityApi?: AbstractMutateApiService;
  router?: Router;
  pg: PaginationService<any>;
  //

  navAdd(): void;
  navEdit?(index: number): void;
  navDash(): void;
  onStatusChange(event: SwitchChange, index: number): void;
}
