/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilesInput2Component } from './files-input2.component';

describe('FilesInput2Component', () => {
  let component: FilesInput2Component;
  let fixture: ComponentFixture<FilesInput2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesInput2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesInput2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
