import { IDestinationPost } from '@/interfaces/destination.interfaces';

export const mapDestinationFormData = (
  data: IDestinationPost
): IDestinationPost => {
  return {
    ...data,
    airportCode: data.airportCode?.toUpperCase(),
    timezone: `GMT${data.timezone}`,
  };
};
