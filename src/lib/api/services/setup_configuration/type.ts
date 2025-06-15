export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export interface Setup_Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  category_name: string;
  discount: string;
  most_popular: boolean;
  created: string;
  updated: string;
  image: string | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
export interface SetupCategoryWithProducts {
  id: number;
  name: string;
  title: string;
  description: string;
  products: Setup_Product[];
}
