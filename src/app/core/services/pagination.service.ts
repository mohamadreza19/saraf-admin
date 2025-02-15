import { BehaviorSubject, last, lastValueFrom, Observable, OperatorFunction, map as rxjsMap, shareReplay } from 'rxjs';

import { HttpParams } from '@angular/common/http';
import { reorderAndSliceArray } from 'src/app/core/utils/reorder-and-slice-array';
import { Pagination } from 'src/app/shared/types/pagination.interface';
import { DataWithListResponse } from 'src/app/shared/types/list-response.interface';

import { PageEvent } from '@angular/material/paginator';

export class PaginationService<D extends Record<string, any>> {
  public pagination$!: BehaviorSubject<Pagination>;
  public queryParams: HttpParams = new HttpParams();
  public path = '';
  public data$ = new BehaviorSubject<D[]>([]);
  public normalizedData$ = new BehaviorSubject<D[]>([]);
  //
  private isInitializing: boolean = true; // Flag to track initialization

  /**
   * Initializes the PaginationService.
   * @param apiService - The API service to fetch data.
   * @param keysToSlice - Keys to slice and reorder the data.
   * @param map - Mapping function to transform the data.
   */
  constructor(
    private apiService: GETApiService,
    private keysToSlice: (keyof D)[],
    private map: RegularMappingFunction<D>,
  ) {
    // Initialize pagination
    // this.pagination$ =
    // // Subscribe to pagination changes to update queryParams and fetch data
    // Initialize pagination

    this.pagination$ = new BehaviorSubject(this.getInitialPagination());
  }

  // On Init

  /**
   * Fetch Data and Init Pagination
   * *
   */

  public initPagination(path: string) {
    this.path = path;
    lastValueFrom(this.fetchData())
      .then((response) => {
        this.pagination$ = new BehaviorSubject(response.data.pagination);

        this.pagination$.subscribe((pagination) => {
          if (!this.isInitializing) {
            this.updateParams(pagination);
            this.fetchData();
          }
        });
      })
      .finally(() => {
        this.isInitializing = false;
      });
  }
  // Public API

  /**
   * Fetches data based on the current queryParams.
   * @returns An observable of the data response.
   */
  public fetchData(): Observable<DataWithListResponse<D[]>> {
    const apiResponse$ = this.apiService.getAll<D>(this.path, this.queryParams).pipe(
      shareReplay(1), // Share the observable and replay the last emission
    );
    apiResponse$.subscribe((response) => {
      this.updateData(response.data.totalItems);
    });

    return apiResponse$;
  }

  /**
   * Clears the data and resets pagination.
   */
  public clear(): void {
    this.data$.next([]);
    this.normalizedData$.next([]);
    this.pagination$.next(this.getInitialPagination());
  }

  /**
   * Handles page change events.
   * @param event - The page change event.
   */
  public onPageChange(event: PageEvent): void {
    if (this.isInitializing) {
      this.isInitializing = false;
    }
    const updatedPagination = this.calculatePagination(event);
    this.pagination$.next(updatedPagination);
  }

  // Private helpers

  /**
   * Updates the HTTP queryParams based on the current pagination.
   * @param pagination - The current pagination state.
   */
  private updateParams(pagination: Pagination): void {
    this.queryParams = this.queryParams
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());
  }

  /**
   * Updates the data and normalized data streams.
   * @param data - The raw data to update.
   */
  private updateData(data: D[]): void {
    this.data$.next(data);
    this.normalizedData$.next(this.transformData(data));
  }

  /**
   * Transforms the data by reordering, slicing, and mapping.
   * @param data - The raw data to transform.
   * @returns The transformed data.
   */
  private transformData(data: D[]): D[] {
    return reorderAndSliceArray<D, keyof D>(data, this.keysToSlice).map(this.map);
  }

  /**
   * Calculates the updated pagination state based on a page change event.
   * @param event - The page change event.
   * @returns The updated pagination state.
   */
  private calculatePagination(event: PageEvent): Pagination {
    return {
      page: event.pageIndex + 1, // MatPaginator uses 0-based index
      limit: event.pageSize,
      totalRecord: this.pagination$.value.totalRecord,
      totalPage: Math.ceil(this.pagination$.value.totalRecord / event.pageSize),
    };
  }

  /**
   * Returns the initial pagination state.
   * @returns The initial pagination object.
   */
  private getInitialPagination(): Pagination {
    return {
      page: 1,
      limit: 10,
      totalRecord: 0,
      totalPage: 1,
    };
  }
}

export abstract class GETApiService {
  abstract getAll<D>(path: string, param: HttpParams): Observable<DataWithListResponse<D[]>>;
}
type MappingFunction<D> = OperatorFunction<DataWithListResponse<D[]>, DataWithListResponse<D[]>>;
type RegularMappingFunction<D> = (source: D) => D;
