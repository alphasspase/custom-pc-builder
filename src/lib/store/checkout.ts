import { create } from 'zustand';
import { Product } from '@/services/pc_configuration/type';
import { devtools } from 'zustand/middleware';

interface PCBuilderStore {
  // State
  selectedProducts: Product[];
  total: number;

  // Actions
  selectProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  clearSelectedProducts: () => void;

  // Computed
  calculateTotal: () => number;
}

export const usePCBuilderStore = create<PCBuilderStore>()(
  devtools((set, get) => ({
    selectedProducts: [],
    total: 0,

    selectProduct: (product: Product) => {
      set((state) => {
        // Check if a product with the same category already exists
        const existingProductIndex = state.selectedProducts.findIndex(
          (item) => item.category === product.category,
        );

        let newSelectedProducts;

        if (existingProductIndex !== -1) {
          // Replace the existing product with the new one
          newSelectedProducts = [
            ...state.selectedProducts.slice(0, existingProductIndex),
            product,
            ...state.selectedProducts.slice(existingProductIndex + 1),
          ];
        } else {
          // Add the new product
          newSelectedProducts = [...state.selectedProducts, product];
        }

        // Calculate new total
        const newTotal = newSelectedProducts.reduce((acc, product) => {
          const price = parseFloat(product.price);

          return acc + (isNaN(price) ? 0 : price);
        }, 0);

        return { selectedProducts: newSelectedProducts, total: newTotal };
      });
    },

    removeProduct: (productId: number) => {
      set((state) => {
        const newSelectedProducts = state.selectedProducts.filter(
          (product) => product.id !== productId,
        );

        // Calculate new total
        const newTotal = newSelectedProducts.reduce((acc, product) => {
          const price = parseFloat(product.price);

          return acc + (isNaN(price) ? 0 : price);
        }, 0);

        return { selectedProducts: newSelectedProducts, total: newTotal };
      });
    },

    clearSelectedProducts: () => {
      set({ selectedProducts: [], total: 0 });
    },

    calculateTotal: () => {
      const { selectedProducts } = get();
      const newTotal = selectedProducts.reduce((acc, product) => {
        const price = parseFloat(product.price);

        return acc + (isNaN(price) ? 0 : price);
      }, 0);
      set({ total: newTotal });

      return newTotal;
    },
  })),
);
