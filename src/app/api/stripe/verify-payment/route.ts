import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-05-28.basil', // Using the latest API version
});

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 },
      );
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Here you would typically:
    // 1. Update order status in your database
    // 2. Send confirmation emails
    // 3. Update inventory
    // 4. Track analytics

    return NextResponse.json({
      success: true,
      session,
      // You can add more details here from your own database
      orderDetails: {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString(),
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency,
        paymentStatus: session.payment_status,
        // Add more custom details here
      },
    });
  } catch (error) {
    console.error('Stripe verification error:', error);

    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 },
    );
  }
}
