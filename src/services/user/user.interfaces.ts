import { IFormUserCreate } from '@/interfaces';

export interface IFormPost extends IFormUserCreate {
  token: string;
}
