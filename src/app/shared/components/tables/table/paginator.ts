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
  override itemsPerPageLabel: string = 'نمایش در هر صفحه';
  override nextPageLabel: string = 'بعدی';
  override previousPageLabel: string = 'قبلی';
}
