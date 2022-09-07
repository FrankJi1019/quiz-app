import axios from "axios"
import { constants } from "../constants"
import {useMutation} from "react-query";

export const useChangeAttemptOptionMutation = () => {
  return useMutation(async (data: {questionId: number, optionId: number, sessionId: number}) => {
    const {data: response} = await axios.post(
      `${constants.general.backend}/attempts`, data
    )
    return response
  })
}
