import { TestBed } from '@angular/core/testing';

import { FinancialAccountService } from './financial-account.service';

describe('FinancialAccountService', () => {
  let service: FinancialAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
