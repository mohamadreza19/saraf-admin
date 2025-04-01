import { inject } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';

import { BankApiService, BankResponse } from 'src/app/shared/apis/bank-api.service';

export function factory(): PaginationService<BankResponse> {
  const api = inject(BankApiService);
  return new PaginationService(api, ['icon', 'title', 'city', 'currency'], (s) => s);
}
