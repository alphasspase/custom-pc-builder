export interface AssistanceRequestPayload {
  email: string;
  message: string;
  lack_of_clarity: boolean;
  this_is_not_helpful: boolean;
  this_is_not_safe: boolean;
  subject: string;
  description: string;
}

export interface AssistanceResponse {
  message: string;
}
