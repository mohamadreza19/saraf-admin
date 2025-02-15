import { Pagination } from './pagination.interface';

export interface DataWithListResponse<D> {
  data: ListResponse<D>;
  status: number;
}

export interface ListResponse<D> {
  totalItems: D;
  pagination: Pagination;
}
