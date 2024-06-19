import { SearchTickets } from '@/components';
import { TiketData } from '@/components/Ticket/TiketData';
import { objFlight } from '@/constants';

const FilteredTicketsPage = () => {
  const getInitialSearchData = () => {
    const storedData = localStorage.getItem('searchFormData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return;
  };

  const initialValues = getInitialSearchData();

  return (
    <div>
      <SearchTickets
        initialValues={initialValues}
        showImage={false}
        alignItems={'start'}
        marginTop={'20px'}
      />
      <TiketData flights={objFlight} />
    </div>
  );
};

export default FilteredTicketsPage;
