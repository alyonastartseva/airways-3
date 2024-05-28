import { TDestQuery, IFromTo } from '@/interfaces';

interface IDestProps {
  fromOrTo: string;
  onSetDestination: (fromOrTo: string, destination: TDestQuery) => void;
  fromTo: IFromTo;
}

export type { IDestProps };
