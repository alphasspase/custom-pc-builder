import { Question } from '@/lib/api/services/demand_assessment/type';
import { apiClient } from '../../apiClient';
import endpoints from '../../endpoints';

export const DemandAssessments = {
  async getFirstQuestion(): Promise<Question> {
    const question: Question = await apiClient.get(
      endpoints.demand_assessment.getFirstQuestion,
      {
        next: { tags: ['get-first-question'] },
      },
    );

    return question;
  },

  async getNextQuestion(id: number): Promise<Question> {
    const payload = { option_id: id };
    const nextQuestion = await apiClient.post<Question>(
      endpoints.demand_assessment.getNextQuestion,
      payload,
      {
        next: { tags: [`get-next-question-${id}`] },
      },
    );

    return nextQuestion;
  },
};
