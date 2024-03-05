import { TDestQuery, IFromTo } from '@/interfaces/search.interfaces';

export interface IDestProps {
  fromOrTo: string;
  onSetDestination: (fromOrTo: string, destination: TDestQuery) => void;
  fromTo: IFromTo;
}
