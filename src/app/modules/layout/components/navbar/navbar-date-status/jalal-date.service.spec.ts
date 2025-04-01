/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JalalDateService } from './jalal-date.service';

describe('Service: JalalDate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JalalDateService]
    });
  });

  it('should ...', inject([JalalDateService], (service: JalalDateService) => {
    expect(service).toBeTruthy();
  }));
});
