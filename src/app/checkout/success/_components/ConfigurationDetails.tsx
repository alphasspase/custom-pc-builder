import { Mail, User, Package, Sparkles, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
    <Card className="w-full overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg">
      <CardHeader className="mb-6 p-6 pb-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-600 shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Configuration #{orderId.slice(-6)}
              </h3>
              <p className="text-sm text-slate-600">Premium Custom Build</p>
            </div>
          </div>

          <Button onClick={() => console.log('Track Your Order')} size="lg">
            Track Your Order
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Build Assigned To */}
          <div className="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 shadow-sm transition-shadow group-hover:shadow-md">
                <User className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Build Assigned To
                </p>
                <p className="truncate text-sm font-bold text-slate-900">
                  {customerInfo.firstName} {customerInfo.lastName}
                </p>
                <div className="mt-2 flex items-center justify-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
                  <span className="text-xs text-slate-600">Active Builder</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-green-200 text-emerald-600 shadow-sm transition-shadow group-hover:shadow-md">
                <Mail className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Notifications
                </p>
                <p className="truncate text-sm font-bold text-slate-900">
                  {customerInfo.email}
                </p>
                <div className="mt-2 flex items-center justify-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-400"></div>
                  <span className="text-xs text-slate-600">
                    Updates Enabled
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Config ID */}
          <div className="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-2 right-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>
            <div className="flex h-full flex-col items-center justify-center space-y-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 text-amber-600 shadow-sm">
                <span className="text-lg font-bold">#</span>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Config ID
                </p>
                <h6 className="mb-2 text-lg font-bold text-slate-900">
                  #{orderId.slice(-6)}
                </h6>
                <Badge
                  variant="secondary"
                  className="border border-slate-200 bg-slate-100 text-xs text-slate-700"
                >
                  Premium Build
                </Badge>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex h-full flex-col items-center justify-center space-y-3 text-center">
              <div className="relative transition-transform duration-300 group-hover:scale-105">
                <div className="aspect-square w-24 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-3 shadow-sm transition-colors group-hover:border-slate-400">
                  <Image
                    src="/trash/qr-code.png"
                    alt="QR Code"
                    width={90}
                    height={90}
                    className="h-full w-full rounded object-contain"
                    onError={(e) => {
                      console.error('QR Code image failed to load');
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML =
                          '<div class="w-full h-full flex items-center justify-center"><svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2zm0 0V9a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg></div>';
                      }
                    }}
                  />
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  QR Code
                </p>
                <p className="mb-2 font-mono text-sm font-bold tracking-wider text-slate-900">
                  MRCE-934912
                </p>
                <Badge
                  variant="secondary"
                  className="border border-indigo-200 bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                >
                  <QrCode className="mr-1 h-3 w-3" />
                  Scan to Track
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
