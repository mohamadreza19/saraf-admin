import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { FormBuilderComponent } from 'src/app/shared/form-builder/form-builder.component';

import { CommonModule, DOCUMENT, NgFor, NgIf, NgTemplateOutlet, ViewportScroller } from '@angular/common';
import { ReceiptComponent } from '../../../../financial/components/receipt/receipt.component';

import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { DocCombinedControls } from 'src/app/shared/models/doc-combined-controls.interface';

import { ExchangeOfficeMutateService } from './services/exchange-office-mutate.service';

import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { FormBuilder3Component } from '../../../../../shared/components/form-builder3/form-builder3.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exchange-office-mutate',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormBuilderComponent,
    FormBuilder2Component,
    NgTemplateOutlet,
    ReceiptComponent,
    ButtonComponent,
    InputComponent,
    CommonModule,
    FormBuilder3Component,
  ],
  templateUrl: './exchange-office-mutate.component.html',

  // providers: [ModuleService],
})
export class ExchangeOfficeMutateComponent implements AfterViewInit, OnDestroy, OnInit {
  // receipt

  docs: DocCombinedControls[] = [];

  @ViewChild('addDocsTemplate') addDocsTemplate!: TemplateRef<any>;
  @ViewChild('addModuleTemplate') addModuleTemplate!: TemplateRef<any>;
  @ViewChild('preReceiptTemplate') preReceiptTemplate!: TemplateRef<any>;

  //
  @ViewChild('scrollableElement') scrollableElement!: ElementRef;

  timeoutId: any;

  constructor(
    public service: ExchangeOfficeMutateService,
    private scrollDispatcher: ScrollDispatcher,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.service.beforeInit(this.activatedRoute.snapshot.queryParams);
    this.service.apisCall();
  }
  ngAfterViewInit(): void {
    this.service.initiate(this.addModuleTemplate, this.addDocsTemplate, this.preReceiptTemplate);
  }
  ngOnDestroy(): void {
    this.service.clear();
  }

  _valuesOfObject(obj: object): any {
    return Object.values(obj);
  }
}
