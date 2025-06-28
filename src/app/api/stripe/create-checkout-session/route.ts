import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ProductItem, SetupProductItem } from './types';

// Define product types directly in the file to avoid import issues
// type ProductItem = {
//   name: string;
//   category: string;
//   price: string | number;
//   description?: string;
//   image?: string;
// };

// type SetupProductItem = {
//   name: string;
//   category_name: string;
//   price: string | number;
//   description?: string;
//   image?: string;
// };

// Initialize Stripe with your secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error('Missing STRIPE_SECRET_KEY environment variable');
}

// Initialize Stripe without specifying API version to use the default
const stripe = new Stripe(stripeSecretKey || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      amount,
      productName,
      selectedProducts = [],
      selectedSetupProducts = [],
    } = body;

    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 },
      );
    }

    // Create line items for individual PC components if we have any
    const lineItems = [];

    // Add PC components if available
    if (selectedProducts && selectedProducts.length > 0) {
      selectedProducts.forEach((product: ProductItem) => {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${product.name} (${product.category})`,
            },
            unit_amount: Math.round(
              typeof product.price === 'string'
                ? parseFloat(product.price) * 100
                : product.price * 100,
            ), // Convert to cents
          },
          quantity: 1,
        });
      });
    }

    // Add setup products if available
    if (selectedSetupProducts && selectedSetupProducts.length > 0) {
      selectedSetupProducts.forEach((product: SetupProductItem) => {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${product.name} (${product.category_name})`,
              description: product.description || '',
              images: product.image ? [product.image] : [],
            },
            unit_amount: Math.round(
              typeof product.price === 'string'
                ? parseFloat(product.price) * 100
                : product.price * 100,
            ), // Convert to cents
          },
          quantity: 1,
        });
      });
    }

    // If no specific products were added, use the generic "Custom PC Build"
    if (lineItems.length === 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName || 'Custom PC Build',
          },
          unit_amount: Math.round(amount * 100), // Stripe expects amounts in cents
        },
        quantity: 1,
      });
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout/cancel`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe API error:', error);

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    );
  }
}
