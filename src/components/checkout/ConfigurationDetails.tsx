import { Mail, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
}

interface ConfigurationDetailsProps {
  orderId: string;
  customerInfo: CustomerInfo;
}

export function ConfigurationDetails({
  orderId,
  customerInfo,
}: ConfigurationDetailsProps) {
  return (
    <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="h-6 w-6 rounded-full bg-slate-800"></div>
          <h3 className="text-xl font-semibold text-slate-900">
            Configuration #{orderId.slice(-6)}
          </h3>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Custom Build
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-white bg-white p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Build Assigned To
                </p>
                <p className="font-semibold text-slate-900">
                  {customerInfo.firstName} {customerInfo.lastName}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-white bg-white p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Notifications
                </p>
                <p className="font-semibold text-slate-900">
                  {customerInfo.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
