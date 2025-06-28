'use client';

import { loadStripe } from '@stripe/stripe-js';

// Make sure to use a publishable key for the frontend
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
);

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

    const { sessionId, url } = await response.json();

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
    alert('Failed to initialize payment. Please try again.');
  }
};
