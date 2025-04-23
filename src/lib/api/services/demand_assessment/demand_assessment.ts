import { apiClient } from '../../apiClient';
import endpoints from '../../endpoints';

type Question = {
  id: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
  }>;
};

type AssessmentResponse = {
  current_question: Question;
  progress: number;
};

export const DemandAssessmentService = {
  async getFirstQuestion(): Promise<AssessmentResponse> {
    return apiClient.get<AssessmentResponse>(endpoints.user.getJoke, {
      headers: {
        accept: 'application/json',
      },
      cache: 'force-cache',
      next: { tags: ['demand_assessment'] },
    });
  },

  async getNextQuestion(
    questionId: string,
    answerId: string,
  ): Promise<AssessmentResponse> {
    return apiClient.post<AssessmentResponse>(
      endpoints.demand_assessment.getNextQuestion(questionId),
      { answer_id: answerId },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      },
    );
  },
};

// Usage example:
// const firstQuestion = await DemandAssessmentService.getFirstQuestion();
