import { useEffect, useState } from 'react';
import { SuccessBanner } from '@/app/checkout/success/_components/SuccessBanner';
import { OrderSummary } from '@/app/checkout/success/_components/OrderSummary';
import { PurchaseInformation } from '@/app/checkout/success/_components/PurchaseInformation';
import { ContactInformation } from '@/app/checkout/success/_components/ContactInformation';
import { OrderTotal } from '@/app/checkout/success/_components/OrderTotal';
import { LoadingSkeleton } from '@/app/checkout/success/_components/LoadingSkeleton';
import { ErrorMessage } from '@/app/checkout/success/_components/ErrorMessage';

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

export default function OrderContent() {
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
      <OrderTotal
        total={orderDetails.total}
        orderId={orderDetails.orderId}
        customerInfo={orderDetails.customerInfo}
      />
    </div>
  );
}
