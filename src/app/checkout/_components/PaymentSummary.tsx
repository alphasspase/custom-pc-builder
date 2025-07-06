'use client';

import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { usePCBuilder } from '@/hooks/usePCBuilder';
import { createCheckoutSession } from '@/lib/api/services/checkout/actions';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

interface PaymentSummaryProps {
  componentsTotal: number;
  setupTotal: number;
  total: number;
  grandTotal: number;
  recipientInfo: {
    fullName: string;
    phoneNumber: string;
    address: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    deliveryNote: string;
  };
}

export function PaymentSummary({
  componentsTotal,
  setupTotal,
  total,
  grandTotal,
  recipientInfo,
}: PaymentSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const router = useRouter();

  // Get selected products from the PCBuilder hook
  const { selectedProducts, selectedSetupProducts } = usePCBuilder();

  const handlePayment = async () => {
    // Clear previous errors
    setPaymentError(null);
    setValidationErrors({});

    // Validate required fields
    const errors: Record<string, string> = {};
    const requiredFields: Array<{
      field: keyof typeof recipientInfo;
      label: string;
    }> = [
      { field: 'fullName', label: 'Full name' },
      { field: 'phoneNumber', label: 'Phone number' },
      { field: 'address', label: 'Address' },
      { field: 'city', label: 'City' },
      { field: 'state', label: 'State' },
      { field: 'postalCode', label: 'Postal code' },
      { field: 'country', label: 'Country' },
      { field: 'email', label: 'Email' },
    ];

    // Check for empty fields
    requiredFields.forEach(({ field, label }) => {
      if (!recipientInfo[field]?.trim()) {
        errors[field] = `${label} is required`;
      }
    });

    // Validate email format
    if (
      recipientInfo.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientInfo.email)
    ) {
      errors['email'] = 'Please enter a valid email address';
    }

    // Validate if products are selected
    if (selectedProducts.length === 0 && selectedSetupProducts.length === 0) {
      setPaymentError(
        'Please select at least one product before proceeding to payment',
      );

      return;
    }

    // If there are validation errors, show them and don't proceed
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setPaymentError('Please fill in all required fields correctly');

      return;
    }

    setIsProcessing(true);

    try {
      // Create a descriptive name based on selected products
      const productSummary =
        selectedProducts.length > 0
          ? `Custom PC: ${selectedProducts.map((p) => p.name).join(', ')}`
          : 'Custom PC Build';

      // This will redirect to Stripe's checkout page with all selected products
      // await redirectToStripeCheckout(
      //   grandTotal,
      //   productSummary,
      //   selectedProducts,
      //   selectedSetupProducts,
      // );
      // Now we have all the recipient information directly from the form
      const payload = {
        amount: grandTotal.toString(),
        product_name: productSummary,
        selected_products: selectedProducts.map((p) => ({ ...p })),
        selected_setup_products: selectedSetupProducts.map((p) => ({ ...p })),
        billing_name: recipientInfo.fullName,
        billing_email: recipientInfo.email,
        billing_phone: recipientInfo.phoneNumber,
        billing_address_line1: recipientInfo.address,
        billing_address_line2: recipientInfo.addressLine2,
        billing_city: recipientInfo.city,
        billing_state: recipientInfo.state,
        billing_postal_code: recipientInfo.postalCode,
        billing_country: recipientInfo.country,
        billing_delivery_note: recipientInfo.deliveryNote,
        success_url: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}`,
      };
      const response = await createCheckoutSession(payload);
      const { sessionId, url } = response;

      if (!sessionId) {
        throw new Error('Failed to create checkout session');
      }

      // If we have a direct URL, use it (Stripe Checkout hosted page)
      if (url) {
        router.push(url);
      }
      console.log('Checkout session created:', response);

      // The following code will only run if the redirection fails
      console.log('Stripe redirection failed');
      setIsProcessing(false);
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      if (error instanceof Error) {
        setPaymentError(error.message);
      } else {
        setPaymentError('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="h-fit space-y-8 lg:sticky lg:top-8 lg:col-span-1 lg:self-start">
      {/* Payment Method Card */}
      {/* <Card>
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
      </Card> */}

      {/* Voucher Card */}
      {/* <Card>
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
      </Card> */}

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
          {/* <div className="flex justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-medium text-green-600">-${discount}</span>
          </div> */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="font-medium">Free</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="text-xl font-bold">${grandTotal}</span>
          </div>
          {paymentError && (
            <div className="mt-2 text-sm text-red-600">
              {paymentError}
              {Object.keys(validationErrors).length > 0 && (
                <ul className="mt-1 list-disc pl-5">
                  {Object.entries(validationErrors).map(([field, error]) => (
                    <li key={field}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <Button
            className="mt-4 w-full"
            size="lg"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to payment'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
