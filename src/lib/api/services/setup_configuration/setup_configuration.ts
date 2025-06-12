import { apiClient } from '../../apiClient';
import endpoints from '../../endpoints';
import { PaginatedResponse, Setup_Product } from './type';

export const SetupConfiguration = {
  async getSetupProductByFilters({
    category,
    search = '',
    sort_by = '',
    min_price,
    max_price,
    page = 1,
    page_size = 10,
  }: {
    category?: number;
    search?: string;
    sort_by?: string;
    min_price?: number;
    max_price?: number;
    page?: number;
    page_size?: number;
  } = {}): Promise<PaginatedResponse<Setup_Product>> {
    const params = new URLSearchParams();

    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (sort_by) params.append('ordering', sort_by);
    if (min_price !== undefined) {
      params.append('min_price', min_price.toString());
    }
    if (max_price !== undefined) {
      params.append('max_price', max_price.toString());
    }
    params.append('page', page.toString());
    params.append('page_size', page_size.toString());

    return await apiClient.get(
      `${endpoints.setup_configuration.getSetupProductByFilters}?${params.toString()}`,
      {
        next: { tags: ['get-setup-product-by-filters'] },
      },
    );
  },
};
