import { QrCode } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
          <h3 className="text-3xl font-bold text-slate-900">
            Order Total: <span className="text-green-600">{total}</span>
          </h3>

          {/* <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Track Your Order
              </Button>
              <Button variant="outline">Download Invoice</Button>
            </div> */}
          <ConfigurationDetails orderId={orderId} customerInfo={customerInfo} />

          {/* <Separator orientation="vertical" className="hidden h-24 lg:block" /> */}

          {/* <div className="flex flex-col items-center space-y-3">
            <div className="rounded-lg border-2 border-dashed border-slate-300 p-4">
              <QrCode className="h-24 w-24 text-slate-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-700">
                Tracking Code
              </p>
              <p className="font-mono text-xs text-slate-500">MRCE-934912</p>
              <Badge variant="secondary" className="mt-1">
                Scan to track
              </Badge>
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
