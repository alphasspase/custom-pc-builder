'use server';

import { apiClient } from '../../apiClient';
import endpoints from '../../endpoints';
import { CheckoutSessionRequest, CheckoutSessionResponse } from './type';

export async function createCheckoutSession(
  data: CheckoutSessionRequest,
): Promise<CheckoutSessionResponse> {
  const response = await apiClient.post<CheckoutSessionResponse>(
    endpoints.checkout.createCheckoutSession,
    data,
  );

  return response;
}
