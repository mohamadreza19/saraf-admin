import { Injectable } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ExchangeResponse } from 'src/app/shared/apis/exchange-api.service';

@Injectable()
export class ExchangeService {
  constructor(public pagination: PaginationService<ExchangeResponse>) {}
}
