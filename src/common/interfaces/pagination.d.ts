interface ISort {
  column: string;
  order: 1 | -1;
}

export interface IPagination {
  pageSize: number;
  pageNumber: number;
  sort?: ISort;
}
