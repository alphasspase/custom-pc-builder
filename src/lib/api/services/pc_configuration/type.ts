import { Setup_Product } from '../setup_configuration/type';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  stock: number;
  image: string | null;
}

export interface ProductCategory {
  id: number;
  name: string;
  icon: string;
  description: string;
  products: Product[];
}

export interface Configuration {
  id: number;
  name: string;
  description: string;
  total_price: string;
  is_preset: boolean;
  components: Product[];
  setup_products: Setup_Product[];
}

export interface PcComponentsWithPreset {
  preset_configuration: Configuration;
  product_categories: ProductCategory[];
}
