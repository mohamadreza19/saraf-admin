/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransferStateService } from './TransferState.service';

describe('Service: TransferState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferStateService]
    });
  });

  it('should ...', inject([TransferStateService], (service: TransferStateService) => {
    expect(service).toBeTruthy();
  }));
});
