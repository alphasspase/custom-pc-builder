'use server';

import { apiClient } from '../../apiClient';
import endpoints from '../../endpoints';
import {
  Configuration,
  PcComponentsWithPreset,
  Product,
  ProductCategory,
  SavePcConfigurationRequest,
  SavePcConfigurationResponse,
} from './type';

export async function getProductCategories(): Promise<ProductCategory[]> {
  return await apiClient.get(endpoints.pc_configuration.getProductCategories, {
    next: { tags: ['get-product-categories'] },
  });
}

export async function getProductCategoriesById(
  id: number,
): Promise<Configuration> {
  return await apiClient.get(
    endpoints.pc_configuration.getPcConfigurationById(id),
    {
      next: { tags: [`get-product-categories-${id}`] },
    },
  );
}

export async function getPcComponentsWithPreset(
  id?: number,
): Promise<PcComponentsWithPreset> {
  return await apiClient.get(
    endpoints.pc_configuration.getPcComponentsWithPreset +
      (id != null ? `?preset_id=${id}` : ''),
    {
      next: {
        tags: [`get-pc-components-with-preset`],
      },
    },
  );
}

export async function getFilteredProducts({
  category,
  search = '',
  sort_by = '',
  min_price,
  max_price,
}: {
  category?: string;
  search?: string;
  sort_by?: string;
  min_price?: number;
  max_price?: number;
} = {}): Promise<Product[]> {
  const params = new URLSearchParams();

  if (category) params.append('category', category);
  if (search) params.append('search', search);
  if (sort_by) params.append('sort_by', sort_by);
  if (min_price !== undefined) params.append('min_price', min_price.toString());
  if (max_price !== undefined) params.append('max_price', max_price.toString());

  const queryString = params.toString();
  const url = `${endpoints.pc_configuration.getFilteredProducts}${queryString ? `?${queryString}` : ''}`;

  return await apiClient.get(url, {
    next: { tags: ['filtered-pc-products'] },
  });
}

export async function savePcConfiguration(
  configData: SavePcConfigurationRequest,
): Promise<SavePcConfigurationResponse> {
  return await apiClient.post(
    endpoints.pc_configuration.savePcConfiguration,
    configData,
    {
      cache: 'no-store',
    },
  );
}
