import axios from "axios"
import { constants } from "../constants"
import { ICreateQuestionWithOptions, IQuestion } from "../types/IQuestion"
import {useMutation, useQuery, UseQueryResult} from "react-query";
import {IOption} from "../types/IOption";

export const useFetchQuestionById = (questionId: number): UseQueryResult<IQuestion> => {
  return useQuery(["get-question", questionId], async () => {
    const {data} = await axios.get(`${constants.general.backend}/questions/${questionId}`)
    return data
  })
}

export const useFetchOptionsByQuestionId =
  (questionId: number, withAnswer = false): UseQueryResult<Array<IOption>> => {
    return useQuery(["get-options-by-question-id", questionId], async () => {
      const {data} = await axios.get(
        `${constants.general.backend}/questions/${questionId}/options?withAnswer=${withAnswer}`
      )
      return data
    })
  }

export const useCreateQuestionWithOptions = () => {
  return useMutation(async (question: ICreateQuestionWithOptions) => {
    const {data} = await axios.post(
      `${constants.general.backend}/questions/with-options`,
      question
    )
    return data
  })
}

export const useDeleteQuestionMutation = () => {
  return useMutation(async (id: number) => {
    const {data} = await axios.delete(`${constants.general.backend}/questions/${id}`)
    return data
  })
}

export const useUpdateQuestionMutation = () => {
  return useMutation(async (data: {id: number, question: IQuestion}) => {
    const {data: response} = await axios.patch(
      `${constants.general.backend}/questions/${data.id}`,
      data.question
    )
    return response
  })
}
