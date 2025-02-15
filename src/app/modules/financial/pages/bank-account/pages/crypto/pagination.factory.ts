import { inject } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { BankAccount, BankAccountApiService } from 'src/app/shared/apis/bank-account-api.service';

export function factory(): PaginationService<BankAccount> {
  const apiService = inject(BankAccountApiService);
  return new PaginationService<BankAccount>(
    apiService,
    ['accountNumber', 'currencyName', 'transferPlatform', 'memo'],
    (s) => s,
  );
}
