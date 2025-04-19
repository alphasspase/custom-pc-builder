'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { URLS } from '@/utils/urls';
import Link from 'next/link';
import React, { useState } from 'react';

const OrderSummary = () => {
  // Defining state variables
  const [subtotal] = useState(100); // Example value
  const [shipping] = useState(10); // Example value
  const [tax] = useState(8); // Example value
  const [total, setTotal] = useState(subtotal + shipping + tax); // Example calculation
  const [promoCode, setPromoCode] = useState('');

  // Updating total when subtotal, shipping, or tax changes
  React.useEffect(() => {
    setTotal(subtotal + shipping + tax);
  }, [subtotal, shipping, tax]);

  return (
    <div className="sticky top-20 lg:col-span-1">
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
          <div className="mb-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">
                Subtotal
              </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">
                Shipping
              </span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 font-medium">Promo Code</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">Apply</Button>
              </div>
            </div>
            <Button asChild size={'lg'} className="w-full">
              <Link href={URLS.checkout}>Place Order</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
