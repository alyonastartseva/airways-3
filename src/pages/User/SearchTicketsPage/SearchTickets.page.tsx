import { useNavigate } from 'react-router-dom';

import { ISearchData } from '@/interfaces/search-tickets.interfaces';
import { SearchTickets } from '@components/SearchTickets';

const SearchTicketsPage = () => {
  const navigate = useNavigate();

  const handleSearch = (searchFormData: ISearchData) => {
    localStorage.setItem('searchFormData', JSON.stringify(searchFormData));
    navigate('/filter-tickets');
  };

  return <SearchTickets onSearch={handleSearch} />;
};

export default SearchTicketsPage;
