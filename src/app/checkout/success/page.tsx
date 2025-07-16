'use client';

import { Suspense } from 'react';
import { LoadingSkeleton } from './_components/LoadingSkeleton';
import OrderContent from '@/app/checkout/success/_components/OrderContent';

// Component that safely uses useSearchParams

// Main page component that wraps OrderContent in Suspense
export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <Suspense fallback={<LoadingSkeleton />}>
          <OrderContent />
        </Suspense>
      </div>
    </div>
  );
}
