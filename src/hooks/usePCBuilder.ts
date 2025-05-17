'use client';

import { usePCBuilderStore } from '@/lib/store/checkout';
import { type Product } from '@/services/pc_configuration/type';

/**
 * Custom hook for accessing PC Builder functionality
 * Provides a simplified interface for components that need to interact with the PC Builder
 */
export function usePCBuilder() {
  const store = usePCBuilderStore();

  return {
    // State
    selectedProducts: store.selectedProducts,
    total: store.total,

    // Actions
    addProduct: store.selectProduct,
    removeProduct: store.removeProduct,
    clearProducts: store.clearSelectedProducts,

    // Helper functions
    getProductByCategory: (category: string): Product | undefined => {
      return store.selectedProducts.find(
        (product) => product.category === category,
      );
    },

    getCategoryCount: (): number => {
      // Get unique categories
      const categories = new Set(store.selectedProducts.map((p) => p.category));

      return categories.size;
    },

    hasProductWithCategory: (category: string): boolean => {
      return store.selectedProducts.some(
        (product) => product.category === category,
      );
    },
  };
}
