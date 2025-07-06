'use client';

import type { Product } from '@/services/pc_configuration/type';
import type { Setup_Product } from '@/lib/api/services/setup_configuration/type';

// Make sure to use a publishable key for the frontend
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) {
  console.warn(
    'Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable',
  );
}

// const stripePromise = loadStripe(publishableKey || 'pk_test_placeholder');

import { Checkout } from '@/lib/api/services/checkout/checkout';
import { CheckoutSessionRequest } from '@/lib/api/services/checkout/type';

export const redirectToStripeCheckout = async (
  amount: number,
  productName = 'Custom PC Build',
  selectedProducts: Product[] = [],
  selectedSetupProducts: Setup_Product[] = [],
) => {
  try {
    const checkoutData: CheckoutSessionRequest = {
      amount: amount.toString(),
      product_name: productName,
      selected_products: selectedProducts.map((p) => ({ ...p })),
      selected_setup_products: selectedSetupProducts.map((p) => ({ ...p })),
      billing_name: 'John Doe',
      billing_email: 'john.doe@example.com',
      billing_phone: '+1234567890',
      billing_address_line1: '123 Main St',
      billing_address_line2: '77',
      billing_city: 'San Francisco',
      billing_state: 'CA',
      billing_postal_code: '94105',
      billing_country: 'US',
      success_url: `http://localhost:3000/checkout/success`,
      cancel_url: 'http://localhost:3000/checkout/cancel',
    };

    console.log('Creating checkout session with data:', checkoutData);
    const data = await Checkout.createCheckoutSession(checkoutData);
    console.log('Response data:', data);
    const { sessionId, url } = data;

    if (!sessionId) {
      throw new Error('Failed to create checkout session');
    }

    // If we have a direct URL, use it (Stripe Checkout hosted page)
    if (url) {
      console.log('🚀 Redirecting to Stripe Checkout:', {
        sessionId,
        url,
        amount,
        productName,
        totalProducts: selectedProducts.length + selectedSetupProducts.length,
      });

      window.location.href = url;

      return;
    }

    // Otherwise use the session ID for redirectToCheckout
    // const { error } = await stripe.redirectToCheckout({ sessionId });

    // if (error) {
    //   throw new Error(error.message);
    // }
  } catch (error) {
    console.error('Error redirecting to Stripe Checkout:', error);
    // Make the error more descriptive for debugging
    if (error instanceof Error) {
      alert(`Payment error: ${error.message}`);
    } else {
      alert('Failed to initialize payment. Please try again.');
    }
    throw error; // Re-throw so the calling code can handle it
  }
};
