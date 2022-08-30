export interface IQuiz {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  authorId: string,
  topics: Array<string>
}

export interface ICreateQuizDto {
  name: string,
  description: string,
  authorId: string,
  topicStrings: Array<string>
}
