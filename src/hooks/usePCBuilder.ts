'use client';

import { usePCBuilderStore } from '@/lib/store/checkout';
import { type Product } from '@/services/pc_configuration/type';
import { type Setup_Product } from '@/lib/api/services/setup_configuration/type';

/**
 * Custom hook for accessing PC Builder functionality
 * Provides a simplified interface for components that need to interact with the PC Builder
 */
export function usePCBuilder() {
  const store = usePCBuilderStore();

  return {
    // State
    selectedProducts: store.selectedProducts,
    selectedSetupProducts: store.selectedSetupProducts,
    total: store.total,

    // Actions
    addProduct: store.selectProduct,
    addSetupProduct: store.selectSetupProduct,
    removeProduct: store.removeProduct,
    removeSetupProduct: store.removeSetupProduct,
    clearProducts: store.clearSelectedProducts,
    clearSetupProducts: store.clearSelectedSetupProducts,

    // Helper functions
    getProductByCategory: (category: string): Product | undefined => {
      return store.selectedProducts.find(
        (product) => product.category === category,
      );
    },

    getSetupProductByCategory: (
      categoryName: string,
    ): Setup_Product | undefined => {
      return store.selectedSetupProducts.find(
        (product) => product.category_name === categoryName,
      );
    },

    getCategoryCount: (): number => {
      // Get unique categories
      const categories = new Set(store.selectedProducts.map((p) => p.category));

      return categories.size;
    },

    getSetupCategoryCount: (): number => {
      // Get unique setup categories
      const categories = new Set(
        store.selectedSetupProducts.map((p) => p.category_name),
      );

      return categories.size;
    },

    hasProductWithCategory: (category: string): boolean => {
      return store.selectedProducts.some(
        (product) => product.category === category,
      );
    },

    hasSetupProductWithCategory: (categoryName: string): boolean => {
      return store.selectedSetupProducts.some(
        (product) => product.category_name === categoryName,
      );
    },
  };
}
