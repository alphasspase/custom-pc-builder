import { CheckCircle, Mail, Phone, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ContactInformationProps {
  customerInfo: CustomerInfo;
}

export function ContactInformation({ customerInfo }: ContactInformationProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <h3 className="text-xl font-semibold text-slate-900">
          Contact Information
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Customer Name
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {customerInfo.firstName} {customerInfo.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Email Address
                </p>
                <p className="font-medium text-slate-900">
                  {customerInfo.email}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Phone className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Phone Number
                </p>
                <p className="font-medium text-slate-900">
                  {customerInfo.phone}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">Status</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Verified Customer
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
