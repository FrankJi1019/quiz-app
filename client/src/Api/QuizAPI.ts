import axios from "axios"
import { constants } from "../constants"
import {IQuestion, IUserAnswer} from "../../types/IQuestion"
import {ICreateQuizDto, IQuiz} from "../../types/IQuiz"
import {useMutation, useQuery, UseQueryResult} from "react-query";

export const useFetchNonEmptyQuizzes = (keyword?: string | null): UseQueryResult<Array<IQuiz>> => {
  const searchParam = new URLSearchParams()
  searchParam.append("ignoreEmpty", "true")
  if (keyword && keyword.trim() != "") searchParam.append("keyword", keyword)
  return useQuery(["get", keyword], async () => {
    const {data} = await axios.get(`${constants.general.backend}/quizzes?${searchParam.toString()}`)
    return data
  })
}

export const useFetchNonEmptyQuizzesByTopic = (topic: string): UseQueryResult<Array<IQuiz>> => {
  return useQuery(["get", topic], async () => {
    const {data} = await axios.get(`${constants.general.backend}/topics/${topic}/quizzes`)
    return data
  })
}

export const useFetchQuiz = (id: number): UseQueryResult<IQuiz> => {
  return useQuery(["get", id], async () => {
    const {data} = await axios.get(`${constants.general.backend}/quizzes/${id}`)
    return data
  })
}

export const useFetchQuizQuestionCount = (quizId: number): UseQueryResult<number> => {
  return useQuery(["question-count", quizId], async () => {
    const {data} = await axios.get(`${constants.general.backend}/quizzes/${quizId}/question-count`)
    return data
  })
}

export const useFetchQuestionsByQuizId = (quizId: number): UseQueryResult<Array<IQuestion>> => {
  return useQuery(["question-list", quizId], async () => {
    const {data} = await axios.get(`${constants.general.backend}/quizzes/${quizId}/questions`)
    return data
  })
}

export const useCheckQuizResultMutation = () => {
  return useMutation(async (data: { quizId: number, userAnswers: Array<IUserAnswer> }) => {
    const {data: response} = await axios.post(
      `${constants.general.backend}/quizzes/${data.quizId}/check-answer`,
      data.userAnswers
    )
    return response
  })
}

export const useCreateQuiz = () => {
  return useMutation(async (quiz: ICreateQuizDto) => {
    const {data} = await axios.post(`${constants.general.backend}/quizzes`, quiz)
    return data
  })
}


export const useDeleteQuiz = () => {
  return useMutation(async (id: number) => {
    const {data} = await axios.delete(`${constants.general.backend}/quizzes/${id}`)
    return data
  })
}

