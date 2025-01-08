/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CityMutateComponent } from './city-mutate.component';

describe('CityMutateComponent', () => {
  let component: CityMutateComponent;
  let fixture: ComponentFixture<CityMutateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityMutateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
