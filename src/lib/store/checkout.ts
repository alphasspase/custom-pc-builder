import { create } from 'zustand';
import { Product } from '@/services/pc_configuration/type';
import { devtools } from 'zustand/middleware';
import { Setup_Product } from '@/lib/api/services/setup_configuration/type';

interface PCBuilderStore {
  // State
  selectedProducts: Product[];
  selectedSetupProducts: Setup_Product[];
  total: number; // Combined total (components + setup)
  componentsTotal: number; // Components total only
  setupTotal: number; // Setup total only

  // Actions
  selectProduct: (product: Product) => void;
  selectSetupProduct: (product: Setup_Product) => void;
  removeProduct: (productId: number) => void;
  removeSetupProduct: (productId: number) => void;
  clearSelectedProducts: () => void;
  clearSelectedSetupProducts: () => void;

  // Helper function
  parsePrice: (priceStr: string | number | undefined) => number;

  // Computed
  calculateTotal: () => number; // Calculates the combined total
  calculateComponentsTotal: () => number;
  calculateSetupTotal: () => number;
}

export const usePCBuilderStore = create<PCBuilderStore>()(
  devtools((set, get) => ({
    selectedProducts: [],
    selectedSetupProducts: [],
    total: 0,
    componentsTotal: 0,
    setupTotal: 0,

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

      // Calculate all totals as a separate operation after the products are updated
      get().calculateComponentsTotal(); // Updates componentsTotal
      get().calculateSetupTotal(); // Updates setupTotal
      get().calculateTotal(); // Updates total (combined)
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

      // Calculate all totals as a separate operation after the products are updated
      get().calculateComponentsTotal(); // Updates componentsTotal
      get().calculateSetupTotal(); // Updates setupTotal
      get().calculateTotal(); // Updates total (combined)
    },

    removeProduct: (productId: number) => {
      set((state) => {
        const newSelectedProducts = state.selectedProducts.filter(
          (product) => product.id !== productId,
        );

        return { selectedProducts: newSelectedProducts };
      });

      // Calculate all totals as a separate operation
      get().calculateComponentsTotal(); // Updates componentsTotal
      get().calculateSetupTotal(); // Updates setupTotal
      get().calculateTotal(); // Updates total (combined)
    },

    removeSetupProduct: (productId: number) => {
      set((state) => {
        const newSelectedSetupProducts = state.selectedSetupProducts.filter(
          (product) => product.id !== productId,
        );

        return { selectedSetupProducts: newSelectedSetupProducts };
      });

      // Calculate all totals as a separate operation
      get().calculateComponentsTotal(); // Updates componentsTotal
      get().calculateSetupTotal(); // Updates setupTotal
      get().calculateTotal(); // Updates total (combined)
    },

    clearSelectedProducts: () => {
      // First clear the products
      set({ selectedProducts: [] });

      // Calculate all totals as a separate operation
      get().calculateComponentsTotal(); // Updates componentsTotal
      get().calculateSetupTotal(); // Updates setupTotal
      get().calculateTotal(); // Updates total (combined)
    },

    clearSelectedSetupProducts: () => {
      // First clear the setup products
      set({ selectedSetupProducts: [] });

      // Calculate all totals as a separate operation
      get().calculateComponentsTotal(); // Updates componentsTotal
      get().calculateSetupTotal(); // Updates setupTotal
      get().calculateTotal(); // Updates total (combined)
    },

    // Helper function to convert price strings to numbers
    parsePrice: (priceStr: string | number | undefined): number => {
      if (typeof priceStr === 'number') return priceStr;
      if (!priceStr) return 0;

      // Remove any currency symbols or non-numeric characters except decimal point
      const cleanedStr = String(priceStr).replace(/[^0-9.]/g, '');
      const parsedPrice = parseFloat(cleanedStr);

      return isNaN(parsedPrice) ? 0 : parsedPrice;
    },

    calculateComponentsTotal: () => {
      const { selectedProducts } = get();
      const parsePrice = get().parsePrice;

      // Process regular products
      let componentsTotal = 0;
      for (const product of selectedProducts) {
        const price = parsePrice(product.price);
        componentsTotal += price;
      }

      // Update the components total in the state
      set({ componentsTotal });

      return componentsTotal;
    },

    calculateSetupTotal: () => {
      const { selectedSetupProducts } = get();
      const parsePrice = get().parsePrice;

      // Process setup products
      let setupTotal = 0;
      for (const product of selectedSetupProducts) {
        const price = parsePrice(product.price);
        setupTotal += price;
      }

      // Update the setup total in the state
      set({ setupTotal });

      return setupTotal;
    },

    calculateTotal: () => {
      // Get the components and setup totals
      const componentsTotal = get().componentsTotal;
      const setupTotal = get().setupTotal;

      // Calculate the combined total
      const total = componentsTotal + setupTotal;

      // Update the total in the state
      set({ total });

      return total;
    },
  })),
);
