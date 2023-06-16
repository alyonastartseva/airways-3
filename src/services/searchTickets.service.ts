import { clientInstance } from '@services/axios.service';
import { ISearchData } from '@/interfaces/search-tickets.interfaces';

export const searchApi = {
  async postSearch(data: ISearchData) {
    try {
      const response = await clientInstance.post('/search', { ...data });
      return response.data;
    } catch (error) {
      return { error: 'Ошибка поиска' };
    }
  },
};
