'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ShoppingCart,
  CreditCard,
  Truck,
  User,
  Info,
  Check,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Product name',
      price: 52,
      quantity: 1,
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      id: '2',
      name: 'Product name',
      price: 52,
      quantity: 2,
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      id: '3',
      name: 'Product name',
      price: 12,
      quantity: 3,
      image: '/placeholder.svg?height=80&width=80',
    },
  ]);

  const [deliveryMethod, setDeliveryMethod] = useState('ups');
  const [deliverySpeed, setDeliverySpeed] = useState('express');
  //   const [voucher, setVoucher] = useState('$15 OFF');

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );
  const discount = 15;
  const deliveryFee = deliverySpeed === 'express' ? 22 : 12;
  const total = subtotal - discount + deliveryFee;

  const removeProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Order Summary */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <CardTitle>Order summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 font-medium mb-2 text-sm md:text-base">
                <div className="col-span-2">Name</div>
                <div className="text-center">Price</div>
                <div className="text-right">Total</div>
              </div>
              <Separator className="mb-4" />

              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-4 gap-4 items-center py-3 border-b"
                >
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">${product.price}</div>
                  <div className="flex items-center justify-end">
                    <span className="font-medium">
                      ${product.price * product.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2 h-8 w-8"
                      onClick={() => removeProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
                  <Label className="text-base mb-3 block">Operator</Label>
                  <RadioGroup
                    defaultValue={deliveryMethod}
                    onValueChange={setDeliveryMethod}
                    className="flex flex-wrap gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ups" id="ups" />
                      <Label htmlFor="ups" className="cursor-pointer">
                        UPS
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="amazon" id="amazon" />
                      <Label htmlFor="amazon" className="cursor-pointer">
                        Amazon
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dhl" id="dhl" />
                      <Label htmlFor="dhl" className="cursor-pointer">
                        DHL
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fedex" id="fedex" />
                      <Label htmlFor="fedex" className="cursor-pointer">
                        FedEx
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    className={`cursor-pointer transition-all ${deliverySpeed === 'express' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setDeliverySpeed('express')}
                  >
                    <CardContent className="p-4 flex items-start">
                      <div
                        className={`rounded-full w-5 h-5 mr-3 mt-0.5 flex items-center justify-center border ${deliverySpeed === 'express' ? 'bg-primary border-primary' : 'border-input'}`}
                      >
                        {deliverySpeed === 'express' && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg">$22</p>
                        <p className="font-medium">Instant delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Est. arrival: Today
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all ${deliverySpeed === 'standard' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setDeliverySpeed('standard')}
                  >
                    <CardContent className="p-4 flex items-start">
                      <div
                        className={`rounded-full w-5 h-5 mr-3 mt-0.5 flex items-center justify-center border ${deliverySpeed === 'standard' ? 'bg-primary border-primary' : 'border-input'}`}
                      >
                        {deliverySpeed === 'standard' && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg">$12</p>
                        <p className="font-medium">Standard delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Est. arrival: DD/MM
                        </p>
                      </div>
                    </CardContent>
                  </Card>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" defaultValue="Amaya Dunne" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone number</Label>
                  <Input id="phoneNumber" defaultValue="732-123-4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    defaultValue="4706 Pooz Street, Bayville, New Jersey(NJ)"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="saveDefault" defaultChecked />
                <Label
                  htmlFor="saveDefault"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    defaultValue="Likewise, and unless there are no pains, they will come and go, so that exercise can be pursued and fled."
                  />
                  <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="space-y-8">
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
                className="w-full justify-start text-muted-foreground mb-4"
              >
                Change payment methods
              </Button>

              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
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
                <Badge variant="secondary" className="text-sm py-1.5">
                  $15 Off
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <CardTitle>Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal}</span>
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
                <span className="font-bold text-xl">${total}</span>
              </div>

              <Button className="w-full mt-4" size="lg">
                Proceed to payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
