import { Mail, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

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
      <div className="flex gap-5 p-5">
        <div className="flex-1">
          <CardHeader className="mb-5 p-0">
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
          <CardContent className="p-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            </div>
          </CardContent>
        </div>

        <div className="flex gap-4">
          <div className="flex min-h-36 min-w-36 flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white p-4 shadow-inner">
            <span className="mb-2 text-sm text-slate-500">Config ID</span>
            <h6 className="text-lg font-semibold text-slate-900">
              #{orderId.slice(-6)}
            </h6>
          </div>
          <div className="flex aspect-square min-h-36 min-w-36 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 bg-white p-4">
            <div className="relative mb-2">
              <Image
                src="/trash/qr-code.png"
                alt="QR Code"
                width={80}
                height={80}
                className="rounded object-contain"
                onError={(e) => {
                  console.error('QR Code image failed to load');
                  // Hide the image and show fallback icon
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML =
                      '<div class="w-20 h-20 flex items-center justify-center"><svg class="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg></div>';
                  }
                }}
              />
            </div>
            <span className="text-center text-xs text-slate-500">
              Scan to Track
            </span>
            <p className="mt-1 font-mono text-xs text-slate-500">MRCE-934912</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
