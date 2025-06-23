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
      // Make a clean copy of the product to ensure we have the right format
      const cleanedProduct = {
        ...product,
        // Ensure price is a clean string without $ symbol if it exists
        price: String(product.price).replace(/^\$/, ''),
      };

      set((state) => {
        // Check if a product with the same category already exists
        const existingProductIndex = state.selectedProducts.findIndex(
          (item) => item.category === cleanedProduct.category,
        );

        let newSelectedProducts;

        if (existingProductIndex !== -1) {
          // Replace the existing product with the new one
          newSelectedProducts = [
            ...state.selectedProducts.slice(0, existingProductIndex),
            cleanedProduct,
            ...state.selectedProducts.slice(existingProductIndex + 1),
          ];
        } else {
          // Add the new product
          newSelectedProducts = [...state.selectedProducts, cleanedProduct];
        }

        // Update the products in state first
        return { selectedProducts: newSelectedProducts };
      });

      // Calculate the total as a separate operation after the products are updated
      const newTotal = get().calculateTotal();
      set({ total: newTotal });
    },

    selectSetupProduct: (product: Setup_Product) => {
      // Make a clean copy of the product to ensure we have the right format
      const cleanedProduct = {
        ...product,
        // Ensure price is a clean string without $ symbol if it exists
        price: String(product.price).replace(/^\$/, ''),
      };

      set((state) => {
        // Check if a setup product with the same category already exists
        const existingProductIndex = state.selectedSetupProducts.findIndex(
          (item) => item.category_name === cleanedProduct.category_name,
        );

        let newSelectedSetupProducts;

        if (existingProductIndex !== -1) {
          // Replace the existing product with the new one
          newSelectedSetupProducts = [
            ...state.selectedSetupProducts.slice(0, existingProductIndex),
            cleanedProduct,
            ...state.selectedSetupProducts.slice(existingProductIndex + 1),
          ];
        } else {
          // Add the new product
          newSelectedSetupProducts = [
            ...state.selectedSetupProducts,
            cleanedProduct,
          ];
        }

        // Update the products in state first
        const updatedState = {
          selectedSetupProducts: newSelectedSetupProducts,
        };

        return updatedState;
      });

      // Calculate the total as a separate operation after the products are updated
      const newTotal = get().calculateTotal();
      set({ total: newTotal });
    },

    removeProduct: (productId: number) => {
      set((state) => {
        const newSelectedProducts = state.selectedProducts.filter(
          (product) => product.id !== productId,
        );

        return { selectedProducts: newSelectedProducts };
      });

      // Calculate the total as a separate operation
      const newTotal = get().calculateTotal();
      set({ total: newTotal });
    },

    removeSetupProduct: (productId: number) => {
      set((state) => {
        const newSelectedSetupProducts = state.selectedSetupProducts.filter(
          (product) => product.id !== productId,
        );

        return { selectedSetupProducts: newSelectedSetupProducts };
      });

      // Calculate the total as a separate operation
      const newTotal = get().calculateTotal();
      set({ total: newTotal });
    },

    clearSelectedProducts: () => {
      // First clear the products
      set({ selectedProducts: [] });

      // Then recalculate the total
      const newTotal = get().calculateTotal();
      set({ total: newTotal });
    },

    clearSelectedSetupProducts: () => {
      // First clear the setup products
      set({ selectedSetupProducts: [] });

      // Then recalculate the total
      const newTotal = get().calculateTotal();
      set({ total: newTotal });
    },

    calculateTotal: () => {
      const { selectedProducts, selectedSetupProducts } = get();

      // Helper function to convert price strings to numbers
      const parsePrice = (priceStr: string | number | undefined): number => {
        if (typeof priceStr === 'number') return priceStr;
        if (!priceStr) return 0;

        // Remove any currency symbols or non-numeric characters except decimal point
        const cleanedStr = String(priceStr).replace(/[^0-9.]/g, '');
        const parsedPrice = parseFloat(cleanedStr);

        return isNaN(parsedPrice) ? 0 : parsedPrice;
      };

      // Process regular products - use explicit loop for debugging
      let productTotal = 0;
      for (const product of selectedProducts) {
        const price = parsePrice(product.price);
        productTotal += price;
      }

      // Process setup products - use explicit loop for debugging
      let setupProductTotal = 0;
      for (const product of selectedSetupProducts) {
        const price = parsePrice(product.price);
        setupProductTotal += price;
      }

      const newTotal = productTotal + setupProductTotal;

      // Always update the total in the state
      set({ total: newTotal });

      return newTotal;
    },
  })),
);
