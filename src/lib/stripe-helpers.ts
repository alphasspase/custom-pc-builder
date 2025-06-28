'use client';

import { loadStripe } from '@stripe/stripe-js';

// Make sure to use a publishable key for the frontend
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) {
  console.warn(
    'Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable',
  );
}

const stripePromise = loadStripe(publishableKey || 'pk_test_placeholder');

export const redirectToStripeCheckout = async (
  amount: number,
  productName = 'Custom PC Build',
) => {
  try {
    // Initialize Stripe
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    // Create a checkout session on the server
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        productName,
      }),
    });

    const data = await response.json();
    console.log('Response data:', data);
    const { sessionId, url } = data;

    if (!sessionId) {
      throw new Error('Failed to create checkout session');
    }

    // If we have a direct URL, use it (Stripe Checkout hosted page)
    if (url) {
      window.location.href = url;

      return;
    }

    // Otherwise use the session ID for redirectToCheckout
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      throw new Error(error.message);
    }
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
