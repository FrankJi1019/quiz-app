import axios from "axios"
import { constants } from "../constants"
import { ICreateQuestionWithOptions, IQuestion } from "../../types/IQuestion"

export const getQuestion = async (id: number) => {
  return await axios.get(`${constants.general.backend}/questions/${id}`)
}

export const getOptionsByQuestionId = async (
  id: number,
  withAnswer = false
) => {
  return await axios.get(
    `${constants.general.backend}/questions/${id}/options?withAnswer=${withAnswer}`
  )
}

export const createQuestionWithOptions = async (
  question: ICreateQuestionWithOptions
) => {
  return await axios.post(
    `${constants.general.backend}/questions/with-options`,
    question
  )
}

export const deleteQuestion = async (id: number) => {
  return await axios.delete(`${constants.general.backend}/questions/${id}`)
}

export const updateQuestion = async (id: number, question: IQuestion) => {
  return await axios.patch(
    `${constants.general.backend}/questions/${id}`,
    question
  )
}
