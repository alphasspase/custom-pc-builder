import { apiClient } from '../../apiClient';
import endpoints from '../../endpoints';
import { AssistanceRequestPayload, AssistanceResponse } from './type';

export const AssistanceService = {
  async submitRequest(
    data: AssistanceRequestPayload,
  ): Promise<AssistanceResponse> {
    const response = await apiClient.post<AssistanceResponse>(
      endpoints.assistance.submitRequest,
      data,
      {
        next: { tags: ['assistance-request'] },
      },
    );

    return response;
  },
};
