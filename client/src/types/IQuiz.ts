export interface IQuiz {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  authorName: string,
  topics: Array<string>,
  questionCount: number,
  sessionCount: number
}

export interface ICreateQuizDto {
  name: string,
  description: string,
  authorUsername: string,
  topicStrings: Array<string>
}
