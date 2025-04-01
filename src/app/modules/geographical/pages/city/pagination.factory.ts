import { inject } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { CityApiService, CityResponse } from 'src/app/shared/apis/city-api.service';

export function paginationFactory(): PaginationService<CityResponse> {
  const apiService = inject(CityApiService);

  return new PaginationService<CityResponse>(
    apiService,
    [
      'title',

      // 'nature', 'step'
    ],
    (source) => source,
  );
}
