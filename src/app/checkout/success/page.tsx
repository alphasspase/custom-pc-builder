'use client';

import { useEffect, useState, Suspense } from 'react';
import { SuccessBanner } from '@/app/checkout/success/_components/SuccessBanner';
import { OrderSummary } from '@/app/checkout/success/_components/OrderSummary';
import { PurchaseInformation } from '@/app/checkout/success/_components/PurchaseInformation';
import { ContactInformation } from '@/app/checkout/success/_components/ContactInformation';
import { OrderTotal } from '@/app/checkout/success/_components/OrderTotal';
import { ConfigurationDetails } from '@/app/checkout/success/_components/ConfigurationDetails';
import { LoadingSkeleton } from '@/app/checkout/success/_components/LoadingSkeleton';
import { ErrorMessage } from '@/app/checkout/success/_components/ErrorMessage';
import { ActionButtons } from '@/app/checkout/success/_components/ActionButtons';

interface OrderDetails {
  orderId: string;
  date: string;
  total: string;
  paymentMethod: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  items: Array<{
    name: string;
    price: string;
  }>;
}

// Component that safely uses useSearchParams
function OrderContent() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use hardcoded values for now
      setOrderDetails({
        orderId: '238920483',
        date: 'Jun 01, 2023',
        total: '$162',
        paymentMethod: 'Master Card - **** 5987',
        customerInfo: {
          firstName: 'Amanda',
          lastName: 'Smith',
          email: 'Amanda@email.com',
          phone: '(724) 651-7073',
        },
        items: [
          {
            name: 'Custom PC Build',
            price: '$162',
          },
        ],
      });

      setIsLoading(false);
    };

    fetchOrderDetails();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!orderDetails) {
    return <ErrorMessage />;
  }

  return (
    <div className="space-y-8">
      <SuccessBanner />
      <OrderSummary />
      <PurchaseInformation orderDetails={orderDetails} />
      <ContactInformation customerInfo={orderDetails.customerInfo} />
      <OrderTotal total={orderDetails.total} />
      <ConfigurationDetails
        orderId={orderDetails.orderId}
        customerInfo={orderDetails.customerInfo}
      />
      <ActionButtons />
    </div>
  );
}

// Main page component that wraps OrderContent in Suspense
export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <Suspense fallback={<LoadingSkeleton />}>
          <OrderContent />
        </Suspense>
      </div>
    </div>
  );
}
