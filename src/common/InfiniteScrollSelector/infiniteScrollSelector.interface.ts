import { ReactNode } from 'react';

import { IDestinationList } from '@/interfaces';

declare type Fn = () => any;

interface IScrollComponent {
  targetList: IDestinationList[];
  onClick(value: string): void;
  next: Fn;
  loader?: ReactNode;
  hasMore: boolean;
  isLoading: boolean;
}

export type { IScrollComponent };
