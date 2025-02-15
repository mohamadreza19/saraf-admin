import { inject } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { CountryApiService, CountyResponse } from 'src/app/shared/apis/country-api.service';

export function paginationFactory(): PaginationService<CountyResponse> {
  const apiService = inject(CountryApiService);

  return new PaginationService<CountyResponse>(
    apiService,
    [
      'icon',
      'title',
      'nikeName',
      // 'nature', 'step'
    ],
    (source) => source,
  );
}
