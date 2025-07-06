export interface CheckoutSessionRequest {
  amount: string;
  product_name: string;
  selected_products: Record<string, unknown>[];
  selected_setup_products: Record<string, unknown>[];
  billing_name: string;
  billing_email: string;
  billing_phone: string;
  billing_address_line1: string;
  billing_address_line2: string;
  billing_city: string;
  billing_state: string;
  billing_postal_code: string;
  billing_country: string;
  success_url: string;
  cancel_url: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}
