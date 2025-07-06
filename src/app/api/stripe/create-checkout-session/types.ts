// Types for the Stripe checkout session
export interface ProductItem {
  name: string;
  category: string;
  price: string | number;
  description?: string;
  image?: string;
}

export interface SetupProductItem {
  name: string;
  category_name: string;
  price: string | number;
  description?: string;
  image?: string;
}
