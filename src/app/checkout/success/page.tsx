'use client';

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';

interface OrderDetails {
  orderId: string;
  date: string;
  total: string;
  items: Array<{
    name: string;
    price: string;
  }>;
}

export default function PaymentSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setIsLoading(false);

        return;
      }

      try {
        // Fetch order details from our API endpoint
        const response = await fetch(
          `/api/stripe/verify-payment?session_id=${sessionId}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify payment');
        }

        // Format the order data
        setOrderDetails({
          orderId: data.orderDetails.orderId,
          date: new Date(data.orderDetails.date).toLocaleDateString(),
          total: `$${data.orderDetails.amount.toFixed(2)}`,
          items: [
            {
              name: 'Custom PC Build',
              price: `$${data.orderDetails.amount.toFixed(2)}`,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card className="bg-card overflow-hidden rounded-lg border p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground text-xl">
            Thank you for your order. We&apos;ve received your payment.
          </p>

          {isLoading ? (
            <div className="mt-6 animate-pulse space-y-4">
              <div className="bg-muted h-4 w-full rounded"></div>
              <div className="bg-muted h-4 w-3/4 rounded"></div>
            </div>
          ) : orderDetails ? (
            <div className="mt-8 w-full max-w-md space-y-6 text-left">
              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold">Order ID:</span>
                <span>{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold">Date:</span>
                <span>{orderDetails.date}</span>
              </div>
              <div className="border-b pb-3">
                <p className="mb-2 font-semibold">Items:</p>
                {orderDetails.items.map((item, index: number) => (
                  <div key={index} className="flex justify-between py-1">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{orderDetails.total}</span>
              </div>
            </div>
          ) : (
            <p>Could not load order details. Please contact support.</p>
          )}

          <div className="mt-8 flex w-full max-w-md flex-col space-y-3">
            <Button
              onClick={() => router.push('/')}
              className="w-full"
              size="lg"
            >
              Return to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/account/orders')}
              className="w-full"
              size="lg"
            >
              View My Orders
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
