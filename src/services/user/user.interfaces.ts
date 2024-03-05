import { IFormUserCreate } from '@/interfaces/account.interfaces';

export interface IFormPost extends IFormUserCreate {
  token: string;
}
