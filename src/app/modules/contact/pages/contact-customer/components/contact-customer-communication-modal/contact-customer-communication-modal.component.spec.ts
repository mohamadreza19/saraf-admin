/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContactCustomerCommunicationModalComponent } from './contact-customer-communication-modal.component';

describe('ContactCustomerCommunicationModalComponent', () => {
  let component: ContactCustomerCommunicationModalComponent;
  let fixture: ComponentFixture<ContactCustomerCommunicationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCustomerCommunicationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCustomerCommunicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
