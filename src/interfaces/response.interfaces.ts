export interface IPageable {
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
}

export interface ISortable {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

export interface IListResponse<data> {
  content: data[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface IListResponseSortable<data>
  extends IListResponse<data>,
    ISortable {}
export interface IListResponsePageable<data>
  extends IListResponse<data>,
    IPageable {}
export interface IListResponseSortablePageable<data>
  extends IListResponse<data>,
    ISortable,
    IPageable {}
