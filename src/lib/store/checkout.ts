import { create } from 'zustand';
import { Product } from '@/services/pc_configuration/type';
import { devtools } from 'zustand/middleware';
import { Setup_Product } from '@/lib/api/services/setup_configuration/type';

interface PCBuilderStore {
  // State
  selectedProducts: Product[];
  selectedSetupProducts: Setup_Product[];
  total: number;

  // Actions
  selectProduct: (product: Product) => void;
  selectSetupProduct: (product: Setup_Product) => void;
  removeProduct: (productId: number) => void;
  removeSetupProduct: (productId: number) => void;
  clearSelectedProducts: () => void;
  clearSelectedSetupProducts: () => void;

  // Computed
  calculateTotal: () => number;
}

export const usePCBuilderStore = create<PCBuilderStore>()(
  devtools((set, get) => ({
    selectedProducts: [],
    selectedSetupProducts: [],
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
        const newTotal = get().calculateTotal();

        return { selectedProducts: newSelectedProducts, total: newTotal };
      });
    },

    selectSetupProduct: (product: Setup_Product) => {
      set((state) => {
        // Check if a setup product with the same category already exists
        const existingProductIndex = state.selectedSetupProducts.findIndex(
          (item) => item.category_name === product.category_name,
        );

        let newSelectedSetupProducts;

        if (existingProductIndex !== -1) {
          // Replace the existing product with the new one
          newSelectedSetupProducts = [
            ...state.selectedSetupProducts.slice(0, existingProductIndex),
            product,
            ...state.selectedSetupProducts.slice(existingProductIndex + 1),
          ];
        } else {
          // Add the new product
          newSelectedSetupProducts = [...state.selectedSetupProducts, product];
        }

        // Calculate new total
        const newTotal = get().calculateTotal();

        return {
          selectedSetupProducts: newSelectedSetupProducts,
          total: newTotal,
        };
      });
    },

    removeProduct: (productId: number) => {
      set((state) => {
        const newSelectedProducts = state.selectedProducts.filter(
          (product) => product.id !== productId,
        );

        // Calculate new total
        const newTotal = get().calculateTotal();

        return { selectedProducts: newSelectedProducts, total: newTotal };
      });
    },

    removeSetupProduct: (productId: number) => {
      set((state) => {
        const newSelectedSetupProducts = state.selectedSetupProducts.filter(
          (product) => product.id !== productId,
        );

        // Calculate new total
        const newTotal = get().calculateTotal();

        return {
          selectedSetupProducts: newSelectedSetupProducts,
          total: newTotal,
        };
      });
    },

    clearSelectedProducts: () => {
      set(() => {
        return { selectedProducts: [], total: get().calculateTotal() };
      });
    },

    clearSelectedSetupProducts: () => {
      set(() => {
        return { selectedSetupProducts: [], total: get().calculateTotal() };
      });
    },

    calculateTotal: () => {
      const { selectedProducts, selectedSetupProducts } = get();

      // Sum prices from regular products
      const productTotal = selectedProducts.reduce((acc, product) => {
        const price = parseFloat(product.price);

        return acc + (isNaN(price) ? 0 : price);
      }, 0);

      // Sum prices from setup products
      const setupProductTotal = selectedSetupProducts.reduce((acc, product) => {
        const price = parseFloat(product.price);

        return acc + (isNaN(price) ? 0 : price);
      }, 0);

      const newTotal = productTotal + setupProductTotal;
      set({ total: newTotal });

      return newTotal;
    },
  })),
);
