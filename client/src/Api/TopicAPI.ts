import axios from "axios"
import { constants } from "../constants"
import {useQuery} from "react-query";

export const useFetchTopics = () => {
  return useQuery(["all-topics"], async () => {
    const {data} = await axios.get(`${constants.general.backend}/topics`)
    return data
  })
}

