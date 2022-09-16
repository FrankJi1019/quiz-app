import {IQuestion} from "./IQuestion";
import {IOption} from "./IOption";

export interface ISession {
  id: number
  startedAt: Date
  quizId: number
  username: string
  state: SessionState
}

export enum SessionState {
  ACTIVE = 1, FINISHED = 2
}

export interface Record {
  question: IQuestion
  option: IOption | null
}

export interface Result {
  questionId: number
  questionContent: string
  correctAnswer: string
  userAnswer: string
  isCorrect: boolean
}
