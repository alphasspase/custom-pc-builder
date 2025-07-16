'use client';

import { useEffect, useState, Suspense } from 'react';
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  QrCode,
  Download,
  Mail,
  Phone,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

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

// Component that safely uses useSearchParams
function OrderContent() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const sessionId = searchParams.get('session_id');

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

  return (
    <div className="space-y-8">
      {/* Success Banner */}
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

      {/* Event/Build Details */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <h3 className="text-xl font-semibold text-slate-900">
            Order Summary
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start space-x-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Order Date</h4>
                <p className="text-sm text-slate-600">Saturday, February 20</p>
                <p className="text-xs text-slate-500">Placed at 08:00 PM</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Delivery Time</h4>
                <p className="text-sm text-slate-600">3-5 business days</p>
                <p className="text-xs text-slate-500">Build & ship time</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Build Location</h4>
                <p className="text-sm text-slate-600">Custom PC Builder</p>
                <p className="text-xs text-slate-500">Workshop, NY, USA</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <div className="h-5 w-5 text-emerald-600">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">
                  Custom PC Build
                </h4>
                <p className="text-sm text-slate-600">1 Unit ordered</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  Email confirmation sent
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isLoading && orderDetails && (
        <>
          {/* Purchase Information */}
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
                  <p className="font-semibold text-slate-900">
                    {orderDetails.date}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
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

          {/* Contact Information */}
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
                        {orderDetails.customerInfo.firstName}{' '}
                        {orderDetails.customerInfo.lastName}
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
                        {orderDetails.customerInfo.email}
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
                        {orderDetails.customerInfo.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700">
                        Status
                      </p>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Verified Customer
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Total with QR Code */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-between space-y-6 lg:flex-row lg:space-y-0">
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-slate-900">
                    Order Total:{' '}
                    <span className="text-green-600">{orderDetails.total}</span>
                  </h3>
                  <p className="mt-2 text-slate-600">
                    All taxes and fees included
                  </p>
                  <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Track Your Order
                    </Button>
                    <Button variant="outline">Download Invoice</Button>
                  </div>
                </div>

                <Separator
                  orientation="vertical"
                  className="hidden h-24 lg:block"
                />

                <div className="flex flex-col items-center space-y-3">
                  <div className="rounded-lg border-2 border-dashed border-slate-300 p-4">
                    <QrCode className="h-24 w-24 text-slate-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-700">
                      Tracking Code
                    </p>
                    <p className="font-mono text-xs text-slate-500">
                      MRCE-934912
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      Scan to track
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Details */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded-full bg-slate-800"></div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Configuration #{orderDetails.orderId.slice(-6)}
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
                        {orderDetails.customerInfo.firstName}{' '}
                        {orderDetails.customerInfo.lastName}
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
                        {orderDetails.customerInfo.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {isLoading && (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-slate-200">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 w-1/3 rounded bg-slate-200"></div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="h-20 rounded bg-slate-200"></div>
                    <div className="h-20 rounded bg-slate-200"></div>
                    <div className="h-20 rounded bg-slate-200"></div>
                    <div className="h-20 rounded bg-slate-200"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && !orderDetails && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <p className="text-red-600">
              Could not load order details. Please contact support.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 pt-6 sm:flex-row">
        <Button
          onClick={() => router.push('/')}
          className="flex-1 bg-slate-900 hover:bg-slate-800"
          size="lg"
        >
          Return to Home
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/account/orders')}
          className="flex-1 border-slate-300 hover:bg-slate-50"
          size="lg"
        >
          View My Orders
        </Button>
      </div>
    </div>
  );
}

// Main page component that wraps OrderContent in Suspense
export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <Suspense
          fallback={
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="h-6 w-1/3 rounded bg-slate-200"></div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="h-20 rounded bg-slate-200"></div>
                        <div className="h-20 rounded bg-slate-200"></div>
                        <div className="h-20 rounded bg-slate-200"></div>
                        <div className="h-20 rounded bg-slate-200"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          }
        >
          <OrderContent />
        </Suspense>
      </div>
    </div>
  );
}
