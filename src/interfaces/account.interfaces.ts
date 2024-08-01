export interface IFormUserCreate {
  answerQuestion: string;
  email: string;
  password: string;
  securityQuestion?: string;
  repeatPassword: string;
  checkbox: NonNullable<boolean | undefined>;
  error?: string;
}

export interface IAccountRoles {
  id: number;
  name: string;
}

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  password: string;
  securityQuestion: string;
  answerQuestion: string;
  roles: IAccountRoles[];
}

interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface Pageable {
  paged: boolean;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sort[];
}

export interface IGetAccountsResponse {
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  numberOfElements: number;
  content: User[];
  sort: Sort[];
  first: boolean;
  last: boolean;
  pageable: Pageable;
  empty: boolean;
}

export interface IAccount {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  password: string;
  securityQuestion: string;
  answerQuestion: string;
  roles: IAccountRoles[];
}
