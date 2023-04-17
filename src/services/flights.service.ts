import format from 'date-fns/format';
import { AxiosResponse } from 'axios';

import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import { IFlights, TFlightsPost } from '@/interfaces/flights.interfaces';
import { IDestination } from '@/interfaces/destination.interfaces';
import { IAircraft } from '@/interfaces/aircraft.interfaces';

import { getAircrafts } from './aircrafts.service';
import { getDestinations } from './destinations.service';

let count = 1;
interface IFlightsApi {
  flightsList: Array<IFlights>;
  aircraftList: IAircraft[];
  destinationList: Array<IDestination>;
  getFlights: () => Promise<IFlights[] | undefined>;
  postFlight: (data: TFlightsPost) => Promise<AxiosResponse<IFlights, Error>>;
}

const getAircraftModel = (aircraft: IAircraft[], id: number) => {
  const aircraftInfo = aircraft.find((el) => el.id === id);
  if (aircraftInfo) {
    return aircraftInfo.model;
  } else return id;
};
const dateFormat = 'd.MM.yyyy HH:mm';

const formatDate = (date: string): string => {
  return format(new Date(date), dateFormat);
};

// переписать, когда появится endpoint для получения всех рейсов сразу

const flightsAPI: IFlightsApi = {
  flightsList: [],
  aircraftList: [],
  destinationList: [],

  getFlights: async () => {
    try {
      if (!flightsAPI.destinationList[0]) {
        const destinations = await getDestinations();
        flightsAPI.destinationList.push(...destinations);
      }

      if (!flightsAPI.aircraftList[0]) {
        const aircraft = await getAircrafts();
        flightsAPI.aircraftList.push(...aircraft);
      }

      const { data, status } = await adminInstance.get<IFlights>(
        ERoutes.FLIGHTS + count
      );

      if (status !== 200 && !data.aircraftId) {
        return flightsAPI.flightsList;
      } else {
        const modifiedData = {
          ...data,
          departureDateTime: formatDate(data.arrivalDateTime),
          arrivalDateTime: formatDate(data.arrivalDateTime),
          aircraftId: getAircraftModel(
            flightsAPI.aircraftList,
            Number(data.aircraftId)
          ),
        };
        count += 1;
        flightsAPI.flightsList.push(modifiedData);
        return flightsAPI.getFlights();
      }
    } catch {
      return flightsAPI.flightsList;
    }
  },

  postFlight: async (data: TFlightsPost) => {
    const { from, to } = data;
    const fromData = flightsAPI.destinationList.find(
      (el) => el.cityName === from.cityName
    );
    const toData = flightsAPI.destinationList.find(
      (el) => el.cityName === to.cityName
    );
    const fetchedData: Partial<TFlightsPost> = {
      ...data,
      aircraftId: Number(data.aircraftId),
      from: fromData,
      to: toData,
    };
    return await adminInstance.post<IFlights>(ERoutes.FLIGHTS, fetchedData);
  },
};

export const { getFlights, flightsList, aircraftList, postFlight } = flightsAPI;
