import axios from 'axios';

import { ICountry } from '@/interfaces';

type TCountryName = {
  name: string;
  callingCodes: string[];
};

const getCountry = async () => {
  try {
    const response = await axios.get<ICountry[]>(
      'https://restcountries.com/v2/all',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.map((country: ICountry) => ({
      name: country.name,
      callingCodes: country.callingCodes,
    })) as TCountryName[];
  } catch (error) {
    return error;
  }
};

export default getCountry;
