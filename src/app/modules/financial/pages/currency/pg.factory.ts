import { inject } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { CurrencyApiService, CurrencyResponse } from 'src/app/shared/apis/currency-api.service';

export function factory(): PaginationService<CurrencyResponse> {
  const api = inject(CurrencyApiService);
  return new PaginationService(api, ['icon', 'title'], (s) => s);
}
