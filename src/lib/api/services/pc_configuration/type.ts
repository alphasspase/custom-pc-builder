export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
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
