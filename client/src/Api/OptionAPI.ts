import axios from "axios"
import { constants } from "../constants"
import {IOption} from "../../types/IOption";

export const updateOption = async (id: number, option: IOption) => {
  return await axios.patch(
    `${constants.general.backend}/options/${id}`,
    option
  )
}
