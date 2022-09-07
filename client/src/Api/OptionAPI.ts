import axios from "axios"
import { constants } from "../constants"
import {IOption} from "../types/IOption";
import {useMutation} from "react-query";

export const useUpdateOptionMutation = () => {
  return useMutation(async (data: { id: number, option: IOption }) => {
    const {data: response} = await axios.patch(
      `${constants.general.backend}/options/${data.id}`,
      data.option
    )
    return response
  })
}
