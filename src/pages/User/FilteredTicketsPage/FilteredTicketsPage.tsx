import { SearchTickets } from '@/components';

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
    </div>
  );
};

export default FilteredTicketsPage;
