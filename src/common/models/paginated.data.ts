import { IPagination } from 'src/common/interfaces/pagination';

interface IMeta extends IPagination {
  totalPages?: number;
  totalItems?: number;
}

export class PaginatedData {
  data: any[];
  meta: IMeta;

  constructor(pagination: IPagination, data: any[], totalItems: number) {
    this.meta = {
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
      sort: pagination.sort,
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / pagination.pageSize),
    };
    this.data = data;
  }
}
