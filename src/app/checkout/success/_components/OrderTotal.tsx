import { Card, CardContent } from '@/components/ui/card';
import { ConfigurationDetails } from './ConfigurationDetails';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface OrderTotalProps {
  total: string;
  orderId: string;
  customerInfo: CustomerInfo;
}

export function OrderTotal({ total, orderId, customerInfo }: OrderTotalProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6 lg:flex-row lg:space-y-0">
          <h3 className="mb-5 text-3xl font-bold text-slate-900">
            Order Total: <span className="text-green-600">{total}</span>
          </h3>

          <ConfigurationDetails orderId={orderId} customerInfo={customerInfo} />
        </div>
      </CardContent>
    </Card>
  );
}
