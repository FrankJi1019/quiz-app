import axios from "axios"
import { constants } from "../constants"
import {useMutation, useQuery, UseQueryResult} from "react-query";
import {IQuiz} from "../types/IQuiz";
import {IUser} from "../types/User";

export const useFetchUserQuizzes = (username: string): UseQueryResult<Array<IQuiz>> => {
  return useQuery(["user-quizzes", username], async () => {
    const {data} = await axios.get(`${constants.general.backend}/users/${username}/quizzes`)
    return data
  })
}

export const useFetchUserSetting = () => {
  return useMutation(async (username: string) => {
    const {data} = await axios.get(`${constants.general.backend}/users/${username}/settings`)
    return data
  })
}

export const useUpdateThemeMutation = () => {
  return useMutation(async (data: { username: string, theme: number }) => {
    const {data: response} = await axios.patch(
      `${constants.general.backend}/users/${data.username}/settings`,
      {theme: data.theme}
    )
    return response
  })
}

export const useCreateUserMutation = () => {
  return useMutation(async (username: string) => {
    const {data} = await axios.post(`${constants.general.backend}/users/${username}`)
    return data
  })
}

export const useFetchAttemptedQuizzes = (username: string) : UseQueryResult<Array<IQuiz>> => {
  return useQuery(['attempted-quiz', username], async () => {
    const {data} = await axios.get(`${constants.general.backend}/users/${username}/attempted-quizzes`)
    return data
  })
}

export const useFetchUserMetadata = (username: string): UseQueryResult<IUser> => {
  return useQuery(['username-meta', username], async () => {
    const {data} = await axios.get(`${constants.general.backend}/users/${username}/metadata`)
    return data
  })
}
