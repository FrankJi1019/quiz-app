import axios from "axios"
import { constants } from "../constants"

export const getUserQuizzes = (username: string) => {
  return axios.get(`${constants.general.backend}/users/${username}/quizzes`)
}

export const getUserSetting = (username: string) => {
  return axios.get(`${constants.general.backend}/users/${username}/settings`)
}

export const updateTheme = (username: string, theme: number) => {
  return axios.patch(`${constants.general.backend}/users/${username}/settings`, {theme})
}
