import { inject } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ExchangeApiService, ExchangeResponse } from 'src/app/shared/apis/exchange-api.service';

export function paginationFactory(): PaginationService<ExchangeResponse> {
  const exchangeApiService = inject(ExchangeApiService);
  const mapFunction = (source: ExchangeResponse) => {
    if (!('nature' in source)) return source;
    return {
      ...source,
      nature: source.nature === 'real' ? 'حقیقی' : 'حقوقی',
    };
  };
  return new PaginationService<ExchangeResponse>(
    exchangeApiService,
    [
      'picture',
      'name',
      'family',
      'mobile',
      'email',
      // 'nature', 'step'
    ],
    mapFunction,
  );
}
