export interface QuestionOptions {
  id: number;
  option_text: string;
  icon: string | null;
  next_question: number;
  configuration_preset_id: number | null;
}

export interface Question {
  id: number;
  question: string;
  is_first: boolean;
  is_last: boolean;
  options: QuestionOptions[];
}

export interface NextQuestion {
  id: number;
  question: string;
  is_first: boolean;
  is_last: boolean;
  options: QuestionOptions[];
}
