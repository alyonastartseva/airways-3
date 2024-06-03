import { SearchTickets } from '@/components/SearchTickets';
import { TiketData } from '@/components/Ticket/TiketData';

const FilteredTicketsPage = () => {
  const getInitialSearchData = () => {
    const storedData = localStorage.getItem('searchFormData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return;
  };

  const initialValues = getInitialSearchData();

  const obj = {
    flights: [
      {
        totalPrice: 0,
        dataTo: {
          airportFrom: 'AAQ',
          airportTo: 'AAQ',
          cityFrom: 'string',
          cityTo: 'string',
          departureDateTime: '2024-05-27T20:27:18.746Z',
          arrivalDateTime: '2024-05-27T20:27:18.746Z',
          flightTime: 'string',
          flightSeatId: 0,
        },
        dataBack: {
          airportFrom: 'AAQ',
          airportTo: 'AAQ',
          cityFrom: 'string',
          cityTo: 'string',
          departureDateTime: '2024-05-27T20:27:18.746Z',
          arrivalDateTime: '2024-05-27T20:27:18.746Z',
          flightTime: 'string',
          flightSeatId: 0,
        },
      },
    ],
    search: {
      from: 'AAQ',
      to: 'AAQ',
      departureDate: '2024-05-27',
      returnDate: '2024-05-27',
      numberOfPassengers: 0,
      categoryOfSeats: 'FIRST',
    },
  };

  return (
    <div>
      <SearchTickets
        initialValues={initialValues}
        showImage={false}
        alignItems={'start'}
        marginTop={'20px'}
      />
      <TiketData flights={obj} />
    </div>
  );
};

export default FilteredTicketsPage;
