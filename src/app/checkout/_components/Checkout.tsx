'use client';

import { useState } from 'react';

import { Truck, User, Info, Laptop, Monitor } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductCard } from './ProductCard';
import { SetupProductCard } from './SetupProductCard';
import { DeliveryOptionCard } from './DeliveryOptionCard';
import { PaymentSummary } from './PaymentSummary';
import { usePCBuilder } from '@/hooks/usePCBuilder';

export default function Checkout() {
  const {
    selectedProducts,
    selectedSetupProducts,
    total,
    componentsTotal,
    setupTotal,
    removeProduct,
    removeSetupProduct,
  } = usePCBuilder();

  const [deliveryMethod, setDeliveryMethod] = useState('ups');
  const [deliverySpeed, setDeliverySpeed] = useState('express');

  const discount = 15;
  const deliveryFee = deliverySpeed === 'express' ? 22 : 12;
  const grandTotal = total - discount + deliveryFee;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* PC Components Order Summary */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <Laptop className="mr-2 h-5 w-5" />
                <CardTitle>PC Components</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2 grid grid-cols-10 gap-4 text-sm font-medium md:text-base">
                <div className="col-span-8">Name</div>
                <div>Price</div>
              </div>
              <Separator className="mb-4" />
              {selectedProducts.length > 0 ? (
                selectedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onRemove={() => removeProduct(product.id)}
                  />
                ))
              ) : (
                <p className="text-muted-foreground py-2">
                  No PC components selected
                </p>
              )}
              {selectedProducts.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <p className="font-medium">Subtotal: ${componentsTotal}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Setup Products Order Summary */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <Monitor className="mr-2 h-5 w-5" />
                <CardTitle>Setup Products</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2 grid grid-cols-10 gap-4 text-sm font-medium md:text-base">
                <div className="col-span-8">Name</div>
                <div>Price</div>
              </div>
              <Separator className="mb-4" />
              {selectedSetupProducts.length > 0 ? (
                selectedSetupProducts.map((product) => (
                  <SetupProductCard
                    key={product.id}
                    product={product}
                    onRemove={() => removeSetupProduct(product.id)}
                  />
                ))
              ) : (
                <p className="text-muted-foreground py-2">
                  No setup products selected
                </p>
              )}
              {selectedSetupProducts.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <p className="font-medium">Subtotal: ${setupTotal}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Options */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                <CardTitle>Delivery options</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block text-base">Operator</Label>
                  <RadioGroup
                    defaultValue={deliveryMethod}
                    onValueChange={setDeliveryMethod}
                    className="flex flex-wrap gap-3"
                  >
                    {['ups', 'amazon', 'dhl', 'fedex'].map((operator) => (
                      <div
                        key={operator}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={operator} id={operator} />
                        <Label htmlFor={operator} className="cursor-pointer">
                          {operator.toUpperCase()}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <DeliveryOptionCard
                    deliverySpeed={deliverySpeed}
                    setDeliverySpeed={setDeliverySpeed}
                    option="express"
                    price={22}
                    description="Instant delivery"
                    arrival="Today"
                  />
                  <DeliveryOptionCard
                    deliverySpeed={deliverySpeed}
                    setDeliverySpeed={setDeliverySpeed}
                    option="standard"
                    price={12}
                    description="Standard delivery"
                    arrival="DD/MM"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipient Information */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                <CardTitle>Recipient information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" defaultValue="Amway Dunne" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone number</Label>
                  <Input id="phoneNumber" defaultValue="732-123-4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    defaultValue="4706  Street, , New Jersey(NJ)"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-2">
                <Checkbox id="saveDefault" defaultChecked />
                <Label
                  htmlFor="saveDefault"
                  className="text-sm leading-none font-medium"
                >
                  Save as default
                </Label>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="deliveryNote">Delivery note</Label>
                <div className="relative">
                  <Input
                    id="deliveryNote"
                    className="pl-9"
                    defaultValue="Leave at the front door."
                  />
                  <Info className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <PaymentSummary
          componentsTotal={componentsTotal}
          setupTotal={setupTotal}
          total={total}
          discount={discount}
          deliveryFee={deliveryFee}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  );
}
