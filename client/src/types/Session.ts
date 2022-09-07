import {IQuestion} from "./IQuestion";
import {IOption} from "./IOption";

export interface ISession {
  id: number
  createdAt: Date
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
