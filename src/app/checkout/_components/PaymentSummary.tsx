'use client';

import { ShoppingCart, CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { URLS } from '@/utils/urls';

interface PaymentSummaryProps {
  componentsTotal: number;
  setupTotal: number;
  total: number;
  discount: number;
  deliveryFee: number;
  grandTotal: number;
}

export function PaymentSummary({
  componentsTotal,
  setupTotal,
  total,
  discount,
  deliveryFee,
  grandTotal,
}: PaymentSummaryProps) {
  return (
    <div className="h-fit space-y-8 lg:sticky lg:top-8 lg:col-span-1 lg:self-start">
      {/* Payment Method Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            <CardTitle>Payment method</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="text-muted-foreground mb-4 w-full justify-start"
          >
            Change payment methods
          </Button>

          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Mastercard</p>
                </div>
              </div>
              <p className="font-medium">•••• 5987</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Voucher Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Voucher</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="$15 OFF" />
            <Button variant="outline">Apply</Button>
          </div>

          <div className="mt-3">
            <Badge variant="secondary" className="py-1.5 text-sm">
              $15 Off
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            <CardTitle>Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">PC Components</span>
            <span className="font-medium">${componentsTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Setup Products</span>
            <span className="font-medium">${setupTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-medium text-green-600">-${discount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="font-medium">${deliveryFee}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="text-xl font-bold">${grandTotal}</span>
          </div>
          <Link href={URLS.paymentInformation}>
            <Button className="mt-4 w-full" size="lg">
              Proceed to payment
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
