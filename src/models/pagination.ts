export interface Pagination<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  content: T[];
}
