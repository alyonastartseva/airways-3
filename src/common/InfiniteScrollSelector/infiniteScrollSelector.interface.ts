import { ReactNode } from 'react';

import { IDestinationList } from '@/interfaces/destination.interfaces';

declare type Fn = () => any;

export interface IScrollComponent {
  targetList: IDestinationList[];
  onClick(value: string): void;
  next: Fn;
  loader?: ReactNode;
  hasMore: boolean;
  isLoading: boolean;
}
