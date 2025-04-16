export type CartItemType = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

export type CheckoutDetailsProps = {
  cartData: CartItemType[];
};
