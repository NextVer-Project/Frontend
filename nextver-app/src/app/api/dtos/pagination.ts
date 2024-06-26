import { MovieDto } from './movie.dto';

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result: T | undefined;
  pagination: Pagination | undefined;
}
