import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ProductItem, SetupProductItem } from './types';

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
        // Validate image URL
        const isValidImageUrl =
          product.image &&
          typeof product.image === 'string' &&
          (product.image.startsWith('http://') ||
            product.image.startsWith('https://') ||
            product.image.startsWith('/'));

        // Create product data with validated image
        const productData: {
          name: string;
          description?: string;
          images?: string[];
        } = {
          name: `${product.name} (${product.category})`,
        };

        if (product.description) {
          productData.description = product.description;
        }

        // Only add image if it's valid
        if (isValidImageUrl && product.image) {
          // For relative URLs, convert to absolute
          if (product.image.startsWith('/')) {
            const origin = req.headers.get('origin') || 'http://localhost:3000';
            productData.images = [`${origin}${product.image}`];
          } else {
            productData.images = [product.image];
          }
        }

        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: productData,
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
        // Validate image URL
        const isValidImageUrl =
          product.image &&
          typeof product.image === 'string' &&
          (product.image.startsWith('http://') ||
            product.image.startsWith('https://') ||
            product.image.startsWith('/'));

        // Create product data with validated image
        const productData: {
          name: string;
          description: string;
          images?: string[];
        } = {
          name: `${product.name} (${product.category_name})`,
          description: product.description || '',
        };

        // Only add image if it's valid
        if (isValidImageUrl && product.image) {
          // For relative URLs, convert to absolute
          if (product.image.startsWith('/')) {
            const origin = req.headers.get('origin') || 'http://localhost:3000';
            productData.images = [`${origin}${product.image}`];
          } else {
            productData.images = [product.image];
          }
        }

        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: productData,
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

    // Get origin with fallback
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });
    console.log('🔹 Stripe session created successfully:', session);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe API error:', error);

    // Better error handling with more specific messages
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    const statusCode =
      error instanceof Stripe.errors.StripeError ? error.statusCode : 500;

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
