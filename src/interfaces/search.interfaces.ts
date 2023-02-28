export interface IArticle {
  title: string;
  header: string;
  body: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface ISearchPageTab {
  label: string;
  icon?: string;
}

export interface IDestination {
  id: number;
  airportCode?: string;
  airportName?: string;
  cityName?: string;
  timezone?: string;
  countryName?: string;
}

export interface IDestinationPost {
  airportCode?: string;
  airportName?: string;
  cityName?: string;
  timezone?: string;
  countryName?: string;
}

export type TDestQuery = Omit<IDestination, 'id'>;

export interface ISearchQuery {
  departureDate: string;
  from: TDestQuery;
  numberOfPassengers: number;
  returnDate: string;
  to: TDestQuery;
}

export interface IFromTo {
  from: TDestQuery;
  to: TDestQuery;
}

export interface IDestProps {
  fromOrTo: string;
  onSetDestination: (fromOrTo: string, destination: TDestQuery) => void;
  fromTo: IFromTo;
}