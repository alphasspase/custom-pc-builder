import { apiClient } from '@/api/apiClient';
import endpoints from '@/api/endpoints';
import { Configuration, ProductCategory } from './type';

export const PcConfiguration = {
  async getProductCategories(): Promise<ProductCategory[]> {
    return await apiClient.get(
      endpoints.pc_configuration.getProductCategories,
      {
        next: { tags: ['get-product-categories'] },
      },
    );
  },
  async getProductCategoriesById(id: number): Promise<Configuration> {
    return await apiClient.get(
      endpoints.pc_configuration.getPcConfigurationById(id),
      {
        next: { tags: [`get-product-categories-${id}`] },
      },
    );
  },
};
