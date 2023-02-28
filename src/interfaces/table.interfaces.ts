import { Table } from '@tanstack/react-table';
import { AxiosResponse } from 'axios';
import { UseMutateFunction } from 'react-query';

import { TPerson } from './person.interfaces';
import { TPlane } from './plane.interfaces';
import { IDestination } from './search.interfaces';

export interface IEditableCell {
  value: string | number | undefined;
  index: number;
  id: string;
  editableRowIndex: number | null;
  updateData(id: string, value: string): void;
}
export interface IsRowEditing<Data> {
  (
    index: number,
    id: string,
    value: string | undefined,
    row: Data | null,
    editableIndex: number | null
  ): string | number | undefined;
}

export interface IFlexCell {
  padding: number;
  value: string | number | undefined;
}

export interface IHeadingAdmin {
  name: string;
}

export interface IPopoverTable<Data> {
  row: Data;
  index: number;
  id: number | undefined;
  handleEditRow(row: Data, index: number): void;
  deleteDestination: UseMutateFunction<
    AxiosResponse<Data, any> | undefined,
    unknown,
    number | undefined,
    unknown
  >;
}

export interface IButtonAddAdmin {
  name: string;
  onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export interface IButtonGroupAdmin {
  cancelEditing(): void;
  patchDestination(): void;
}

export interface IHeaderAdmin {
  heading: string;
  modal: React.ReactNode;
}

export interface IFooterTable<Data> {
  data: Data[] | undefined;
  editableRowIndex: number | null;
  pageIndex: number;
  pageSize: number;
  cancelEditing(): void;
  patchDestination(): void;
  setPaginationData(pageNumber: number): void;
}

export interface IModalFormPage {
  name: string;
}

export interface IModalForm {
  modal: React.ReactNode;
}

// самолеты, места назначения, пассажиры: done
// часовые пояса и рейсы: to do
export type TTableData = TPerson | IDestination | TPlane;