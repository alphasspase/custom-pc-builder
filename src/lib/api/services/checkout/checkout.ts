import { createCheckoutSession } from './actions';
import type { CheckoutSessionRequest, CheckoutSessionResponse } from './type';

export const Checkout = {
  /**
   * Create a checkout session with Stripe
   * @param data - The checkout session request data
   * @returns A promise that resolves to the checkout session response
   */
  createCheckoutSession: (
    data: CheckoutSessionRequest,
  ): Promise<CheckoutSessionResponse> => {
    return createCheckoutSession(data);
  },
};
