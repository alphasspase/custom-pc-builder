import { apiClient } from '@/api/apiClient';
import endpoints from '@/api/endpoints';
import { ProductCategory } from './type';

export const PcConfiguration = {
  async getProductCategories(): Promise<ProductCategory[]> {
    return await apiClient.get(
      endpoints.pc_configuration.getProductCategories,
      {
        next: { tags: ['get-product-categories'] },
      },
    );
  },
};
