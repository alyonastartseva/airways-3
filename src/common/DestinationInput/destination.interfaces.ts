import { TDestQuery, IFromTo } from '@/interfaces';

export interface IDestProps {
  fromOrTo: string;
  onSetDestination: (fromOrTo: string, destination: TDestQuery) => void;
  fromTo: IFromTo;
}
