import axios from "axios"
import { constants } from "../constants"
import {useQuery, UseQueryResult} from "react-query";

export const useFetchTopics = () => {
  return useQuery(["all-topics"], async () => {
    const {data} = await axios.get(`${constants.general.backend}/topics`)
    return data
  })
}

export const useFetchTopTopics = (): UseQueryResult<Array<string>> => {
  return useQuery(['top-topics'], async () => {
    const {data} = await axios.get(`${constants.general.backend}/topics/top-picks`)
    return data
  })
}

