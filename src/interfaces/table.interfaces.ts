import { AxiosResponse } from 'axios';
import { UseMutateFunction } from 'react-query';
import { CellContext } from '@tanstack/react-table';

import { EModalNames } from '@/constants/modal-constants/modal-names';
import { TPerson } from '@interfaces/person.interfaces';
import { IAircraft } from '@interfaces/aircraft.interfaces';
import { IDestination } from '@/interfaces/destination.interfaces';

export type InitialSelectValue = string | { categoryType: string };

export interface IEditableCell<T> {
  value: string | number | undefined;
  index: number;
  id: string;
  editableRowIndex: number | null;
  fieldName?: string;
  info?: CellContext<T, string | number | undefined>;
  isDisabled?: boolean;
  updateData(id: string, value: string): void;
}

export interface IEditableSelectCell<T> extends IEditableCell<T> {
  selectOptions: string[];
  getRenderValue(value: string | boolean | object): string;
}

export interface IsRowEditing<Data> {
  (
    index: number,
    id: string,
    value: string | { categoryType: string } | undefined,
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
  deleteRow: UseMutateFunction<
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
  patchRow(): void;
}

export interface IHeaderAdmin {
  heading: string;
  formName: EModalNames;
  select?: boolean;
  selectedValue?: string;
  handleSelectChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface IFooterTable<Data> {
  data: Data[] | undefined;
  editableRowIndex: number | null;
  pageIndex: number;
  totalPages?: number;
  cancelEditing(): void;
  patchRow(): void;
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
export type TTableData = TPerson | IDestination | IAircraft;
