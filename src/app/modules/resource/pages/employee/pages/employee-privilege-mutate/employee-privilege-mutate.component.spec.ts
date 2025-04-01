/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmployeePrivilegeMutateComponent } from './employee-privilege-mutate.component';

describe('EmployeePrivilegeMutateComponent', () => {
  let component: EmployeePrivilegeMutateComponent;
  let fixture: ComponentFixture<EmployeePrivilegeMutateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePrivilegeMutateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePrivilegeMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
