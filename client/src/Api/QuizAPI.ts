import axios from "axios"
import { constants } from "../constants"
import { IUserAnswer } from "../../types/IQuestion"
import {ICreateQuizDto, IQuiz} from "../../types/IQuiz"

export const getNonEmptyQuizzes = async (filter?: {
  keyword?: string | null
}) => {
  const searchParam = new URLSearchParams()
  searchParam.append("ignoreEmpty", "true")
  if (filter && filter.keyword && filter.keyword.trim() !== "")
    searchParam.append("keyword", filter.keyword)
  return await axios.get(
    `${constants.general.backend}/quizzes?${searchParam.toString()}`
  )
}

export const getNoneEmptyQuizzesByTopic = async (topic: string) => {
  return await axios.get(
    `${constants.general.backend}/topics/${topic}/quizzes`
  )
}

export const getQuiz = async (id: number) => {
  return await axios.get(`${constants.general.backend}/quizzes/${id}`)
}

export const getQuestionCount = async (id: number) => {
  return await axios.get(
    `${constants.general.backend}/quizzes/${id}/question-count`
  )
}

export const getQuestionsByQuizId = async (id: number) => {
  return await axios.get(`${constants.general.backend}/quizzes/${id}/questions`)
}

export const getQuizResult = async (
  quizId: number,
  userAnswer: Array<IUserAnswer>
) => {
  return await axios.post(
    `${constants.general.backend}/quizzes/${quizId}/check-answer`,
    userAnswer
  )
}

export const createQuiz = async (quiz: ICreateQuizDto) => {
  return await axios.post(`${constants.general.backend}/quizzes`, quiz)
}

export const deleteQuiz = async (id: number) => {
  return await axios.delete(`${constants.general.backend}/quizzes/${id}`)
}
