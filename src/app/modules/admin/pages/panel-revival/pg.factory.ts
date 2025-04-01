import { inject } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { formatNumberWithCommas } from 'src/app/core/utils/forma-number-with-commas';
import { PanelRevivalApiService, PanelRevivalResponse } from 'src/app/shared/apis/panel-revival-api.service';

export function factory(): PaginationService<PanelRevivalResponse> {
  const api = inject(PanelRevivalApiService);
  return new PaginationService(api, ['moduls', 'currency', 'sellCost', 'revivalCost'], (source) => {
    return {
      ...source,
      moduls: source.moduls.title as any,
      currency: source.currency.title as any,
      sellCost: formatNumberWithCommas(source.sellCost) as any,
      revivalCost: formatNumberWithCommas(source.sellCost) as any,
    };
  });
}
