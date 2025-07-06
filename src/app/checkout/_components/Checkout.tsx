'use client';

import { User, Info, Laptop, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from './ProductCard';
import { SetupProductCard } from './SetupProductCard';
// import { DeliveryOptionCard } from './DeliveryOptionCard';
import { PaymentSummary } from './PaymentSummary';
import { usePCBuilder } from '@/hooks/usePCBuilder';

// React Hook Form + Zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define the form schema with Zod
const recipientFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Please enter a valid phone number.' }),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters.' }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: 'City is required.' }),
  state: z.string().min(2, { message: 'State is required.' }),
  postalCode: z.string().min(5, { message: 'Postal code is required.' }),
  country: z.string().min(2, { message: 'Country is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  deliveryNote: z.string().optional(),
});

// Create a type from the schema
type RecipientFormValues = z.infer<typeof recipientFormSchema>;

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

  // Initialize React Hook Form with Zod validation
  const form = useForm<RecipientFormValues>({
    resolver: zodResolver(recipientFormSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      address: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      email: '',
      deliveryNote: '',
    },
    mode: 'onBlur', // Validate on blur for better UX
  });

  // Destructure needed properties from form
  const {
    register,
    formState: { errors },
    watch,
  } = form;

  // Watch all form values for use in the PaymentSummary component
  const formValues = watch();

  // const [deliveryMethod, setDeliveryMethod] = useState('ups');
  // const [deliverySpeed, setDeliverySpeed] = useState('express');

  // const discount = 15;
  // const deliveryFee = deliverySpeed === 'express' ? 22 : 12;
  // const grandTotal = total - discount + deliveryFee;

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

          {/* <Card>
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
          </Card> */}

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
                  <Input
                    placeholder="Amway Dunne"
                    id="fullName"
                    {...register('fullName')}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone number</Label>
                  <Input
                    placeholder="732-123-4567"
                    id="phoneNumber"
                    {...register('phoneNumber')}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-500">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    placeholder="4706 Street, New Jersey(NJ)"
                    id="address"
                    {...register('address')}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    placeholder="New Jersey"
                    id="city"
                    {...register('city')}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input placeholder="NJ" id="state" {...register('state')} />
                  {errors.state && (
                    <p className="text-sm text-red-500">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    placeholder="07001"
                    id="postalCode"
                    {...register('postalCode')}
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-red-500">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    placeholder="US"
                    id="country"
                    {...register('country')}
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    placeholder="amway.dunne@example.com"
                    id="email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="deliveryNote">Delivery note</Label>
                <div className="relative">
                  <Input
                    placeholder="Leave at the front door."
                    id="deliveryNote"
                    className="pl-9"
                    {...register('deliveryNote')}
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
          grandTotal={total}
          recipientInfo={formValues}
          form={form}
        />
      </div>
    </div>
  );
}
