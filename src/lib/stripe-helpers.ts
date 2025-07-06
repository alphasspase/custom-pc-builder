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

export const redirectToStripeCheckout = async (
  amount: number,
  productName = 'Custom PC Build',
  selectedProducts: Product[] = [],
  selectedSetupProducts: Setup_Product[] = [],
) => {
  try {
    const response = await fetch(
      'http://127.0.0.1:8000/payments/rest_api/create-checkout-session/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          productName,
          selectedProducts,
          selectedSetupProducts,
          success_url: `http://localhost:3000/checkout/success`,
          cancel_url: 'http://localhost:3000//checkout/cancel',
        }),
      },
    );
    console.log('Response data:', response);
    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const data = await response.json();
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
