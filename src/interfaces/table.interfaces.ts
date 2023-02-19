import { Table } from '@tanstack/react-table';
import { AxiosResponse } from 'axios';
import { UseMutateFunction } from 'react-query';

import { IDestination } from './search.interfaces';

export interface IEditableCell {
  value: string | number | undefined;
  index: number;
  id: string;
  editableRowIndex: number | null;
  updateData(id: string, value: string): void;
}

export interface IsRowEditing {
  (index: number, id: string, value: string | undefined):
    | string
    | number
    | undefined;
}

export interface IFlexCell {
  padding: number;
  value: string | number | undefined;
}

export interface IHeadingAdmin {
  name: string;
}

export interface IButtonName {
  name: string;
}

export interface IPopoverTable {
  row: IDestination;
  index: number;
  id: string;
  handleEditRow(row: IDestination, index: number): void;
  deleteDestination: UseMutateFunction<
    AxiosResponse<IDestination, any> | undefined,
    unknown,
    string | undefined,
    unknown
  >;
}

export interface IButtonGroupAdmin {
  cancelEditing(): void;
  patchDestination(): void;
}

export interface ITableCreator<Data> {
  table: Table<Data>;
}

export interface IHeaderAdmin {
  heading: string;
  buttonName: string;
}

export interface IFooterTable<Data> {
  data: Data[];
  editableRowIndex: number | null;
  pageIndex: number;
  pageSize: number;
  cancelEditing(): void;
  patchDestination(): void;
  setPaginationData(pageNumber: number): void;
}
