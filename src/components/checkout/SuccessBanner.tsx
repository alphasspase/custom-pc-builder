import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function SuccessBanner() {
  return (
    <Card className="border-green-200 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50">
            <CheckCircle className="h-7 w-7 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-800">
              Payment Successful!
            </h2>
            <p className="text-green-700">
              Your order has been confirmed and is being processed.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
