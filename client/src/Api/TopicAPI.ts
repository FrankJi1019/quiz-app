import axios from "axios"
import { constants } from "../constants"

export const getAllTopics = async () => {
  return await axios.get(`${constants.general.backend}/topics`)
}
