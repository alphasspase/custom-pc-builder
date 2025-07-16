import { Calendar, CreditCard, Download, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OrderDetails {
  orderId: string;
  date: string;
  total: string;
  paymentMethod: string;
}

interface PurchaseInformationProps {
  orderDetails: OrderDetails;
}

export function PurchaseInformation({
  orderDetails,
}: PurchaseInformationProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Purchase Information
          </h3>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="w-fit">
                Order ID
              </Badge>
            </div>
            <p className="font-mono text-lg font-semibold text-slate-900">
              #{orderDetails.orderId}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                Purchase Date
              </span>
            </div>
            <p className="font-semibold text-slate-900">{orderDetails.date}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                Total Amount
              </span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {orderDetails.total}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                Payment Method
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-6 w-8 rounded bg-gradient-to-r from-red-500 to-yellow-500"></div>
              <p className="font-medium text-slate-900">
                {orderDetails.paymentMethod}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
