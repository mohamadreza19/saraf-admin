/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Form1Service } from './form1.service';

describe('Service: Form1', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Form1Service]
    });
  });

  it('should ...', inject([Form1Service], (service: Form1Service) => {
    expect(service).toBeTruthy();
  }));
});
