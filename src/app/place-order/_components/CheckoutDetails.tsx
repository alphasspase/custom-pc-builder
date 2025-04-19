'use client';

import { useState } from 'react';
import SummaryCardItem from './SummaryCardItem';
import { CartItemType } from '../type';
import { MonitorCog } from 'lucide-react';

export default function CheckoutDetails({
  title,
  cartData,
}: {
  title: string;
  cartData: CartItemType[];
}) {
  const [cart, setCart] = useState<CartItemType[]>(cartData);

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  return (
    <div className="bg-primary-gray-500 relative rounded-lg border p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <MonitorCog className="text-primary h-10 w-10" />
        <h2>{title}</h2>
      </div>

      <div className="space-y-5">
        {cart.map((item) => (
          <SummaryCardItem
            key={item.id}
            item={item}
            onQuantityChange={updateQuantity}
          />
        ))}
      </div>
    </div>
  );
}
