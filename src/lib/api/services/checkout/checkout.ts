import { createCheckoutSession } from './actions';
import type { CheckoutSessionRequest, CheckoutSessionResponse } from './type';

export const Checkout = {
  createCheckoutSession: (
    data: CheckoutSessionRequest,
  ): Promise<CheckoutSessionResponse> => {
    return createCheckoutSession(data);
  },
};
