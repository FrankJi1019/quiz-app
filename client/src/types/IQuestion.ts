import {IOption} from "./IOption";

export interface IQuestion {
  id: number;
  content: string;
  explanation: string;
}

export interface IUserAnswer {
  questionId: number;
  answerOptionId: number | undefined;
}

export interface ICreateQuestionWithOptions {
  id: number;
  content: string;
  explanation: string;
  options: Array<{content: string; isCorrect: boolean; questionId: 0}>;
  quizId: number;
}
