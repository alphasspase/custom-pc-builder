import { Mail, QrCode, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
    <Card className="w-full border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm">
      <div className="flex">
        <div>
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Build Assigned To */}
              <div className="rounded-lg border border-white bg-white p-4 shadow-sm">
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                  <User className="h-5 w-5 flex-shrink-0 text-slate-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-slate-700">
                      Build Assigned To
                    </p>
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {customerInfo.firstName} {customerInfo.lastName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="rounded-lg border border-white bg-white p-4 shadow-sm">
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-slate-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-slate-700">
                      Notifications
                    </p>
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {customerInfo.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Config ID */}
              {/* <div className="rounded-lg border border-white bg-white p-4 shadow-sm">
            <div className="flex h-full min-h-[60px] flex-col items-center justify-center text-center">
              <p className="mb-1 text-xs font-medium text-slate-700">
                Config ID
              </p>
              <p className="text-sm font-semibold text-slate-900">
                #{orderId.slice(-6)}
              </p>
              <Badge variant="secondary" className="mt-2 text-xs">
                Tracking Code
              </Badge>
            </div>
          </div> */}

              {/* QR Code */}
              {/* <div className="rounded-lg border border-white bg-white p-4 shadow-sm">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
                <Image
                  src="/trash/qr-code.png"
                  alt="QR Code"
                  width={48}
                  height={48}
                  className="rounded object-contain"
                />
              </div>
              <p className="text-xs font-medium text-slate-700">
                Scan to Track
              </p>
              <p className="mt-1 font-mono text-xs text-slate-500">
                MRCE-934912
              </p>
            </div>
          </div> */}
            </div>
          </CardContent>
        </div>

        <div className="flex">
          {/* <AspectRatio
            ratio={1 / 1}
            className="border-primary flex flex-col items-center justify-center rounded-md border border-dashed bg-white shadow-inner"
          >
            <span className="text-muted-foreground text-sm">Config ID</span>
            <h6 className="text-lg font-semibold">#435345</h6>
          </AspectRatio> */}
          <AspectRatio
            ratio={1 / 1}
            className="flex flex-col items-center justify-center rounded-md border border-dashed border-gray-200 bg-white"
          >
            <Image
              src="/trash/qr-code.png"
              alt="QR Code"
              width={200}
              height={200}
              className="h-full w-full rounded-md object-contain p-2"
            />
          </AspectRatio>
        </div>
      </div>
    </Card>
  );
}
