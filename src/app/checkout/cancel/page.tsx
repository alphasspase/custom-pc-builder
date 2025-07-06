'use client';

import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card className="bg-card overflow-hidden rounded-lg border p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Payment Cancelled
          </h1>
          <p className="text-muted-foreground text-xl">
            Your payment process was cancelled. No charges were made.
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col space-y-3">
            <Button
              onClick={() => router.push('/checkout')}
              className="w-full"
              size="lg"
            >
              Return to Checkout
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="w-full"
              size="lg"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
