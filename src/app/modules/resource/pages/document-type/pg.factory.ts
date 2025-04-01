import { inject } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { DocumentTypeApiService, DocumentTypeResponse } from 'src/app/shared/apis/document-type-api.service';

export function factory() {
  const api = inject(DocumentTypeApiService);
  return new PaginationService<DocumentTypeResponse>(api, ['title', 'pagecount', 'hasIdnumber'], (s) => {
    s.hasIdnumber = s.hasIdnumber ? 'دارد' : ('ندارد' as any);
    return s;
  });
}
