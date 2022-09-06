export interface IQuiz {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  authorUsername: string,
  topics: Array<string>
}

export interface ICreateQuizDto {
  name: string,
  description: string,
  authorUsername: string,
  topicStrings: Array<string>
}
