import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomPaginatorIntl extends MatPaginatorIntl {
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);

    return `${endIndex}  / ${length}`;
  };
  override itemsPerPageLabel: string = $localize`نمایش در هر صفحه`;
  override nextPageLabel: string = $localize`بعدی`;
  override previousPageLabel: string = $localize`قبلی`;
}
