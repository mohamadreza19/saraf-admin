import { inject } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { BankAccount, BankAccountApiService } from 'src/app/shared/apis/bank-account-api.service';

export function globalFactory(): PaginationService<BankAccount> {
  const apiService = inject(BankAccountApiService);
  return new PaginationService<BankAccount>(
    apiService,
    ['accountNumber', 'bankName', 'cardName', 'country', 'city'],
    (s) => s,
  );
}
